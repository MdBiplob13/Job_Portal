import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Job from "@/app/models/jobModel";

// Connect to MongoDB
const connectMongoDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// GET all jobs or single job by ID
export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('id');
    const employerEmail = searchParams.get('employerEmail');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get single job by ID
    if (jobId) {
      const job = await Job.findById(jobId)
        .populate('employer', 'name userName photo')
        .lean();

      if (!job) {
        return NextResponse.json(
          {
            status: "fail",
            message: "Job not found",
          },
          { status: 404 }
        );
      }

      // Increment view count
      await Job.findByIdAndUpdate(jobId, { $inc: { views: 1 } });

      return NextResponse.json(
        {
          status: "success",
          job: job,
        },
        { status: 200 }
      );
    }

    // Get jobs by employer email
    if (employerEmail) {
      const jobs = await Job.find({ employerEmail })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('employer', 'name userName photo')
        .lean();

      const totalJobs = await Job.countDocuments({ employerEmail });

      return NextResponse.json(
        {
          status: "success",
          jobs: jobs,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            totalJobs: totalJobs,
            hasNext: page < Math.ceil(totalJobs / limit),
            hasPrev: page > 1
          }
        },
        { status: 200 }
      );
    }

    // Get all active jobs (for public listing)
    const jobs = await Job.find({ status: "active", postDeadline: { $gte: new Date() } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('employer', 'name userName photo review')
      .lean();

    const totalJobs = await Job.countDocuments({ 
      status: "active", 
      postDeadline: { $gte: new Date() } 
    });

    return NextResponse.json(
      {
        status: "success",
        jobs: jobs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalJobs / limit),
          totalJobs: totalJobs,
          hasNext: page < Math.ceil(totalJobs / limit),
          hasPrev: page > 1
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Job get error:", error);
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to fetch jobs",
        error: error.message,
      },
      { status: 500 }
    );
  }
}