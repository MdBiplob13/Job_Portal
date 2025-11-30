import Job from "@/app/models/jobModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

// get All jobs for admin dashboard
export async function GET(req) {
  try {
    await connectMongoDb();

    const jobs = await Job.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        status: "success",
        data: jobs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while posting the job.",
      },
      { status: 500 }
    );
  }
}

