"use client";
import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import React, { useState } from "react";
import EmployerSideBar from "../employer/Components/EmployerSideBar/EmployerSideBar";
import NotificationsPageDesign from "./NotificationPageDesign/NotificationPageDesign";


const page = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <EmployerSideBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
            <NotificationsPageDesign/>
        </main>
      </div>
    </div>
  );
};

export default page;
