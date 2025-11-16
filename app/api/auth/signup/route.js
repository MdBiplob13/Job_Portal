import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure the database is connected
    const { name, userName, email, password, role } = await req.json();

    
    // check for required fields
    if (!name || !userName || !email || !password) {
      throw new Error("All fields are required");
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists with this email");
    }

    // check if username already exists
    const username = await User.findOne({ userName });
    if (username) {
      throw new Error("User already exists with this username");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return NextResponse.json(
      {
        status: "success",
        message: "User registered successfully",
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
