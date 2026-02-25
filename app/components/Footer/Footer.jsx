"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import useUser from "@/app/hooks/user/userHook";

const Footer = () => {
  const {user} = useUser() 
  return (
    <footer className="bg-linear-to-br from-[#53cbfb] via-[#3bb8f0] to-[#2a9fd6] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {/* Brand & About */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Job<span className="text-white/90">Pole</span>
          </h2>
          <p className="text-white/90 mt-4 leading-relaxed text-sm md:text-base">
            Connecting job seekers and employers with smart tools and real-time
            updates. Discover your dream job or find your ideal candidate
            faster.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            {[
              { icon: FaFacebookF, href: "#" },
              { icon: FaLinkedinIn, href: "#" },
              { icon: FaTwitter, href: "#" },
              { icon: FaGithub, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-6 after:h-0.5 after:bg-white/80">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", link: "/" },
              { name: "Search a Job", link: "/pages/browse/jobs" },
              { name: "Post a Job", link: user?.email ? "/pages/dashboard/employer/employerBids" : "/pages/auth/login" },
              { name: "Pricing", link: "/pages/pricing" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="hover:text-white transition-all duration-300 text-white/90"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-6 after:h-0.5 after:bg-white/80">
            About Us
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Who We Are", link: "/pages/aboutUs/whoWeAre" },
              { name: "Our Mission/Vision", link: "/pages/aboutUs/ourMission" },
              { name: "Core Values", link: "/pages/aboutUs/coreValues" },
              { name: "Partner / Affiliates", link: "/pages/aboutUs/partner" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className="hover:text-white transition-all duration-300 text-white/90"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Seekers */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-6 after:h-0.5 after:bg-white/80">
            Job Seekers
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/pages/browse/jobs"
                className="hover:text-white text-white/90"
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/pages/browse/bids"
                className="hover:text-white text-white/90"
              >
                Find Bids
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white text-white/90">
                Browse Categories
              </Link>
            </li>
           
          </ul>
        </div>

        
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/30" />

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-center px-6 md:px-10 py-6 text-sm text-white/90">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">JobPole</span>. All Rights
          Reserved.
        </p>
        <p>
          © {new Date().getFullYear()} Made By{" "}
          <span className="font-semibold text-white">
            <Link target="_blank" href={`https://www.shuvodesign.co.uk`}>
              Shuvo Design
            </Link>
          </span>
        </p>
        <div className="flex gap-4">
          <Link href="/pages/policy/privacyPolicy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/pages/policy/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
