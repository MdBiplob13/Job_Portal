import { NextResponse } from "next/server";
import Bid from "@/app/models/bidModel";
import connectMongoDb from "@/lib/mongoose";

export async function GET() {
  try {
    await connectMongoDb();

    const bids = await Bid.find().sort({ createdAt: -1 });

    return NextResponse.json({
      status: "success",
      data: bids,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDb();

    const bid = await Bid.findById(params.id);

    if (!bid) {
      return NextResponse.json(
        { status: "error", message: "Bid not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: bid,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectMongoDb();

    const { email } = await req.json();
    console.log("🚀 ~ PATCH ~ email:", email)

    const bids = await Bid.find({ employerEmail: email }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      status: "success",
      data: bids,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
