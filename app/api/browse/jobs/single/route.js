import Job from "@/app/models/jobModel";
import ProposeJob from "@/app/models/proposeJobModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

// get single job
export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job ID is required.",
        },
        { status: 400 }
      );
    }

    const result = await Job.findById(jobId);

    return NextResponse.json(
      {
        status: "success",
        data: result || {},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "failed",
        message: "An error occurred while fetching the job.",
      },
      { status: 500 }
    );
  }
}

// update single job status and job propose
export async function PUT(req) {
  try {
    await connectMongoDb();

    const { jobId, jobProposeId, status } = await req.json();

    // Validate required fields
    if (!jobId || !jobProposeId || !status) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job ID, Job Propose ID, and status are required.",
        },
        { status: 400 }
      );
    }

    // Find job and proposal
    const job = await Job.findById(jobId);
    const proposeJob = await ProposeJob.findById(jobProposeId);

    if (!job) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job not found.",
        },
        { status: 404 }
      );
    }

    if (!proposeJob) {
      return NextResponse.json(
        {
          status: "failed",
          message: "Job proposal not found.",
        },
        { status: 404 }
      );
    }

    // Verify proposal belongs to job
    if (proposeJob.jobId.toString() !== jobId.toString()) {
      return NextResponse.json(
        {
          status: "failed",
          message: "This proposal does not belong to the specified job.",
        },
        { status: 400 }
      );
    }

    // Get current status
    const currentStatus = proposeJob.status;

    let updateOperations = [];
    let jobUpdateData = { updatedAt: new Date() };

    // Handle acceptance
    if (status === 'accepted') {
      // Check if job is full
      if (job.totalHired >= job.totalHiring) {
        return NextResponse.json(
          {
            status: "failed",
            message: `Job is full (${job.totalHired}/${job.totalHiring}). Cannot accept more proposals.`,
          },
          { status: 400 }
        );
      }

      // Only increment if not already accepted
      if (currentStatus !== 'accepted') {
        jobUpdateData.$inc = { totalHired: 1 };
        
        // If job becomes full, reject remaining applied proposals
        if (job.totalHired + 1 >= job.totalHiring) {
          updateOperations.push(
            ProposeJob.updateMany(
              {
                jobId,
                _id: { $ne: jobProposeId },
                status: 'applied'
              },
              { 
                status: 'rejected',
                updatedAt: new Date()
              }
            )
          );
        }
      }
    }
    
    // Handle rejection of previously accepted proposal
    if (status === 'rejected' && currentStatus === 'accepted') {
      jobUpdateData.$inc = { totalHired: -1 };
    }

    // Update proposal status
    proposeJob.status = status;
    proposeJob.updatedAt = new Date();
    updateOperations.push(proposeJob.save());

    // Update job if needed
    if (Object.keys(jobUpdateData).length > 1) { // More than just updatedAt
      updateOperations.push(
        Job.findByIdAndUpdate(
          jobId,
          jobUpdateData,
          { new: true }
        )
      );
    }

    // Execute all updates
    await Promise.all(updateOperations);

    // Fetch updated job data
    const updatedJob = await Job.findById(jobId);
    const updatedProposal = await ProposeJob.findById(jobProposeId);

    // Prepare response
    let message = `Proposal ${status} successfully.`;
    if (status === 'accepted') {
      const newTotalHired = (job.totalHired || 0) + (currentStatus !== 'accepted' ? 1 : 0);
      message = `Proposal accepted! ${newTotalHired}/${job.totalHiring} positions filled.`;
      if (newTotalHired >= job.totalHiring) {
        message += " Job is now full.";
      }
    }

    return NextResponse.json(
      {
        status: "success",
        message,
        data: {
          job: updatedJob,
          proposeJob: updatedProposal
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating job proposal:", error);
    
    return NextResponse.json(
      {
        status: "failed",
        message: "An error occurred while updating the job proposal.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
