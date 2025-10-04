"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const SignUpPage = () => {
  const [button, setButton] = useState("look");
  const [phone, setPhone] = useState("");
  console.log("🚀 ~ SignUpPage ~ button:", button);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div>
      <Navbar />

      <div className="relative min-h-[100vh]">
        {/* Photo container */}
        <div className="absolute inset-0">
          <img
            src={"/black_woman_with_laptop.jpg"}
            className="w-full h-full object-cover"
            alt="Woman with laptop"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-blue-600 to-white/30 z-10"></div>

        {/* Form container - positioned to right */}
        <div className="relative z-20 flex items-center justify-end pr-0 2xl:pr-80 min-h-[100vh] p-4">
          <form className="bg-transparent backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-white/20 mr-4 sm:mr-8 lg:mr-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-start text-white">
              Sign Up with BidPole
            </h2>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
              <div
                onClick={() => setButton("look")}
                className={`flex items-center gap-2 rounded-full py-2 px-4 w-full sm:w-auto justify-center cursor-pointer transition-all duration-200 ${
                  button === "look"
                    ? "bg-blue-500 border border-blue-500"
                    : "bg-transparent border border-white/50"
                }`}
              >
                <div className="flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6"
                    viewBox="0 0 512 512"
                  >
                    {/* Circle - dynamic color */}
                    <path
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                      fill={button === "look" ? "#ffffff" : "#3b82f6"}
                    />
                    {/* Check - dynamic color */}
                    <path
                      d="M424.1 183.9l-180 180c-10.5 10.5-27.6 10.5-38.1 0l-90-90c-10.5-10.5-10.5-27.6 0-38.1 10.5-10.5 27.6-10.5 38.1 0l70.9 70.9 160.9-160.9c10.5-10.5 27.6-10.5 38.1 0 10.6 10.6 10.6 27.6.1 38.1z"
                      fill={button === "look" ? "#3b82f6" : "#ffffff"}
                    />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h1
                    className={`text-xs sm:text-sm ${
                      button === "look" ? "text-white" : "text-blue-500"
                    }`}
                  >
                    Looking for
                  </h1>
                  <h1
                    className={`font-bold text-base sm:text-lg ${
                      button === "look" ? "text-white" : "text-blue-500"
                    }`}
                  >
                    Professionals
                  </h1>
                </div>
              </div>

              <div
                onClick={() => setButton("earn")}
                className={`flex items-center gap-2 rounded-full py-2 px-4 w-full sm:w-auto justify-center cursor-pointer transition-all duration-200 ${
                  button === "earn"
                    ? "bg-blue-500 border border-blue-500"
                    : "bg-transparent border border-white/50"
                }`}
              >
                <div className="flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6"
                    viewBox="0 0 512 512"
                  >
                    {/* Circle - dynamic color */}
                    <path
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                      fill={button === "earn" ? "#ffffff" : "#3b82f6"}
                    />
                    {/* Check - dynamic color */}
                    <path
                      d="M424.1 183.9l-180 180c-10.5 10.5-27.6 10.5-38.1 0l-90-90c-10.5-10.5-10.5-27.6 0-38.1 10.5-10.5 27.6-10.5 38.1 0l70.9 70.9 160.9-160.9c10.5-10.5 27.6-10.5 38.1 0 10.6 10.6 10.6 27.6.1 38.1z"
                      fill={button === "earn" ? "#3b82f6" : "#ffffff"}
                    />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h1
                    className={`text-xs sm:text-sm ${
                      button === "earn" ? "text-white" : "text-blue-500"
                    }`}
                  >
                    Earn as a 
                  </h1>
                  <h1
                    className={`font-bold text-base sm:text-lg ${
                      button === "earn" ? "text-white" : "text-blue-500"
                    }`}
                  >
                    Professional
                  </h1>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name fields */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="">
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Phone number */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Country code dropdown */}
                <div className="w-full sm:w-1/3">
                  <div className="border border-blue-500 rounded-lg bg-transparent px-3 py-1 h-12 flex items-center focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-500 transition-all duration-200">
                    <PhoneInput
                      international
                      defaultCountry="CM"
                      value={phone}
                      onChange={setPhone}
                      className="w-full [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-white [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:py-2 [&_.PhoneInputInput]:placeholder-gray-300
                                [&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:text-white [&_.PhoneInputCountrySelect]:border-none [&_.PhoneInputCountrySelect]:mr-2
                                [&_.PhoneInputCountrySelectArrow]:text-white [&_.PhoneInputCountrySelectArrow]:ml-1
                                [&_.PhoneInputCountryIcon]:rounded-sm [&_.PhoneInputInput]:text-sm"
                    />
                  </div>
                </div>

                {/* Phone number input */}
                <div className="w-full sm:w-2/3">
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="">
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link
                  href="/pages/auth/login"
                  className="text-white font-semibold hover:text-white/70 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
