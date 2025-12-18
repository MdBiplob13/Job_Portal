import Bid from "@/app/models/bidModel.js";
import connectMongoDb from "@/lib/mongoose.js";
import ProposeBid from "@/app/models/proposeBidModel.js";
import User from "@/app/models/userModel.js";
import { NextResponse } from "next/server.js";

// POST - Create a new bid proposal
export async function POST(req) {
  try {
    await connectMongoDb();
    const {
      bidId,
      professionalId,
      resume,
      budget,
      deadline,
      budgetType,
      coverLetter,
    } = await req.json(); // Changed from req.body to req.json()

    // Validate required fields
    if (!bidId || !professionalId) {
      return NextResponse.json( // Changed from res.status to NextResponse.json
        {
          status: "error",
          message: "bidId and professionalId are required",
        },
        { status: 400 }
      );
    }

    // Check if proposal already exists
    const existingProposal = await ProposeBid.findOne({
      bidId,
      professionalId,
    });

    if (existingProposal) {
      return NextResponse.json( // Changed from res.status to NextResponse.json
        {
          status: "error",
          message: "You have already proposed for this bid",
        },
        { status: 400 }
      );
    }

    const newProposal = await ProposeBid.create({
      bidId,
      professionalId,
      resume: resume || "",
      budget: budget || "",
      budgetType: budgetType || "",
      deadline: deadline || "",
      coverLetter: coverLetter || "",
    });

    // Update bid proposal count
    const bid = await Bid.findById(bidId);
    if (bid) {
      bid.applicationCount = (bid.applicationCount || 0) + 1;
      await bid.save();
    }

    return NextResponse.json({
      status: "success",
      data: newProposal,
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: "error",
      message: "Failed to create bid proposal",
    }, { status: 500 });
  }
}

// GET - Get all proposals for a single bid OR single proposal
export async function GET(req) {
  try {
    await connectMongoDb();
    const { searchParams } = new URL(req.url);
    const bidId = searchParams.get("bidId");
    const proposalId = searchParams.get("proposalId");
    const professionalId = searchParams.get("professionalId");

    // Get single proposal by ID
    if (proposalId) {
      const proposal = await ProposeBid.findById(proposalId)
        .populate({
          path: "bidId",
          model: Bid,
        })
        .populate({
          path: "professionalId",
          model: User,
        });

      if (!proposal) {
        return NextResponse.json(
          {
            status: "error",
            message: "Proposal not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        status: "success",
        data: proposal,
      });
    }

    // Get proposals by professional
    if (professionalId) {
      const proposals = await ProposeBid.find({ professionalId })
        .populate({
          path: "bidId",
          model: Bid,
        })
        .populate({
          path: "professionalId",
          model: User,
        })
        .sort({ createdAt: -1 });

      return NextResponse.json({
        status: "success",
        data: proposals,
        count: proposals.length,
      });
    }

    // Get all proposals for a single bid
    if (bidId) {
      const proposals = await ProposeBid.find({ bidId })
        .populate({
          path: "bidId",
          model: Bid,
        })
        .populate({
          path: "professionalId",
          model: User,
        })
        .sort({ createdAt: -1 });

      return NextResponse.json({
        status: "success",
        data: proposals,
        count: proposals.length,
      });
    }

    // If no parameters provided
    return NextResponse.json(
      {
        status: "error",
        message: "Please provide bidId, proposalId, or professionalId",
      },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch proposals",
      },
      { status: 500 }
    );
  }
}

// PUT - Update proposal (for status updates, etc.)
export async function PUT(req) {
  try {
    await connectMongoDb();
    const { searchParams } = new URL(req.url);
    const proposalId = searchParams.get("proposalId");
    
    const body = await req.json();
    const { status, budget, deadline, coverLetter } = body;

    if (!proposalId) {
      return NextResponse.json(
        {
          status: "error",
          message: "proposalId is required",
        },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (budget) updateData.budget = budget;
    if (deadline) updateData.deadline = deadline;
    if (coverLetter) updateData.coverLetter = coverLetter;

    const proposal = await ProposeBid.findByIdAndUpdate(
      proposalId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate({
        path: "bidId",
        model: Bid,
      })
      .populate({
        path: "professionalId",
        model: User,
      });

    if (!proposal) {
      return NextResponse.json(
        {
          status: "error",
          message: "Proposal not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: proposal,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update proposal",
      },
      { status: 500 }
    );
  }
}


