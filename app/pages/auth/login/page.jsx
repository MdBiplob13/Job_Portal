"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = (form.email?.value || "").trim().toLowerCase();
    const password = (form.password?.value || "").trim();

    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");

    const payload = { email, password, remember };

    console.log("Login payload (mock):", payload);
    toast.success("Logged in (mock). Check console for payload.");

    // reset or redirect as needed (mock)
    // form.reset();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-600">Welcome back</h1>
          <p className="mt-2 text-slate-600">Sign in to manage your account, jobs and applications.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input name="email" type="email" className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500" placeholder="Your password" />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4" />
                Remember me
              </label>

              <Link href="/forgot-password" className="text-sm text-blue-600">Forgot password?</Link>
            </div>

            <div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">Sign in</button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            Don't have an account? <Link href="/pages/auth/signup" className="text-blue-600 underline">Create one</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
