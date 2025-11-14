import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb(); // Ensure the database is connected
    const { name, userName, email, password, phoneNumber, role } =
      await req.json();

      // check for required fields
      if (!name || !userName || !email || !password || !phoneNumber) {
        throw new Error("All fields are required");
      }

      



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
