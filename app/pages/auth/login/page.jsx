"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here
  };

  return (
    <div>
      <Navbar />

      <div className="relative min-h-screen">
        {/* Photo container */}
        <div className="absolute inset-0">
          <img
            src={"/black_woman_with_laptop.jpg"}
            className="w-full h-full object-cover"
            alt="Woman with laptop"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-primary to-white/30 z-10"></div>

        {/* Form container - positioned to right */}
        <div className="relative z-20 flex items-center justify-end pr-0 2xl:pr-80 min-h-screen p-4">
          <form 
            onSubmit={handleSubmit}
            className="bg-transparent backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20 mr-4 sm:mr-8 lg:mr-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-start text-white">
              Login to BidPole
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password */}
              <div className="">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/pages/auth/forgot-password"
                  className="text-white text-sm hover:text-white/70 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-linear-to-r from-primary to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white">
                Don't have an account?{" "}
                <Link
                  href="/pages/auth/signup"
                  className="text-white font-semibold hover:text-white/70 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;