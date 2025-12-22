"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Briefcase,
  Award,
  FileText,
  ExternalLink,
  ArrowLeft,
  Star,
  MessageCircle,
  CheckCircle,
  Globe,
  User,
  Building,
  Target,
} from "lucide-react";
import useGetSingleBidPropose from "@/app/hooks/jobs/bids/GetSIngleBidPropose";

const ShortText = ({ text = "", limit = 240 }) => {
  const [open, setOpen] = useState(false);
  if (!text) return <span className="text-slate-500">Not provided</span>;
  if (text.length <= limit) return <p className="text-slate-700">{text}</p>;
  return (
    <div className="text-slate-700">
      <p>{open ? text : text.substring(0, limit) + "..."}</p>
      <button
        onClick={() => setOpen((s) => !s)}
        className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline font-medium cursor-pointer"
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
};

const SingleProposePage = () => {
  const params = useParams();
  const router = useRouter();
  const { singleBidPropose, loading, error, refreshProposal } = useGetSingleBidPropose(params.id);

  // defensive accessors
  const proposal = singleBidPropose || null;
  const job = proposal?.bidId || null;
  const user = proposal?.professionalId || null;

  // Calculate success rate
  const successRate = user?.job?.jobSuccessRate || 0;
  const rating = user?.review?.rating || 0;
  const totalRatings = user?.review?.totalRatings || 0;

  // Format budget display based on your data structure
  const formatBudget = () => {
    if (!job) return "Not specified";
    
    const budget = job.budget || job.price;
    const budgetType = job.BudgetType || job.budgetType;
    
    if (budget && budgetType) {
      if (budgetType === "hourly") {
        return `$${budget}/hr`;
      } else if (budgetType === "monthly") {
        return `$${budget}/month`;
      } else if (budgetType === "fixed") {
        return `$${budget} fixed`;
      }
      return `$${budget} (${budgetType})`;
    }
    
    return "Not specified";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Applications</span>
              </button>
              <h1 className="text-3xl font-bold text-slate-900">
                Proposal Details
              </h1>
              <p className="text-slate-600 mt-2">
                Detailed profile of the applicant and their submission
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <div className="text-sm text-slate-500">Proposal ID</div>
                <div className="font-mono text-sm text-slate-700">
                  {proposal?._id?.slice(-8) || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <p className="text-lg text-slate-700">
              Loading proposal details...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <div className="text-2xl">⚠️</div>
            </div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Failed to Load
            </h3>
            <p className="text-slate-600">{error}</p>
            <button
              onClick={refreshProposal}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !proposal && !error && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <div className="text-2xl">📭</div>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Proposal Found
            </h3>
            <p className="text-slate-600">
              The proposal you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}

        {!loading && proposal && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Professional Profile */}
            <div className="lg:col-span-1 space-y-6">
              {/* Professional Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img
                      src={user?.photo || "/default-avatar.png"}
                      alt={user?.name || "Applicant"}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {user?.verification?.email && (
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {user?.name || "Unknown"}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {user?.headline || "No headline provided"}
                  </p>

                  <div className="mt-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {user?.currentJobStatus || "Open to work"}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {user?.job?.jobPosted || 0}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Posted</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {user?.job?.jobCompleted || 0}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Completed</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-2xl font-bold text-slate-900">
                        {rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      ({totalRatings} ratings)
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-slate-400" />
                    Contact Information
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Location</div>
                        <div className="font-medium text-slate-800">
                          {user?.location || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium text-slate-800 truncate">
                          {user?.email || "No email"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Phone</div>
                        <div className="font-medium text-slate-800">
                          {user?.phone || "No phone"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-slate-400" />
                    Social Profiles
                  </h3>

                  <div className="space-y-2">
                    {user?.social?.portfolio && (
                      <a
                        href={user.social.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl group transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 group-hover:text-blue-700">
                            Portfolio
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {user.social.portfolio}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </a>
                    )}

                    {user?.social?.linkedin && (
                      <a
                        href={user.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-xl group transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800 group-hover:text-blue-700">
                            LinkedIn
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {user.social.linkedin}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </a>
                    )}

                    {!user?.social?.portfolio &&
                      !user?.social?.linkedin &&
                      !user?.social?.facebook &&
                      !user?.social?.instagram && (
                        <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-xl">
                          No social profiles added
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-slate-400" />
                  Skills & Expertise
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Display job skills from bid data */}
                  {job?.skills && job.skills.length > 0 ? (
                    job.skills.slice(0, 10).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">
                      No skills listed for this job
                    </span>
                  )}
                </div>

                {job?.skills && job.skills.length > 10 && (
                  <div className="text-sm text-slate-500">
                    +{job.skills.length - 10} more skills
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Languages
                  </h4>
                  <p className="text-slate-600">
                    {Array.isArray(user?.languages) && user.languages.length
                      ? user.languages.join(", ")
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Application Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job & Proposal Header */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {job?.title || "Job Title"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <Building className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {job?.companyName || "Company"}
                          </span>
                          <span className="text-slate-400">•</span>
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">
                            {job?.companyLocation || "Location"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Job Budget</div>
                          <div className="font-semibold text-slate-900">
                            {formatBudget()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Job Deadline</div>
                          <div className="font-semibold text-slate-900">
                            {job?.deadline
                              ? new Date(job.deadline).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Applications</div>
                          <div className="font-semibold text-slate-900">
                            {job?.applicationCount || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <div className="inline-flex flex-col items-start lg:items-end">
                      <div className="text-sm text-slate-500 mb-1">
                        Submitted on
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {new Date(proposal.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(proposal.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-500" />
                  Cover Letter
                </h3>
                <div className="bg-slate-50 rounded-xl p-6">
                  <ShortText text={proposal.coverLetter} limit={400} />
                </div>
              </div>

              {/* Proposal Details Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-500" />
                  Proposal Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Applicant's Offer */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-3">Applicant's Offer</h4>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-slate-500">Proposed Budget</div>
                            <div className="font-bold text-lg text-blue-700">
                              ${proposal.budget}
                              <span className="text-sm font-normal text-slate-600 ml-1">
                                ({proposal.budgetType})
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Proposed Deadline</div>
                            <div className="font-bold text-lg text-green-700">
                              {proposal.deadline 
                                ? new Date(proposal.deadline).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "Not specified"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Resume Section */}
                    <div>
                      <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-slate-400" />
                        Resume / Portfolio
                      </h4>
                      {proposal.resume ? (
                        <a
                          href={proposal.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 group transition-all"
                        >
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-800 group-hover:text-blue-700">
                              View Resume/Portfolio
                            </div>
                            <div className="text-sm text-slate-500 truncate">
                              {proposal.resume}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                        </a>
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-xl text-center">
                          <div className="text-slate-500">No resume/portfolio link provided</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Professional Stats */}
                  <div className="space-y-6">
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="text-sm text-slate-500 mb-1">
                        Success Rate
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-bold text-emerald-700">
                          {successRate}%
                        </div>
                        <div className="h-2 flex-1 bg-emerald-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${successRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="text-sm text-slate-500">Hourly Rate</div>
                        <div className="font-semibold text-lg text-slate-900">
                          {user?.chargeParHour
                            ? `$${user.chargeParHour}/hr`
                            : "Not set"}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="text-sm text-slate-500">Ongoing Projects</div>
                        <div className="font-semibold text-lg text-slate-900">
                          {user?.job?.ongoingProjects || 0}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-sm text-slate-500 mb-2">Bio</div>
                      <p className="text-slate-700">
                        {user?.bio || "No bio provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Job Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">
                      Description
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {job?.description || "No description available"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-slate-800 mb-2">Requirements</h5>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {job?.requirements?.map((req, index) => (
                            <li key={index}>{req}</li>
                          )) || <li>No requirements listed</li>}
                        </ul>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Location</div>
                          <div className="font-medium text-slate-800">
                            {job?.companyLocation || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-slate-800 mb-2">Responsibilities</h5>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {job?.responsibilities?.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          )) || <li>No responsibilities listed</li>}
                        </ul>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">
                            Job Type
                          </div>
                          <div className="font-medium text-slate-800 capitalize">
                            {job?.jobType || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Action Buttons - Removed Confirm/Reject buttons */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-semibold text-slate-800 mb-4">
                  Contact Applicant
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${user?.email}`}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message Now
                  </a>

                  {user?.phone && (
                    <a
                      href={`tel:${user.phone}`}
                      className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium cursor-pointer transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProposePage;