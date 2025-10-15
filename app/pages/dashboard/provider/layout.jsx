import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import React from "react";
import ProviderSideBar from "./ProviderSideBar/ProviderSideBar";

const layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProviderSideBar />

        <div className="mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
