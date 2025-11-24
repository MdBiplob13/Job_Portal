// app/components/Dashboard/Profile/ProfilePage.jsx
"use client";
import React, { useState } from "react";
import { FiAward, FiBriefcase, FiLock, FiUser } from "react-icons/fi";
import AdminProfileTab from "./AdminProfileTab/AdminProfileTab";
import AdminPasswordTab from "./AdminPasswordTab/AdminPasswordTab";
import AdminPageTopSection from "./AdminPageTopSection/AdminPageTopSection";

export default function EmployerProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Top Banner Section */}
      <AdminPageTopSection />

      {/* Navigation Tabs */}
      <div className="px-6 -mt-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1">
          <div className="flex overflow-x-auto">
            {[
              { id: "personal", label: "Personal Details", icon: FiUser },
              
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
        {activeTab === "personal" && <AdminProfileTab />}

        {/* Change Password */}
        {activeTab === "password" && <AdminPasswordTab />}
      </div>
    </div>
  );
}
