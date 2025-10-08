"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";

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
    id: 5,
    title: "Junior QA Tester",
    company: "Startup X",
    location: "Chittagong, Bangladesh",
    salary:70000,
    salaryType: "monthly",
    workTime: "10:00 - 18:00",
    workDays: "Mon-Sat",
    skills: ["Testing", "Attention to detail"],
    language: ["Bangla"],
    jobType: "contract",
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 8,
    totalHiring: 1,
    posterName: "M. Noor",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Entry-level QA tester for web applications.",
  },
];

const REGIONS = ["All", "Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Remote"];
const LANGUAGES = ["Any", "English", "Bangla"];
const JOB_TYPES = ["full-time", "part-time", "remote", "contract"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const POST_TIME = ["Any", "Last 24h", "Last 7 days", "Last 30 days"];

export default function SearchAJob() {
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
    searchType: "Individual",
    searchQuery: "",
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
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!job.title.toLowerCase().includes(q) && !job.company.toLowerCase().includes(q))
          return false;
      }
      if (filters.region !== "All" && job.location !== filters.region) return false;
      if (filters.language !== "Any" && !job.language.includes(filters.language)) return false;
      if (filters.jobTypes.size > 0 && !filters.jobTypes.has(job.jobType)) return false;
      if (filters.salaryType !== "any" && job.salaryType !== filters.salaryType) return false;
      if (filters.minSalary && job.salary < Number(filters.minSalary)) return false;
      if (filters.maxSalary && job.salary > Number(filters.maxSalary)) return false;
      if (filters.workDay !== "Any" && job.workDays !== filters.workDay) return false;
      if (filters.postTime !== "Any") {
        const ageMs = Date.now() - new Date(job.postDate).getTime();
        if (filters.postTime === "Last 24h" && ageMs > 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 7 days" && ageMs > 7 * 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 30 days" && ageMs > 30 * 24 * 60 * 60 * 1000) return false;
      }
      return true;
    });
  }, [filters]);

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

      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-blue-100 to-transparent rounded-b-3xl shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">Find Your Dream Job</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Explore thousands of job opportunities that match your skills and career goals. Filter,
          search, and apply seamlessly.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* FILTERS SIDEBAR */}
        <aside className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 h-fit">
          <div className="flex items-center gap-2 mb-5">
            <Filter className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Filter Jobs</h2>
          </div>

          <div className="space-y-5">
            {/* Skill */}
            <div>
              <label className="block text-sm font-medium mb-2">Skill</label>
              <input
                value={filters.skill}
                onChange={(e) => setFilters((p) => ({ ...p, skill: e.target.value }))}
                type="text"
                placeholder="e.g. React, Node"
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Search Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Search Type</label>
              <select
                value={filters.searchType}
                onChange={(e) => setFilters((p) => ({ ...p, searchType: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="Individual">Individual</option>
                <option value="Tenders">Tenders</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium mb-2">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters((p) => ({ ...p, region: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters((p) => ({ ...p, language: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Job Types */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Type</label>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleJobType(t)}
                    className={`px-3 py-1 rounded-full text-sm border transition ${
                      filters.jobTypes.has(t)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
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
                  className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
                <input
                  value={filters.maxSalary}
                  onChange={(e) => setFilters((p) => ({ ...p, maxSalary: e.target.value }))}
                  type="number"
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
              <select
                value={filters.salaryType}
                onChange={(e) => setFilters((p) => ({ ...p, salaryType: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="any">Any</option>
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>

            {/* Work Day */}
            <div>
              <label className="block text-sm font-medium mb-2">Work Days</label>
              <select
                value={filters.workDay}
                onChange={(e) => setFilters((p) => ({ ...p, workDay: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {WORK_DAYS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Post Time */}
            <div>
              <label className="block text-sm font-medium mb-2">Post Time</label>
              <select
                value={filters.postTime}
                onChange={(e) => setFilters((p) => ({ ...p, postTime: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                {POST_TIME.map((pt) => (
                  <option key={pt}>{pt}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={() =>
                setFilters({
                  skill: "",
                  region: "All",
                  language: "Any",
                  jobTypes: new Set(),
                  minSalary: "",
                  maxSalary: "",
                  salaryType: "any",
                  workDay: "Any",
                  postTime: "Any",
                  searchType: "Individual",
                  searchQuery: "",
                })
              }
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow hover:from-blue-600 hover:to-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* JOB LISTINGS */}
        <section className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-slate-800">Search Results</h2>
            <span className="text-sm text-slate-500">{filteredJobs.length} jobs</span>
          </div>

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                  <p className="text-slate-500">{job.company} • {job.location}</p>
                </div>
                <img src={job.posterAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="text-2xl font-semibold text-slate-800">
                  {job.salaryType === "hourly"
                    ? `$${job.salary}/hr`
                    : job.salaryType === "monthly"
                    ? `৳${job.salary}/mo`
                    : `৳${job.salary}`}
                </div>
                <span className="text-sm text-blue-600 capitalize">{job.jobType}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills.concat(job.language).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {expandedJob === job.id && (
                <div className="mt-4 border-t border-slate-200 pt-3 text-slate-700 text-sm space-y-2">
                  <p>{job.description}</p>
                  <div className="grid grid-cols-2 gap-1 text-slate-500">
                    <p>Applications: <span className="font-medium text-slate-800">{job.totalApplications}</span></p>
                    <p>Hiring: <span className="font-medium text-slate-800">{job.totalHiring}</span></p>
                    <p>Worktime: <span className="font-medium text-slate-800">{job.workTime}</span></p>
                    <p>Work days: <span className="font-medium text-slate-800">{job.workDays}</span></p>
                    <p>Posted: <span className="font-medium text-slate-800">{new Date(job.postDate).toLocaleDateString()}</span></p>
                    <p>Deadline: <span className="font-medium text-slate-800">{timeLeft(job.applyDeadline)}</span></p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
              No jobs match your filters.
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
