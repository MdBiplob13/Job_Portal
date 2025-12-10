import { NextResponse } from "next/server";
import Bid from "@/app/models/bidModel";
import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";

export async function POST(req) {
  try {
    await connectMongoDb();

    const {
      title,
      description,
      requirements,
      responsibilities,
      skills,
      jobType,
      companyName,
      companyLocation,
      budget,
      BudgetType,
      ProjectDuration,
      applicationLimitEnabled,
      applicationLimit,
      workTime,
      deadline,
      employerEmail,
    } = await req.json();


    // -------------------------------
    // VALIDATION
    // -------------------------------
    if (
      !title ||
      !description ||
      !companyName ||
      !companyLocation ||
      !budget ||
      !employerEmail
    ) {
      return NextResponse.json(
        {
          status: "fail",
          message:
            "Required fields missing: title, description, companyName, companyLocation, budget, price, employerEmail",
        },
        { status: 400 }
      );
    }

    // -------------------------------
    // FIND EMPLOYER
    // -------------------------------
    const employer = await User.findOne({
      email: employerEmail,
      role: "employer",
    });

    if (!employer) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Employer not found or invalid role",
        },
        { status: 404 }
      );
    }

    // -------------------------------
    // CREATE BID
    // -------------------------------
    const newBid = await Bid.create({
      title: title.trim(),
      description: description.trim(),

      requirements: Array.isArray(requirements) ? requirements : [],
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      skills: Array.isArray(skills) ? skills : [],

      jobType,
      companyName: companyName.trim(),
      companyLocation: companyLocation.trim(),

      budget: Number(budget),
      BudgetType,

      ProjectDuration: ProjectDuration?.trim() || "",

      applicationLimitEnabled: Boolean(applicationLimitEnabled),
      applicationLimit: Number(applicationLimit) || 0,
      applicationCount: 0,

      workTime: workTime?.trim() || "",
      deadline: deadline ? new Date(deadline) : new Date(),

      employerEmail,

      status: "pending",
    });

    // -------------------------------
    // UPDATE EMPLOYER BID COUNT
    // -------------------------------
    await User.findByIdAndUpdate(employer._id, {
      $inc: { "job.bidsPosted": 1 },
    }).catch(() => {});

    return NextResponse.json(
      {
        status: "success",
        message: "Bid posted successfully",
        bid: newBid,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("BID POST ERROR:", error);

    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to post bid",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
