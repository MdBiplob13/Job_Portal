import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";
import User from "@/app/models/userModel";
import Job from "@/app/models/jobModel";

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
