"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Filter, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { BsBag } from "react-icons/bs";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";

const MOCK_BIDS = [
  {
    id: 1,
    title: "Website Development for E-commerce Platform",
    subtitle: "Full-stack E-commerce Solution",
    company: "Retail Solutions Ltd",
    location: "Dhaka, Bangladesh",
    proposedBudget: 500000,
    budgetType: "fixed",
    currentBids: 8,
    maxBids: 15,
    skills: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    language: ["English", "Bangla"],
    bidType: "full-project",
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 24,
    totalHiring: 1,
    posterName: "A. Rahman",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "We need a complete e-commerce platform with admin panel, user management, and payment integration.",
    workTime: "Flexible",
    workDays: "Mon-Fri",
    searchType: "Tenders",
    projectDuration: "3 months",
    bidCategory: "Web Development"
  },
  {
    id: 2,
    title: "Mobile App Development - Food Delivery",
    subtitle: "iOS & Android Application",
    company: "FoodExpress",
    location: "Remote",
    proposedBudget: 300000,
    budgetType: "fixed",
    currentBids: 12,
    maxBids: 20,
    skills: ["React Native", "Firebase", "Google Maps API"],
    language: ["English"],
    bidType: "remote",
    postDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 56,
    totalHiring: 1,
    posterName: "S. Karim",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Looking for experienced mobile app developers to create a food delivery app for both iOS and Android platforms.",
    workTime: "Flexible",
    workDays: "Any",
    searchType: "Tenders",
    projectDuration: "4 months",
    bidCategory: "Mobile Development"
  },
  {
    id: 3,
    title: "Digital Marketing Campaign",
    subtitle: "Social Media Marketing & SEO",
    company: "Growth Hackers Inc",
    location: "Chittagong, Bangladesh",
    proposedBudget: 150000,
    budgetType: "fixed",
    currentBids: 5,
    maxBids: 10,
    skills: ["SEO", "Social Media", "Content Marketing", "Google Ads"],
    language: ["Bangla"],
    bidType: "part-time",
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 8,
    totalHiring: 1,
    posterName: "M. Noor",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Comprehensive digital marketing campaign including social media management and SEO optimization.",
    workTime: "10:00 - 18:00",
    workDays: "Mon-Sat",
    searchType: "Tenders",
    projectDuration: "6 months",
    bidCategory: "Digital Marketing"
  },
];

const REGIONS = [ "Antigua and Barbuda", "Cameroon", "Bahamas", "Barbados", "Belize", "Cuba", "Dominica", "Dominican Republic", "Grenada", "Guyana", "Haiti", "Jamaica", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago" ];
const LANGUAGES = ["Any", "English", "Bangla"];
const BID_TYPES = ["full-project", "remote", "part-time", "contract"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const POST_TIME = ["Any", "Last 24h", "Last 7 days", "Last 30 days"];
const BID_CATEGORIES = ["All", "Web Development", "Mobile Development", "Digital Marketing", "Graphic Design", "Content Writing"];

export default function BrowseBids() {
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
    return MOCK_BIDS.filter((bid) => {
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = bid.title.toLowerCase().includes(q);
        const inSkills = bid.skills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!bid.title.toLowerCase().includes(q) && !bid.company.toLowerCase().includes(q))
          return false;
      }
      if (filters.region !== "All" && bid.location !== filters.region) return false;
      if (filters.language !== "Any" && !bid.language.includes(filters.language)) return false;
      if (filters.bidTypes.size > 0 && !filters.bidTypes.has(bid.bidType)) return false;
      if (filters.budgetType !== "any" && bid.budgetType !== filters.budgetType) return false;
      if (filters.minBudget && bid.proposedBudget < Number(filters.minBudget)) return false;
      if (filters.maxBudget && bid.proposedBudget > Number(filters.maxBudget)) return false;
      if (filters.workDay !== "Any" && bid.workDays !== filters.workDay) return false;
      if (filters.bidCategory !== "All" && bid.bidCategory !== filters.bidCategory) return false;
      if (filters.postTime !== "Any") {
        const ageMs = Date.now() - new Date(bid.postDate).getTime();
        if (filters.postTime === "Last 24h" && ageMs > 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 7 days" && ageMs > 7 * 24 * 60 * 60 * 1000) return false;
        if (filters.postTime === "Last 30 days" && ageMs > 30 * 24 * 60 * 60 * 1000) return false;
      }
      return true;
    });
  }, [filters]);

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const BidCard = ({ bid }) => (
    <Link href={`/pages/browse/bids/${bid.id}`} className="block">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800">{bid.title}</h3>
            <p className="text-slate-600 text-sm mb-2">{bid.subtitle}</p>
            <p className="text-slate-500 text-sm">{bid.company} • {bid.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-slate-800">
              {bid.budgetType === "fixed"
                ? `৳${bid.proposedBudget.toLocaleString()}`
                : `৳${bid.proposedBudget.toLocaleString()}/mo`}
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

          {/* Bid Category */}
          <div className="flex items-center gap-2 text-slate-600">
            <BsBag className="w-4 h-4" />
            <span className="text-sm font-medium text-primary">{bid.bidCategory}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {bid.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 bg-blue-100 text-secondary rounded-full"
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
          <span>Posted {new Date(bid.postDate).toLocaleDateString()}</span>
          <div className="flex items-center gap-4">
            <span className="capitalize">{bid.bidType.replace('-', ' ')}</span>
            <span className="text-orange-600 font-medium">{timeLeft(bid.applyDeadline)} left</span>
          </div>
        </div>
      </div>
    </Link>
  );

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
                          ? "bg-primary text-white border-primary"
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
                className="w-full py-2 bg-linear-to-r from-blue-500 to-primary text-white rounded-xl font-medium shadow hover:from-primary hover:to-blue-700 transition"
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
              {filteredBids.map((bid) => (
                <BidCard key={bid.id} bid={bid} />
              ))}
            </div>

            {filteredBids.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
                No bids match your filters.
              </div>
            )}
          </section>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
}