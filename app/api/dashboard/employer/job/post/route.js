import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Job from "@/app/models/jobModel";
import User from "@/app/models/userModel";

// Connect to MongoDB
const connectMongoDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function POST(req) {
  try {
    await connectMongoDb();
    
    const body = await req.json();
    const {
      title,
      company,
      location,
      jobType,
      workType,
      salary,
      salaryType,
      totalHiring,
      applicationLimitEnabled,
      applicationLimit,
      workTime,
      workDays,
      searchType,
      postDeadline,
      skills,
      benefits,
      languages,
      description,
      contactEmail,
      employerEmail
    } = body;

    console.log("🚀 ~ POST ~ job data:", body);

    // Validation
    if (!title || !company || !location || !description || !employerEmail) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Title, company, location, description, and employer email are required",
        },
        { status: 400 }
      );
    }

    // Check if employer exists
    const employer = await User.findOne({ email: employerEmail, role: "employer" });
    if (!employer) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Employer not found or invalid role",
        },
        { status: 404 }
      );
    }

    // Create job
    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location,
      jobType,
      workType,
      salary: parseFloat(salary) || 0,
      salaryType,
      totalHiring: parseInt(totalHiring) || 1,
      applicationLimitEnabled: Boolean(applicationLimitEnabled),
      applicationLimit: parseInt(applicationLimit) || 0,
      workTime: workTime || "",
      workDays: workDays || "Mon-Fri",
      searchType: searchType || "Individual",
      postDeadline: new Date(postDeadline),
      skills: Array.isArray(skills) ? skills : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      languages: Array.isArray(languages) ? languages : [],
      description: description.trim(),
      contactEmail: contactEmail || employerEmail,
      employer: employer._id,
      employerEmail: employerEmail,
      status: "active"
    });

    // Update employer's job count
    await User.findByIdAndUpdate(employer._id, {
      $inc: { "job.jobPosted": 1 }
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Job posted successfully",
        job: job,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Job post error:", error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to post job",
        error: error.message,
      },
      { status: 500 }
    );
  }
}