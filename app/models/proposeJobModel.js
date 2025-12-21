import mongoose from "mongoose";

const proposeJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

    links: [
      {
        linkName: {
          type: String,
          trim: true,
          default: "",
        },
        linkURL: {
          type: String,
          default: "",
        },
      },
    ],

    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["applied", "accepted", "rejected"],
      default: "applied",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProposeJob =
  mongoose.models.proposeJobs ||
  mongoose.model("proposeJobs", proposeJobSchema);

export default ProposeJob;
