import { NextResponse } from 'next/server';
import connectMongoDb from '@/lib/mongoose';
import User from '@/app/models/userModel';
import Message from '@/app/models/messageModel';
import jwt from 'jsonwebtoken';

// Helper function to verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

// Helper function to get user from token
const getUserFromRequest = async (req) => {
  try {
    // Try to get token from Authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      if (decoded) {
        await connectMongoDb();
        const user = await User.findById(decoded.userId || decoded._id).select('-password');
        return user;
      }
    }
    
    // Try to get token from cookies
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('='))
      );
      if (cookies.token) {
        const decoded = verifyToken(cookies.token);
        if (decoded) {
          await connectMongoDb();
          const user = await User.findById(decoded.userId || decoded._id).select('-password');
          return user;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
};

export async function GET(req) {
  try {
    // Get authenticated user
    const currentUser = await getUserFromRequest(req);
    
    if (!currentUser) {
      return NextResponse.json(
        { status: 'fail', message: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectMongoDb();

    // Find all unique users that the current user has chatted with
    const messages = await Message.find({
      $or: [
        { senderId: currentUser._id.toString() },
        { receiverId: currentUser._id.toString() }
      ]
    })
      .sort({ timestamp: -1 })
      .lean();

    // Extract unique contact IDs
    const contactIds = new Set();
    const contactsData = [];
    
    messages.forEach(msg => {
      const contactId = msg.senderId === currentUser._id.toString() 
        ? msg.receiverId 
        : msg.senderId;
      
      if (contactId && !contactIds.has(contactId)) {
        contactIds.add(contactId);
        contactsData.push({
          contactId,
          lastMessage: msg.message,
          lastMessageTime: msg.timestamp,
          senderId: msg.senderId,
          unread: msg.receiverId === currentUser._id.toString() && !msg.read ? 1 : 0,
          senderName: msg.senderName,
          receiverName: msg.receiverName
        });
      }
    });

    // If no contacts from messages, return empty array
    if (contactIds.size === 0) {
      return NextResponse.json(
        {
          status: 'success',
          data: [],
          message: 'No contacts found',
          count: 0
        },
        { status: 200 }
      );
    }

    // Get detailed user info for each contact
    const contactDetails = await User.find({
      _id: { $in: Array.from(contactIds) }
    })
      .select('_id name userName email photo headline currentPosition review role job bio')
      .lean();

    // Merge contact data with user details
    const contacts = contactDetails.map(user => {
      const contactData = contactsData.find(c => c.contactId === user._id.toString());
      const contactName = contactData 
        ? (user._id.toString() === contactData.senderId ? contactData.senderName : contactData.receiverName)
        : user.name || user.userName;
      
      return {
        _id: user._id,
        id: user._id,
        name: contactName,
        userName: user.userName,
        email: user.email,
        avatar: user.photo || null,
        headline: user.headline,
        currentPosition: user.currentPosition,
        job: user.job || user.headline || user.currentPosition,
        bio: user.bio,
        review: user.review || { rating: 0, totalRatings: 0 },
        role: user.role,
        lastMessage: contactData?.lastMessage || '',
        lastMessageTime: contactData?.lastMessageTime || new Date(),
        unreadMessages: contactData?.unread || 0,
        // Add project value based on role
        projectValue: user.role === 'employer' ? '$5,000+' : '$2,000+'
      };
    });

    // Sort by last message time (newest first)
    contacts.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    // For demo: Add some sample contacts if none exist
    if (contacts.length === 0) {
      const sampleUsers = await User.find({
        _id: { $ne: currentUser._id },
        role: { $in: ['employer', 'provider'] }
      })
        .limit(5)
        .select('_id name userName photo headline currentPosition review role')
        .lean();
      
      const sampleContacts = sampleUsers.map(user => ({
        _id: user._id,
        id: user._id,
        name: user.name || user.userName,
        userName: user.userName,
        avatar: user.photo,
        headline: user.headline,
        currentPosition: user.currentPosition,
        job: user.headline || user.currentPosition,
        review: user.review || { rating: 0 },
        role: user.role,
        lastMessage: '',
        lastMessageTime: new Date(),
        unreadMessages: 0,
        projectValue: user.role === 'employer' ? '$5,000+' : '$2,000+'
      }));
      
      return NextResponse.json(
        {
          status: 'success',
          data: sampleContacts,
          message: 'Suggested contacts',
          count: sampleContacts.length
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: contacts,
        count: contacts.length,
        message: 'Contacts retrieved successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}