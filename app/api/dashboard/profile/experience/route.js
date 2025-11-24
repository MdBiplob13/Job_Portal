// app/api/dashboard/profile/experience/route.js
import Experience from "@/app/models/experienceModel";
import connectMongoDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb();
    const { userId, company, position, startDate, endDate, description } =
      await req.json();

    const newExperience = new Experience({
      userId,
      company,
      position,
      startDate,
      endDate,
      description,
    });
    await newExperience.save();

    const data = await Experience.find({ userId }).sort({ startDate: -1 });

    return NextResponse.json(
      {
        status: "success",
        message: "Experience created successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "userId is required" },
        { status: 400 }
      );
    }

    const data = await Experience.find({ userId }).sort({ startDate: -1 });

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb();

    const { experienceId } = await req.json();

    const doc = await Experience.findOneAndDelete({ _id: experienceId });

    return NextResponse.json(
      {
        status: "success",
        message: "Experience deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
