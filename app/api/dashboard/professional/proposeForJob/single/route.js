import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";
import User from "@/app/models/userModel";
import Job from "@/app/models/jobModel";

// get a single proposal by ID
export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const proposeId = searchParams.get("proposeId");

    const proposal = await ProposeJob.findById(proposeId)
      .populate({
        path: "jobId",
        model: Job,
      })
      .populate({
        path: "professionalId",
        model: User,
      });

    if (!proposal)
      return NextResponse.json(
        { status: "error", message: "Proposal not found" },
        { status: 404 }
      );

    return NextResponse.json({ status: "success", data: proposal });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: "Failed to fetch proposal" },
      { status: 500 }
    );
  }
}

// get Single professional all propose
export async function PUT(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get("professionalId");

    // make professionalId to a objectId
    if (!professionalId) {
      return NextResponse.json(
        { status: "failed", message: "professionalId is required" },
        { status: 400 }
      );
    }

    

    const proposals = await ProposeJob.find({ professionalId })
      .populate({
        path: "jobId",
        model: Job,
      })
      .populate({
        path: "professionalId",
        model: User,
      }); 
  } catch (err) {
    return NextResponse.json(
      { status: "failed", message: "Failed to fetch proposal" },
      { status: 500 }
    );
  }
}
