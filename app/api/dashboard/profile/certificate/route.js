// app/api/dashboard/profile/certificate/route.js
import Certificate from "@/app/models/certificatesModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

// ----------------------------------------------------
// POST: Add a new certificate
// ----------------------------------------------------
export async function POST(req) {
  try {
    await connectMongoDb();
    const { userId, certificateName, institute, date, description } =
      await req.json();

    const newCertificate = new Certificate({
      userId,
      certificateName,
      institute,
      date,
      description,
    });

    await newCertificate.save();

    // Return all certificates for the user, latest first
    const data = await Certificate.find({ userId }).sort({ date: -1 });

    return NextResponse.json(
      {
        status: "success",
        message: "Certificate added successfully",
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

// ----------------------------------------------------
// GET: Get all certificates of a user
// ----------------------------------------------------
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

    const data = await Certificate.find({ userId }).sort({ date: -1 });

    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// ----------------------------------------------------
// DELETE: Delete a certificate
// ----------------------------------------------------
export async function DELETE(req) {
  try {
    await connectMongoDb();
    const { certificateId } = await req.json();

    await Certificate.findOneAndDelete({ _id: certificateId });

    return NextResponse.json(
      {
        status: "success",
        message: "Certificate deleted",
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
