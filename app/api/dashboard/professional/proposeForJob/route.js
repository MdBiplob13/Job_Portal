import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";
import Job from "@/app/models/jobModel";

// Handle proposal submission for a job
export async function POST(req) {
  try {
    await connectMongoDb();
    const { jobId, professionalId, resume, links, coverLetter } = await req.json();
    console.log("🚀 ~ POST ~ jobId, professionalId, resume, links, coverLetter:", jobId, professionalId, resume, links, coverLetter)


    const newProposal = await ProposeJob.create({
      jobId,
      professionalId,
      resume,
      links,
      coverLetter
    });

    // update job proposal count
    const job = await Job.findById(jobId);
    job.applicationCount = job.applicationCount + 1;
    await job.save();

    return NextResponse.json(
      { status: "success", data: newProposal },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Failed to create proposal" },
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
    

    const proposals = await ProposeJob.find({ jobId: params.jobId })
      .populate("professionalId");

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




