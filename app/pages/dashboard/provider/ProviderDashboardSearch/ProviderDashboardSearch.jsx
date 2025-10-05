// app/provider-dashboard/search/page.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* -------------------------
  Mock data
--------------------------*/
const mockJobs = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: [
    "Port Infrastructure Upgrade",
    "Coastal Erosion Study",
    "Harbour Lighting Retrofit",
    "Dock Reconstruction",
    "Wastewater Treatment Design",
    "Security Systems Tender",
    "Fuel Storage Rehab",
    "Navigation System Install",
  ][i],
  org: ["Dept of Transport","Maritime Authority","Coast Guard","Procurement Dept","Water Authority","Safety Board","Ports Ltd","Harbour Mgmt"][i],
  snippet: "Short description lorem ipsum about scope and deliverables for this project...",
  bids: 20 + i * 4,
  views: 120 + i * 10,
  time: `${i + 1} day ago`,
}));

const mockPeople = new Array(12).fill(0).map((_, i) => ({
  id: i + 1,
  name: ["Lauren Hasbiah","Marcus Elton","Rita Gomez","Samuel Lee","Amala Rao","John Doe","Jane Smith","Farid Khan","Emmanuel","Olivia","Noah","Maya"][i % 12],
  role: i % 2 === 0 ? "Consultant" : "Engineer",
  location: ["Colombia","Jamaica","Trinidad & Tobago","Bahamas","Barbados","Guyana","St. Lucia","Belize","Grenada","Antigua","Haiti","Dominica"][i % 12],
  bio: "Short intro line — experienced professional with relevant expertise in maritime and civil projects.",
}));

/* -------------------------
  Shared UI: ResultCard for People
--------------------------*/
function PersonCard({ person }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition">
      <div className="w-14 h-14 rounded-full overflow-hidden border">
        <Image src="/user1.jpeg" alt={person.name} width={56} height={56} className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-slate-800">{person.name}</div>
            <div className="text-xs text-slate-500">{person.role}</div>
          </div>
          <div className="text-xs text-slate-400">{person.location}</div>
        </div>
        <p className="text-sm text-slate-500 mt-2">{person.bio}</p>
      </div>
    </div>
  );
}

/* -------------------------
  Jobs card
--------------------------*/
function JobCard({ job }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-800">{job.title}</h4>
          <div className="text-xs text-slate-500">{job.org}</div>
          <p className="text-sm text-slate-500 mt-2">{job.snippet}</p>
        </div>

        <div className="text-right text-xs text-slate-400">
          <div>{job.time}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-slate-500 border-t pt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18"/></svg>
            <span>{job.bids} Bids</span>
          </div>

          <div className="flex items-center gap-2">
            <FiSearch className="text-slate-400" />
            <span>{job.views} Views</span>
          </div>
        </div>

        <button className="px-3 py-1 border rounded-full text-xs text-blue-600 hover:bg-blue-50">View</button>
      </div>
    </div>
  );
}

/* -------------------------
  JobsSearch component
--------------------------*/
export function JobsSearch({ query }) {
  // basic filtered list (mock)
  const results = mockJobs.filter(j => !query || j.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-2">Search Results for Jobs</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map(job => <JobCard key={job.id} job={job} />)}
      </div>

      {/* pagination (mock) */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button className="p-2 rounded-md border text-slate-500"><FiChevronLeft/></button>
        <div className="px-3 py-1 border rounded-md bg-white">1</div>
        <div className="px-3 py-1 border rounded-md">2</div>
        <div className="px-3 py-1 border rounded-md">3</div>
        <button className="p-2 rounded-md border text-slate-500"><FiChevronRight/></button>
      </div>
    </div>
  );
}

/* -------------------------
  CustomersSearch component
--------------------------*/
export function CustomersSearch({ query }) {
  const results = mockPeople.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-2">Search Results for Customers</div>

      <div className="grid grid-cols-1 gap-3">
        {results.map(p => <PersonCard key={p.id} person={p} />)}
      </div>

      <div className="flex items-center justify-center mt-6 gap-2">
        <button className="p-2 rounded-md border text-slate-500"><FiChevronLeft/></button>
        <div className="px-3 py-1 border rounded-md bg-white">1</div>
        <div className="px-3 py-1 border rounded-md">2</div>
        <div className="px-3 py-1 border rounded-md">3</div>
        <button className="p-2 rounded-md border text-slate-500"><FiChevronRight/></button>
      </div>
    </div>
  );
}

/* -------------------------
  ProvidersSearch component
--------------------------*/
export function ProvidersSearch({ query }) {
  // same layout as customers; separate component so you can change later
  const results = mockPeople.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-2">Search Results for Providers</div>

      <div className="grid grid-cols-1 gap-3">
        {results.map(p => <PersonCard key={p.id} person={p} />)}
      </div>

      <div className="flex items-center justify-center mt-6 gap-2">
        <button className="p-2 rounded-md border text-slate-500"><FiChevronLeft/></button>
        <div className="px-3 py-1 border rounded-md bg-white">1</div>
        <div className="px-3 py-1 border rounded-md">2</div>
        <div className="px-3 py-1 border rounded-md">3</div>
        <button className="p-2 rounded-md border text-slate-500"><FiChevronRight/></button>
      </div>
    </div>
  );
}

/* -------------------------
  Main Search Page (tabs + search bar)
--------------------------*/
export default function ProviderDashboardSearch() {
  const [tab, setTab] = useState("jobs"); // jobs | customers | providers
  const [q, setQ] = useState("");

  return (
    <div className="flex gap-6">
      {/* Sidebar placeholder (if you have a fixed sidebar in layout, remove this) */}
      <div className="hidden lg:block w-64" />

      {/* Main area */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg p-4 mb-6 border shadow-sm">
          {/* Top row: heading + search */}
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Search</h2>

            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search your jobs..."
                  className="w-full pl-10 pr-3 py-2 border rounded-full bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setTab("jobs")}
                className={`px-3 py-2 rounded-md text-sm ${tab === "jobs" ? "bg-blue-600 text-white" : "bg-white border"}`}
              >
                Jobs
              </button>
              <button
                onClick={() => setTab("customers")}
                className={`px-3 py-2 rounded-md text-sm ${tab === "customers" ? "bg-blue-600 text-white" : "bg-white border"}`}
              >
                Customers
              </button>
              <button
                onClick={() => setTab("providers")}
                className={`px-3 py-2 rounded-md text-sm ${tab === "providers" ? "bg-blue-600 text-white" : "bg-white border"}`}
              >
                Providers
              </button>

              <button className="p-2 rounded-md border ml-2" title="Filters">
                <FiFilter />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {tab === "jobs" && <JobsSearch query={q} />}
          {tab === "customers" && <CustomersSearch query={q} />}
          {tab === "providers" && <ProvidersSearch query={q} />}
        </div>
      </div>
    </div>
  );
}
