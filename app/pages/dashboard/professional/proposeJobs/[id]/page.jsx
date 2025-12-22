"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useGetSinglePropose from "@/app/hooks/jobs/GetSinglePropose";
import {
  Calendar,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Briefcase,
  User,
  Mail,
  Phone,
  ExternalLink,
  Award,
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock as ClockIcon
} from "lucide-react";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}) : "-");

const SingleProposePage = () => {
  const params = useParams();
  const { id } = params || {};
  const router = useRouter();
  const proposeId = id;
  const { proposal, loading, error } = useGetSinglePropose(proposeId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <p className="text-lg text-slate-700">Loading proposal details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Proposal</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Proposal Not Found</h3>
          <p className="text-slate-600 mb-6">The proposal you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const job = proposal.jobId || {};
  const prof = proposal.professionalId || {};
  
  // Status badge styling
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return "bg-green-100 text-green-800 border-green-200";
      case 'rejected':
        return "bg-red-100 text-red-800 border-red-200";
      case 'pending':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-3 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Applications</span>
              </button>
              <h1 className="text-3xl font-bold text-slate-900">{job.title || "Job Details"}</h1>
              <p className="text-slate-600 mt-2">
                Application review for {job.companyName || job.company || "the company"}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Proposal Status Badge */}
              <div className={`px-4 py-2 border rounded-full font-semibold ${getStatusStyles(proposal.status)}`}>
                {proposal.status?.toUpperCase() || "PENDING"}
              </div>
              
              <Link
                href={`/pages/browse/jobs/${job._id}`}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer"
              >
                View Job Posting
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Job Details</h2>
                  <p className="text-slate-600">Complete job information and requirements</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Company</div>
                      <div className="font-semibold text-slate-900">{job.companyName || job.company || "-"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Location</div>
                      <div className="font-semibold text-slate-900">{job.companyLocation || job.location || "-"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Deadline</div>
                      <div className="font-semibold text-slate-900">
                        {job.deadline ? fmtDate(job.deadline) : "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Salary</div>
                      <div className="font-semibold text-slate-900">
                        {job.salary ? `${job.salary} ${job.salaryType || ""}`.trim() : "-"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Job Type</div>
                      <div className="font-semibold text-slate-900">{job.jobType || job.workType || "-"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Work Time</div>
                      <div className="font-semibold text-slate-900">{job.workDays || job.workTime || "-"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {typeof skill === "string" ? skill : skill.name || skill.skillName || JSON.stringify(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Description */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3">Job Description</h3>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {job.description || "No description available"}
                  </p>
                </div>
              </div>

              {/* Job Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{job.applicationCount || 0}</div>
                    <div className="text-sm text-slate-500">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{job.totalHiring || 1}</div>
                    <div className="text-sm text-slate-500">Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {job.totalHired || 0}/{job.totalHiring || 1}
                    </div>
                    <div className="text-sm text-slate-500">Hired</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{job.applicationLimit || "∞"}</div>
                    <div className="text-sm text-slate-500">Limit</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Proposal Details</h2>
                  <p className="text-slate-600">Submitted by the professional</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3">Cover Letter</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {proposal.coverLetter || "No cover letter provided"}
                  </p>
                </div>
              </div>

              {/* Resume */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 mb-3">Resume / CV</h3>
                {proposal.resume ? (
                  proposal.resume.startsWith("http") ? (
                    <a
                      href={proposal.resume}
                      target="_blank"
                      className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 rounded-xl group transition-colors"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 group-hover:text-blue-700">View Resume</div>
                        <div className="text-sm text-slate-500 truncate">{proposal.resume}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </a>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-slate-700">{proposal.resume}</p>
                    </div>
                  )
                ) : (
                  <div className="bg-slate-50 rounded-xl p-4 text-center text-slate-500">
                    No resume provided
                  </div>
                )}
              </div>

              {/* Submitted Links */}
              {proposal.links && proposal.links.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Additional Links</h3>
                  <div className="space-y-2">
                    {proposal.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.linkURL || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl group transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 group-hover:text-blue-700">
                            {link.linkName || "Link"}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{link.linkURL}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Submission Info */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-500">
                    Submitted on: <span className="font-medium text-slate-700">
                      {proposal.createdAt ? new Date(proposal.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : "-"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: <span className="font-medium text-slate-700">
                      {proposal.updatedAt ? new Date(proposal.updatedAt).toLocaleDateString() : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Professional Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={prof.photo || "/defaultProfilePic.jpg"}
                    alt={prof.name || "Professional"}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {proposal.status === 'accepted' && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{prof.name || prof.userName || "-"}</h3>
                <p className="text-slate-600 mt-1">{prof.headline || "Professional"}</p>
                <div className="mt-2">
                  <span className="text-sm text-slate-500">@{prof.userName || "username"}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-400" />
                  Contact Information
                </h4>
                
                {prof.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-500">Email</div>
                      <div className="font-medium text-slate-800 truncate">{prof.email}</div>
                    </div>
                  </div>
                )}

                {prof.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-500">Phone</div>
                      <div className="font-medium text-slate-800">{prof.phone}</div>
                    </div>
                  </div>
                )}

                {prof.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-500">Location</div>
                      <div className="font-medium text-slate-800">{prof.location}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Stats */}
              <div className="mb-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-slate-400" />
                  Professional Stats
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {prof.job?.jobPosted || 0}
                    </div>
                    <div className="text-xs text-slate-500">Jobs Posted</div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {prof.job?.jobCompleted || 0}
                    </div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                </div>
                
                {prof.chargeParHour && (
                  <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 text-center">
                    <div className="text-sm text-amber-700 mb-1">Hourly Rate</div>
                    <div className="text-2xl font-bold text-amber-800">৳{prof.chargeParHour}/hr</div>
                  </div>
                )}
              </div>

              {/* Current Status */}
              <div className="pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">Current Status</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{prof.currentJobStatus || "Not specified"}</div>
                    <div className="text-sm text-slate-500">Availability</div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProposePage;