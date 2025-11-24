import React from "react";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";
import AdminSideBar from "./Components/AdminSideBar/AdminSideBar";

const layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSideBar />

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
