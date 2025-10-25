// app/components/Dashboard/Bids/BidsPage.jsx
"use client";
import Link from "next/link";
import React, { useState, useMemo } from "react";
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
} from "react-icons/fi";

/* ---------- Mock data ---------- */
const MOCK_BIDS = [
  {
    id: 1,
    title: "Port Shed Repair Project",
    client: "Port Authority Department",
    summary: "Bid submitted for repair and repaint of main port shed roof and floor leveling.",
    status: "submitted",
    statusLabel: "Submitted",
    time: "2 days ago",
    deadline: "Mar 30, 2025",
    myBid: "$14,500",
    clientBudget: "$15,000",
    location: "Port Authority",
    urgency: "high",
    category: "Construction",
    bidderCount: 12,
    myStatus: "under-review",
    lastUpdated: "2 days ago"
  },
  {
    id: 2,
    title: "Harbor Lighting Installation",
    client: "Maritime Authority",
    summary: "LED lighting installation bid with solar backup system proposal.",
    status: "shortlisted",
    statusLabel: "Shortlisted",
    time: "4 days ago",
    deadline: "Apr 12, 2025",
    myBid: "$8,200",
    clientBudget: "$8,500",
    location: "Harbor Front",
    urgency: "medium",
    category: "Electrical",
    bidderCount: 8,
    myStatus: "shortlisted",
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    title: "Coastal Reinforcement Project",
    client: "Environmental Division",
    summary: "Coastal protection bid with gabion installation methodology.",
    status: "won",
    statusLabel: "Won",
    time: "1 week ago",
    deadline: "May 10, 2025",
    myBid: "$24,800",
    clientBudget: "$25,000",
    location: "Coastal Area",
    urgency: "completed",
    category: "Environmental",
    bidderCount: 20,
    myStatus: "won",
    lastUpdated: "3 days ago"
  },
  {
    id: 4,
    title: "Dock Reconstruction Tender",
    client: "Property & Procurement",
    summary: "Successful dock restoration and dredging project completion.",
    status: "completed",
    statusLabel: "Completed",
    time: "Mar 01, 2025",
    deadline: "Mar 01, 2025",
    myBid: "$44,500",
    clientBudget: "$45,000",
    location: "Main Dock",
    urgency: "completed",
    category: "Construction",
    bidderCount: 32,
    myStatus: "completed",
    lastUpdated: "2 weeks ago"
  },
  {
    id: 5,
    title: "Office Building Renovation",
    client: "Public Works Department",
    summary: "Comprehensive interior renovation bid for government office building.",
    status: "submitted",
    statusLabel: "Submitted",
    time: "1 day ago",
    deadline: "Apr 15, 2025",
    myBid: "$34,000",
    clientBudget: "$35,000",
    location: "City Center",
    urgency: "medium",
    category: "Renovation",
    bidderCount: 5,
    myStatus: "submitted",
    lastUpdated: "1 day ago"
  },
  {
    id: 6,
    title: "Park Landscaping Project",
    client: "Parks & Recreation",
    summary: "Landscape redesign bid with native planting proposal.",
    status: "rejected",
    statusLabel: "Rejected",
    time: "3 days ago",
    deadline: "Apr 30, 2025",
    myBid: "$11,800",
    clientBudget: "$12,000",
    location: "Central Park",
    urgency: "low",
    category: "Landscaping",
    bidderCount: 15,
    myStatus: "rejected",
    lastUpdated: "2 days ago"
  },
];

