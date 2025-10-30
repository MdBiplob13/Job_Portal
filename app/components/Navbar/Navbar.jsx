"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      dropdown: null,
    },
    {
      name: "Browse",
      path: "#",
      dropdown: [
        { name: "Browse Jobs", path: "/pages/browse/jobs" },
        { name: "Browse Bids", path: "/pages/browse/bids" },
        { name: "Browse Freelancers", path: "/pages/browse/freelancers" },
      ],
    },
    // {
    //   name: "Post Bid",
    //   path: "#",
    //   dropdown: [
    //     { name: "Post a Job", path: "/pages/post-job" },
    //     { name: "Post a Tender", path: "/pages/post-tender" },
    //     { name: "Earn as a Freelancer", path: "/pages/become-freelancer" },
    //   ],
    // },
    {
      name: "How It Work",
      path: "#",
      dropdown: [
        { name: "Posting Guide", path: "/pages/howItWork/postingGuide" },
        { name: "Video Tutorial", path: "/pages/howItWork/videoTutorial"  },
        { name: "FAQ", path: "/pages/howItWork/faq"  },
        { name: "Tips for Bidding", path: "/pages/howItWork/tipsForBidding"  },
      ],
    },
    {
      name: "Pricing",
      path: "/pages/pricing",
      dropdown: null,
    },
    {
      name: "About Us",
      path: "#",
      dropdown: [
        { name: "Who We Are", path: "/pages/aboutUs/whoWeAre" },
        { name: "Our Mission/Vision", path: "/pages/aboutUs/ourMission" },
        { name: "Core Values", path:"/pages/aboutUs/coreValues"  },
        { name: "Partner / Affiliates", path: "/pages/aboutUs/partner"  },
      ],
    },
    {
      name: "Blogs",
      path: "/pages/blogs",
      dropdown: null,
    },
  ];

  const handleDropdownToggle = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownLinkClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 h-16">
        <div className="mx-20 px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Job Pole
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-center space-x-1"
            ref={dropdownRef}
          >
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative">
                {link.dropdown ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center px-3 py-2 text-gray-700 cursor-pointer hover:text-primary transition font-medium">
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === link.name && (
                      <div
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                        onMouseEnter={() => setActiveDropdown(link.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {link.dropdown.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                            onClick={handleDropdownLinkClick}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.path}
                    className="px-3 py-2 text-gray-700 hover:text-primary transition font-medium"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons & User Profile */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pages/auth/login"
              className="px-4 py-2 border border-primary  text-primary rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/pages/auth/signup"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <Image
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                src={"/user1.jpeg"}
                alt="user"
                width={60}
                height={60}
                className="rounded-lg cursor-pointer border-2 border-gray-200 hover:border-blue-500 transition"
              />

              {showUserDropdown && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href={"/pages/dashboard/customer"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    Customer Bid Profile 
                  </Link>
                  <Link
                    href={"/pages/dashboard/provider"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    Provider Job Profile
                  </Link>
                  <Link
                    href={"/pages/dashboard/admin"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    Admin Profile
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md border border-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="flex flex-col py-4 space-y-2">
              {navLinks.map((link, idx) => (
                <div key={idx}>
                  {link.dropdown ? (
                    <div className="px-4">
                      <button
                        className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                        onClick={() => handleDropdownToggle(link.name)}
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === link.name && (
                        <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4 py-2">
                          {link.dropdown.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.path}
                              className="block py-2 text-sm text-gray-600 hover:text-primary transition"
                              onClick={handleMobileLinkClick}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.path}
                      className="block px-4 py-3 text-gray-700 hover:text-primary transition font-medium"
                      onClick={handleMobileLinkClick}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                <Link
                  href="/pages/auth/login"
                  className="block w-full text-center px-4 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 transition"
                  onClick={handleMobileLinkClick}
                >
                  Login
                </Link>
                <Link
                  href="/pages/auth/signup"
                  className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={handleMobileLinkClick}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
