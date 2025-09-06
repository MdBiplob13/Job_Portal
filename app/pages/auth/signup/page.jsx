"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function SignUpPage() {
  const [role, setRole] = useState("job-seeker"); // job-seeker | publisher
  const [showPassword, setShowPassword] = useState(false);

  function handleRoleChange(selected) {
    setRole(selected);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // read values using e.target.name.value (preferred)
    const fullName = (form.fullName?.value || "").trim();
    const email = (form.email?.value || "").trim().toLowerCase();
    const password = (form.password?.value || "").trim();
    const confirm = (form.confirmPassword?.value || "").trim();

    if (!fullName) return toast.error("Full name is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be 6+ characters");
    if (password !== confirm) return toast.error("Passwords do not match");

    // Publisher extra fields
    let company = null;
    if (role === "publisher") {
      company = {
        name: (form.companyName?.value || "").trim(),
        website: (form.companyWebsite?.value || "").trim(),
        size: (form.companySize?.value || "").trim(),
        location: (form.companyLocation?.value || "").trim(),
      };
      if (!company.name) return toast.error("Company name is required for publishers");
    }

    // build payload (mock)
    const payload = {
      role,
      fullName,
      email,
      password, // NOTE: send hashed on server — this is demo
      ...(company ? { company } : {}),
    };

    console.log("Signup payload (mock):", payload);
    toast.success("Signed up (mock). Check console for payload.");

    // optionally redirect or reset form
    form.reset();
    setRole("job-seeker");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
            Create your account
          </h1>
          <p className="mt-2 text-slate-600">
            Join Job Portal — find roles as a job seeker or post jobs as a publisher.
          </p>
        </section>

        <div className="bg-white p-6 rounded-2xl shadow">
          {/* Role selector */}
          <div className="flex gap-2 mb-6 items-center justify-center">
            <button
              type="button"
              onClick={() => handleRoleChange("job-seeker")}
              className={`px-4 py-2 rounded-lg border ${role === "job-seeker" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700"}`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("publisher")}
              className={`px-4 py-2 rounded-lg border ${role === "publisher" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700"}`}
            >
              Job Publisher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full name</label>
              <input name="fullName" className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500" placeholder="Your name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input name="email" type="email" className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500" placeholder="you@example.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Confirm password</label>
                <input name="confirmPassword" type={showPassword ? "text" : "password"} className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500" placeholder="Confirm password" />
              </div>
            </div>

            {/* If publisher show extra fields */}
            {role === "publisher" && (
              <div className="bg-slate-50 p-4 rounded-lg border">
                <h3 className="font-medium text-slate-800 mb-3">Company details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-700">Company name *</label>
                    <input name="companyName" className="mt-1 w-full px-3 py-2 border rounded-md bg-white outline-none focus:border-blue-500" placeholder="e.g. Pixel Web Makers" />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700">Website</label>
                    <input name="companyWebsite" className="mt-1 w-full px-3 py-2 border rounded-md bg-white outline-none focus:border-blue-500" placeholder="https://example.com" />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700">Company size</label>
                    <select name="companySize" className="mt-1 w-full px-3 py-2 border rounded-md bg-white outline-none">
                      <option value="">Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="200+">200+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700">Company location</label>
                    <input name="companyLocation" className="mt-1 w-full px-3 py-2 border rounded-md bg-white outline-none focus:border-blue-500" placeholder="City, Country" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-500">
                By signing up you agree to our <Link href="/terms" className="text-blue-600 underline">Terms</Link>.
              </div>
              <div className="flex gap-2">
                <Link href="/pages/auth/login" className="px-4 py-2 border rounded-md text-slate-700">Already have an account?</Link>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create account</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