export default function ProviderBids() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    urgency: "all",
  });

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Bids" },
    { value: "submitted", label: "Submitted" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "won", label: "Won" },
    { value: "rejected", label: "Rejected" },
    { value: "completed", label: "Completed" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Construction", label: "Construction" },
    { value: "Electrical", label: "Electrical" },
    { value: "Environmental", label: "Environmental" },
    { value: "Renovation", label: "Renovation" },
    { value: "Landscaping", label: "Landscaping" },
  ];

  const urgencyOptions = [
    { value: "all", label: "All Priority" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];

  const filteredBids = useMemo(() => {
    let bids = MOCK_BIDS;

    // Search filter
    if (searchQuery.trim()) {
      bids = bids.filter(
        (bid) =>
          bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== "all") {
      bids = bids.filter((bid) => bid.status === filters.status);
    }

    // Category filter
    if (filters.category !== "all") {
      bids = bids.filter((bid) => bid.category === filters.category);
    }

    // Urgency filter
    if (filters.urgency !== "all") {
      bids = bids.filter((bid) => bid.urgency === filters.urgency);
    }

    return bids;
  }, [searchQuery, filters]);

  const stats = {
    total: MOCK_BIDS.length,
    submitted: MOCK_BIDS.filter((bid) => bid.status === "submitted").length,
    shortlisted: MOCK_BIDS.filter((bid) => bid.status === "shortlisted").length,
    won: MOCK_BIDS.filter((bid) => bid.status === "won").length,
    rejected: MOCK_BIDS.filter((bid) => bid.status === "rejected").length,
    completed: MOCK_BIDS.filter((bid) => bid.status === "completed").length,
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      category: "all",
      urgency: "all",
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Helper functions for bid cards
  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shortlisted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "won":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const getActionButtons = (status) => {
    switch (status) {
      case "submitted":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiEdit className="text-sm" />
              Edit Bid
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-primary transition-colors cursor-pointer">
              <FiEye className="text-sm" />
              View Details
            </button>
          </>
        );
      case "shortlisted":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiMessageCircle className="text-sm" />
              Contact Client
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-primary transition-colors">
              <FiAward className="text-sm" />
              Negotiate
            </button>
          </>
        );
      case "won":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-primary transition-colors w-full justify-center">
            <FiCheckCircle className="text-sm" />
            Start Project
          </button>
        );
      case "rejected":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors w-full justify-center">
            <FiEye className="text-sm" />
            View Feedback
          </button>
        );
      default:
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors w-full justify-center">
            <FiEye className="text-sm" />
            View Details
          </button>
        );
    }
  };

  // Bid Card Component (inline)
  const BidCard = ({ bid }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
              {bid.title}
            </h3>
            <p className="text-gray-600 mt-1">{bid.client}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                bid.status
              )}`}
            >
              {bid.statusLabel}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                bid.urgency
              )}`}
            >
              {bid.urgency}
            </span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{bid.summary}</p>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="text-gray-400" />
            <span className="text-sm">{bid.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiUsers className="text-gray-400" />
            <span className="text-sm">{bid.bidderCount} bidders</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiDollarSign className="text-gray-400" />
            <span className="text-sm font-semibold text-primary">
              My Bid: {bid.myBid}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiDollarSign className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Budget: {bid.clientBudget}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Updated {bid.lastUpdated}
            </span>
            <span className="text-gray-400">Deadline: {bid.deadline}</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {bid.category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          {getActionButtons(bid.status)}
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
          <h2 className="text-xl font-bold text-gray-800">Filter Bids</h2>
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
              Bid Status
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

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Project Category
            </h3>
            <div className="space-y-3">
              {categoryOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    checked={filters.category === option.value}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      filters.category === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-500"
                    }`}
                  >
                    {filters.category === option.value && (
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

          {/* Urgency Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Priority Level
            </h3>
            <div className="space-y-3">
              {urgencyOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={filters.urgency === option.value}
                    onChange={(e) =>
                      handleFilterChange("urgency", e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                      filters.urgency === option.value
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-blue-500"
                    }`}
                  >
                    {filters.urgency === option.value && (
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
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bids & Tenders</h1>
            <p className="text-gray-600 mt-2">
              Track and manage all your submitted bids and tender applications
            </p>
          </div>
          <Link href={'/pages/dashboard/provider/post/bids'} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors flex items-center gap-2 w-fit cursor-pointer">
            <FiPlus className="text-lg" />
            Post New Bids
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">
              {stats.total}
            </div>
            <div className="text-gray-600 text-sm">Total Bids</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary">
              {stats.submitted}
            </div>
            <div className="text-gray-600 text-sm">Submitted</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {stats.shortlisted}
            </div>
            <div className="text-gray-600 text-sm">Shortlisted</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary">
              {stats.won}
            </div>
            <div className="text-gray-600 text-sm">Won</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-gray-600 text-sm">Rejected</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-600">
              {stats.completed}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search bids, clients, locations..."
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
            filters.category !== "all" ||
            filters.urgency !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status !== "all" && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Status: {filters.status}
                </span>
              )}
              {filters.category !== "all" && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Category: {filters.category}
                </span>
              )}
              {filters.urgency !== "all" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Priority: {filters.urgency}
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

      {/* Bids Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredBids.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bids found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Link href={'/pages/dashboard/provider/post/bids'} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary transition-colors inline-block">
              Post New Bids
            </Link>
          </div>
        ) : (
          filteredBids.map((bid) => <BidCard key={bid.id} bid={bid} />)
        )}
      </div>

      {/* Load More */}
      {filteredBids.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
            Load More Bids
          </button>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer />
    </div>
  );
}