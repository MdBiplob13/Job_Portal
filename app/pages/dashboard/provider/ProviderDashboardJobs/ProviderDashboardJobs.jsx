// app/components/Dashboard/Jobs/JobsPage.jsx
"use client";
import React, { useState, useMemo } from "react";
import JobTabs from "./JobTabs";
import JobCard from "./JobCard";
import { FiSearch, FiFilter } from "react-icons/fi";

/* ---------- Mock data ---------- */
const MOCK = [
  // published
  {
    id: 1,
    title: "Port Shed Repair",
    department: "Procurement Department",
    summary: "Repair and repaint the main port shed roof and floor leveling.",
    status: "published",
    statusLabel: "Open",
    time: "2 days ago",
    deadline: "Mar 30, 2025",
    bids: 12,
    milestones: 3,
  },
  {
    id: 2,
    title: "Harbor Lighting Installation",
    department: "Maritime Authority",
    summary: "Install LED lighting across pier A and B with solar backup.",
    status: "published",
    statusLabel: "Open",
    time: "4 days ago",
    deadline: "Apr 12, 2025",
    bids: 8,
    milestones: 2,
  },

  // in-progress
  {
    id: 3,
    title: "Coastal Reinforcement",
    department: "Environmental Division",
    summary: "Reinforce coastline with gabions. Contractor mobilized.",
    status: "in-progress",
    statusLabel: "In Progress",
    time: "1 week ago",
    deadline: "May 10, 2025",
    bids: 20,
    milestones: 4,
  },

  // completed
  {
    id: 4,
    title: "Dock Reconstruction",
    department: "Property & Procurement",
    summary: "Full dock restoration and dredging, completed successfully.",
    status: "completed",
    statusLabel: "Completed",
    time: "Mar 01, 2025",
    deadline: "Mar 01, 2025",
    bids: 32,
    milestones: 5,
  },
];

export default function ProviderDashboardJobs() {
  const [activeTab, setActiveTab] = useState("published"); // published | inProgress | completed
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // future filter

  const filtered = useMemo(() => {
    let arr = MOCK.filter((j) => {
      if (activeTab === "published") return j.status === "published";
      if (activeTab === "inProgress") return j.status === "in-progress";
      if (activeTab === "completed") return j.status === "completed";
      return true;
    });

    if (query.trim()) {
      arr = arr.filter(
        (j) =>
          j.title.toLowerCase().includes(query.toLowerCase()) ||
          j.department.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter !== "all") {
      // placeholder if you add filters (e.g., bids>10)
    }

    return arr;
  }, [activeTab, query, filter]);

  // handlers (replace with real logic)
  const handleEdit = (job) => alert("Edit " + job.title);
  const handleView = (job) => alert("View " + job.title);
  const handleMessage = (job) => alert("Message about " + job.title);
  const handleMarkComplete = (job) => alert("Mark complete " + job.title);

  return (
    <div className="min-h-screen">
      <div className="px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-slate-800">My Jobs</h2>
            <JobTabs active={activeTab} setActive={setActiveTab} />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs or agencies..."
                className="pl-10 pr-3 py-2 rounded-full border bg-white text-sm w-64 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              onClick={() => setFilter((f) => (f === "all" ? "bids>10" : "all"))}
              className="px-3 py-2 rounded-md border text-sm flex items-center gap-2"
            >
              <FiFilter />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {filtered.length === 0 && (
            <div className="bg-white border rounded-xl p-6 text-center text-slate-600">
              No jobs found — try a different search or create a new job.
            </div>
          )}

          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onView={handleView}
              onMessage={handleMessage}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>

        {/* pagination (simple mock) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <button className="px-3 py-1 border rounded-md text-slate-500">Prev</button>
          <div className="px-3 py-1 border rounded-md bg-white">1</div>
          <div className="px-3 py-1 border rounded-md">2</div>
          <div className="px-3 py-1 border rounded-md">3</div>
          <button className="px-3 py-1 border rounded-md text-slate-500">Next</button>
        </div>
      </div>
    </div>
  );
}
