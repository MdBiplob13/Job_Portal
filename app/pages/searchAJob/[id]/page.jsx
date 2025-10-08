"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { ChevronLeft } from "lucide-react";

export default function JobDetailsPage() {
  // Static job data (you can replace with props or API later)
  const job = {
    title: "Frontend Engineer",
    company: "Pixel Web Makers",
    location: "Dhaka, Bangladesh",
    salary: 120000,
    salaryType: "monthly",
    workTime: "9:00 - 17:00",
    workDays: "Mon-Fri",
    skills: ["React", "Tailwind", "Next.js"],
    language: ["English", "Bangla"],
    jobType: "full-time",
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 24,
    totalHiring: 2,
    posterName: "A. Rahman",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description:
      "We are looking for a passionate Frontend Engineer who loves building UIs with React and Next.js. The ideal candidate is highly motivated, detail-oriented, and enjoys working in a collaborative environment. Responsibilities include building responsive web applications, optimizing performance, and working closely with designers and backend engineers to deliver high-quality solutions.",
  };

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
      <Navbar />

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <ChevronLeft size={20} /> Back to Jobs
        </button>
      </div>

      {/* JOB DETAILS MAIN */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left / Main Content */}
        <section className="md:col-span-2 space-y-6">
          {/* Job Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              {job.title}
            </h1>
            <p className="text-slate-500 mt-1">
              {job.company} • {job.location}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.concat(job.language).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700">
              <div>
                <span className="block text-sm font-medium text-slate-500">Salary</span>
                <span className="font-semibold text-slate-800">
                  {job.salaryType === "hourly"
                    ? `$${job.salary}/hr`
                    : job.salaryType === "monthly"
                    ? `৳${job.salary}/mo`
                    : `৳${job.salary}`}
                </span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500">Job Type</span>
                <span className="font-semibold text-slate-800 capitalize">{job.jobType}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500">Work Time</span>
                <span className="font-semibold text-slate-800">{job.workTime}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-500">Work Days</span>
                <span className="font-semibold text-slate-800">{job.workDays}</span>
              </div>
            </div>

            <div className="mt-6 text-slate-700 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Job Description</h2>
              <p>{job.description}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-700">
              <div>
                <span className="block text-sm text-slate-500">Applications</span>
                <span className="font-medium text-slate-800">{job.totalApplications}</span>
              </div>
              <div>
                <span className="block text-sm text-slate-500">Hiring</span>
                <span className="font-medium text-slate-800">{job.totalHiring}</span>
              </div>
              <div>
                <span className="block text-sm text-slate-500">Deadline</span>
                <span className="font-medium text-slate-800">{timeLeft(job.applyDeadline)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
                Apply Now
              </button>
              <button className="w-full md:w-auto px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition">
                Save Job
              </button>
            </div>
          </div>
        </section>

        {/* Right / Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Posted By</h3>
            <div className="flex items-center gap-4">
              <img
                src={job.posterAvatar}
                alt={job.posterName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-slate-800">{job.posterName}</p>
                <p className="text-sm text-slate-500">{job.company}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm space-y-2">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Info</h3>
            <div className="text-slate-700 space-y-2 text-sm">
              <p>
                <span className="font-medium">Location: </span>{job.location}
              </p>
              <p>
                <span className="font-medium">Salary: </span>
                {job.salaryType === "hourly"
                  ? `$${job.salary}/hr`
                  : job.salaryType === "monthly"
                  ? `৳${job.salary}/mo`
                  : `৳${job.salary}`}
              </p>
              <p>
                <span className="font-medium">Job Type: </span>{job.jobType}
              </p>
              <p>
                <span className="font-medium">Work Time: </span>{job.workTime}
              </p>
              <p>
                <span className="font-medium">Work Days: </span>{job.workDays}
              </p>
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
