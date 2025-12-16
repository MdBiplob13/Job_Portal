"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { Filter, MapPin, DollarSign, Star, Briefcase } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import useAllUsers from "@/app/hooks/user/GetAllUser";
import { ClipLoader } from "react-spinners"; // Assuming you have this installed

const REGIONS = [
  "Antigua and Barbuda",
  "Cameroon",
  "Bahamas",
  "Barbados",
  "Belize",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Guyana",
  "Haiti",
  "Jamaica",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
  "Bangladesh", // Added based on your location
];

const LANGUAGES = [
  "Any",
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Korean",
  "Bengali",
];

export default function SearchProfessionals() {
  // 1. Get real data from your hook
  const { allUsers, allUsersLoading } = useAllUsers();

  const [filters, setFilters] = useState({
    skill: "",
    region: "All",
    language: "Any",
    minRate: "",
    maxRate: "",
    searchQuery: "",
    // Removed skillCategory
  });

  // 2. Filter Logic based on REAL data structure
  const filteredProfessionals = useMemo(() => {
    // If data is loading or empty, return empty array
    if (!allUsers) return [];

    return allUsers.filter((user) => {
      // OPTIONAL: Filter out "employers" if you only want to show freelancers
      // if (user.role === "employer") return false;

      // Search by Name or Headline (Title)
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const nameMatch = user.name?.toLowerCase().includes(q);
        const headlineMatch = user.headline?.toLowerCase().includes(q);
        if (!nameMatch && !headlineMatch) return false;
      }

      // Filter by Specific Skill
      // Note: Your log didn't show a 'skills' array, so I'm searching 'headline' or 'bio' for now.
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inHeadline = user.headline?.toLowerCase().includes(q);
        const inBio = user.bio?.toLowerCase().includes(q);
        // If you add a skills array to your backend later, add: user.skills.some(...)
        if (!inHeadline && !inBio) return false;
      }

      // Filter by Region (Location)
      if (filters.region !== "All") {
        // Safe check in case location is null
        if (!user.location || !user.location.includes(filters.region))
          return false;
      }

      // Filter by Language
      if (filters.language !== "Any") {
        if (!user.languages || !user.languages.includes(filters.language))
          return false;
      }

      // Filter by Hourly Rate (chargeParHour is a number in your DB)
      if (filters.minRate) {
        if (user.chargeParHour < Number(filters.minRate)) return false;
      }
      if (filters.maxRate) {
        if (user.chargeParHour > Number(filters.maxRate)) return false;
      }

      return true;
    });
  }, [filters, allUsers]);

  // 3. Card Component mapped to Real Data
  const ProfessionalCard = ({ professional }) => {
    // Format Date (e.g., "2025-11-28..." to "Nov 2025")
    const dateStr = new Date(professional.createDate).toLocaleDateString(
      "en-US",
      { month: "short", year: "numeric" }
    );

    // Default Avatar if photo is null
    const avatarUrl =
      professional.photo ||
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

    return (
      <Link href={`/pages/viewUser/${professional.userName}`} className="block">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={avatarUrl}
              alt={professional.name}
              className="w-16 h-16 rounded-full object-cover border border-slate-200"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800">
                {professional.name}
              </h3>
              {/* Fallback if headline is null */}
              <p className="text-slate-600 text-sm mb-2">
                {professional.headline || "Open to work"}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {/* Fallback if location is null */}
                  {professional.location || "Remote"}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {/* Access nested objects safely with ?. */}
                  {professional.review?.rating || 0} (
                  {professional.review?.totalRatings || 0} reviews)
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-slate-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold text-slate-800">
                ${professional.chargeParHour}/hr
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">
                {professional.job?.jobCompleted || 0} jobs completed
              </span>
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {professional.languages && professional.languages.length > 0 ? (
              professional.languages.slice(0, 3).map((lang) => (
                <span
                  key={lang._id} 
                  className="text-xs px-3 py-1 bg-green-100 text-secondary rounded-full"
                >
                  {lang.language}
                </span>
              ))
            ) : (
              <span className="text-xs px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                No skills listed
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Member since {dateStr}
            </span>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition font-medium">
              Contract Now
            </button>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#dfdbdb]">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-8 mb-16 ">
        {/* HERO SECTION */}
        <section className="text-center py-16 px-6 rounded-b-3xl shadow-inner">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            Find freelancers
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Connect with skilled professionals and experts in various fields.
            Find the perfect match for your project.
          </p>
        </section>

        <div className="px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* FILTERS SIDEBAR */}
            <aside className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 h-fit">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="text-primary" />
                <h2 className="text-lg font-semibold text-slate-800">
                  Filter Professionals
                </h2>
              </div>

              <div className="space-y-5">
                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search
                  </label>
                  <input
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, searchQuery: e.target.value }))
                    }
                    type="text"
                    placeholder="Name or Title..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Skill */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill
                  </label>
                  <input
                    value={filters.skill}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, skill: e.target.value }))
                    }
                    type="text"
                    placeholder="e.g. React"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Region
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, region: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="All">All Regions</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, language: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* REMOVED SKILL CATEGORY SECTION HERE */}

                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Hourly Rate
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={filters.minRate}
                      onChange={(e) =>
                        setFilters((p) => ({ ...p, minRate: e.target.value }))
                      }
                      type="number"
                      placeholder="Min $"
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                    />
                    <input
                      value={filters.maxRate}
                      onChange={(e) =>
                        setFilters((p) => ({ ...p, maxRate: e.target.value }))
                      }
                      type="number"
                      placeholder="Max $"
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                    />
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() =>
                    setFilters({
                      skill: "",
                      region: "All",
                      language: "Any",
                      minRate: "",
                      maxRate: "",
                      searchQuery: "",
                    })
                  }
                  className="w-full py-2 bg-linear-to-r from-blue-500 to-primary text-white rounded-xl font-medium shadow hover:from-primary hover:to-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            </aside>

            {/* PROFESSIONAL LISTINGS */}
            <section className="md:col-span-3 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Professional Profiles
                </h2>
                <span className="text-sm text-slate-500">
                  {filteredProfessionals.length} professionals
                </span>
              </div>

              {/* Loading State */}
              {allUsersLoading ? (
                <div className="flex justify-center items-center py-20">
                  <ClipLoader color="#2563EB" size={50} />
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProfessionals.map((user) => (
                    <ProfessionalCard key={user?._id} professional={user} />
                  ))}
                </div>
              )}

              {/* No Results State */}
              {!allUsersLoading && filteredProfessionals.length === 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
                  No professionals match your filters.
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
