"use client";
import useUser from "@/app/hooks/user/userHook";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  {
    id: "dashboard",
    label: "Dashboard",
    link: "/pages/dashboard/professional",
    icon: <FiHome />,
  },
  {
    id: "jobs",
    label: "My Proposed Jobs",
    link: "/pages/dashboard/professional/proposeJobs",
    icon: <FiBriefcase />,
  },
  // {
  //   id: "bids",
  //   label: "My Bids",
  //   link: "/pages/dashboard/employer/employerBids",
  //   icon: <TbHammer />,
  // },
  // {
  //   id: "messages",
  //   label: "Messages",
  //   link: "/pages/dashboard/employer/employerMessage",
  //   icon: <FiMessageCircle />,
  // },
  // {
  //   id: "transactions",
  //   label: "Transactions",
  //   link: "/pages/dashboard/employer/employerTransaction",
  //   icon: <FiDollarSign />,
  // },
  // {
  //   id: "Reviews",
  //   label: "Reviews",
  //   link: "/pages/dashboard/employer/employerReview",
  //   icon: <FiStar />,
  // },
  {
    id: "profile",
    label: "Profile",
    link: "/pages/dashboard/professional/professionalProfile",
    icon: <FiUser />,
  },
  {
    id: "logout",
    label: "Logout",
    link: "#",
    icon: <FiLogOut />,
  },
];

const ProfessionalSideBar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { setUser, setUserRefresh, userRefresh } = useUser();

  const router = useRouter();

  // logout function
  const handleLogout = () => {
    Cookies.remove("bidpoleToken");
    setUser(null);
    setUserRefresh(userRefresh + 1);
    router.push("/pages/auth/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r">
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {/* If logout, don't navigate — run function */}
                {item.id === "logout" ? (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center cursor-pointer w-full p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary ${
                      activeTab === item.id ? "bg-blue-100 text-secondary" : ""
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.link}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center cursor-pointer w-full p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-primary ${
                      activeTab === item.id ? "bg-blue-100 text-secondary" : ""
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ProfessionalSideBar;
