// app/(your-path)/EmployerBids.jsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import useGetEmployerBids from "@/app/hooks/dashboard/employer/bids/GetEmployerBids";
import useUser from "@/app/hooks/user/userHook";
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

const fmtDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString();
};

const capitalise = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

// small helper to compute urgency from deadline
const computeUrgency = (deadlineIso) => {
  if (!deadlineIso) return "low";
  const d = new Date(deadlineIso).getTime();
  const now = Date.now();
  const diffDays = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  if (diffDays <= 3) return "high";
  if (diffDays <= 14) return "medium";
  return "low";
};

export default function EmployerBids() {
  const { user } = useUser();
  const employerEmail = user?.email || "";
  const {
    employerBids = [],
    employerBidsLoading,
    employerBidsRefresh,
    setEmployerBidsRefresh,
  } = useGetEmployerBids(employerEmail);

  // local UI
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    urgency: "all",
  });

  // options (uses statuses from your schema)
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  const urgencyOptions = [
    { value: "all", label: "All Priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  // derive stats from real data
  const stats = useMemo(() => {
    const s = { total: 0, pending: 0, accepted: 0, inProgress: 0, completed: 0, rejected: 0 };
    const list = Array.isArray(employerBids) ? employerBids : [];
    s.total = list.length;
    list.forEach((b) => {
      const st = (b.status || "pending").toString().toLowerCase();
      if (st === "pending") s.pending++;
      else if (st === "accepted") s.accepted++;
      else if (st === "in progress") s.inProgress++;
      else if (st === "completed") s.completed++;
      else if (st === "rejected") s.rejected++;
    });
    return s;
  }, [employerBids]);

  // filtered list
  const filteredBids = useMemo(() => {
    const list = Array.isArray(employerBids) ? employerBids : [];
    let out = list.slice();

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      out = out.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.companyName || "").toLowerCase().includes(q) ||
          (b.companyLocation || "").toLowerCase().includes(q)
      );
    }

    if (filters.status !== "all") {
      out = out.filter((b) => (b.status || "").toLowerCase() === filters.status);
    }

    if (filters.urgency !== "all") {
      out = out.filter((b) => computeUrgency(b.deadline) === filters.urgency);
    }

    // newest first
    out.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return out;
  }, [employerBids, searchQuery, filters]);

  const handleClearFilters = () => {
    setFilters({ status: "all", urgency: "all" });
  };

  const handleFilterChange = (field, value) =>
    setFilters((prev) => ({ ...prev, [field]: value }));

  // UI helpers
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
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

  const getActionButtons = (b) => {
    const status = (b.status || "").toLowerCase();
    switch (status) {
      case "pending":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiEdit className="text-sm" />
              Edit
            </button>
            <Link
              href={`/pages/browse/bids/${b._id}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiEye className="text-sm" />
              View
            </Link>
          </>
        );
      case "accepted":
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
              <FiMessageCircle className="text-sm" />
              Contact
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <FiAward className="text-sm" />
              Manage
            </button>
          </>
        );
      case "in progress":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors w-full justify-center">
            <FiClock className="text-sm" />
            In Progress
          </button>
        );
      case "completed":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg w-full justify-center">
            <FiCheckCircle className="text-sm" />
            Completed
          </button>
        );
      case "rejected":
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg w-full justify-center">
            <FiEye className="text-sm" />
            View
          </button>
        );
      default:
        return null;
    }
  };

  // Bid card shows real fields
  const BidCard = ({ bid }) => {
    const urgency = computeUrgency(bid.deadline);
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                {bid.title}
              </h3>
              <p className="text-gray-600 mt-1">{bid.companyName}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(bid.status)}`}>
                {capitalise(bid.status)}
              </span>

              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(urgency)}`}>
                {urgency}
              </span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed line-clamp-2">
            {bid.description}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FiMapPin className="text-gray-400" />
              <span className="text-sm">{bid.companyLocation || "—"}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FiUsers className="text-gray-400" />
              <span className="text-sm">{bid.applicationCount ?? 0} applicants</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FiDollarSign className="text-gray-400" />
              <span className="text-sm font-semibold">
                {bid.price ?? 0} ({bid.BudgetType || bid.BudgetType === "" ? (bid.BudgetType || "—") : "—"})
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FiClock className="text-gray-400" />
              <span className="text-sm">{fmtDate(bid.deadline)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="text-gray-400">Posted: {fmtDate(bid.createdAt)}</span>
            </div>

            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{bid.ProjectDuration || "—"}</div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            {getActionButtons(bid)}
          </div>
        </div>
      </div>
    );
  };

  // Filter Drawer
  const FilterDrawer = () => (
    <>
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform ${isFilterOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Filter Bids</h2>
          <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX className="text-xl text-gray-600" /></button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-140px)]">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Bid Status</h3>
            <div className="space-y-3">
              {statusOptions.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={filters.status === option.value}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${filters.status === option.value ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-blue-500"}`}>
                    {filters.status === option.value && <FiCheck className="text-white text-xs" />}
                  </div>
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority</h3>
            <div className="space-y-3">
              {urgencyOptions.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer group">
                  <input type="radio" name="urgency" value={option.value} checked={filters.urgency === option.value} onChange={(e) => handleFilterChange("urgency", e.target.value)} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${filters.urgency === option.value ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-blue-500"}`}>
                    {filters.urgency === option.value && <FiCheck className="text-white text-xs" />}
                  </div>
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button onClick={handleClearFilters} className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400">
              Clear All
            </button>
            <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Applied Bids & Tenders</h1>
            <p className="text-gray-600 mt-2">Track and manage all your applied bids and tender applications</p>
          </div>

          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-gray-600 text-sm">Total Bids</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-gray-600 text-sm">Accepted</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-gray-600 text-sm">In Progress</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-gray-600 text-sm">Rejected</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search bids, company, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIsFilterOpen(true)} className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2">
                <FiFilter className="text-lg" />
                Filters
              </button>

              <button onClick={() => setEmployerBidsRefresh((r) => (r || 1) + 1)} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600">
                Refresh
              </button>
            </div>
          </div>

          {(filters.status !== "all" || filters.urgency !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status !== "all" && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Status: {capitalise(filters.status)}</span>}
              {filters.urgency !== "all" && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Priority: {capitalise(filters.urgency)}</span>}
              <button onClick={handleClearFilters} className="text-gray-500 hover:text-gray-700 text-sm font-medium underline">Clear all</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {employerBidsLoading ? (
          <div className="col-span-2 p-6 bg-white rounded-2xl text-center border">Loading bids...</div>
        ) : filteredBids.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No bids found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
            <Link href={"/pages/dashboard/employer/post/bids"} className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-block">Post New Bid</Link>
          </div>
        ) : (
          filteredBids.map((bid) => <BidCard key={bid._id} bid={bid} />)
        )}
      </div>

      {filteredBids.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
            Load More Bids
          </button>
        </div>
      )}

      <FilterDrawer />
    </div>
  );
}
