"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState, useMemo } from "react";
import { Filter, MapPin, DollarSign, Star, Briefcase, User } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";

const MOCK_PROFESSIONALS = [
  {
    id: 1,
    name: "John Anderson",
    title: "Senior Construction Project Manager",
    rating: 4.9,
    totalReviews: 127,
    jobsCompleted: 89,
    responseRate: 98,
    hourlyRate: "$85/hr",
    location: "New York, NY",
    skills: ["Project Management", "Budget Planning", "Team Leadership", "Construction Safety"],
    languages: ["English", "Spanish"],
    joinDate: "Member since March 2018",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg",
    description: "Experienced project manager specializing in large-scale construction projects with over 8 years in the industry.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    title: "Full-Stack Developer",
    rating: 4.8,
    totalReviews: 95,
    jobsCompleted: 67,
    responseRate: 96,
    hourlyRate: "$75/hr",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "Python", "AWS"],
    languages: ["English", "French"],
    joinDate: "Member since January 2020",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
    description: "Passionate full-stack developer with expertise in modern web technologies and cloud platforms.",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "UI/UX Designer",
    rating: 4.7,
    totalReviews: 83,
    jobsCompleted: 54,
    responseRate: 94,
    hourlyRate: "$65/hr",
    location: "Austin, TX",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    languages: ["English", "Mandarin"],
    joinDate: "Member since June 2019",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
    description: "Creative UI/UX designer focused on creating intuitive and beautiful user experiences.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    title: "Digital Marketing Specialist",
    rating: 4.6,
    totalReviews: 72,
    jobsCompleted: 45,
    responseRate: 92,
    hourlyRate: "$55/hr",
    location: "Miami, FL",
    skills: ["SEO", "Social Media", "Google Ads", "Analytics"],
    languages: ["English", "Spanish"],
    joinDate: "Member since September 2021",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/4.jpg",
    description: "Results-driven digital marketing expert with proven track record in growing online presence.",
  },
  {
    id: 5,
    name: "David Kim",
    title: "Data Scientist",
    rating: 4.9,
    totalReviews: 108,
    jobsCompleted: 76,
    responseRate: 97,
    hourlyRate: "$95/hr",
    location: "Seattle, WA",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    languages: ["English", "Korean"],
    joinDate: "Member since February 2019",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Data science expert specializing in machine learning and predictive analytics for business solutions.",
  },
];

const REGIONS = ["All", "New York, NY", "San Francisco, CA", "Austin, TX", "Miami, FL", "Seattle, WA", "Remote"];
const LANGUAGES = ["Any", "English", "Spanish", "French", "Mandarin", "Korean"];
const SKILL_CATEGORIES = ["Development", "Design", "Marketing", "Management", "Data Science"];

export default function SearchProfessionals() {
  const [filters, setFilters] = useState({
    skill: "",
    region: "All",
    language: "Any",
    skillCategory: "Any",
    minRate: "",
    maxRate: "",
    searchQuery: "",
  });

  const filteredProfessionals = useMemo(() => {
    return MOCK_PROFESSIONALS.filter((professional) => {
      if (filters.skill) {
        const q = filters.skill.toLowerCase();
        const inTitle = professional.title.toLowerCase().includes(q);
        const inSkills = professional.skills.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inSkills) return false;
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (!professional.name.toLowerCase().includes(q) && !professional.title.toLowerCase().includes(q))
          return false;
      }
      if (filters.region !== "All" && professional.location !== filters.region) return false;
      if (filters.language !== "Any" && !professional.languages.includes(filters.language)) return false;
      if (filters.minRate) {
        const rate = parseInt(professional.hourlyRate.replace(/[^0-9]/g, ''));
        if (rate < Number(filters.minRate)) return false;
      }
      if (filters.maxRate) {
        const rate = parseInt(professional.hourlyRate.replace(/[^0-9]/g, ''));
        if (rate > Number(filters.maxRate)) return false;
      }
      return true;
    });
  }, [filters]);

  const ProfessionalCard = ({ professional }) => (
    <Link href={`/pages/dashboard/provider/providerProfile`} className="block">
      <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={professional.avatar} 
            alt={professional.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800">{professional.name}</h3>
            <p className="text-slate-600 text-sm mb-2">{professional.title}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {professional.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {professional.rating} ({professional.totalReviews} reviews)
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4" />
            <span className="font-semibold text-slate-800">{professional.hourlyRate}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{professional.jobsCompleted} jobs completed</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {professional.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full"
            >
              {skill}
            </span>
          ))}
          {professional.skills.length > 3 && (
            <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              +{professional.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{professional.joinDate}</span>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
            Contract Now
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-blue-100 to-transparent rounded-b-3xl shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">Find Professionals</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Connect with skilled professionals and experts in various fields. Find the perfect match for your project.
        </p>
      </section>

      <div className="px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* FILTERS SIDEBAR */}
          <aside className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 h-fit">
            <div className="flex items-center gap-2 mb-5">
              <Filter className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Filter Professionals</h2>
            </div>

            <div className="space-y-5">
              {/* Search Query */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
                  type="text"
                  placeholder="Search professionals..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Skill */}
              <div>
                <label className="block text-sm font-medium mb-2">Skill</label>
                <input
                  value={filters.skill}
                  onChange={(e) => setFilters((p) => ({ ...p, skill: e.target.value }))}
                  type="text"
                  placeholder="e.g. React, Design"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
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

              {/* Skill Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Skill Category</label>
                <select
                  value={filters.skillCategory}
                  onChange={(e) => setFilters((p) => ({ ...p, skillCategory: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {SKILL_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block text-sm font-medium mb-2">Hourly Rate</label>
                <div className="flex gap-2">
                  <input
                    value={filters.minRate}
                    onChange={(e) => setFilters((p) => ({ ...p, minRate: e.target.value }))}
                    type="number"
                    placeholder="Min $"
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                  />
                  <input
                    value={filters.maxRate}
                    onChange={(e) => setFilters((p) => ({ ...p, maxRate: e.target.value }))}
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
                    skillCategory: "Any",
                    minRate: "",
                    maxRate: "",
                    searchQuery: "",
                  })
                }
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow hover:from-blue-600 hover:to-blue-700 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* PROFESSIONAL LISTINGS */}
          <section className="md:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-slate-800">Professional Profiles</h2>
              <span className="text-sm text-slate-500">{filteredProfessionals.length} professionals</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center text-slate-500 shadow">
                No professionals match your filters.
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
