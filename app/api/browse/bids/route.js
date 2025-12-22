import Bid from "@/app/models/bidModel";
import ProposeBid from "@/app/models/proposeBidModel";
import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server"; // You need to import NextResponse

// Accept bid
export async function PUT(req) {
  try {
    await connectMongoDb();

    const { bidId, proposeId } = await req.json();

    // validate required fields
    if (!bidId || !proposeId) {
      return NextResponse.json(
        {
          status: "error",
          message: "bidId, and proposeId are required",
        },
        { status: 400 }
      );
    }

    // get all data
    const bid = await Bid.findById(bidId);
    const propose = await ProposeBid.findById(proposeId);

    const professionalId = propose.professionalId.toString();
    const professional = await User.findById(professionalId);

    if (!bid) {
      return NextResponse.json(
        { status: "error", message: "Bid not found" },
        { status: 404 }
      );
    }

    if (!professional) {
      return NextResponse.json(
        { status: "error", message: "Professional not found" },
        { status: 404 }
      );
    }

    if (!propose) {
      return NextResponse.json(
        { status: "error", message: "Proposal not found" },
        { status: 404 }
      );
    }

    // Check if bid is already accepted
    if (bid.status === "accepted") {
      return NextResponse.json(
        { status: "error", message: "Bid is already accepted" },
        { status: 400 }
      );
    }

    // Check if the propose belongs to this bid
    if (propose.bidId.toString() !== bidId) {
      return NextResponse.json(
        { status: "error", message: "Proposal does not belong to this bid" },
        { status: 400 }
      );
    }

    // Check if the propose belongs to this professional
    if (propose.professionalId.toString() !== professionalId) {
      return NextResponse.json(
        {
          status: "error",
          message: "Proposal does not belong to this professional",
        },
        { status: 400 }
      );
    }

    // Start a transaction to ensure data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // update bid
      bid.status = "accepted";
      bid.bidder = {
        bidder: new mongoose.Types.ObjectId(professionalId), // Use new keyword
        name: professional.name,
        email: professional.email,
        photo: professional.photo,
        projectDeadline: propose.deadline,
        price: propose.budget,
        budgetType: propose.budgetType,
      };
      await bid.save({ session });

      // update current propose to accepted
      propose.status = "accepted";
      await propose.save({ session });

      // reject other proposes for the same bid (excluding current one)
      await ProposeBid.updateMany(
        {
          bidId: new mongoose.Types.ObjectId(bidId), // Use new keyword
          _id: { $ne: new mongoose.Types.ObjectId(proposeId) }, // Exclude current propose
        },
        { status: "rejected" },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json(
        {
          status: "success",
          message: "Bid accepted successfully",
          data: {
            bid: bid,
            proposal: propose,
          },
        },
        { status: 200 }
      );
    } catch (transactionError) {
      await session.abortTransaction();
      session.endSession();
      throw transactionError;
    }
  } catch (error) {
    console.error("Error accepting bid:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to accept bid",
      },
      { status: 500 }
    );
  }
}

// Reject bid
export async function PATCH(req) {
  try {
    await connectMongoDb();

    const { proposeId } = await req.json();
    console.log("🚀 ~ PATCH ~ proposeId:", proposeId)

    // validate required fields
    if (!proposeId) {
      return NextResponse.json(
        { status: "error", message: "proposeId is required" },
        { status: 400 }
      );
    }

    // update propose
    await ProposeBid.findByIdAndUpdate(proposeId, { status: "rejected" });

    return NextResponse.json(
      {
        status: "success",
        message: "Bid rejected successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting bid:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Failed to accept bid",
      },
      { status: 500 }
    );
  }
}
