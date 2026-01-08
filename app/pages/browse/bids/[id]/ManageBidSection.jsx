import React, { useState, useMemo } from "react";
import useGetAllProposeForSingleBid from "@/app/hooks/jobs/bids/GetAllProposeForSingleBid";
import {
  FiSearch,
  FiCheck,
  FiX,
  FiClock,
  FiFilter,
  FiDownload,
  FiMail,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ManageBidSection = ({
  singleBid,
  timeLeft,
  getBudgetTypeText,
  formatDate,
}) => {
  const bidId = singleBid._id;
  const { allProposals, refreshProposals } =
    useGetAllProposeForSingleBid(bidId);

  // States
  const [activeTab, setActiveTab] = useState("all"); // "all", "pending", "accepted", "rejected"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if bidding time is over
  const isBiddingOver = new Date() > new Date(singleBid.deadline);

  // Filter and search proposals
  const filteredProposals = useMemo(() => {
    let filtered = allProposals;

    // Filter by status tab
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

  // Statistics
  const stats = useMemo(() => {
    const total = allProposals.length;
    const pending = allProposals.filter((p) => p.status === "pending").length;
    const accepted = allProposals.filter((p) => p.status === "accepted").length;
    const rejected = allProposals.filter((p) => p.status === "rejected").length;

    return { total, pending, accepted, rejected };
  }, [allProposals]);

  // Handle accept proposal
  const handleAcceptProposal = async (proposalId) => {
    if (!isBiddingOver) {
      toast.error("You can only accept proposals after the bidding deadline.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/browse/bids", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposeId: proposalId,
          bidId,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success(
          "Proposal accepted! All other proposals have been rejected."
        );
        refreshProposals();
        setIsAcceptModalOpen(false);
      } else {
        toast.error(data.message || "Failed to accept proposal");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reject proposal
  const handleRejectProposal = async (proposalId) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/browse/bids", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposeId: proposalId }),
      });

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Proposal rejected successfully!");
        refreshProposals();
        setIsRejectModalOpen(false);
      } else {
        toast.error(data.message || "Failed to reject proposal");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate days until deadline
  const getDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
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
      "Budget",
      "Budget Type",
      "Deadline",
      "Status",
      "Submitted Date",
      "Cover Letter",
    ];
    const csvData = allProposals.map((proposal) => [
      proposal.professionalId?.name || "N/A",
      proposal.professionalId?.email || "N/A",
      proposal.budget,
      proposal.budgetType,
      new Date(proposal.deadline).toLocaleDateString(),
      proposal.status,
      new Date(proposal.createdAt).toLocaleDateString(),
      `"${proposal.coverLetter?.replace(/"/g, '""')}"`, // Escape quotes for CSV
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposals_${bidId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Manage Proposals
            </h1>
            <p className="text-slate-600 mt-1">
              {singleBid.title} • {allProposals.length} total proposals
            </p>
            {!isBiddingOver && (
              <div className="flex items-center gap-2 mt-3 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-sm">
                <FiClock className="text-lg" />
                <span>
                  Bidding is still open. You can accept proposals after{" "}
                  <span className="font-semibold">
                    {new Date(singleBid.deadline).toLocaleDateString()}
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
              <p className="text-sm text-slate-500">Pending</p>
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
          filteredProposals.map((proposal) => (
            <div
              key={proposal._id}
              className={`bg-white rounded-2xl border ${
                proposal.status === "accepted"
                  ? "border-green-200 bg-green-50/30"
                  : proposal.status === "rejected"
                  ? "border-red-200 bg-red-50/30"
                  : "border-slate-200"
              } p-6 hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Professional Info */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {proposal.professionalId?.photo ? (
                      <img
                        src={proposal.professionalId.photo}
                        alt={proposal.professionalId.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {proposal.professionalId?.name?.charAt(0) || "?"}
                      </div>
                    )}
                    {proposal.status === "accepted" && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {proposal.professionalId?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            proposal.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : proposal.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {proposal.status.charAt(0).toUpperCase() +
                            proposal.status.slice(1)}
                        </span>
                        {proposal.status === "accepted" && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Selected Winner
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <FiMail className="text-slate-400" />
                        <span>{proposal.professionalId?.email}</span>
                      </div>
                      {proposal.professionalId?.phone && (
                        <span>• {proposal.professionalId.phone}</span>
                      )}
                      <span>
                        • Submitted on{" "}
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Cover Letter Preview */}
                    <p className="text-slate-600 mt-3 line-clamp-2">
                      {proposal.coverLetter}
                    </p>
                  </div>
                </div>

                {/* Proposal Details & Actions */}
                <div className="lg:text-right">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-slate-800">
                      {formatCurrency(proposal.budget)}
                    </div>
                    <div className="text-sm text-slate-500">
                      {proposal.budgetType === "fixed"
                        ? "Fixed Price"
                        : proposal.budgetType === "hourly"
                        ? "Per Hour"
                        : "Per Month"}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      Deadline:{" "}
                      {new Date(proposal.deadline).toLocaleDateString()}
                      {getDaysLeft(proposal.deadline) >= 0 && (
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs ${
                            getDaysLeft(proposal.deadline) <= 7
                              ? "bg-red-100 text-red-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {getDaysLeft(proposal.deadline)} days
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    {proposal.status === "pending" && isBiddingOver && (
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

                    {proposal.status === "pending" && !isBiddingOver && (
                      <button
                        disabled
                        className="px-4 py-2 bg-slate-300 text-slate-600 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <FiClock />
                        Wait until bidding ends
                      </button>
                    )}

                    {proposal.status === "accepted" && (
                      <button
                        disabled
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg cursor-not-allowed"
                      >
                        Accepted ✓
                      </button>
                    )}

                    {proposal.status === "rejected" && (
                      <button
                        disabled
                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg cursor-not-allowed"
                      >
                        Rejected ✗
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {proposal.resume && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={proposal.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-2"
                  >
                    <FiDownload />
                    View Resume / Portfolio
                  </a>
                </div>
              )}
            </div>
          ))
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
                proposal? This will automatically reject all other proposals and
                cannot be undone.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important:
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• You can only accept one proposal per bid</li>
                  <li>• This action cannot be reversed</li>
                  <li>• The professional will be notified immediately</li>
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

export default ManageBidSection;
