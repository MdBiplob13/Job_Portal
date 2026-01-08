// app/(your-path)/ProfessionalBids.jsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import useUser from "@/app/hooks/user/userHook";
import useGetAllProposedBidsForProfessional from "@/app/hooks/dashboard/professional/bids/GetAllProposedBidsForProfessional";
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
  FiUsers,
  FiAward,
  FiBriefcase,
  FiTrendingUp,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

const fmtDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const capitalise = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Compute urgency from deadline
const computeUrgency = (deadlineIso) => {
  if (!deadlineIso) return "low";
  const d = new Date(deadlineIso).getTime();
  const now = Date.now();
  const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) return "high";
  if (diffDays <= 14) return "medium";
  return "low";
};

export default function ProfessionalBids() {
  const { user } = useUser();
  const professionalId = user?._id;
  
  const { proposedBids = [], loading } = useGetAllProposedBidsForProfessional(professionalId);
  
  // Local UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all, finished, pending, accepted, rejected

  // Filter options
  const tabOptions = [
    { value: "all", label: "All Proposals", icon: FiBriefcase, count: 0 },
    { value: "finished", label: "Finished", icon: FiCheckCircle, count: 0 },
    { value: "pending", label: "Pending", icon: FiClock, count: 0 },
    { value: "accepted", label: "Accepted", icon: FiTrendingUp, count: 0 },
    { value: "rejected", label: "Rejected", icon: FiX, count: 0 },
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const s = {
      total: 0,
      finished: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
      active: 0,
    };
    
    const list = Array.isArray(proposedBids) ? proposedBids : [];
    s.total = list.length;
    
    list.forEach((proposal) => {
      const proposalStatus = (proposal.status || "pending").toLowerCase();
      const bidStatus = proposal.bidId?.status?.toLowerCase() || "";
      
      // Count by proposal status
      if (proposalStatus === "pending") s.pending++;
      else if (proposalStatus === "accepted") s.accepted++;
      else if (proposalStatus === "rejected") s.rejected++;
      
      // Finished = bid is completed
      if (bidStatus === "completed") s.finished++;
      
      // Active = not finished and not rejected
      if (proposalStatus !== "rejected" && bidStatus !== "completed") s.active++;
    });
    
    return s;
  }, [proposedBids]);

  // Update tab counts
  const tabOptionsWithCounts = useMemo(() => {
    return tabOptions.map(tab => ({
      ...tab,
      count: stats[tab.value] || 0
    }));
  }, [stats]);

  // Filter bids based on active tab
  const filteredProposals = useMemo(() => {
    let list = Array.isArray(proposedBids) ? proposedBids : [];
    
    // Apply tab filter
    if (activeTab === "finished") {
      list = list.filter(proposal => 
        proposal.bidId?.status?.toLowerCase() === "completed"
      );
    } else if (activeTab !== "all") {
      list = list.filter(proposal => 
        (proposal.status || "").toLowerCase() === activeTab
      );
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(proposal => {
        const bid = proposal.bidId || {};
        return (
          (bid.title || "").toLowerCase().includes(q) ||
          (bid.companyName || "").toLowerCase().includes(q) ||
          (bid.companyLocation || "").toLowerCase().includes(q) ||
          (proposal.status || "").toLowerCase().includes(q)
        );
      });
    }
    
    // Sort by newest first
    list.sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    
    return list;
  }, [proposedBids, activeTab, searchQuery]);

  // UI helpers
  const getProposalStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getBidStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Action buttons based on proposal and bid status
  const getActionButtons = (proposal) => {
    const proposalStatus = (proposal.status || "").toLowerCase();
    const bidStatus = proposal.bidId?.status?.toLowerCase() || "";
    
    if (bidStatus === "completed") {
      return (
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg w-full justify-center">
          <FiCheckCircle className="text-sm" />
          Project Completed
        </button>
      );
    }
    
    switch (proposalStatus) {
      case "pending":
        return (
          <Link
            href={`/pages/browse/bids/${proposal.bidId?._id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiEye className="text-sm" />
            View Bid Details
          </Link>
        );
      case "accepted":
        return (
          <div className="flex gap-2">
            <Link
              href={`/pages/dashboard/professional/chat/${proposal.bidId?._id}`}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FiMessageCircle className="text-sm" />
              Contact Client
            </Link>
            <Link
              href={`/pages/dashboard/professional/proposals/${proposal._id}`}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <FiEye className="text-sm" />
              View Proposal
            </Link>
          </div>
        );
      case "rejected":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg w-full justify-center">
            <FiEye className="text-sm" />
            View Feedback
          </button>
        );
      default:
        return null;
    }
  };

  // Proposal card component
  const ProposalCard = ({ proposal }) => {
    const bid = proposal.bidId || {};
    const proposalStatus = (proposal.status || "").toLowerCase();
    const bidStatus = (bid.status || "").toLowerCase();
    const urgency = computeUrgency(bid.deadline);
    const proposalDate = fmtDate(proposal.createdAt);
    const deadline = fmtDate(bid.deadline);
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                {bid.title || "Untitled Bid"}
              </h3>
              <p className="text-gray-600 mt-1">{bid.companyName || "No company name"}</p>
            </div>
            
            <div className="flex flex-col gap-2 items-end">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getProposalStatusColor(proposalStatus)}`}>
                {capitalise(proposalStatus)} Proposal
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBidStatusColor(bidStatus)}`}>
                {capitalise(bidStatus)} Bid
              </span>
              {urgency !== "low" && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(urgency)}`}>
                  {urgency} Priority
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed line-clamp-2 mt-3">
            {bid.description || "No description available"}
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <FiMapPin className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{bid.companyLocation || "—"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FiDollarSign className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="text-sm font-medium">
                  ${(bid.price || 0).toLocaleString()} {bid.BudgetType ? `(${bid.BudgetType})` : ""}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FiCalendar className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Deadline</p>
                <p className="text-sm font-medium">{deadline}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FiClock className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-medium">{bid.ProjectDuration || "—"}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              <span className="text-gray-400">Proposed: {proposalDate}</span>
            </div>
            
            {proposal.proposedAmount && (
              <div className="flex items-center gap-1">
                <FiDollarSign className="text-green-500" />
                <span className="text-sm font-semibold text-green-600">
                  Your Quote: ${proposal.proposedAmount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            {getActionButtons(proposal)}
          </div>
        </div>
      </div>
    );
  };

  // Filter drawer component
  const FilterDrawer = () => (
    <>
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setIsFilterOpen(false)} 
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Advanced Filters</h2>
          <button 
            onClick={() => setIsFilterOpen(false)} 
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-140px)]">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Range</h3>
            <div className="space-y-3">
              {["Any", "$0-$1,000", "$1,000-$5,000", "$5,000-$10,000", "$10,000+"].map((range) => (
                <label key={range} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="budget"
                    value={range}
                    className="hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all border-gray-300 group-hover:border-blue-500">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-blue-500" />
                  </div>
                  <span className="text-gray-700">{range}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Duration</h3>
            <div className="space-y-3">
              {["Any", "1-2 weeks", "1 month", "1-3 months", "3+ months"].map((duration) => (
                <label key={duration} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="duration"
                    value={duration}
                    className="hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all border-gray-300 group-hover:border-blue-500">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-blue-500" />
                  </div>
                  <span className="text-gray-700">{duration}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400">
              Clear Filters
            </button>
            <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Bid Proposals</h1>
            <p className="text-gray-600 mt-2">
              Track and manage all your bid proposals and applications
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="/pages/browse/bids"
              className="bg-blue-500 text-white px-4 md:px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FiBriefcase className="text-lg" />
              Browse New Bids
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          {tabOptionsWithCounts.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`rounded-2xl p-4 shadow-sm border transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 border-blue-200 shadow-blue-100"
                    : "bg-white border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`text-lg ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  <span className={`text-2xl font-bold ${isActive ? "text-blue-600" : "text-gray-800"}`}>
                    {tab.count}
                  </span>
                </div>
                <div className={`text-sm font-medium ${isActive ? "text-blue-700" : "text-gray-600"}`}>
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search bids by title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="px-4 md:px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2"
              >
                <FiFilter className="text-lg" />
                <span className="hidden md:inline">Advanced Filters</span>
              </button>
            </div>
          </div>
          
          {searchQuery && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Found {filteredProposals.length} proposal{filteredProposals.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Proposals Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-8 md:p-12 bg-white rounded-2xl text-center border border-gray-200">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading proposals...</h3>
            <p className="text-gray-600">Fetching your bid applications</p>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-5xl md:text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No proposals found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery || activeTab !== "all"
                ? "Try adjusting your search criteria or select a different status filter"
                : "You haven't submitted any proposals yet. Start by browsing available bids."}
            </p>
            <Link
              href="/pages/browse/bids"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
            >
              <FiBriefcase className="text-lg" />
              Browse Available Bids
            </Link>
          </div>
        ) : (
          filteredProposals.map((proposal) => (
            <ProposalCard key={proposal._id} proposal={proposal} />
          ))
        )}
      </div>
      
      {/* Pagination/Load More */}
      {filteredProposals.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            Showing {filteredProposals.length} of {proposedBids.length} proposals
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
              Previous
            </button>
            <button className="px-6 py-3 bg-blue-ext-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              Load More
            </button>
          </div>
        </div>
      )}
      
      <FilterDrawer />
    </div>
  );
}