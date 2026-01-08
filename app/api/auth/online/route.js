import { NextResponse } from 'next/server';
import UserStatus from '@/app/models/userStatusModel';
import connectMongoDb from '@/lib/mongoose';

export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit')) || 100;

    let query = { status: 'online' };
    
    if (userId) {
      query = { userId };
    }

    const onlineUsers = await UserStatus.find(query)
      .sort({ lastSeen: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        status: 'success',
        data: onlineUsers,
        count: onlineUsers.length,
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

// PUT: Update user status
export async function PUT(req) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { userId, status, lastSeen } = body;

    if (!userId || !status) {
      return NextResponse.json(
        { status: 'fail', message: 'User ID and status are required' },
        { status: 400 }
      );
    }

    const userStatus = await UserStatus.findOneAndUpdate(
      { userId },
      {
        status,
        lastSeen: lastSeen || new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      {
        status: 'success',
        message: 'User status updated',
        data: userStatus,
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