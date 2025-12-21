// app/components/Dashboard/Jobs/JobsPage.jsx
"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {
  FiPlus,
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

/**
 * EmployerJobs
 * - Shows all jobs for the current employer
 * - Filters/search removed (as requested)
 * - Jobs are shown latest-first (createdAt desc)
 * - Keeps the UI and layout intact
 */

export default function EmployerJobs() {
  const { user } = useUser();

  // Local UI state
  const [error, setError] = useState(null);

  // Custom hook that fetches employer jobs (assumed to exist)
  // expects: { jobs, jobsLoading, setJobsLoading } shape from your hook
  const { jobs = [], jobsLoading } = useGetEmployerAllJobs();

  // Sort jobs latest-first (createdAt desc)
  const sortedJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return [...jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [jobs]);

  // Stats derived from real job array
  // Stats derived from real job array (updated for 4 statuses)
  const stats = useMemo(() => {
    const total = jobs.length || 0;

    const active = jobs.filter((job) => job.status === "active").length;
    const assigned = jobs.filter((job) => job.status === "assigned").length;
    const inRevision = jobs.filter(
      (job) => job.status === "in revision"
    ).length;
    const finished = jobs.filter((job) => job.status === "finished").length;

    return { total, active, assigned, inRevision, finished };
  }, [jobs]);

  // Utility functions (kept from original for consistent UI)
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
        return status || "Unknown";
    }
  };

  

  // Job card component (inline, kept simple)
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
            <span className="text-sm">
              {job.companyLocation || job.location}
            </span>
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
        <Link href={`/pages/browse/jobs/${job._id}`} className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            <FiEye className="text-sm" />
            View Applications ({job.applicationCount || 0})
          </button>
        </Link>
      </div>
    </div>
  );

  // Loading state
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

  // Error state (simple reload)
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
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main UI
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
            <div className="text-2xl font-bold text-blue-600">
              {stats.active}
            </div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {stats.assigned}
            </div>
            <div className="text-gray-600 text-sm">Assigned</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.inRevision}
            </div>
            <div className="text-gray-600 text-sm">In Revision</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {stats.finished}
            </div>
            <div className="text-gray-600 text-sm">Finished</div>
          </div>
        </div>

        {/* Search/Filters removed by request - UI preserved */}
      </div>

      {/* Jobs Grid (latest first) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sortedJobs.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {jobs.length === 0 ? "No jobs posted yet" : "No jobs found"}
            </h3>
            <p className="text-gray-600 mb-6">
              {jobs.length === 0
                ? "Start by posting your first job opportunity"
                : "Try adjusting your backend or refresh the page"}
            </p>
            {jobs.length === 0 && (
              <Link
                href={"/pages/dashboard/employer/post/jobs"}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-block"
              >
                Post Your First Job
              </Link>
            )}
          </div>
        ) : (
          sortedJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>

      {/* Load more removed — show all jobs as requested */}
    </div>
  );
}
