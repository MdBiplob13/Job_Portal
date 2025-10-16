"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LoginPopUp from "../LoginPopUp/LoginPopUp";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [show, setShow] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Jobs", path: "/pages/searchAJob" },
    { name: "Find Bids", path: "/pages/searchAJob" },
    { name: "Blogs", path: "/pages/blogs" },
    { name: "About Us", path: "/pages/aboutUs" },
    { name: "Our Pricing", path: "/pages/pricing" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 h-16">
        <div className="mx-10 px-5 md:px-10 flex justify-between items-center h-full">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Job Pole
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.path}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pages/auth/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              href="/pages/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>

            {/* user profile */}
            <div className="cursor-pointer relative">
              <Image
                onClick={() => setShow(!show)}
                src={"/user1.jpeg"}
                alt="user"
                width={60}
                height={60}
                className="rounded-lg"
              />

              <div
                className={`${
                  show ? "absolute" : "hidden"
                } flex flex-col w-[200px] h-[180px] top-13 rounded-md right-0 bg-blue-500 text-white p-4 `}
              >
                <Link href={'/pages/dashboard/customer'} className=" bg-white text-blue-500 p-2 rounded-lg hover:bg-white/90">
                  Customer Profile
                </Link>
                <Link href={'/pages/dashboard/provider'} className=" bg-white text-blue-500 p-2 rounded-lg hover:bg-white/90 mt-3">
                  Provider Profile
                </Link>
                <Link href={'/pages/dashboard/admin'} className=" bg-white text-blue-500 p-2 rounded-lg hover:bg-white/90 mt-3">
                  Admin Profile
                </Link>
              </div>
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-md border border-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
            <div className="flex flex-col items-center py-4 space-y-4">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.path}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/pages/auth/login"
                className="w-3/4 text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/pages/auth/signup"
                className="w-3/4 text-center px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
};

export default Navbar;
