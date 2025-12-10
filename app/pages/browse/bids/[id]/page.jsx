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

export default function BidDetailPage() {
  const params = useParams();
  const bidId = params.id;

  const { singleBid, singleBidLoading } = useGetSingleBid(bidId);
  const { singleUser, singleUserLoading } = useGetUserWithEmail(
    singleBid?.employerEmail
  );

  const [activeSection, setActiveSection] = useState("overview");

  if (!singleBid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
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

  const sections = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "company", label: "Company Info", icon: "🏢" },
    { id: "applications", label: "Applications", icon: "📄" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
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
              {sections.map((section) => (
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

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-500 text-xl">ℹ️</div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">
                        Important Information
                      </h4>
                      <p className="text-yellow-700 text-sm">
                        {singleBid.applicationLimitEnabled
                          ? `This bid has an application limit of ${
                              singleBid.applicationLimit
                            } submissions. ${
                              singleBid.applicationCount || 0
                            } applications have been received so far.`
                          : "This bid accepts unlimited applications."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Company Info Section */}
            {activeSection === "company" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {singleBid.companyName}
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {singleBid.companyLocation ||
                      "Company location not specified"}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-3 shadow-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
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
            // Update just the "Applications" section in your BidDetailPage
            component:
            {activeSection === "applications" && (
              <div className="space-y-8">
                {/* Application Statistics */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">
                        Submit Your Proposal
                      </h3>
                      <p className="text-slate-600">
                        {singleBid.applicationCount || 0} proposals received so
                        far
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800">
                          {singleBid.applicationCount || 0}/
                          {singleBid.applicationLimit || 50}
                        </div>
                        <div className="text-sm text-slate-500">
                          Spots Filled
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {timeLeft(singleBid.deadline)}
                        </div>
                        <div className="text-sm text-slate-500">
                          Left to Apply
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-slate-500 mb-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
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

                {/* Application Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">
                    Submit Your Proposal
                  </h3>

                  <form className="space-y-6">
                    {/* Bid Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Proposed Budget *
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            required
                            min="1"
                            placeholder="Enter your proposed amount"
                            className="w-full pl-7 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-sm">
                              {singleBid.BudgetType === "monthly"
                                ? "/month"
                                : singleBid.BudgetType === "hourly"
                                ? "/hour"
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="w-32">
                          <select
                            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            defaultValue={singleBid.BudgetType || "fixed"}
                          >
                            <option value="fixed">Fixed</option>
                            <option value="hourly">Hourly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Original budget: ${singleBid.budget}
                        {getBudgetTypeText(singleBid.BudgetType)}
                      </p>
                    </div>

                    {/* Project Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Proposed Completion Date *
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          />
                        </div>
                        <div className="text-sm text-gray-500">
                          Bid deadline: {formatDate(singleBid.deadline)}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Provide a realistic timeline for project completion
                      </p>
                    </div>

                    {/* Cover Letter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Letter / Proposal *
                      </label>
                      <textarea
                        rows={6}
                        required
                        placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Minimum 200 characters. Explain your qualifications and
                        approach.
                      </p>
                    </div>

                    {/* Attachments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supporting Documents (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition cursor-pointer">
                        <div className="text-3xl mb-2">📎</div>
                        <p className="text-gray-600 mb-1">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          Portfolio, references, certifications (Max 10MB)
                        </p>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        id="terms"
                        className="h-4 w-4 text-blue-500 mt-1 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the terms and conditions. I understand that
                        this proposal is binding and I'll be expected to deliver
                        the project as described if selected.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition"
                      >
                        Save Draft
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition shadow-sm"
                      >
                        Submit Proposal
                      </button>
                    </div>
                  </form>
                </div>

                {/* Existing Applications Preview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-800">
                      Recent Proposals
                    </h3>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      View All ({singleBid.applicationCount || 0})
                    </button>
                  </div>

                  {singleBid.applicationCount > 0 ? (
                    <div className="space-y-4">
                      {/* Example proposal item - you would map through actual proposals */}
                      <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                              JS
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                John Smith
                              </h4>
                              <p className="text-sm text-gray-500">
                                Submitted 2 days ago
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              $5,500
                            </div>
                            <div className="text-sm text-gray-500">
                              Proposed
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Timeline: 3 months
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Under Review
                          </span>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-green-600 font-bold">
                              MK
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Maria Khan
                              </h4>
                              <p className="text-sm text-gray-500">
                                Submitted 1 day ago
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              $4,800
                            </div>
                            <div className="text-sm text-gray-500">
                              Proposed
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            Timeline: 2.5 months
                          </span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            New
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📝</div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        No Proposals Yet
                      </h4>
                      <p className="text-gray-600">
                        Be the first to submit a proposal for this bid!
                      </p>
                    </div>
                  )}
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-500 text-xl">📢</div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Important Notes Before Applying
                      </h4>
                      <ul className="space-y-2 text-yellow-700">
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            Your proposal amount and timeline are binding if
                            selected
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            Ensure you have the capacity to complete the project
                            within your proposed timeline
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            You cannot modify your proposal after submission
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1">•</span>
                          <span>
                            The client will review all proposals after the
                            deadline: {formatDate(singleBid.deadline)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
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
