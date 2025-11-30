import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";

// Handle proposal submission for a job
export async function POST(req) {
  try {
    await connectMongoDb();
    const body = await req.json();

    const { jobId, professionalId, resume, links } = body;

    const newProposal = await ProposeJob.create({
      jobId,
      professionalId,
      resume,
      links,
    });

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


