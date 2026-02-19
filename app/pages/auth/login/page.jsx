"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import useUserRole from "@/app/hooks/role/userRole";
import useUser from "@/app/hooks/user/userHook";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserRefresh, userRefresh } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const user = {
      email,
      password,
    };

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(
            `${
              data.user.role === "employer" ? "Employer" : "Professional"
            } logged in successfully`
          );
          // Save token in cookie
          Cookies.set("bidpoleToken", data.token, {
            expires: 7, // 7 days
            secure: true, // HTTPS only
            sameSite: "strict",
            path: "/",
          });
          Cookies.set("userRole", data.role, {
            expires: 7, // 7 days
            secure: true, // HTTPS only
            sameSite: "strict",
            path: "/",
          });
          router.push(`/pages/dashboard/${data.user.role}`);
          setUserRefresh(userRefresh + 1);
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
            className="bg-blue-400 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 mr-4 sm:mr-8 lg:mr-16 p-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-start text-white drop-shadow-md">
              Login to BidPole
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 shadow-inner outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200"
                  placeholder="Email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/70 shadow-inner outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200/50 transition-all duration-200"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/pages/auth/forgot-password"
                  className="text-white/80 text-sm hover:text-white transition-colors underline underline-offset-2"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-red-300 mt-4 text-center font-medium">{error}</p>
            )}

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/80">
                Don't have an account?{" "}
                <Link
                  href="/pages/auth/signup"
                  className="text-white font-semibold hover:text-white transition-colors underline underline-offset-2"
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