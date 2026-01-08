import { NextResponse } from 'next/server';
import connectMongoDb from '@/lib/mongoose';
import Message from '@/app/models/messageModel';
import User from '@/app/models/userModel';

export async function POST(req) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { senderId, receiverId, message, bidId } = body;

    if (!senderId || !receiverId || !message) {
      return NextResponse.json(
        { status: 'fail', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get sender and receiver details
    const [sender, receiver] = await Promise.all([
      User.findById(senderId).select('name userName photo'),
      User.findById(receiverId).select('name userName photo')
    ]);

    if (!sender || !receiver) {
      return NextResponse.json(
        { status: 'fail', message: 'User not found' },
        { status: 404 }
      );
    }

    // Create initial message
    const newMessage = new Message({
      senderId,
      receiverId,
      senderName: sender.name || sender.userName,
      receiverName: receiver.name || receiver.userName,
      message,
      read: false,
      metadata: {
        isInitialMessage: true,
        bidId: bidId || null
      }
    });

    await newMessage.save();

    return NextResponse.json(
      {
        status: 'success',
        message: 'Initial message sent successfully',
        data: {
          id: newMessage._id,
          text: newMessage.message,
          senderId,
          receiverId,
          senderName: newMessage.senderName,
          receiverName: newMessage.receiverName,
          timestamp: newMessage.timestamp,
          status: 'sent'
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error sending initial message:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}