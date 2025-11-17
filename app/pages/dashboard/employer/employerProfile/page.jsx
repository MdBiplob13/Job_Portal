// app/components/Dashboard/Profile/ProfilePage.jsx
"use client";
import React, { useState } from "react";
import {
  FiEdit,
  FiMapPin,
  FiCalendar,
  FiStar,
  FiAward,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiGlobe,
  FiLock,
  FiUser,
  FiCheck,
} from "react-icons/fi";

export default function EmployerProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data
  const profileData = {
    personal: {
      name: "John Anderson",
      title: "Senior Construction Project Manager",
      description:
        "Experienced project manager specializing in large-scale construction projects with over 8 years in the industry. Proven track record of delivering projects on time and within budget.",
      email: "john.anderson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "Member since March 2018",
      languages: ["English", "Spanish"],
      hourlyRate: "$85/hr",
    },
    skills: [
      { name: "Project Management", level: 95, category: "Management" },
      { name: "Budget Planning", level: 90, category: "Financial" },
      { name: "Team Leadership", level: 92, category: "Management" },
      { name: "Construction Safety", level: 88, category: "Technical" },
      { name: "AutoCAD", level: 85, category: "Technical" },
      { name: "Contract Negotiation", level: 87, category: "Business" },
      { name: "Risk Assessment", level: 91, category: "Management" },
      { name: "Quality Control", level: 89, category: "Technical" },
    ],
    experience: [
      {
        id: 1,
        company: "BuildRight Construction",
        position: "Senior Project Manager",
        period: "2019 - Present",
        description:
          "Managed over 15 commercial construction projects totaling $50M+ in value. Led teams of 50+ professionals and maintained 98% on-time delivery rate.",
        type: "work",
      },
      {
        id: 2,
        company: "Urban Developers Inc.",
        position: "Project Manager",
        period: "2016 - 2019",
        description:
          "Oversaw residential and commercial projects. Implemented new safety protocols that reduced incidents by 40%.",
        type: "work",
      },
      {
        id: 3,
        name: "PMP Certification",
        issuer: "Project Management Institute",
        date: "2020",
        description: "Project Management Professional certification",
        type: "certificate",
      },
      {
        id: 4,
        name: "Construction Safety",
        issuer: "OSHA Training Institute",
        date: "2019",
        description: "Advanced construction safety and health certification",
        type: "certificate",
      },
    ],
  };

  const stats = {
    rating: 4.9,
    totalReviews: 127,
    jobsCompleted: 89,
    responseRate: 98,
    onTimeDelivery: 95,
    repeatClients: 42,
  };

  const StarRating = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-800">{skill.name}</span>
        <span className="text-sm text-gray-600">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-500 mt-1">{skill.category}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Top Banner Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 bg-linear-to-r from-blue-500 to-primary"></div>

        {/* Profile Content Overlay */}
        <div className="relative -top-16 px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Photo */}
              <div className="relative -top-20 lg:top-0 lg:shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.personal.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-primary transition-colors">
                    <FiEdit className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 lg:mt-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {profileData.personal.name}
                    </h1>
                    <p className="text-xl text-gray-600 mt-1">
                      {profileData.personal.title}
                    </p>

                    {/* Rating and Stats */}
                    <div className="flex flex-wrap items-center gap-6 mt-4">
                      <StarRating rating={stats.rating} size="md" />
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>⭐ {stats.totalReviews} reviews</span>
                        <span>✅ {stats.jobsCompleted} jobs</span>
                        <span>🔄 {stats.responseRate}% response rate</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-gray-400" />
                        {profileData.personal.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        {profileData.personal.joinDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBriefcase className="text-gray-400" />
                        {profileData.personal.hourlyRate}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                      Share Profile
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors flex items-center gap-2"
                    >
                      <FiEdit className="text-lg" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {profileData.personal.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 -mt-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
          <div className="flex overflow-x-auto">
            {[
              { id: "personal", label: "Personal Details", icon: FiUser },
              { id: "skills", label: "Skills", icon: FiAward },
              {
                id: "experience",
                label: "Experience & Certificates",
                icon: FiBriefcase,
              },
              { id: "password", label: "Change Password", icon: FiLock },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer mr-5 ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:text-blue-500 hover:bg-red-50"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 mb-8 mx-auto">
        {/* Personal Details */}
        {activeTab === "personal" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiUser className="text-blue-500" />
                Personal Information
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.name}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.title}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    defaultValue={profileData.personal.description}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.hourlyRate}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={profileData.personal.location}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiMail className="text-blue-500" />
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <FiMail className="text-gray-400 text-xl" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Email Address
                      </div>
                      <div className="text-gray-600 text-sm">
                        {profileData.personal.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <FiPhone className="text-gray-400 text-xl" />
                    <div>
                      <div className="font-medium text-gray-800">
                        Phone Number
                      </div>
                      <div className="text-gray-600 text-sm">
                        {profileData.personal.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FiGlobe className="text-blue-500" />
                  Languages
                </h3>

                <div className="flex flex-wrap gap-2">
                  {profileData.personal.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-secondary rounded-xl font-medium text-sm"
                    >
                      {language}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-400 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-colors">
                      + Add Language
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiAward className="text-blue-500" />
                Skills & Expertise
              </h3>
              {isEditing && (
                <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
                  Add Skill
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Technical Skills
                </h4>
                <div className="space-y-4">
                  {profileData.skills
                    .filter((skill) => skill.category === "Technical")
                    .map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                </div>
              </div>

              {/* Management & Business Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Management & Business
                </h4>
                <div className="space-y-4">
                  {profileData.skills
                    .filter((skill) => skill.category !== "Technical")
                    .map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience & Certificates */}
        {activeTab === "experience" && (
          <div className="space-y-8">
            {/* Work Experience */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiBriefcase className="text-blue-500" />
                  Work Experience
                </h3>
                {isEditing && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
                    Add Experience
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {profileData.experience
                  .filter((exp) => exp.type === "work")
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                        {exp.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-gray-500 text-sm mb-2">
                          {exp.period}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                      {isEditing && (
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-blue-500">
                          <FiEdit />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiAward className="text-blue-500" />
                  Certificates & Licenses
                </h3>
                {isEditing && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
                    Add Certificate
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {profileData.experience
                  .filter((exp) => exp.type === "certificate")
                  .map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-primary shrink-0">
                          <FiCheck className="text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {cert.name}
                          </h4>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {cert.date}
                          </p>
                          <p className="text-gray-600 text-sm mt-2">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Change Password */}
        {activeTab === "password" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiLock className="text-blue-500" />
              Change Password
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Confirm new password"
                />
              </div>

              <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
