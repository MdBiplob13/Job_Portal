import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import React from "react";
import ProviderSideBar from "./ProviderSideBar/ProviderSideBar";
import ProviderNavbar from "./Components/ProviderNavbar/ProviderNavbar";

const layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <ProviderNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProviderSideBar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
