import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // 1. Job Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 2. Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // 3. Requirements
    requirements: {
      type: Array,
      default: [],
    },

    // 4. Responsibilities
    responsibilities: {
      type: Array,
      default: [],
    },

    // 5. Skills
    skills: {
      type: Array,
      default: [],
    },

    // 6. Job Type
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship"],
    },

    // 7. Work Days
    workDays: {
      type: String,
      required: true,
      enum: ["Mon-Fri", "Mon-Sat", "Flexible", "Any"],
      default: "Mon-Fri",
    },

    // 8. Work Type
    workType: {
      type: String,
      required: true,
      enum: ["On-site", "Remote", "Hybrid"],
    },

    // 9. Languages
    languages: {
      type: Array,
      default: [],
    },

    // 10. Company Name
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    // 11. Company Location
    companyLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // 12. Salary
    salary: {
      type: Number,
      required: true,
    },

    // 13. Salary Type
    salaryType: {
      type: String,
      required: true,
      enum: ["Monthly", "Hourly", "Fixed"],
    },

    // 14. Total Hiring
    totalHiring: {
      type: Number,
      required: true,
      default: 1,
    },

    // 14.5 Total Hired
    totalHired: {
      type: Number,
      required: true,
      default: 1,
    },

    // 15. Application Limit
    applicationLimitEnabled: {
      type: Boolean,
      default: false,
    },

    applicationLimit: {
      type: Number,
      default: 0,
    },

    // 16. Total Applicants
    applicationCount: {
      type: Number,
      default: 0,
    },

    // 17. Work Time
    workTime: {
      type: String,
      trim: true,
    },

    // 18. Deadline
    deadline: {
      type: Date,
      required: true,
    },

    // 19. Benefits
    benefits: {
      type: Array,
      default: [],
    },

    // Internal + System Fields
    employerEmail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "finished"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
