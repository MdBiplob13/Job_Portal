// app/(or appropriate path)/SearchAJob.jsx
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
  // local filter state (UI)
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

  // pagination state is managed by hook
  const [pageSize, setPageSize] = useState(10);

  const {
    allJobs,
    allJobsLoading,
    page,
    setPage,
    pageSize: hookPageSize,
    setPageSize: hookSetPageSize,
    totalPages,
    totalCount,
    setAllJobsRefresh,
    error,
  } = useGetAllJobs(filters, 1, pageSize);

  // keep local pageSize in sync with hook (if user changes via select)
  React.useEffect(() => {
    if (hookPageSize !== pageSize) {
      setPageSize(hookPageSize);
    }
  }, [hookPageSize]);

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

  // keep exactly the same JobCard UI
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

  // pagination helpers
  const goPrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const goNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const jumpTo = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

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
                        className={`px-3 py-1 rounded-full text-sm border transition cursor-pointer ${
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
                  className="w-full py-2 bg-linear-to-r from-blue-500 to-primary text-white rounded-xl font-medium shadow hover:from-primary hover:to-blue-700 transition cursor-pointer"
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
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">
                    {totalCount} jobs
                  </span>

                  <select
                    value={pageSize}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setPageSize(v);
                      hookSetPageSize(v);
                    }}
                    className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm cursor-pointer"
                  >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {allJobsLoading && (
                  <div className="text-center py-8">Loading jobs...</div>
                )}

                {!allJobsLoading &&
                  allJobs.map((job) => <JobCard key={job._id} job={job} />)}
              </div>

              {allJobs.length === 0 && !allJobsLoading && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
                  No jobs match your filters.
                </div>
              )}

              {/* PAGINATION */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={goPrev}
                  disabled={page <= 1}
                  className={`px-3 py-2 rounded-lg border ${
                    page <= 1
                      ? "text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-slate-100"
                  }`}
                >
                  Prev
                </button>

                {/* show pages (compact) */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const p = idx + 1;
                    // show only around current page
                    if (
                      totalPages > 9 &&
                      Math.abs(p - page) > 3 &&
                      p !== 1 &&
                      p !== totalPages
                    ) {
                      // place dots if necessary
                      if (p === 2 && page > 5) {
                        return <span key={p}>...</span>;
                      }
                      if (p === totalPages - 1 && page < totalPages - 4) {
                        return <span key={p}>...</span>;
                      }
                      if (p < page - 3 || p > page + 3) return null;
                    }

                    return (
                      <button
                        key={p}
                        onClick={() => jumpTo(p)}
                        className={`px-3 py-1 rounded-md border ${
                          p === page
                            ? "bg-primary text-white cursor-pointer"
                            : "bg-white cursor-pointer hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={goNext}
                  disabled={page >= totalPages}
                  className={`px-3 py-2 rounded-lg border ${
                    page >= totalPages
                      ? "text-slate-400 border-slate-200 bg-slate-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-slate-100"
                  }`}
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
