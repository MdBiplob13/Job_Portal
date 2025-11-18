import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/auth/generateToken";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure the database is connected
    const { email, password } = await req.json();
    console.log("🚀 ~ POST ~ password:", password);

    // check for required fields
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // check if user is blocked
    if (user.status === "blocked") {
      throw new Error("Your account has been blocked. Please contact support.");
    }

    const token = generateToken(user._id, user.role);

    return NextResponse.json(
      {
        status: "success",
        message: "User logged in successfully",
        token,
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
        error,
      },
      { status: 400 }
    );
  }
}
