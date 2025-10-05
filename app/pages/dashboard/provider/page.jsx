'use client'
import React, { useState } from "react";
import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "@/app/components/Dashboard/DashboardSidebar/DashboardSidebar";
import ProviderDashboardHome from "./ProviderDashboardHome/ProviderDashboardHome";
import ProviderDashboardSearch from "./ProviderDashboardSearch/ProviderDashboardSearch";
import ProviderDashboardJobs from "./ProviderDashboardJobs/ProviderDashboardJobs";

const page = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <ProviderDashboardHome />}
          {activeTab === "search" && <ProviderDashboardSearch />}
          {activeTab === "jobs" && <ProviderDashboardJobs />}
          {activeTab === "messages" && <div>Messages</div>}
          {activeTab === "transactions" && <div>Transactions</div>}
          {activeTab === "profile" && <div>Profile</div>}
        </main>
      </div>
    </div>
  );
};

export default page;
