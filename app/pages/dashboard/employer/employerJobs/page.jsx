// app/components/Dashboard/Jobs/JobsPage.jsx
"use client";
import Link from "next/link";
import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiX,
  FiCheck,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiDollarSign,
  FiEye,
  FiEdit,
  FiMessageCircle,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import useUser from "@/app/hooks/user/userHook";
import useGetEmployerAllJobs from "@/app/hooks/dashboard/employer/jobs/GetEmployerAllJobs";

export default function EmployerJobs() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    jobType: "all",
  });

  const {jobs, jobsLoading, setJobsLoading} = useGetEmployerAllJobs();
  console.log("🚀 ~ EmployerJobs ~ jobs:", jobs)

  // Filter options based on real data
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "closed", label: "Closed" },
    { value: "draft", label: "Draft" },
  ];

  const jobTypeOptions = [
    { value: "all", label: "All Types" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ];

  const workTypeOptions = [
    { value: "all", label: "All Work Types" },
    { value: "On-site", label: "On-site" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  // Extract unique categories from jobs
  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(jobs.map((job) => job.category).filter(Boolean)),
    ];
    return [
      { value: "all", label: "All Categories" },
      ...categories.map((cat) => ({ value: cat, label: cat })),
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((job) => job.status === filters.status);
    }

    // Job type filter
    if (filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    // Work type filter
    if (filters.workType !== "all") {
      filtered = filtered.filter((job) => job.workType === filters.workType);
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((job) => job.category === filters.category);
    }

    return filtered;
  }, [jobs, searchQuery, filters]);

  // Calculate stats from real data
  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((job) => job.status === "active").length;
    const closed = jobs.filter((job) => job.status === "closed").length;
    const draft = jobs.filter((job) => job.status === "draft").length;

    return { total, active, closed, draft };
  }, [jobs]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      category: "all",
      jobType: "all",
      workType: "all",
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Helper functions for job cards
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "closed":
        return "Closed";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getActionButtons = (job) => {
    switch (job.status) {
      case "active":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiEdit className="text-sm" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
              <FiEye className="text-sm" />
              View Bids ({job.applicationCount || 0})
            </button>
          </>
        );
      case "draft":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiEdit className="text-sm" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <FiCheckCircle className="text-sm" />
              Publish
            </button>
          </>
        );
      case "closed":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors w-full justify-center">
            <FiEye className="text-sm" />
            View Details
          </button>
        );
      default:
        return null;
    }
  };

  // Job Card Component (inline)
  const JobCard = ({ job }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                job.status
              )}`}
            >
              {getStatusLabel(job.status)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="text-gray-400" />
            <span className="text-sm">{job.companyLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiDollarSign className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-800">
              ${job.salary} {job.salaryType}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiClock className="text-gray-400" />
            <span className="text-sm">{formatDate(job.postDeadline)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiCheckCircle className="text-gray-400" />
            <span className="text-sm">{job.jobType}</span>
          </div>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {job.applicationCount || 0} applications
            </span>
            <span className="text-gray-400">{getTimeAgo(job.createdAt)}</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {job.workType}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          {getActionButtons(job)}
        </div>
      </div>
    </div>
  );

  // Filter Drawer Component (inline)
  const FilterDrawer = () => (
    <>
      {/* Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-140px)]">
          {/* Status Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Job Status
            </h3>
            <div className="space-y-3">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={filters.status === option.value}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      filters.status === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-500"
                    }`}
                  >
                    {filters.status === option.value && (
                      <FiCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Job Type
            </h3>
            <div className="space-y-3">
              {jobTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={option.value}
                    checked={filters.jobType === option.value}
                    onChange={(e) =>
                      handleFilterChange("jobType", e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      filters.jobType === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-500"
                    }`}
                  >
                    {filters.jobType === option.value && (
                      <FiCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Type Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Work Type
            </h3>
            <div className="space-y-3">
              {workTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="workType"
                    value={option.value}
                    checked={filters.workType === option.value}
                    onChange={(e) =>
                      handleFilterChange("workType", e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      filters.workType === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-500"
                    }`}
                  >
                    {filters.workType === option.value && (
                      <FiCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button
              onClick={handleClearFilters}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // Loading State
  if (jobsLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiAlertCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Jobs
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchJobs}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Posted Jobs</h1>
            <p className="text-gray-600 mt-2">
              Manage and track all your job postings in one place
            </p>
          </div>
          <Link
            href={"/pages/dashboard/employer/post/jobs"}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2 w-fit cursor-pointer"
          >
            <FiPlus className="text-lg" />
            Post New Job
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">
              {stats.total}
            </div>
            <div className="text-gray-600 text-sm">Total Jobs</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">
              {stats.closed}
            </div>
            <div className="text-gray-600 text-sm">Closed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.draft}
            </div>
            <div className="text-gray-600 text-sm">Draft</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2"
            >
              <FiFilter className="text-lg" />
              Filters
            </button>
          </div>

          {/* Active Filters */}
          {(filters.status !== "all" ||
            filters.jobType !== "all" ||
            filters.workType !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status !== "all" && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Status: {getStatusLabel(filters.status)}
                </span>
              )}
              {filters.jobType !== "all" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Type: {filters.jobType}
                </span>
              )}
              {filters.workType !== "all" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Work: {filters.workType}
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {jobs.length === 0 ? "No jobs posted yet" : "No jobs found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {jobs.length === 0
                ? "Start by posting your first job opportunity"
                : "Try adjusting your search criteria or filters"}
            </p>
            {jobs.length === 0 && (
              <Link
                href={"/pages/dashboard/employer/post/jobs"}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-block"
              >
                Post Your First Job
              </Link>
            )}
            {jobs.length > 0 && (
              <button
                onClick={handleClearFilters}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>

      {/* Load More - You can implement pagination later */}
      {filteredJobs.length > 0 && filteredJobs.length >= 10 && (
        <div className="mt-8 text-center">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
            Load More Jobs
          </button>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer />
    </div>
  );
}
