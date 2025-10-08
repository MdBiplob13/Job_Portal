"use client";
import React, { useState } from "react";
import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import ProviderDashboardHome from "./ProviderHome/ProviderHome";
import ProviderDashboardJobs from "./ProviderJobs/ProviderJobs";
import ProviderSideBar from "./ProviderSideBar/ProviderSideBar";
import DashboardMessage from "@/app/components/Dashboard/DashboardMessage/DashboardMessage";
import ProviderTransaction from "./ProviderTransaction/ProviderTransaction";
import ProviderReview from "./ProviderReview/ProviderReview";
import ProviderProfile from "./ProviderProfile/ProviderProfile";

const page = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProviderSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <ProviderDashboardHome />}
          {activeTab === "jobs" && <ProviderDashboardJobs />}
          {activeTab === "messages" && <DashboardMessage/>}
          {activeTab === "transactions" && <ProviderTransaction />}
          {activeTab === "profile" && <ProviderProfile/>}
          {activeTab === "Reviews" && <ProviderReview/>}
          {activeTab === "Notifications" && <ProviderReview/>}

        </main>
      </div>
    </div>
  );
};

export default page;
