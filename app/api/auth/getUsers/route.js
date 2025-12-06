import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

// GET all users with search & pagination
export async function GET(req) {
  try {
    await connectMongoDb();

    const {
      search = "",
      status = "all",
      page = 1,
      limit = 10,
    } = Object.fromEntries(new URL(req.url).searchParams);

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status !== "all") {
      query.status = status;
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createDate: -1 });

    return NextResponse.json(
      {
        status: "success",
        data: users,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}

// PATCH to block a user
export async function PATCH(req) {
  try {
    await connectMongoDb();
    const { userId } = await req.json();

    await User.findByIdAndUpdate(userId, { status: "blocked" }, { new: true });

    return NextResponse.json(
      { status: "success", message: "User blocked successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}

// get single user by email or id
export async function PUT(req) {
  try {
    await connectMongoDb();
    const { id, email, username, method } = await req.json();

    let user = {};

    if (method === "id") {
      user = await User.findById(id);
    } else if (method === "email") {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ userName: username });
    }

    if (!user) {
      return NextResponse.json(
        {
          status: "fail",
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
