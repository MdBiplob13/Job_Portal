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
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import ProfessionalPageTopSection from "./ProfessionalPageTopSection/ProfessionalPageTopSection";
import ProfessionalPasswordTab from "./ProfessionalPasswordTab/ProfessionalPasswordTab";
import ProfessionalExperienceTab from "./ProfessionalExperienceTab/ProfessionalExperienceTab";
import ProfessionalSkillTab from "./ProfessionalSkillTab/ProfessionalSkillTab";
import ProfessionalProfileTab from "./ProfessionalProfileTab/ProfessionalProfileTab";

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


  

  

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Top Banner Section */}
      <ProfessionalPageTopSection profileData={profileData} stats={stats} />

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
          <ProfessionalProfileTab profileData={profileData} isEditing={isEditing} />
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <ProfessionalSkillTab profileData={profileData} isEditing={isEditing}/>
        )}

        {/* Experience & Certificates */}
        {activeTab === "experience" && (
          <ProfessionalExperienceTab profileData={profileData} isEditing={isEditing} />
        )}

        {/* Change Password */}
        {activeTab === "password" && (
         <ProfessionalPasswordTab isEditing={isEditing} />
        )}
      </div>
    </div>
  );
}
