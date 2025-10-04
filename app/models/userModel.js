import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reviews",
    default: null,
  },
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "experiences",
    default: null,
  },
  qualifications: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "qualifications",
    default: null,
  },
  certifications: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "certifications",
    default: null,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxLength: [50, "name is too long"],
  },
  userName: {
    type: String,
    default: null,
    trim: true,
    unique: true,
    maxLength: [50, "user name is too long"],
    required: [true, "Please enter your user name"],
  },
  password: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["user", "client", , "admin"],
    default: "user",
  },
  photo: {
    type: Object,
    default: null,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },
  verification: {
    type: Number,
    default: 0,
  },
  aboutMe: {
    type: Object,
    default: null,
  },
  address: {
    type: Object,
    default: null,
  },
  socialLinks: {
    type: Object,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
