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
import EmployerProfileTab from "./EmployerProfileTab/EmployerProfileTab";
import EmployerSkillTab from "./EmployerSkillTab/EmployerSkillTab";
import EmployerExperienceTab from "./EmployerExperienceTab/EmployerExperienceTab";
import EmployerPasswordTab from "./EmployerPasswordTab/EmployerPasswordTab";
import EmployerPageTopSection from "./EmployerPageTopSection/EmployerPageTopSection";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";

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
      <EmployerPageTopSection profileData={profileData} stats={stats} />

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
          <EmployerProfileTab profileData={profileData} isEditing={isEditing} />
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <EmployerSkillTab profileData={profileData} isEditing={isEditing} SkillBar={SkillBar} />
        )}

        {/* Experience & Certificates */}
        {activeTab === "experience" && (
          <EmployerExperienceTab profileData={profileData} isEditing={isEditing} />
        )}

        {/* Change Password */}
        {activeTab === "password" && (
         <EmployerPasswordTab isEditing={isEditing} />
        )}
      </div>
    </div>
  );
}
