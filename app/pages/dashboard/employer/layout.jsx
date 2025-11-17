import DashboardNavbar from "@/app/components/Dashboard/DashboardNavbar/DashboardNavbar";
import React from "react";
import EmployerSideBar from "./EmployerSideBar/EmployerSideBar";
import EmployerNavbar from "./Components/EmployerNavbar/EmployerNavbar";

const layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <EmployerNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <EmployerSideBar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
