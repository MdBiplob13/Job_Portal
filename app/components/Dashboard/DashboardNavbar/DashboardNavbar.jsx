"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiBell, FiPlus } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";

const DashboardNavbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-xl font-bold text-blue-600">BidPole</div>
            </Link>

            {/* Center: Search */}
            <div className="flex-1 px-4 hidden sm:block ml-[100px] min-w-[200px]">
              <div className="max-w-2xl mx-auto">
                <label htmlFor="dash-search" className="sr-only">
                  Search jobs
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                    <FiSearch size={18} />
                  </span>
                  <input
                    id="dash-search"
                    type="text"
                    placeholder="Search your jobs..."
                    className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/post-a-job"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-blue-600 bg-white text-blue-600 font-medium hover:bg-blue-50 transition"
            >
              <FiPlus size={16} />
              <span className="text-sm">Post a Job</span>
            </Link>

            {/* Notification */}
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-full hover:bg-slate-100 transition"
            >
              <FaRegBell size={25} className="text-slate-600" />
              {/* small badge */}
              <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className=" rounded-lg overflow-hidden border border-slate-200">
                <Image
                  src="/user2.jpg"
                  alt="User avatar"
                  width={50}
                  height={50}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
