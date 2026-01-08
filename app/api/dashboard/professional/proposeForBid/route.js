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
      employerId,
    } = await req.json(); // Changed from req.body to req.json()

    // Validate required fields
    if (!bidId || !professionalId) {
      return NextResponse.json(
        // Changed from res.status to NextResponse.json
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
      return NextResponse.json(
        // Changed from res.status to NextResponse.json
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
      employerId,
    });

    // Update bid proposal count
    const bid = await Bid.findById(bidId);
    if (bid) {
      bid.applicationCount = (bid.applicationCount || 0) + 1;
      await bid.save();
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Bid proposal created successfully",
        data: newProposal,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to create bid proposal",
      },
      { status: 500 }
    );
  }
}

// GET - Get all proposals for a single bid OR single proposal
export async function GET(req) {
  try {
    await connectMongoDb();
    const { searchParams } = new URL(req.url);
    const bidId = searchParams.get("bidId");
    const proposeId = searchParams.get("proposeId");
    const professionalId = searchParams.get("professionalId");

    // Get single proposal by ID
    if (proposeId) {
      const proposal = await ProposeBid.findById(proposeId)
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
        message: "Please provide bidId, proposeId, or professionalId",
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch proposals",
      },
      { status: 500 }
    );
  }
}

// PUT - Update status
export async function PUT(req) {
  try {
    await connectMongoDb();

    const body = await req.json();
    const { status, proposalId } = body;

    const bid = await Bid.findByIdAndUpdate(proposalId, { status });
    
    return NextResponse.json({
      status: "success",
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to update proposal",
      },
      { status: 500 }
    );
  }
}
