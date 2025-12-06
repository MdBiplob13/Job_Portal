"use client";

import React, { useMemo, useState, useEffect } from "react";
import useGetProfessionalAllJobPropose from "@/app/hooks/dashboard/professional/jobs/GetProfessionalAllJobPropose";
import useUser from "@/app/hooks/user/userHook";
import Link from "next/link";
import { FaCalendar, FaLink, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaEye } from "react-icons/fa";

const fmtDate = (iso) => {
  if (!iso) return "-";
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function ProfessionalProposeJobs() {
  const { user } = useUser();
  const { professionalProposes = [], loading, refresh, setRefresh } =
    useGetProfessionalAllJobPropose(user?._id || null);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => setMounted(true), []);

  const getStatus = (p) => {
    if (!p) return "pending";
    if (p.status) return p.status.toLowerCase();
    if (p.accepted) return "accepted";
    if (p.rejected) return "rejected";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "accepted": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "accepted": return "✓";
      case "rejected": return "✗";
      default: return "⏳";
    }
  };

  const grouped = useMemo(() => {
    const pending = [];
    const accepted = [];
    const rejected = [];

    (professionalProposes || []).forEach((p) => {
      const s = getStatus(p);
      if (s === "accepted") accepted.push(p);
      else if (s === "rejected") rejected.push(p);
      else pending.push(p);
    });

    return { pending, accepted, rejected };
  }, [professionalProposes]);

  const getList = () => {
    if (activeTab === "pending") return grouped.pending;
    if (activeTab === "accepted") return grouped.accepted;
    return grouped.rejected;
  };

  if (!mounted) return null;
  if (loading) return (
    <div className="p-8 flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Job Proposals</h1>
            <p className="text-gray-600 mt-1">Track and manage all your job applications</p>
          </div>
          <button
            onClick={() => setRefresh((r) => (r || 1) + 1)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 self-start"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "pending", label: "Pending", count: grouped.pending.length },
            { key: "accepted", label: "Accepted", count: grouped.accepted.length },
            { key: "rejected", label: "Rejected", count: grouped.rejected.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab.key
                  ? "bg-white/20"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      {getList().length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} proposals</h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            You don't have any {activeTab.toLowerCase()} job proposals at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getList().map((p) => {
            const job = p.jobId || {};
            const status = getStatus(p);
            
            return (
              <div
                key={p._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          <span>{getStatusIcon(status)}</span>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FaCalendar className="w-3 h-3" />
                          {fmtDate(p.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title || "Untitled Position"}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaBriefcase className="text-gray-400 w-4 h-4" />
                    <span className="font-medium">{job.companyName || "—"}</span>
                    {job.companyLocation && (
                      <>
                        <span className="text-gray-300">•</span>
                        <FaMapMarkerAlt className="text-gray-400 w-3 h-3" />
                        <span className="text-sm">{job.companyLocation}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Job Details */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaMoneyBillWave className="text-blue-600 w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Salary</p>
                        <p className="font-semibold text-gray-900">
                          {job.salary ? `${job.salary} ${job.salaryType || ""}` : "Not specified"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaClock className="text-green-600 w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Work Type</p>
                        <p className="font-semibold text-gray-900">
                          {job.workType || job.jobType || "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Links & Applications */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaLink className="w-4 h-4" />
                        <span className="text-sm font-medium">{p.links?.length || 0}</span>
                      </div>
                      {job.applicationCount !== undefined && (
                        <div className="text-sm text-gray-500">
                          {job.applicationCount} application{job.applicationCount !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/pages/dashboard/professional/proposeJobs/${p._id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors duration-200 cursor-pointer group/link"
                    >
                      <FaEye className="w-4 h-4" />
                      View Details
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}