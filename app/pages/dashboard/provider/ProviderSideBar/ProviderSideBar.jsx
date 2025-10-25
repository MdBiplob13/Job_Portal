"use client";
import Link from "next/link";
import React, { useState } from "react";
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
import { TbHammer } from "react-icons/tb";

const menuItems = [
  { id: "dashboard", label: "Dashboard", link:"/pages/dashboard/provider", icon: <FiHome /> },
  { id: "jobs", label: "My Jobs", link:"/pages/dashboard/provider/providerJobs", icon: <FiBriefcase /> },
  { id: "bids", label: "My Bids", link:"/pages/dashboard/provider/providerBids", icon: <TbHammer /> },
  { id: "messages", label: "Messages", link:"/pages/dashboard/provider/providerMessage", icon: <FiMessageCircle /> },
  { id: "transactions", label: "Transactions", link:"/pages/dashboard/provider/providerTransaction", icon: <FiDollarSign /> },
  { id: "Reviews", label: "Reviews", link:"/pages/dashboard/provider/providerReview", icon: <FiStar /> },
  { id: "profile", label: "Profile", link:"/pages/dashboard/provider/providerProfile", icon: <FiUser /> },
  { id: "logout", label: "Logout", link:"/pages/dashboard/provider", icon: <FiLogOut /> },
];

const ProviderSideBar = () => {
  const [activeTab, setActiveTab] = useState
  ("dashboard");
  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r">
      
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center cursor-pointer w-full p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                    activeTab === item.id ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ProviderSideBar;
