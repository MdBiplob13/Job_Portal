import React from "react";
import { FiHome, FiSearch, FiBriefcase, FiMessageCircle, FiDollarSign, FiUser, FiLogOut, FiStar } from "react-icons/fi";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { id: "jobs", label: "My Jobs", icon: <FiBriefcase /> },
  { id: "messages", label: "Messages", icon: <FiMessageCircle /> },
  { id: "transactions", label: "Transactions", icon: <FiDollarSign /> },
  { id: "profile", label: "Profile", icon: <FiUser /> },
  { id: "Reviews", label: "Reviews", icon: <FiStar /> },
];

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r">
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center cursor-pointer w-full p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary ${
                    activeTab === item.id ? "bg-blue-100 text-secondary" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button className="flex items-center p-3 rounded-lg text-red-500 hover:bg-red-50">
          <FiLogOut className="mr-3" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
