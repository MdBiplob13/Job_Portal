"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [button, setButton] = useState("look");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const userName = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (userName.length < 5) {
      setError("username must be at least 5 characters long");
      return;
    }

    const userData = {
      name: `${firstName} ${lastName}`,
      userName,
      email,
      password,
      role: button === "look" ? "employer" : "professional",
    };

    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Account created successfully! Please log in.", {
            style: {
              width: "fit-content",
              maxWidth: "none",
            },
            duration: 4000,
          });

          form.reset();
          router.push("/pages/auth/login");
        } else {
          setError(data.message);
        }
      });
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
            className="bg-transparent backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-white/20 mr-4 sm:mr-8 lg:mr-16"
          >
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
                <div className="shrink-0">
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
                <div className="shrink-0">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                    placeholder="User Name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border border-blue-500 rounded-lg bg-transparent text-white shadow-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-white/70"
                    placeholder="Email"
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
            <p className="text-red-500 mt-2 text-center font-bold mb-2">{error}</p>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-primary to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg cursor-pointer"
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
