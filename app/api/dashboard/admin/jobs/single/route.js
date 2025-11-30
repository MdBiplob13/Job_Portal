import Job from "@/app/models/jobModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job ID is required.",
        },
        { status: 400 }
      );
    }

    const result = await Job.findById(jobId);

    return NextResponse.json(
      {
        status: "success",
        data: result || {},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "An error occurred while fetching the job.",
      },
      { status: 500 }
    );
  }
}
