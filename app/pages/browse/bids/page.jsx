"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { BsBag } from "react-icons/bs";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import useGetAllBids from "@/app/hooks/dashboard/admin/bids/GetAllBids";

const REGIONS = [ "Antigua and Barbuda", "Cameroon", "Bahamas", "Barbados", "Belize", "Cuba", "Dominica", "Dominican Republic", "Grenada", "Guyana", "Haiti", "Jamaica", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago" ];
const LANGUAGES = ["Any", "English", "Bangla"];
const BID_TYPES = ["remote", "full-time", "part-time", "contract", "hybrid", "on-site"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const POST_TIME = ["Any", "Last 24h", "Last 7 days", "Last 30 days"];
const BID_CATEGORIES = ["All", "Web Development", "Mobile Development", "Digital Marketing", "Graphic Design", "Content Writing", "Construction", "Consulting"];

export default function BrowseBids() {
  const { allBids, loading } = useGetAllBids();
  const [expandedBid, setExpandedBid] = useState(null);
  const [filters, setFilters] = useState({
    skill: "",
    region: "All",
    language: "Any",
    bidTypes: new Set(),
    minBudget: "",
    maxBudget: "",
    budgetType: "any",
    workDay: "Any",
    postTime: "Any",
    searchQuery: "",
    bidCategory: "All",
  });

  // Transform real bid data to match component structure
  const transformedBids = useMemo(() => {
    if (!allBids || allBids.length === 0) return [];
    
    return allBids.map(bid => ({
      id: bid._id,
      title: bid.title || "Untitled Bid",
      subtitle: bid.description || "No description available",
      company: bid.companyName || "Unknown Company",
      location: bid.companyLocation || "Location not specified",
      proposedBudget: bid.budget || 0,
      budgetType: bid.BudgetType?.toLowerCase() || "fixed",
      currentBids: bid.applicationCount || 0,
      maxBids: bid.applicationLimit || 50,
      skills: bid.skills || [],
      language: ["English"], // Default since not in data
      bidType: bid.jobType || "remote",
      postDate: bid.createdAt || new Date().toISOString(),
      applyDeadline: bid.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      totalApplications: bid.applicationCount || 0,
      totalHiring: 1,
      posterName: bid.employerEmail ? bid.employerEmail.split('@')[0] : "Anonymous",
      posterAvatar: `https://xsgames.co/randomusers/assets/avatars/male/${Math.floor(Math.random() * 70)}.jpg`,
      description: bid.description || "No description available",
      workTime: bid.workTime || "Flexible",
      workDays: "Any",
      searchType: "Tenders",
      projectDuration: bid.ProjectDuration || "Not specified",
      bidCategory: "All",
      requirements: bid.requirements || [],
      responsibilities: bid.responsibilities || [],
      status: bid.status || "pending",
      price: bid.price || 0
    }));
  }, [allBids]);

  const toggleBidType = (type) => {
    setFilters((prev) => {
      const copy = { ...prev };
      const set = new Set(copy.bidTypes);
      if (set.has(type)) set.delete(type);
      else set.add(type);
      copy.bidTypes = set;
      return copy;
    });
  };

  const filteredBids = useMemo(() => {
    return transformedBids.filter((bid) => {
      // Skill filter
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = bid.title.toLowerCase().includes(q);
        const inSkills = bid.skills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }
      
      // Search query filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!bid.title.toLowerCase().includes(q) && !bid.company.toLowerCase().includes(q))
          return false;
      }
      
      // Region filter
      if (filters.region !== "All" && bid.location !== filters.region) return false;
      
      // Language filter
      if (filters.language !== "Any" && !bid.language.includes(filters.language)) return false;
      
      // Bid types filter
      if (filters.bidTypes.size > 0 && !filters.bidTypes.has(bid.bidType)) return false;
      
      // Budget type filter
      if (filters.budgetType !== "any" && bid.budgetType !== filters.budgetType) return false;
      
      // Budget range filter
      if (filters.minBudget && bid.proposedBudget < Number(filters.minBudget)) return false;
      if (filters.maxBudget && bid.proposedBudget > Number(filters.maxBudget)) return false;
      
      // Work day filter
      if (filters.workDay !== "Any" && bid.workDays !== filters.workDay) return false;
      
      // Bid category filter
      if (filters.bidCategory !== "All" && bid.bidCategory !== filters.bidCategory) return false;
      
      // Post time filter
      if (filters.postTime !== "Any") {
        const ageMs = Date.now() - new Date(bid.postDate).getTime();
        if (filters.postTime === "Last 24h" && ageMs > 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 7 days" && ageMs > 7 * 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 30 days" && ageMs > 30 * 24 * 60 * 60 * 1000) return false;
      }
      
      return true;
    });
  }, [transformedBids, filters]);

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const BidCard = ({ bid }) => (
    <Link href={`/pages/browse/bids/${bid.id}`} className="block">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800">{bid.title}</h3>
            <p className="text-slate-600 text-sm mb-2 line-clamp-2">{bid.subtitle}</p>
            <p className="text-slate-500 text-sm">{bid.company} • {bid.location}</p>
          </div>
          <div className="ml-4">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              bid.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : bid.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {bid.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-slate-800">
              {bid.budgetType === "fixed"
                ? `$${bid.proposedBudget.toLocaleString()}`
                : `$${bid.proposedBudget.toLocaleString()}/${bid.budgetType}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{bid.currentBids}/{bid.maxBids} bids</span>
          </div>

          {/* Project Duration */}
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{bid.projectDuration}</span>
          </div>
          
          {/* Work Type */}
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm capitalize">{bid.bidType.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {bid.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
            >
              {skill}
            </span>
          ))}
          {bid.skills.length > 3 && (
            <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              +{bid.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Posted {formatDate(bid.postDate)}</span>
          <div className="flex items-center gap-4">
            <span className="capitalize">{bid.bidType.replace('-', ' ')}</span>
            <span className="text-orange-600 font-medium">{timeLeft(bid.applyDeadline)} left</span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#dfdbdb]">
        <Navbar />
        <div className="max-w-6xl mx-auto mt-8 mb-16 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#dfdbdb]">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 mb-16 ">
        {/* HERO SECTION */}
      <section className="text-center py-16 px-6  to-transparent rounded-b-3xl shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Browse Tenders & Bids</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Discover exciting tender opportunities and submit your bids. Find projects that match your expertise and grow your business.
        </p>
      </section>

      <div className="px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* FILTERS SIDEBAR */}
          <aside className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 h-fit">
            <div className="flex items-center gap-2 mb-5">
              <Filter className="text-primary" />
              <h2 className="text-lg font-semibold text-slate-800">Filter Bids</h2>
            </div>

            <div className="space-y-5">
              {/* Skill */}
              <div>
                <label className="block text-sm font-medium mb-2">Skill</label>
                <input
                  value={filters.skill}
                  onChange={(e) => setFilters((p) => ({ ...p, skill: e.target.value }))}
                  type="text"
                  placeholder="e.g. React, SEO, Design"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Bid Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Bid Category</label>
                <select
                  value={filters.bidCategory}
                  onChange={(e) => setFilters((p) => ({ ...p, bidCategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {BID_CATEGORIES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium mb-2">Region</label>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters((p) => ({ ...p, region: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {REGIONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters((p) => ({ ...p, language: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Bid Types */}
              <div>
                <label className="block text-sm font-medium mb-2">Bid Type</label>
                <div className="flex flex-wrap gap-2">
                  {BID_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleBidType(t)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        filters.bidTypes.has(t)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {t.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium mb-2">Budget Range</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={filters.minBudget}
                    onChange={(e) => setFilters((p) => ({ ...p, minBudget: e.target.value }))}
                    type="number"
                    placeholder="Min"
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                  />
                  <input
                    value={filters.maxBudget}
                    onChange={(e) => setFilters((p) => ({ ...p, maxBudget: e.target.value }))}
                    type="number"
                    placeholder="Max"
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                  />
                </div>
                <select
                  value={filters.budgetType}
                  onChange={(e) => setFilters((p) => ({ ...p, budgetType: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="any">Any Type</option>
                  <option value="fixed">Fixed Price</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>

              {/* Work Day */}
              <div>
                <label className="block text-sm font-medium mb-2">Work Days</label>
                <select
                  value={filters.workDay}
                  onChange={(e) => setFilters((p) => ({ ...p, workDay: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {WORK_DAYS.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Post Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Post Time</label>
                <select
                  value={filters.postTime}
                  onChange={(e) => setFilters((p) => ({ ...p, postTime: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {POST_TIME.map((pt) => (
                    <option key={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={() =>
                  setFilters({
                    skill: "",
                    region: "All",
                    language: "Any",
                    bidTypes: new Set(),
                    minBudget: "",
                    maxBudget: "",
                    budgetType: "any",
                    workDay: "Any",
                    postTime: "Any",
                    searchQuery: "",
                    bidCategory: "All",
                  })
                }
                className="w-full py-2 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-xl font-medium shadow hover:from-blue-600 hover:to-blue-800 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* BID LISTINGS */}
          <section className="md:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-slate-800">Available Tenders</h2>
              <span className="text-sm text-slate-500">{filteredBids.length} bids</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredBids.length > 0 ? (
                filteredBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))
              ) : transformedBids.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 text-center text-slate-500 shadow">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Bids Available</h3>
                  <p className="text-slate-600">There are no active bids at the moment.</p>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-12 text-center text-slate-500 shadow">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No bids match your filters</h3>
                  <p className="text-slate-600">Try adjusting your search criteria or clear filters.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}