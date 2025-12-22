"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  User,
  ArrowLeft,
  Calendar,
  Briefcase,
  DollarSign,
} from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import useGetSingleBid from "@/app/hooks/dashboard/admin/bids/GetSingleBid";
import useGetUserWithEmail from "@/app/hooks/user/GetUserWithEmail";
import ProposeBidSection from "./ProposeBidSection";
import ManageBidSection from "./ManageBidSection";
import useUser from "@/app/hooks/user/userHook";

export default function BidDetailPage() {
  const params = useParams();
  const bidId = params.id;
  const { user } = useUser();

  const { singleBid, singleBidLoading } = useGetSingleBid(bidId);
  const { singleUser, singleUserLoading } = useGetUserWithEmail(
    singleBid?.employerEmail
  );

  const [activeSection, setActiveSection] = useState("overview");

  if (!singleBid) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-slate-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Bid Not Found
            </h1>
            <Link
              href="/pages/browse/bids"
              className="text-blue-500 hover:underline"
            >
              ← Back to Bids Listings
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const getBudgetTypeText = (type) => {
    switch (type?.toLowerCase()) {
      case "monthly":
        return "/month";
      case "hourly":
        return "/hour";
      case "fixed":
        return " fixed";
      default:
        return "";
    }
  };

  const getSection = () => {
    const section = [
      { id: "overview", label: "Overview", icon: "📋" },
      { id: "company", label: "Company Info", icon: "🏢" },
      { id: "applications", label: "Applications", icon: "📄" },
    ];

    if (user?.role === "employer" && user?.email === singleBid?.employerEmail) {
      section.push({ id: "management", label: "Management", icon: "🚀" });
    }

    return section;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-slate-50 to-white">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 md:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/pages/browse/bids"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Bids
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            {singleBid.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {singleBid.companyLocation || "Location not specified"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {singleBid.workTime || "Flexible hours"}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />${singleBid.budget}
              {getBudgetTypeText(singleBid.BudgetType)}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {singleBid.applicationCount || 0}/
              {singleBid.applicationLimit || 50} applications
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {timeLeft(singleBid.deadline)} left
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-8">
            <div className="flex flex-wrap gap-2">
              {getSection().map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition cursor-pointer ${
                    activeSection === section.id
                      ? "bg-blue-500 text-white"
                      : "text-slate-600 hover:text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Bid Description
                  </h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {singleBid.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {singleBid.requirements &&
                      singleBid.requirements.length > 0 ? (
                        singleBid.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-slate-700">{req}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-500">
                          No specific requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {singleBid.responsibilities &&
                      singleBid.responsibilities.length > 0 ? (
                        singleBid.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-slate-700">{resp}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-500">
                          No specific responsibilities
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {singleBid.skills && singleBid.skills.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {singleBid.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-slate-500" />
                      <h4 className="font-semibold text-slate-800">Job Type</h4>
                    </div>
                    <p className="text-slate-600 capitalize">
                      {singleBid.jobType || "Not specified"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-slate-500" />
                      <h4 className="font-semibold text-slate-800">
                        Project Duration
                      </h4>
                    </div>
                    <p className="text-slate-600">
                      {singleBid.ProjectDuration || "Not specified"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-slate-500" />
                      <h4 className="font-semibold text-slate-800">
                        Budget Type
                      </h4>
                    </div>
                    <p className="text-slate-600 capitalize">
                      {singleBid.BudgetType || "Fixed"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-slate-800">
                        Application Deadline
                      </h4>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {formatDate(singleBid.deadline)}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {timeLeft(singleBid.deadline)} remaining
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <h4 className="font-semibold text-slate-800">
                        Application Status
                      </h4>
                    </div>
                    <p className="text-slate-600 font-medium">
                      {singleBid.applicationCount || 0} out of{" "}
                      {singleBid.applicationLimit || 50} spots filled
                    </p>
                    <div className="mt-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              ((singleBid.applicationCount || 0) /
                                (singleBid.applicationLimit || 50)) *
                                100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Company Info Section */}
            {activeSection === "company" && (
              <div className="space-y-8">
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {singleBid.companyName}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {singleBid.companyLocation ||
                      "Company location not specified"}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-3 shadow-sm">
                      <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {singleBid.companyName?.charAt(0) || "C"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">
                            Company Name
                          </h4>
                          <p className="text-slate-600">
                            {singleBid.companyName}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-1">
                            Location
                          </h4>
                          <p className="text-slate-600">
                            {singleBid.companyLocation || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {singleUser && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">
                      Contact Person
                    </h3>

                    <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                      {singleUser.photo ? (
                        <img
                          src={singleUser.photo}
                          alt={singleUser.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {singleUser.name?.charAt(0) || "U"}
                        </div>
                      )}

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-800">
                          {singleUser.name}
                        </h4>
                        <p className="text-slate-600 mb-2">
                          {singleUser.headline || "Contact Person"}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          {singleUser.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {singleUser.location}
                            </div>
                          )}
                          {singleUser.review?.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {singleUser.review.rating} (
                              {singleUser.review.totalRatings || 0} reviews)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-700">
                          Contact Information
                        </h4>
                        <div className="space-y-3">
                          {singleUser.email && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">📧</span>
                              <span className="text-slate-600">
                                {singleUser.email}
                              </span>
                            </div>
                          )}
                          {singleUser.phone && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">📱</span>
                              <span className="text-slate-600">
                                {singleUser.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {singleUser.social && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-700">
                            Social Links
                          </h4>
                          <div className="space-y-2">
                            {singleUser.social.facebook && (
                              <a
                                href={singleUser.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                              >
                                Facebook
                              </a>
                            )}
                            {singleUser.social.instagram && (
                              <a
                                href={singleUser.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition"
                              >
                                Instagram
                              </a>
                            )}
                            {singleUser.social.linkedin && (
                              <a
                                href={singleUser.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
                              >
                                LinkedIn
                              </a>
                            )}
                            {singleUser.social.portfolio && (
                              <a
                                href={singleUser.social.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition"
                              >
                                Portfolio
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!singleUser && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">👤</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      Contact Information Not Available
                    </h3>
                    <p className="text-slate-600">
                      The contact details for this bid are not currently
                      available.
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Applications Section */}

            {activeSection === "applications" && (
              <ProposeBidSection
                singleBid={singleBid}
                timeLeft={timeLeft}
                getBudgetTypeText={getBudgetTypeText}
                formatDate={formatDate}
              />
            )}
            {/* Management Section */}

            {activeSection === "management" && (
              <ManageBidSection
                singleBid={singleBid}
                timeLeft={timeLeft}
                getBudgetTypeText={getBudgetTypeText}
                formatDate={formatDate}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
