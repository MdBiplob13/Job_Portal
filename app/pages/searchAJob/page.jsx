"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_JOBS = [
  {
    id: 1,
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
      "We are looking for a passionate Frontend Engineer who loves building UIs with React and Next.js.",
  },
  {
    id: 2,
    title: "Backend Engineer (Node.js)",
    company: "Hirely",
    location: "Remote",
    salary: 40,
    salaryType: "hourly",
    workTime: "Flexible",
    workDays: "Any",
    skills: ["Node.js", "MongoDB", "Express"],
    language: ["English"],
    jobType: "remote",
    postDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 56,
    totalHiring: 1,
    posterName: "S. Karim",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Experienced Node.js dev to build scalable APIs and services.",
  },
  {
    id: 3,
    title: "Junior QA Tester",
    company: "Startup X",
    location: "Chittagong, Bangladesh",
    salary: 20000,
    salaryType: "monthly",
    workTime: "10:00 - 18:00",
    workDays: "Mon-Sat",
    skills: ["Testing", "Attention to detail"],
    language: ["Bangla"],
    jobType: "part-time",
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 8,
    totalHiring: 1,
    posterName: "M. Noor",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Entry-level QA tester for web applications.",
  },
  {
    id: 4,
    title: "Product Designer",
    company: "DesignHub",
    location: "Sylhet, Bangladesh",
    salary: 90000,
    salaryType: "monthly",
    workTime: "9:00 - 18:00",
    workDays: "Mon-Fri",
    skills: ["Figma", "UX", "Prototyping"],
    language: ["English", "Bangla"],
    jobType: "full-time",
    postDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 12,
    totalHiring: 1,
    posterName: "R. Hossain",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Design beautiful and usable products with a small product team.",
  },
];

