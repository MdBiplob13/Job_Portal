"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import useGetUserWithUserName from "@/app/hooks/user/GetUserWithUserName";
import { useParams } from "next/navigation";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  Link as LinkIcon,
  Mail,
  Phone,
  Briefcase,
  Layers,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import useGetUserSkills from "@/app/hooks/user/skillsHook";
import useGetUserExperience from "@/app/hooks/user/experienceHook";
import useGetUserCertificates from "@/app/hooks/user/certificateHook";
import { FiAward, FiBriefcase } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

// --- START: NEW TAB COMPONENTS ---

// 1. Placeholder for Skills Tab Content (You will fill this with real data)
const SkillsTab = ({ skills }) => (
  <div>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FiAward className="text-blue-500" />
          Skills & Expertise
        </h3>
      </div>

      {/* SKILL LIST */}
      <div className="mt-6">
        {skills?.length > 0 ? (
          <div className="space-y-6 grid grid-cols-3 gap-5">
            {skills.map((skill) => (
              <div
                key={skill._id || skill.skillId || skill.skillName}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 "
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800 text-lg">
                        {skill.skillName}
                      </span>
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 cursor-pointer"
                      title="Delete skill"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, Number(skill.proficiency) || 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        )}
      </div>
    </div>
  </div>
);

// 2. Placeholder for Experience & Certificates Tab Content (You will fill this with real data)
const ExperienceCertificatesTab = ({ experiences, certificates }) => (
  <div>
    <div className="space-y-8">
      {/* =============================================================
              WORK EXPERIENCE SECTION
          ============================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiBriefcase className="text-blue-500" /> Work Experience
          </h3>
        </div>

        {/* Experience Items */}
        <div className="space-y-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div
                key={exp._id}
                className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:shadow-md transition group bg-white"
              >
                {/* Logo Box */}
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold">
                  {exp.company?.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800">
                    {exp.position}
                  </h4>
                  <p className="text-gray-600 font-medium">{exp.company}</p>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(exp.startDate).toLocaleDateString()} →{" "}
                    {new Date(exp.endDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No work experience added yet.
            </p>
          )}
        </div>
      </div>

      {/* =============================================================
              CERTIFICATES SECTION
          ============================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiAward className="text-blue-500" /> Certificates & Licenses
          </h3>
        </div>

        {/* Certificate Items */}
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <div
                key={cert._id}
                className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:shadow-md transition group bg-white"
              >
                {/* Logo Box */}
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold">
                  {cert.institute?.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800">
                    {cert.certificateName}
                  </h4>
                  <p className="text-gray-600 font-medium">{cert.institute}</p>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(cert.date).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteCertificate(cert._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-2 transition cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No certificates added yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

// --- END: NEW TAB COMPONENTS ---

// Component to render the correct content based on the active tab
const RenderTabContent = ({
  activeTab,
  singleUser,
  skills,
  experiences,
  certificates,
}) => {
  switch (activeTab) {
    case "Skills":
      return <SkillsTab skills={skills} />;
    case "Experience & Certificates":
      return (
        <ExperienceCertificatesTab
          experiences={experiences}
          certificates={certificates}
        />
      );
    case "Personal Details":
    default:
      // The existing Personal Details content block
      return (
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Personal Information
          </h2>

          {/* Bio */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Professional Summary
            </label>
            <div className="mt-2 p-4 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
              {singleUser.bio || "No bio provided."}
            </div>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <p className="mt-1 font-medium text-slate-800 text-lg">
                {singleUser.name}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Job Status
              </label>
              <p className="mt-1 font-medium text-slate-800 text-lg">
                {singleUser.currentJobStatus || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hourly Rate
              </label>
              <p className="mt-1 font-medium text-slate-800 text-lg">
                {singleUser.chargeParHour
                  ? `$${singleUser.chargeParHour}/hr`
                  : "Rate not set"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Location
              </label>
              <p className="mt-1 font-medium text-slate-800 text-lg">
                {singleUser.location || "Not set"}
              </p>
            </div>
          </div>
        </div>
      );
  }
};

export default function ViewUserProfile() {
  const params = useParams();
  const userName = params.userName;
  const { singleUser, userLoading } = useGetUserWithUserName(userName);
  // Fetch all skill + experiences + certificates
  const { skills } = useGetUserSkills(singleUser?._id);
  const { experiences } = useGetUserExperience(singleUser?._id);
  const { certificates } = useGetUserCertificates(singleUser?._id);

  // activeTab now controls which content area is shown
  const [activeTab, setActiveTab] = useState("Personal Details");

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (userLoading || !singleUser) {
    return (
      <div className="min-h-screen bg-[#dfdbdb] flex items-center justify-center">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  }

  const bannerImg =
    singleUser.banner ||
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop";
  const profileImg =
    singleUser.photo ||
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  return (
    <div className="min-h-screen bg-[#dfdbdb] pb-10">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* === HEADER CARD === */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-48 w-full relative">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Profile Image (Overlapping Banner) */}
              <div className="-mt-16 relative">
                <img
                  src={profileImg}
                  alt={singleUser.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>

              {/* Header Info */}
              <div className="flex-1 mt-4 md:mt-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                      {singleUser.name}
                    </h1>
                    <p className="text-slate-500 font-medium">
                      @{singleUser.userName}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">
                          {singleUser.review?.rating || 0}
                        </span>
                        <span>
                          ({singleUser.review?.totalRatings || 0} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>
                          {singleUser.job?.jobCompleted || 0} jobs completed
                        </span>
                      </div>
                    </div>

                    {/* Meta Info Row */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {singleUser.location || "Location not set"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {formatDate(singleUser.createDate)}
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-medium ${
                          singleUser.currentJobStatus === "Open to work"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {singleUser.currentJobStatus || "Status Unknown"}
                      </span>
                    </div>

                    {/* Headline */}
                    <p className="mt-4 text-slate-700">
                      {singleUser.headline || "No Headline provided."}
                    </p>
                  </div>

                  {/* ACTION BUTTON (Message) */}
                  <div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition shadow-sm cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS Navigation */}
          <div className="px-8 border-t border-slate-100">
            <div className="flex gap-8 overflow-x-auto">
              {["Personal Details", "Skills", "Experience & Certificates"].map(
                (tab) => (
                  <button
                    key={tab}
                    // *** CRITICAL CHANGE: Sets the activeTab state
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 text-sm font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (Tab Content) - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-6 cursor-pointer">
            {/* *** CRITICAL CHANGE: Renders the chosen content component *** */}
            <RenderTabContent
              activeTab={activeTab}
              singleUser={singleUser}
              skills={skills}
              experiences={experiences}
              certificates={certificates}
            />
          </div>

          {/* RIGHT COLUMN (Sidebar Info - unchanged) */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" /> Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm font-medium text-slate-800">
                        {singleUser.email}
                      </p>
                    </div>
                  </div>
                  {singleUser.verification?.email ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                      Unverified
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-sm font-medium text-slate-800">
                        {singleUser.phone || "Not Added"}
                      </p>
                    </div>
                  </div>
                  {singleUser.verification?.phone ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Languages (unchanged) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" /> Languages
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {singleUser.languages && singleUser.languages.length > 0 ? (
                  singleUser.languages.map((lang) => (
                    <div
                      key={lang._id}
                      className="flex flex-col bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm font-medium text-slate-800">
                        {lang.language}
                      </span>
                      <span className="text-xs text-slate-500">
                        {lang.proficiency || "Fluent"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    No languages added.
                  </p>
                )}
              </div>
            </div>

            {/* Social Links (unchanged) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-500" /> Social Links
              </h3>
              <div className="space-y-3">
                {singleUser.social?.facebook && (
                  <a
                    href={singleUser.social.facebook}
                    target="_blank"
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-lg"
                  >
                    <Facebook className="w-5 h-5" />{" "}
                    <span className="text-sm">Facebook</span>
                  </a>
                )}
                {singleUser.social?.linkedin && (
                  <a
                    href={singleUser.social.linkedin}
                    target="_blank"
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded-lg"
                  >
                    <Linkedin className="w-5 h-5" />{" "}
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {singleUser.social?.instagram && (
                  <a
                    href={singleUser.social.instagram}
                    target="_blank"
                    className="flex items-center gap-3 text-slate-600 hover:text-pink-600 transition p-2 hover:bg-pink-50 rounded-lg"
                  >
                    <Instagram className="w-5 h-5" />{" "}
                    <span className="text-sm">Instagram</span>
                  </a>
                )}
                {singleUser.social?.portfolio && (
                  <a
                    href={singleUser.social.portfolio}
                    target="_blank"
                    className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition p-2 hover:bg-emerald-50 rounded-lg"
                  >
                    <LinkIcon className="w-5 h-5" />{" "}
                    <span className="text-sm">Portfolio</span>
                  </a>
                )}

                {!singleUser.social?.facebook &&
                  !singleUser.social?.linkedin &&
                  !singleUser.social?.portfolio && (
                    <p className="text-sm text-slate-400 italic">
                      No social links added yet.
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
