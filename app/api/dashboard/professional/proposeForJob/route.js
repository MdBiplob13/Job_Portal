import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";
import Job from "@/app/models/jobModel";

// Handle proposal submission for a job
export async function POST(req) {
  try {
    await connectMongoDb();
    const { jobId, professionalId, resume, links, coverLetter } =
      await req.json();

    // validate required fields
    if (!jobId || !professionalId) {
      return NextResponse.json(
        { status: "error", message: "jobId and professionalId are required" },
        { status: 400 }
      );
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { status: "error", message: "Job not found" },
        { status: 404 }
      );
    }

    // Check if job is still open for applications
    if (job.status !== "open" && job.status !== "pending") {
      return NextResponse.json(
        {
          status: "error",
          message: `This job is ${job.status}. Applications are closed.`,
        },
        { status: 400 }
      );
    }

    // Check if job has reached application limit
    if (job.applicationLimit && job.applicationCount >= job.applicationLimit) {
      return NextResponse.json(
        {
          status: "error",
          message: "Application limit reached for this job",
        },
        { status: 400 }
      );
    }

    // check if proposal already exists
    const existingProposal = await ProposeJob.findOne({
      jobId,
      professionalId,
    });
    if (existingProposal) {
      return NextResponse.json(
        {
          status: "error",
          message: "You have already submitted a proposal for this job",
        },
        { status: 400 }
      );
    }

    // Create new proposal
    const newProposal = await ProposeJob.create({
      jobId,
      professionalId,
      resume,
      links,
      coverLetter,
      status: "applied",
    });

    // Update job proposal count - use findByIdAndUpdate to avoid validation issues
    await Job.findByIdAndUpdate(
      jobId,
      {
        $inc: { applicationCount: 1 },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Proposal submitted successfully",
        data: newProposal,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Proposal submission error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create proposal",
        details:
          process.env.NODE_ENV === "development" ? err.message : undefined,
      },
      { status: 500 }
    );
  }
}

// Get all proposals made for a specific job
export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    const params = {
      jobId,
    };

    const proposals = await ProposeJob.find({ jobId: params.jobId }).populate(
      "professionalId"
    );

    return NextResponse.json({
      status: "success",
      data: proposals,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch proposals for job" },
      { status: 500 }
    );
  }
}
