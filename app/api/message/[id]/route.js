import { NextResponse } from 'next/server';
import Message from '@/app/models/messageModel';
import connectMongoDb from '@/lib/mongoose';

// PUT: Mark message as read
export async function PUT(req, { params }) {
  try {
    await connectMongoDb();

    const { id } = params;
    const { userId } = await req.json();

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { status: 'fail', message: 'Message not found' },
        { status: 404 }
      );
    }

    if (message.receiverId !== userId) {
      return NextResponse.json(
        { status: 'fail', message: 'Unauthorized' },
        { status: 403 }
      );
    }

    message.read = true;
    await message.save();

    return NextResponse.json(
      {
        status: 'success',
        message: 'Message marked as read',
        data: message,
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

// DELETE: Delete a message
export async function DELETE(req, { params }) {
  try {
    await connectMongoDb();

    const { id } = params;
    const { userId } = await req.json();

    const message = await Message.findById(id);

    if (!message) {
      return NextResponse.json(
        { status: 'fail', message: 'Message not found' },
        { status: 404 }
      );
    }

    if (message.senderId !== userId) {
      return NextResponse.json(
        { status: 'fail', message: 'Unauthorized' },
        { status: 403 }
      );
    }

    await Message.findByIdAndDelete(id);

    return NextResponse.json(
      {
        status: 'success',
        message: 'Message deleted successfully',
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