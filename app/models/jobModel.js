import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"]
  },
  workType: {
    type: String,
    required: true,
    enum: ["On-site", "Remote", "Hybrid"]
  },
  salary: {
    type: Number,
    required: true
  },
  salaryType: {
    type: String,
    required: true,
    enum: ["Monthly", "Hourly", "Fixed"]
  },
  totalHiring: {
    type: Number,
    required: true,
    default: 1
  },
  applicationLimitEnabled: {
    type: Boolean,
    default: false
  },
  applicationLimit: {
    type: Number,
    default: 0
  },
  workTime: {
    type: String,
    default: ""
  },
  workDays: {
    type: String,
    enum: ["Mon-Fri", "Mon-Sat", "Any"],
    default: "Mon-Fri"
  },
  searchType: {
    type: String,
    enum: ["Individual", "Tender"],
    default: "Individual"
  },
  postDeadline: {
    type: Date,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  languages: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    trim: true
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  employerEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "closed", "draft"],
    default: "active"
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application"
  }],
  applicationCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create index for better search performance
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ employer: 1, createdAt: -1 });
jobSchema.index({ status: 1, postDeadline: 1 });

const Job = mongoose.models.jobs || mongoose.model("jobs", jobSchema);

export default Job;