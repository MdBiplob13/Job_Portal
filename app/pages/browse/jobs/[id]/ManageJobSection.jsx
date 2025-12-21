"use client";

import { useState, useMemo } from "react";
import useGetAllProposeForSingleJob from "@/app/hooks/jobs/GetAllProposeForSingleJob";
import {
  FiSearch,
  FiCheck,
  FiX,
  FiClock,
  FiFilter,
  FiDownload,
  FiMail,
  FiUser,
  FiBriefcase,
  FiFileText,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";

const ManageJobSection = ({ job, jobId }) => {
  const { allProposals, refresh } = useGetAllProposeForSingleJob(jobId);

  // States
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if job deadline is over (assuming job has a deadline field)
  const isJobDeadlineOver = job?.deadline
    ? new Date() > new Date(job.deadline)
    : false;

  // Filter and search proposals
  const filteredProposals = useMemo(() => {
    let filtered = allProposals;

    // Filter by status tab (note: job proposals might not have status field yet)
    // We'll assume they have a status field or default to "pending"
    if (activeTab !== "all") {
      filtered = filtered.filter((proposal) => proposal.status === activeTab);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (proposal) =>
          proposal.professionalId?.name?.toLowerCase().includes(query) ||
          proposal.professionalId?.email?.toLowerCase().includes(query) ||
          proposal.coverLetter?.toLowerCase().includes(query) ||
          proposal.professionalId?.headline?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allProposals, activeTab, searchQuery]);

  // Statistics - assuming job proposals have status field
  const stats = useMemo(() => {
    const total = allProposals.length;
    const pending = allProposals.filter(
      (p) => !p.status || p.status === "pending"
    ).length;
    const accepted = allProposals.filter((p) => p.status === "accepted").length;
    const rejected = allProposals.filter((p) => p.status === "rejected").length;

    return { total, pending, accepted, rejected };
  }, [allProposals]);

  // Handle accept proposal
  const handleAcceptProposal = async (proposalId) => {
    if (!isJobDeadlineOver && job?.deadline) {
      toast.error(
        "You can only accept proposals after the job application deadline."
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/browse/jobs/single", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: jobId,
          jobProposeId: proposalId,
          status: "accepted",
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success(
          "Proposal accepted!"
        );
        refresh();
        setIsAcceptModalOpen(false);
      } else {
        toast.error(data.message || "Failed to accept proposal");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reject proposal
  const handleRejectProposal = async (proposalId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "/api/dashboard/employer/rejectJobProposal",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
          jobId: jobId,
          jobProposeId: proposalId,
          status: "rejected",
        }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Proposal rejected successfully!");
        refresh();
        setIsRejectModalOpen(false);
      } else {
        toast.error(data.message || "Failed to reject proposal");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days until deadline
  const getDaysLeft = (dateString) => {
    if (!dateString) return null;
    const deadlineDate = new Date(dateString);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Download proposals as CSV
  const downloadProposalsCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Headline",
      "Cover Letter",
      "Resume",
      "Status",
      "Submitted Date",
      "Links",
    ];
    const csvData = allProposals.map((proposal) => [
      proposal.professionalId?.name || "N/A",
      proposal.professionalId?.email || "N/A",
      proposal.professionalId?.headline || "N/A",
      `"${proposal.coverLetter?.replace(/"/g, '""')}"`,
      proposal.resume || "N/A",
      proposal.status || "pending",
      new Date(proposal.createdAt).toLocaleDateString(),
      proposal.links?.map((l) => `${l.linkName}: ${l.linkURL}`).join("; ") ||
        "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `job_proposals_${jobId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Manage Job Proposals
            </h1>
            <p className="text-slate-600 mt-1">
              {job?.title} • {allProposals.length} total proposals
            </p>
            {job?.deadline && !isJobDeadlineOver && (
              <div className="flex items-center gap-2 mt-3 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-sm">
                <FiClock className="text-lg" />
                <span>
                  Applications are still open. You can accept proposals after{" "}
                  <span className="font-semibold">
                    {formatDate(job.deadline)}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Proposals</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Review</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <FiClock className="text-2xl text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Accepted</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.accepted}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FiCheck className="text-2xl text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {stats.rejected}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <FiX className="text-2xl text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "pending"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab("accepted")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "accepted"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Accepted ({stats.accepted})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                activeTab === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>

          {/* Search Bar */}
          <div className="lg:ml-auto flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or proposal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFilter className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No proposals found
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              {searchQuery
                ? "No proposals match your search criteria. Try a different search term."
                : activeTab !== "all"
                ? `There are no ${activeTab} proposals.`
                : "No proposals have been submitted yet."}
            </p>
          </div>
        ) : (
          filteredProposals.map((proposal) => {
            const professional = proposal.professionalId;
            const jobsCompleted = professional?.job?.jobCompleted || 0;
            const jobsPosted = professional?.job?.jobPosted || 0;
            const successRate = professional?.job?.jobSuccessRate || 0;
            const rating = professional?.review?.rating || 0;
            const totalRatings = professional?.review?.totalRatings || 0;
            const proposalStatus = proposal.status || "pending";

            return (
              <div
                key={proposal._id}
                className={`bg-white rounded-2xl border ${
                  proposalStatus === "accepted"
                    ? "border-green-200 bg-green-50/30"
                    : proposalStatus === "rejected"
                    ? "border-red-200 bg-red-50/30"
                    : "border-slate-200"
                } p-6 hover:shadow-md transition-shadow`}
              >
                <Link href={`/pages/browse/jobs/propose/${proposal._id}`} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Professional Info */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {professional?.photo ? (
                        <img
                          src={professional.photo}
                          alt={professional.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {professional?.name?.charAt(0) || "?"}
                        </div>
                      )}
                      {proposalStatus === "accepted" && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <FiCheck className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          {professional?.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              proposalStatus === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : proposalStatus === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {proposalStatus.charAt(0).toUpperCase() +
                              proposalStatus.slice(1)}
                          </span>
                          {proposalStatus === "accepted" && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Selected Candidate
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Professional Headline */}
                      <p className="text-sm text-slate-700 mb-2">
                        {professional?.headline}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <FiMail className="text-slate-400" />
                          <span>{professional?.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiBriefcase className="text-slate-400" />
                          <span>{jobsCompleted} jobs completed</span>
                        </div>
                        {rating > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-500">★</span>
                            <span>
                              {rating.toFixed(1)} ({totalRatings})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Cover Letter Preview */}
                      <p className="text-slate-600 mt-3 line-clamp-2">
                        {proposal.coverLetter}
                      </p>

                      {/* Links */}
                      {proposal.links && proposal.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {proposal.links.slice(0, 3).map((link, index) => (
                            <a
                              key={index}
                              href={link.linkURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded text-xs"
                            >
                              {link.linkName}
                            </a>
                          ))}
                          {proposal.links.length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{proposal.links.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px]">
                    {proposalStatus === "pending" && isJobDeadlineOver && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setIsAcceptModalOpen(true);
                          }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 cursor-pointer"
                          disabled={isLoading}
                        >
                          <FiCheck />
                          Accept Proposal
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setIsRejectModalOpen(true);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
                          disabled={isLoading}
                        >
                          <FiX />
                          Reject
                        </button>
                      </>
                    )}

                    {proposalStatus === "pending" &&
                      !isJobDeadlineOver &&
                      job?.deadline && (
                        <button
                          disabled
                          className="px-4 py-2 bg-slate-300 text-slate-600 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <FiClock />
                          Wait until deadline
                        </button>
                      )}

                    {proposalStatus === "pending" && !job?.deadline && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setIsAcceptModalOpen(true);
                          }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 cursor-pointer"
                          disabled={isLoading}
                        >
                          <FiCheck />
                          Accept Proposal
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProposal(proposal);
                            setIsRejectModalOpen(true);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
                          disabled={isLoading}
                        >
                          <FiX />
                          Reject
                        </button>
                      </>
                    )}

                    {proposalStatus === "accepted" && (
                      <button
                        disabled
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-not-allowed"
                      >
                        Accepted ✓
                      </button>
                    )}

                    {proposalStatus === "rejected" && (
                      <button
                        disabled
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg cursor-not-allowed"
                      >
                        Rejected ✗
                      </button>
                    )}
                  </div>
                </Link>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                  {proposal.resume && (
                    <a
                      href={proposal.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                    >
                      <FiFileText />
                      View Resume
                    </a>
                  )}
                  <div className="text-sm text-slate-500">
                    Submitted on {formatDate(proposal.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Accept Confirmation Modal */}
      {isAcceptModalOpen && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Accept Proposal
              </h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to accept{" "}
                <span className="font-semibold">
                  {selectedProposal.professionalId?.name}'s
                </span>{" "}
                proposal for this job? This will automatically reject all other
                proposals and cannot be undone.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important:
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• You can only accept one proposal per job position</li>
                  <li>• This action cannot be reversed</li>
                  <li>• The professional will be notified immediately</li>
                  <li>• Other applicants will be automatically rejected</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsAcceptModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 cursor-pointer"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAcceptProposal(selectedProposal._id)}
                  className="flex-1 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center justify-center gap-2 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Yes, Accept Proposal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {isRejectModalOpen && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Reject Proposal
              </h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to reject{" "}
                <span className="font-semibold">
                  {selectedProposal.professionalId?.name}'s
                </span>{" "}
                proposal?
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <p className="text-slate-700 text-sm">
                  The professional will be notified that their proposal was not
                  selected.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsRejectModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 cursor-pointer"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRejectProposal(selectedProposal._id)}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Yes, Reject"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobSection;
