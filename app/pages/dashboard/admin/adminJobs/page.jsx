// app/components/Dashboard/Jobs/AdminJobsPage.jsx
"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import {
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiMapPin,
  FiDollarSign,
  FiEye,
  FiEdit,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

import useGetAllJobs from "@/app/hooks/dashboard/admin/jobs/GetAllJobs";

export default function AdminJobs() {
  const [error, setError] = useState(null);

  // Fetch all jobs for admin
  const { allJobs = [], allJobsLoading } = useGetAllJobs();

  // Sort by newest first
  const sortedJobs = useMemo(() => {
    if (!Array.isArray(allJobs)) return [];
    return [...allJobs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allJobs]);

  // Stats
  const stats = useMemo(() => {
    const total = allJobs.length || 0;

    const active = allJobs.filter((job) => job.status === "active").length;
    const assigned = allJobs.filter((job) => job.status === "assigned").length;
    const inRevision = allJobs.filter((job) => job.status === "in revision").length;
    const finished = allJobs.filter((job) => job.status === "finished").length;

    return { total, active, assigned, inRevision, finished };
  }, [allJobs]);

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

  const getActionButtons = (job) => {
    return (
      <Link
        href={`/pages/dashboard/admin/jobs/${job._id}`}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        <FiEye className="text-sm" />
        View Details
      </Link>
    );
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1">{job.company}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="text-gray-400" />
            <span className="text-sm">{job.companyLocation || job.location}</span>
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

        {job.skills?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
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

        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          {getActionButtons(job)}
        </div>
      </div>
    </div>
  );

  if (allJobsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading all jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiAlertCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to load jobs
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Jobs (Admin)</h1>
        <p className="text-gray-600 mt-2">Manage all jobs across the platform</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Jobs</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">{stats.assigned}</div>
            <div className="text-gray-600 text-sm">Assigned</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <div className="text-2xl font-bold text-yellow-600">{stats.inRevision}</div>
            <div className="text-gray-600 text-sm">In Revision</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{stats.finished}</div>
            <div className="text-gray-600 text-sm">Finished</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sortedJobs.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">There are currently no jobs posted.</p>
          </div>
        ) : (
          sortedJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}
