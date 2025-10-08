import React from "react";
import {
  FiHome,
  FiSearch,
  FiBriefcase,
  FiMessageCircle,
  FiDollarSign,
  FiUser,
  FiLogOut,
  FiStar,
} from "react-icons/fi";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { id: "jobs", label: "My Jobs", icon: <FiBriefcase /> },
  { id: "messages", label: "Messages", icon: <FiMessageCircle /> },
  { id: "transactions", label: "Transactions", icon: <FiDollarSign /> },
  { id: "Reviews", label: "Reviews", icon: <FiStar /> },
  { id: "profile", label: "Profile", icon: <FiUser /> },
  { id: "logout", label: "Logout", icon: <FiLogOut /> },
];

const ProviderSideBar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r">
      
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center cursor-pointer w-full p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    activeTab === item.id ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ProviderSideBar;
