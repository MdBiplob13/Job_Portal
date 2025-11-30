"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState } from "react";
import { MapPin, Clock, Users, Star, User, ArrowLeft } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import useGetSingleJobWithId from "@/app/hooks/dashboard/admin/GetSingleJobWithId";
import useGetUserWithEmail from "@/app/hooks/user/GetUserWithEmail";

export default function JobDetailPage() {
  const params = useParams();

  const { job, jobLoading } = useGetSingleJobWithId(params.id);
  const { singleUser, singleUserLoading } = useGetUserWithEmail(
    job?.employerEmail
  );

  console.log(singleUser);

  const [activeSection, setActiveSection] = useState("overview");

  if (!job) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 via-slate-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Job Not Found
            </h1>
            <Link
              href="/pages/browse/jobs"
              className="text-primary hover:underline"
            >
              ← Back to Job Listings
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const sections = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "employer", label: "Employer Info", icon: "👤" },
    { id: "bids", label: "Current Bids", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-slate-50 to-white">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 md:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/pages/browse/jobs"
              className="flex items-center gap-2 text-slate-600 hover:text-primary transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.companyLocation}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.workTime}
            </div>
            <div className="flex items-center gap-1">
              {job.priceType === "hourly"
                ? `$${job.salary}/hr`
                : job.priceType === "monthly"
                ? `$${job.salary}/mo`
                : `$${job.salary}/yr`}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.applicationCount}/{job.applicationLimit} bids
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-8">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                    activeSection === section.id
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:text-primary hover:bg-blue-50"
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
                    Job Description
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-slate-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-blue-100 text-secondary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Job Type
                    </h4>
                    <p className="text-slate-600 capitalize">{job.jobType}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Work Days
                    </h4>
                    <p className="text-slate-600">{job.workDays}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Languages
                    </h4>
                    <p className="text-slate-600">{job.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* employer Info Section */}
            {activeSection === "employer" && singleUser && (
              <div className="space-y-8">
                {/* TOP SECTION */}
                <div className="flex items-center gap-6">
                  <img
                    src={singleUser.photo || "/default-avatar.png"}
                    alt={singleUser.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {singleUser.name}
                    </h2>

                    {/* Headline OR Role */}
                    <p className="text-xl text-slate-600">
                      {singleUser.headline || "Employer"}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-slate-500">
                      {/* Location */}
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {singleUser.location || "No location added"}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {singleUser.review?.rating || 0} (
                        {singleUser.review?.totalRatings || 0} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                {/* GRID SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* LEFT: COMPANY / EMPLOYER INFO */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Employer Information
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-slate-700">
                          Name:
                        </span>
                        <span className="ml-2 text-slate-600">
                          {singleUser.name}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-slate-700">
                          User Name:
                        </span>
                        <span className="ml-2 text-slate-600">
                          {singleUser.userName}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-slate-700">
                          Location:
                        </span>
                        <span className="ml-2 text-slate-600">
                          {singleUser.location || "Not provided"}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-slate-700">
                          Member Since:
                        </span>
                        <span className="ml-2 text-slate-600">
                          {new Date(singleUser.createDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        <span className="font-medium text-slate-700">
                          Languages:
                        </span>
                        <span className="ml-2 text-slate-600">
                          {singleUser.languages?.length
                            ? singleUser.languages.join(", ")
                            : "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: CONTACT INFO */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      Contact Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600">{singleUser.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">📧</span>
                        <span className="text-slate-600">{singleUser.email}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">📱</span>
                        <span className="text-slate-600">
                          {singleUser.phone || "No phone"}
                        </span>
                      </div>

                      {/* Social Links */}
                      <div className="space-y-2 pt-2">
                        <p className="font-medium text-slate-700">Social:</p>
                        <div className="flex flex-col gap-1 text-slate-600">
                          {singleUser.social?.facebook && (
                            <a
                              href={singleUser.social.facebook}
                              className="hover:underline"
                            >
                              Facebook
                            </a>
                          )}
                          {singleUser.social?.instagram && (
                            <a
                              href={singleUser.social.instagram}
                              className="hover:underline"
                            >
                              Instagram
                            </a>
                          )}
                          {singleUser.social?.linkedin && (
                            <a
                              href={singleUser.social.linkedin}
                              className="hover:underline"
                            >
                              LinkedIn
                            </a>
                          )}
                          {singleUser.social?.portfolio && (
                            <a
                              href={singleUser.social.portfolio}
                              className="hover:underline"
                            >
                              Portfolio
                            </a>
                          )}
                          {!singleUser.social && <p>No social links</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ABOUT SECTION */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    About the Employer
                  </h3>

                  <p className="text-slate-700 leading-relaxed">
                    {singleUser.bio ||
                      `${
                        singleUser.name
                      } has not added a bio yet. This employer is currently active and has posted ${
                        singleUser.job?.jobPosted || 0
                      } jobs.`}
                  </p>
                </div>
              </div>
            )}

            {/* Current Bids Section */}
            {activeSection === "bids" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Current Bids ({job.currentBids})
                  </h2>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                    Propose Bid
                  </button>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: Math.min(job.currentBids, 5) }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-slate-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">
                                Bidder {index + 1}
                              </h4>
                              <p className="text-sm text-slate-600">
                                Proposed: ${Math.floor(Math.random() * 50) + 30}
                                /hr
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">
                                4.{Math.floor(Math.random() * 9) + 1}
                              </span>
                              <span className="text-sm text-slate-500">
                                ({Math.floor(Math.random() * 50) + 20} reviews)
                              </span>
                            </div>
                            <p className="text-sm text-slate-500">
                              {Math.floor(Math.random() * 5) + 1} days ago
                            </p>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm">
                          I have extensive experience in this field and can
                          deliver high-quality results within your timeline. I'm
                          available to start immediately and can work{" "}
                          {job.workDays.toLowerCase()} from {job.workTime}.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition text-sm">
                            Accept Bid
                          </button>
                          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm">
                            View Profile
                          </button>
                          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm">
                            Message
                          </button>
                        </div>
                      </div>
                    )
                  )}

                  {job.currentBids > 5 && (
                    <div className="text-center py-4">
                      <p className="text-slate-500">
                        +{job.currentBids - 5} more bids available
                      </p>
                      <button className="mt-2 text-primary hover:underline">
                        View All Bids
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
