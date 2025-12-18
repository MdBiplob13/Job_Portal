import mongoose from "mongoose";

const proposeBidSchema = new mongoose.Schema(
  {
    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
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

    coverLetter: {
      type: String,
      default: "",
    },

    budget: {
      type: String,
      default: "",
    },

    budgetType: {
      type: String,
      default: "",
    },

    deadline: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "withdrawn"],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProposeBid =
  mongoose.models.proposeBids ||
  mongoose.model("proposeBids", proposeBidSchema);

export default ProposeBid;
