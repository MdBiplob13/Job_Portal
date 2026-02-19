"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer/Footer";
import { Briefcase, Building2, UserCheck, CheckCircle } from "lucide-react";
import useUser from "@/app/hooks/user/userHook";

const Pricing = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="bg-linear-to-r from-primary to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* LEFT SIDE */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  Simple, Transparent Pricing
                </h1>
                <p className="mt-4 text-lg opacity-90 max-w-2xl">
                  Choose the perfect plan for your hiring needs. No hidden fees, no surprises.
                  Start with a free trial and upgrade as you grow.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#plans"
                    className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-lg shadow hover:shadow-md transition"
                  >
                    View Plans
                  </Link>
                  <Link
                    href="/pages/browse/jobs"
                    className="inline-block px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white/10 transition"
                  >
                    Search Jobs
                  </Link>
                  <Link
                    href={user?.email ? "/pages/dashboard/employer/employerJobs" : "/pages/auth/login"}
                    className="inline-block px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white/10 transition"
                  >
                    Post a Job
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-sm opacity-80">Jobs Posted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">6k+</div>
                    <div className="text-sm opacity-80">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm opacity-80">Successful Hires</div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Pricing Summary */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                    <CheckCircle size={24} /> Compare Plans
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="text-white/90">Starter</span>
                      <span className="text-white font-bold">$29/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="text-white/90">Pro Recruiter</span>
                      <span className="text-white font-bold">$99/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/20">
                      <span className="text-white/90">Enterprise</span>
                      <span className="text-white font-bold">Custom</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      href="#plans"
                      className="inline-block px-6 py-2 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition"
                    >
                      See full comparison →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </header>

      {/* PRICING CARDS */}
      <section id="plans" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Choose a plan that fits your hiring needs</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Simple pricing, transparent features, and flexible billing. Start with a single
            job post or scale to a full recruiting stack.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Starter */}
          <div className="bg-white rounded-2xl shadow p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Starter</h3>
                <p className="text-sm text-slate-500">For individual hiring & small teams</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$29</div>
                <div className="text-sm text-slate-500">/ month</div>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>• 1 active job post</li>
              <li>• 100 applicant views / month</li>
              <li>• Basic applicant tracking</li>
              <li>• Email support</li>
            </ul>

            <div className="mt-6">
              <Link href="/signup" className="block text-center px-4 py-3 bg-blue-50 text-primary rounded-lg font-medium">
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="bg-linear-to-r from-white to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pro Recruiter</h3>
                <p className="text-sm text-slate-500">For growing teams hiring regularly</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$99</div>
                <div className="text-sm text-slate-500">/ month</div>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>• 10 active job posts</li>
              <li>• 1,000 applicant views / month</li>
              <li>• Advanced applicant tracking & filtering</li>
              <li>• Featured job listing</li>
              <li>• Priority email support</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <Link href="/signup" className="flex-1 text-center px-4 py-3 bg-primary text-white rounded-lg font-medium">Get Started</Link>
              <Link href="/contact" className="flex-1 text-center px-4 py-3 border border-blue-200 rounded-lg">Contact Sales</Link>
            </div>

            <div className="mt-4 text-xs text-slate-500">Most popular</div>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Enterprise</h3>
                <p className="text-sm text-slate-500">For high-volume hiring & custom needs</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">Custom</div>
                <div className="text-sm text-slate-500">Contact us</div>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>• Unlimited job posts</li>
              <li>• Unlimited applicant views</li>
              <li>• Dedicated account manager</li>
              <li>• SSO, custom integrations & reporting</li>
              <li>• Phone & priority support</li>
            </ul>

            <div className="mt-6">
              <Link href="/contact" className="block text-center px-4 py-3 bg-white border border-primary text-primary rounded-lg font-medium">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>

        

        
      </section>

      {/* FOOTER CTA */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-semibold">Ready to hire better?</h4>
            <p className="text-sm text-slate-600">Start with a job post and see high-quality applicants within days.</p>
          </div>

          <div className="flex gap-3">
            <Link href={user?.email ? "/pages/dashboard/employer/employerJobs" : "/pages/auth/login"} className="px-5 py-3 bg-primary text-white rounded-lg font-medium">Post a Job</Link>
            <Link href="/pages/browse/jobs" className="px-5 py-3 border border-slate-200 rounded-lg">Browse Jobs</Link>
          </div>
        </div>
      </footer>

      <Footer />
    </div>
  );
};

export default Pricing;