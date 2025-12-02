import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Job from "@/app/models/jobModel";
import User from "@/app/models/userModel";
import "@/utils/corn/jobCron";

// ------------------------------
// CONNECT TO MONGO (Optimized)
// ------------------------------
const connectMongoDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

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
      workDays,
      workType,
      languages,
      companyName,
      companyLocation,
      salary,
      salaryType,
      totalHiring,
      applicationLimitEnabled,
      applicationLimit,
      workTime,
      deadline,
      benefits,
      employerEmail,
    } = await req.json();
    console.log(employerEmail);

    // -----------------------------------
    // BASIC VALIDATION
    // -----------------------------------
    if (!title || !description || !companyName || !companyLocation) {
      return NextResponse.json(
        {
          status: "fail",
          message:
            "Required fields missing: title, description, companyName, companyLocation",
        },
        { status: 400 }
      );
    }

    // -----------------------------------
    // FIND EMPLOYER USER
    // -----------------------------------
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

    // -----------------------------------
    // CREATE JOB IN DB
    // -----------------------------------
    const newJob = await Job.create({
      title: title.trim(),
      description: description.trim(),

      // Array fields
      requirements: Array.isArray(requirements) ? requirements : [],
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
      skills: Array.isArray(skills) ? skills : [],
      languages: Array.isArray(languages) ? languages : [],
      benefits: Array.isArray(benefits) ? benefits : [],

      // Select fields
      jobType,
      workDays: workDays || "Mon-Fri",
      workType,

      // Company info
      companyName: companyName.trim(),
      companyLocation: companyLocation.trim(),

      // Salary info
      salary: Number(salary) || 0,
      salaryType,

      // Hiring info
      totalHiring: Number(totalHiring) || 1,
      applicationLimitEnabled: Boolean(applicationLimitEnabled),
      applicationLimit: Number(applicationLimit) || 0,

      // Work time
      workTime: workTime || "",

      // Deadline
      deadline: deadline ? new Date(deadline) : new Date(),

      // Employer reference
      employerEmail,

      // Default job status
      status: "active",
    });

    // -----------------------------------
    // UPDATE EMPLOYER JOB COUNT
    // -----------------------------------
    await User.findByIdAndUpdate(employer._id, {
      $inc: { "job.jobPosted": 1 },
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Job posted successfully",
        job: newJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(" JOB POST ERROR:", error);

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
