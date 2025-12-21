import Job from "@/app/models/jobModel";
import ProposeJob from "@/app/models/proposeJobModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

// get single job
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

// update single job status and job propose
export async function PUT(req) {
  try {
    await connectMongoDb();

    const { jobId, jobProposeId, status } = await req.json();

    if (!jobId || !jobProposeId || !status) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job ID, Job Propose ID, and status are required.",
        },
        { status: 400 }
      );
    }

    const job = await Job.findById(jobId);
    const proposeJob = await ProposeJob.findById(jobProposeId);

    if(job?.totalHired >= job?.totalHiring) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job is full.",
        },
        { status: 400 }
      );
    }

    // update propose job status 
    await ProposeJob.findByIdAndUpdate(jobProposeId, { status });

    // update job status
    job.totalHired = job.totalHired + 1;
    const result = await job.save();

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
        message: "An error occurred while updating the job.",
      },
      { status: 500 }
    );
  }
}
