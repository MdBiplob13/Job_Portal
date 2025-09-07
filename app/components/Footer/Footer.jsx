"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        
        {/* Logo & About */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-bold">Job Portal</h2>
          <p className="text-blue-100 mt-3">
            Job Portal connects job seekers with employers.  
            Discover your dream job or find the perfect candidate with ease.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link href="/pages/searchAJob" className="hover:text-blue-200">Search a Job</Link></li>
            <li><Link href="/pages/postAJob" className="hover:text-blue-200">Post a Job</Link></li>
            <li><Link href="/pages/blogs" className="hover:text-blue-200">Blogs</Link></li>
            <li><Link href="/pages/aboutUs" className="hover:text-blue-200">About Us</Link></li>
            <li><Link href="/pages/pricing" className="hover:text-blue-200">Pricing</Link></li>
          </ul>
        </div>

        {/* For Job Seekers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Seekers</h3>
          <ul className="space-y-2">
            <li><Link href="/pages/searchAJob" className="hover:text-blue-200">Find Jobs</Link></li>
            <li><Link href="#" className="hover:text-blue-200">Browse Categories</Link></li>
            <li><Link href="#" className="hover:text-blue-200">Career Tips</Link></li>
          </ul>
        </div>

        {/* For Employers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Employers</h3>
          <ul className="space-y-2">
            <li><Link href="/pages/postAJob" className="hover:text-blue-200">Post Jobs</Link></li>
            <li><Link href="#" className="hover:text-blue-200">Employer Dashboard</Link></li>
            <li><Link href="/pages/pricing" className="hover:text-blue-200">Pricing</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-400 mt-10 pt-5 text-center text-blue-100 text-sm">
        © {new Date().getFullYear()} Job Portal — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
