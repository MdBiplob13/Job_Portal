import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectMongoDb();

    // Get authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { status: "fail", message: "No token provided" },
        { status: 401 }
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (err) {
      return NextResponse.json(
        { status: "fail", message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Find user
    const user = await User.findById(decoded.userId).select("-password");

    if (user.status === "blocked") {
      return NextResponse.json(
        { status: "fail", message: "User is blocked by admin" },
        { status: 403 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json(
      {
        status: "success",
        message: "Token verified",
        user,
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

