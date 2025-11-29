"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { Filter, DollarSign, Users } from "lucide-react";
import { BsBag } from "react-icons/bs";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import useGetAllJobs from "@/app/hooks/dashboard/admin/jobs/GetAllJobs";

const REGIONS = [
  "Antigua and Barbuda",
  "Cameroon",
  "Bahamas",
  "Barbados",
  "Belize",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Guyana",
  "Haiti",
  "Jamaica",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
];
const LANGUAGES = ["Any", "English", "Bangla"];
const JOB_TYPES = ["full-time", "part-time", "remote", "contract"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const POST_TIME = ["Any", "Last 24h", "Last 7 days", "Last 30 days"];

export default function SearchAJob() {
  const { allJobs, allJobsLoading } = useGetAllJobs();

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
    searchQuery: "",
    searchType: "Individual",
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
    if (!allJobs) return [];
    return allJobs.filter((job) => {
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inSkills = job.skills?.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.companyName.toLowerCase().includes(q)
        )
          return false;
      }

      if (filters.region !== "All" && job.companyLocation !== filters.region)
        return false;

      if (
        filters.language !== "Any" &&
        !job.languages?.includes(filters.language)
      )
        return false;

      if (filters.jobTypes.size > 0 && !filters.jobTypes.has(job.jobType))
        return false;

      if (filters.salaryType !== "any" && job.salaryType !== filters.salaryType)
        return false;

      if (filters.minSalary && job.salary < Number(filters.minSalary))
        return false;

      if (filters.maxSalary && job.salary > Number(filters.maxSalary))
        return false;

      if (filters.workDay !== "Any" && job.workDays !== filters.workDay)
        return false;

      if (filters.postTime !== "Any") {
        const ageMs = Date.now() - new Date(job.createdAt).getTime();
        if (filters.postTime === "Last 24h" && ageMs > 24 * 60 * 60 * 1000)
          return false;
        if (
          filters.postTime === "Last 7 days" &&
          ageMs > 7 * 24 * 60 * 60 * 1000
        )
          return false;
        if (
          filters.postTime === "Last 30 days" &&
          ageMs > 30 * 24 * 60 * 60 * 1000
        )
          return false;
      }

      return true;
    });
  }, [allJobs, filters]);

  const JobCard = ({ job }) => (
    <Link href={`/pages/browse/jobs/${job._id}`} className="block">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
            <p className="text-slate-600 text-sm mb-2">
              {job.description?.slice(0, 60)}...
            </p>
            <p className="text-slate-500 text-sm">
              {job.companyName} • {job.companyLocation}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <h1>Salary:</h1>
            <span className="font-semibold text-slate-800">
              {job.salaryType === "hourly"
                ? `$${job.salary}/hr`
                : job.salaryType === "monthly"
                ? `$${job.salary}/mo`
                : `$${job.salary}/yr`}
            </span>
          </div>

          <div
            className={
              job.applicationLimitEnabled
                ? "flex items-center gap-2 text-slate-600"
                : "hidden"
            }
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {job.applicationCount}/{job.applicationLimit} applications
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <BsBag className="w-4 h-4" />
            <h1>{job.workType}</h1>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <h1>Deadline:</h1>
            <h1>{new Date(job.deadline).toLocaleDateString()}</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 bg-blue-100 text-secondary rounded-full"
            >
              {skill}
            </span>
          ))}

          {job.skills?.length > 3 && (
            <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          <span className="capitalize">{job.jobType}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-[#dfdbdb]">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 mb-16 ">
        {/* HERO SECTION */}
        <section className="text-center py-16 px-6 rounded-b-3xl shadow-inner">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            Find Your Dream Job
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Explore thousands of job And tender opportunities that match your
            skills and career goals. Filter, search, and apply seamlessly.
          </p>
        </section>

        <div className="px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* FILTERS SIDEBAR */}
            <aside className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 h-fit">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="text-primary" />
                <h2 className="text-lg font-semibold text-slate-800">
                  Filter Jobs
                </h2>
              </div>

              <div className="space-y-5">
                {/* Skill */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill
                  </label>
                  <input
                    value={filters.skill}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, skill: e.target.value }))
                    }
                    type="text"
                    placeholder="e.g. React, Node"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Search Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search Type
                  </label>
                  <select
                    value={filters.searchType}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, searchType: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Tenders">Tenders</option>
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Region
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, region: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {REGIONS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, language: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Job Types */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => toggleJobType(t)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${
                          filters.jobTypes.has(t)
                            ? "bg-primary text-white border-primary"
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
                  <label className="block text-sm font-medium mb-2">
                    Salary
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={filters.minSalary}
                      onChange={(e) =>
                        setFilters((p) => ({ ...p, minSalary: e.target.value }))
                      }
                      type="number"
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                    />
                    <input
                      value={filters.maxSalary}
                      onChange={(e) =>
                        setFilters((p) => ({ ...p, maxSalary: e.target.value }))
                      }
                      type="number"
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                    />
                  </div>
                  <select
                    value={filters.salaryType}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, salaryType: e.target.value }))
                    }
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
                  <label className="block text-sm font-medium mb-2">
                    Work Days
                  </label>
                  <select
                    value={filters.workDay}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, workDay: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {WORK_DAYS.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </div>

                {/* Post Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Post Time
                  </label>
                  <select
                    value={filters.postTime}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, postTime: e.target.value }))
                    }
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
                  className="w-full py-2 bg-linear-to-r from-blue-500 to-primary text-white rounded-xl font-medium shadow hover:from-primary hover:to-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* JOB LISTINGS */}
            <section className="md:col-span-3 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Search Results
                </h2>
                <span className="text-sm text-slate-500">
                  {filteredJobs.length} jobs
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
                  No jobs match your filters.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
