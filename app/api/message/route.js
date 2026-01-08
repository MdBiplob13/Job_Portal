import { NextResponse } from 'next/server';
import Message from '@/app/models/messageModel';
import connectMongoDb from '@/lib/mongoose';

// GET: Get messages between two users
export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const userId1 = searchParams.get('userId1');
    const userId2 = searchParams.get('userId2');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    if (!userId1 || !userId2) {
      return NextResponse.json(
        { status: 'fail', message: 'User IDs are required' },
        { status: 400 }
      );
    }

    // Get total count
    const totalCount = await Message.countDocuments({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    });

    // Get messages
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ timestamp: 1 }) // Oldest first
      .skip(skip)
      .limit(limit)
      .lean();

    // Format messages
    const formattedMessages = messages.map((msg) => ({
      id: msg._id,
      text: msg.message,
      sender: msg.senderId === userId1 ? 'me' : 'other',
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      time: new Date(msg.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: msg.timestamp,
      status: msg.read ? 'read' : 'sent',
      senderName: msg.senderName,
      receiverName: msg.receiverName,
    }));

    return NextResponse.json(
      {
        status: 'success',
        data: formattedMessages,
        meta: {
          totalCount,
          page,
          pageSize: limit,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}

// POST: Send a message (alternative to socket)
export async function POST(req) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { senderId, receiverId, senderName, receiverName, message } = body;

    if (!senderId || !receiverId || !message) {
      return NextResponse.json(
        { status: 'fail', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      senderName,
      receiverName,
      message,
      read: false,
    });

    await newMessage.save();

    return NextResponse.json(
      {
        status: 'success',
        message: 'Message sent successfully',
        data: {
          id: newMessage._id,
          text: newMessage.message,
          senderId,
          receiverId,
          senderName,
          time: new Date(newMessage.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          timestamp: newMessage.timestamp,
          status: 'sent',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}

// PUT: Mark messages as read
export async function PUT(req) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { messageIds, userId } = body;

    if (!messageIds || !userId) {
      return NextResponse.json(
        { status: 'fail', message: 'Message IDs and user ID are required' },
        { status: 400 }
      );
    }

    await Message.updateMany(
      { _id: { $in: messageIds }, receiverId: userId },
      { read: true }
    );

    return NextResponse.json(
      {
        status: 'success',
        message: 'Messages marked as read',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}