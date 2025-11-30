import mongoose from "mongoose";

const proposeJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
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
  },
  { timestamps: true }
);

const ProposeJob =
  mongoose.models.proposeJobs ||
  mongoose.model("proposeJobs", proposeJobSchema);

export default ProposeJob;
