import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Job from "@/app/models/jobModel";

// get employer all jobs

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employerEmail = searchParams.get("employerEmail");

    const jobs = await Job.find({ employerEmail }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        status: "success",
        data: jobs,
      },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching jobs.",
      },
      { status: 500 }
    );
  }
}
