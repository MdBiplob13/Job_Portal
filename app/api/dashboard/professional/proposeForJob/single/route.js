import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";
import ProposeJob from "@/app/models/proposeJobModel";

export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const proposeId = searchParams.get("proposeId");

    const proposal = await ProposeJob.findById(proposeId)
      .populate("jobId")
      .populate("professionalId");

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