const REGIONS = ["All", "Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Remote"];
const LANGUAGES = ["Any", "English", "Bangla"];
const JOB_TYPES = ["full-time", "part-time", "remote", "contract"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const POST_TIME = ["Any", "Last 24h", "Last 7 days", "Last 30 days"];

const SearchAJob = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [filters, setFilters] = useState({
    skill: "",
    region: "All",
    language: "Any",
    jobTypes: new Set(),
    minSalary: "",
    maxSalary: "",
    salaryType: "any",
    workDay: "Any",
    postTime: "Any",
  });

  const toggleJobType = (type) => {
    setFilters((prev) => {
      const copy = { ...prev };
      const set = new Set(copy.jobTypes);
      if (set.has(type)) set.delete(type);
      else set.add(type);
      copy.jobTypes = set;
      return copy;
    });
  };

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      // skill match
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }

      // region
      if (filters.region !== "All" && job.location !== filters.region) return false;

      // language
      if (filters.language !== "Any" && !job.language.includes(filters.language)) return false;

      // jobTypes
      if (filters.jobTypes.size > 0 && !filters.jobTypes.has(job.jobType)) return false;

      // salary type
      if (filters.salaryType !== "any" && job.salaryType !== filters.salaryType) return false;

      // salary range
      if (filters.minSalary) {
        const min = Number(filters.minSalary);
        if (Number.isFinite(min) && job.salary < min) return false;
      }
      if (filters.maxSalary) {
        const max = Number(filters.maxSalary);
        if (Number.isFinite(max) && job.salary > max) return false;
      }

      // workDay
      if (filters.workDay !== "Any" && job.workDays !== filters.workDay) return false;

      // postTime
      if (filters.postTime !== "Any") {
        const ageMs = Date.now() - new Date(job.postDate).getTime();
        if (filters.postTime === "Last 24h" && ageMs > 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 7 days" && ageMs > 7 * 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 30 days" && ageMs > 30 * 24 * 60 * 60 * 1000) return false;
      }

      return true;
    });
  }, [filters]);

  function timeLeft(deadline) {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
            Find Your Dream Job
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Browse through thousands of jobs and filter them based on your
            preferences. Apply now and take the next step in your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* FILTERS SIDEBAR */}
          <aside className="bg-white p-5 rounded-2xl shadow sticky top-20 h-fit">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Filter Jobs
            </h2>
            
            <div className="space-y-4">
              {/* Skill Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Skill</label>
                <input
                  value={filters.skill}
                  onChange={(e) => setFilters((p) => ({ ...p, skill: e.target.value }))}
                  type="text"
                  placeholder="e.g. React, Node"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters((p) => ({ ...p, region: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters((p) => ({ ...p, language: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleJobType(t)}
                      className={`px-3 py-1 rounded-full border text-sm cursor-pointer ${
                        filters.jobTypes.has(t) 
                          ? "bg-blue-600 text-white border-blue-600" 
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium mb-2">Salary</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={filters.minSalary}
                    onChange={(e) => setFilters((p) => ({ ...p, minSalary: e.target.value }))}
                    type="number"
                    placeholder="Min"
                    className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg "
                  />
                  <input
                    value={filters.maxSalary}
                    onChange={(e) => setFilters((p) => ({ ...p, maxSalary: e.target.value }))}
                    type="number"
                    placeholder="Max"
                    className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg cursor-pointer"
                  />
                </div>
                <select
                  value={filters.salaryType}
                  onChange={(e) => setFilters((p) => ({ ...p, salaryType: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="any">Any</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>

              {/* Work Days */}
              <div>
                <label className="block text-sm font-medium mb-2">Work days</label>
                <select
                  value={filters.workDay}
                  onChange={(e) => setFilters((p) => ({ ...p, workDay: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {WORK_DAYS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Post Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Post time</label>
                <select
                  value={filters.postTime}
                  onChange={(e) => setFilters((p) => ({ ...p, postTime: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {POST_TIME.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => setFilters({ 
                  skill: "", 
                  region: "All", 
                  language: "Any", 
                  jobTypes: new Set(), 
                  minSalary: "", 
                  maxSalary: "", 
                  salaryType: "any", 
                  workDay: "Any", 
                  postTime: "Any" 
                })}
                className="w-full bg-gray-200 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* JOB LISTINGS */}
          <section className="md:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search results</h2>
              <div className="text-sm text-slate-500">{filteredJobs.length} jobs</div>
            </div>

            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
              >
                {/* Job Title & Poster */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {job.title}
                    </h3>
                    <p className="text-slate-600">{job.company} • {job.location}</p>
                  </div>
                  <img
                    src={job.posterAvatar}
                    alt="poster"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>

                {/* Salary and Job Type */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {job.salaryType === "hourly" ? `$${job.salary}/hr` : 
                     job.salaryType === "monthly" ? `৳${job.salary}/mo` : 
                     `৳${job.salary}`}
                  </div>
                  <div className="text-sm text-slate-500 capitalize">{job.jobType}</div>
                </div>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span key={s} className="text-xs px-3 py-1 bg-slate-100 rounded-full">{s}</span>
                  ))}
                  {job.language.map((l) => (
                    <span key={l} className="text-xs px-3 py-1 bg-slate-100 rounded-full">{l}</span>
                  ))}
                </div>

                {/* Expandable Section */}
                {expandedJob === job.id ? (
                  <div className="mt-4 text-slate-700 space-y-3">
                    <p>{job.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-500">
                      <div>Applications: <span className="font-medium text-slate-700">{job.totalApplications}</span></div>
                      <div>Hiring: <span className="font-medium text-slate-700">{job.totalHiring}</span></div>
                      <div>Worktime: <span className="font-medium text-slate-700">{job.workTime}</span></div>
                      <div>Work days: <span className="font-medium text-slate-700">{job.workDays}</span></div>
                      <div>Posted: <span className="font-medium text-slate-700">{new Date(job.postDate).toLocaleDateString()}</span></div>
                      <div>Deadline: <span className="font-medium text-slate-700">{timeLeft(job.applyDeadline)}</span></div>
                    </div>
                  </div>
                ) : null}

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className="flex items-center gap-1 text-blue-600 font-medium hover:underline cursor-pointer"
                  >
                    {expandedJob === job.id ? (
                      <>
                        Hide Details <ChevronUp size={18} />
                      </>
                    ) : (
                      <>
                        View Details <ChevronDown size={18} />
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => alert(`Apply clicked for job ${job.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="bg-white p-6 rounded-xl shadow text-center text-slate-600">
                No jobs match your filters.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SearchAJob;