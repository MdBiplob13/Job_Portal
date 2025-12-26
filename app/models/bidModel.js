import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: Array,
      default: [],
    },

    responsibilities: {
      type: Array,
      default: [],
    },
    jobType: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "remote",
    },
    skills: {
      type: Array,
      default: [],
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLocation: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    BudgetType: {
      type: String,
      enum: ["fixed", "hourly", "weekly", "monthly", "project-based"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    ProjectDuration: {
      type: String,
      trim: true,
      default: "",
    },
    applicationLimitEnabled: {
      type: Boolean,
      default: false,
    },

    applicationLimit: {
      type: Number,
      default: 0,
    },

    applicationCount: {
      type: Number,
      default: 0,
    },

    workTime: {
      type: String,
      trim: true,
    },

    deadline: {
      type: Date,
      required: true,
    },
    employerEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in progress",
        "submitted",
        "waiting for payment",
        "completed",
        "cancelled",
        "in review",
      ],
      default: "pending",
    },
    bidder: {
      type: Object,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);
export default Bid;
