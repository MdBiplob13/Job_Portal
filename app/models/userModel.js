import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  banner: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default: null,
  },
  headline: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  review: {
    rating: {
      type: Number, // average rating like 4.8
      default: 0,
    },
    totalRatings: {
      type: Number, // how many people rated
      default: 0,
    },
  },
  job: {
    jobPosted: {
      type: Number,
      default: 0,
    },
    jobCompleted: {
      type: Number,
      default: 0,
    },
    ongoingProjects: {
      type: Number,
      default: 0,
    },
    jobSuccessRate: {
      type: Number,
      default: 0,
    },
  },
  location: {
    type: String,
    default: null,
  },
  chargeParHour: {
    type: Number,
    default: 0,
  },
  Languages: {
    type: Array,
    default: [],
  },
  currentJobStatus: {
    type: String,
    default: "Open to work",
    enum: ["Open to work", "Working", "Not available"],
  },
  currentPosition: {
    type: Object,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  language: {
    type: Array,
    default: [],
  },
  email: {
    type: String,
    default: null,
  },
  social: {
    facebook: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    portfolio: {
      type: String,
      default: null,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "professional",
    enum: ["professional", "employer", "admin"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "on leave", "blocked"],
  },
  verification: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },

  paymentMethods: {
    type: [String],
    default: [],
    enum: ["credit card", "paypal", "stripe", "bank transfer"],
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
