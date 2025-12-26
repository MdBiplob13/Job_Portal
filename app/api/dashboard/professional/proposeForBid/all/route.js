import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose.js";
import ProposeBid from "@/app/models/proposeBidModel.js";
import Bid from "@/app/models/bidModel.js";
import mongoose from "mongoose";

// GET - Get all proposed bids for a professional
export async function GET(req) {
  try {
    await connectMongoDb();

    // Get professionalId from query parameters
    const { searchParams } = new URL(req.url);
    const professionalId = searchParams.get('professionalId');

    // Validate professionalId
    if (!professionalId) {
      return NextResponse.json(
        {
          status: "error",
          message: "professionalId is required",
        },
        { status: 400 }
      );
    }
    
    // Fetch proposed bids for the professional
    const proposedBids = await ProposeBid.find({professionalId: new mongoose.Types.ObjectId(professionalId)}).populate('bidId').populate('professionalId').populate('employerId');
    console.log("🚀 ~ GET ~ proposedBids:", proposedBids)

    return NextResponse.json(
      {
        status: "success",
        message: "Proposed bids fetched successfully",
        data: proposedBids,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error fetching proposed bids:", err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch proposed bids",
        error: err.message,
      },
      { status: 500 }
    );
  }
}