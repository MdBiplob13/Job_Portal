import { NextResponse } from "next/server";
import Bid from "@/app/models/bidModel";
import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";

export async function POST(req) {
  try {
    await connectMongoDb();
 
    const {bidId,reportedBy, title, description, issueType} = await req.json();

    
    
    return NextResponse.json(
      {
        status: "success",
        message: "report posted successfully",
      },
      { status: 201 }
    );
  } catch (error) {

    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to post bid",
        error: error.message,
      },
      { status: 500 }
    );
  }
}