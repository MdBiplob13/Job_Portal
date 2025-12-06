import React from "react";
import ProfessionalNavbar from "./Components/ProfessionalNavbar/ProfessionalNavbar";
import ProfessionalSideBar from "./Components/ProfessionalSideBar/ProfessionalSideBar";

const layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <ProfessionalNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ProfessionalSideBar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
