import { NextResponse } from 'next/server';
import connectMongoDb from '@/lib/mongoose';
import User from '@/app/models/userModel';
import Message from '@/app/models/messageModel';

export async function GET(req) {
  try {
    // Get user ID from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { 
          status: 'fail', 
          message: 'User ID is required' 
        },
        { status: 400 }
      );
    }

    console.log(`📥 Fetching contacts for user: ${userId}`);

    await connectMongoDb();

    // Verify user exists
    const currentUser = await User.findById(userId).select('-password');
    if (!currentUser) {
      return NextResponse.json(
        { 
          status: 'fail', 
          message: 'User not found' 
        },
        { status: 404 }
      );
    }

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
      .sort({ timestamp: -1 })
      .lean();

    console.log(`📨 Found ${messages.length} messages for user`);

    // Get unique contacts from messages
    const contactIds = new Set();
    const contactsData = [];
    
    messages.forEach(msg => {
      // Determine contact ID (the other person in the conversation)
      const contactId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      
      // Skip if contact is the same as user or already processed
      if (contactId && contactId !== userId && !contactIds.has(contactId)) {
        contactIds.add(contactId);
        contactsData.push({
          contactId,
          lastMessage: msg.message || msg.text || '',
          lastMessageTime: msg.timestamp || new Date(),
          isSender: msg.senderId === userId,
          isRead: msg.read || false
        });
      }
    });

    console.log(`👥 Found ${contactIds.size} unique contacts`);

    // If no contacts found, return empty array
    if (contactIds.size === 0) {
      return NextResponse.json(
        {
          status: 'success',
          data: [],
          message: 'No conversations yet',
          count: 0
        },
        { status: 200 }
      );
    }

    // Get user details for each contact
    const contactUsers = await User.find({
      _id: { $in: Array.from(contactIds) }
    })
      .select('_id name userName email photo headline currentPosition role job bio lastActive')
      .lean();

    // Format contacts with message data
    const contacts = contactUsers.map(user => {
      const contactData = contactsData.find(c => c.contactId === user._id.toString());
      
      return {
        _id: user._id,
        id: user._id.toString(),
        name: user.name || user.userName || 'User',
        userName: user.userName,
        email: user.email,
        avatar: user.photo || null,
        job: user.headline || user.currentPosition || user.job || 'No job specified',
        bio: user.bio || '',
        role: user.role || 'user',
        lastMessage: contactData?.lastMessage || '',
        lastMessageTime: contactData?.lastMessageTime || new Date(),
        unread: contactData?.isSender === false && !contactData?.isRead ? 1 : 0,
        projectValue: user.role === 'employer' ? '$5,000+' : '$2,000+',
        lastSeen: user.lastActive ? formatLastSeen(user.lastActive) : 'Recently'
      };
    });

    // Sort by last message time (newest first)
    contacts.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    console.log(`✅ Sending ${contacts.length} contacts to frontend`);

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
    console.error('❌ Error in contacts API:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Internal server error',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// Helper function to format last seen time
function formatLastSeen(lastActive) {
  const lastSeen = new Date(lastActive);
  const now = new Date();
  const diffHours = Math.floor((now - lastSeen) / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
  return 'Long time ago';
}