"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer/Footer";
import { Briefcase, Building2, UserCheck } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO */}
 <header className="relative overflow-hidden">
      <div className="bg-linear-to-r from-primary to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT SIDE (unchanged) */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Job Portal — Connecting talent with opportunity
              </h1>
              <p className="mt-4 text-lg opacity-90 max-w-2xl">
                Job Portal is a modern hiring platform built to help companies
                find great people and help candidates discover meaningful
                careers. We focus on transparency, relevant matches and a
                human-first application experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pages/searchAJob"
                  className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-lg shadow hover:shadow-md transition"
                >
                  Search Jobs
                </Link>
                <Link
                  href="/pages/postAJob"
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

            {/* RIGHT SIDE */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                {/* Header Strip */}
                <div className="bg-linear-to-r from-primary to-indigo-500 text-white p-5 rounded-t-2xl -mx-6 -mt-6 mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase size={22} /> Featured Job
                  </h3>
                  <p className="text-sm opacity-80">
                    Handpicked top opportunities for professionals
                  </p>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Frontend Developer
                      </h4>
                      <p className="text-sm text-gray-500">
                        Remote • Full Time
                      </p>
                    </div>
                    <div className="bg-blue-100 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      $80k - $100k
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Building2 size={18} />
                    <span className="text-sm">TechNova Solutions</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <UserCheck size={18} />
                    <span className="text-sm">3 days ago</span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href="/pages/searchAJob"
                      className="w-full block text-center bg-primary hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Floating Accent */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
              </div>
            </div>

          </div>
        </div>

        {/* keep original wave unchanged */}
        <svg
          className="absolute right-0 bottom-0 -mb-1 hidden lg:block"
          width="400"
          height="200"
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M0 100 C100 0 300 200 400 100 L400 200 L0 200 Z" fill="#eff6ff" />
        </svg>
      </div>
    </header>

      {/* PRICING CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
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

        {/* Marketing Pitch */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg text-center">
          <h4 className="text-lg font-semibold">Bid Portal — Connecting opportunities with suppliers</h4>
          <p className="mt-3 text-slate-700 max-w-3xl mx-auto">
            Bid Portal is a modern procurement platform designed to help organisations find the right personnel and help suppliers discover valuable business opportunities. We focus on transparency, relevant matches, and a user-friendly submission experience.
          </p>

          <p className="mt-5">Search Bid  -- -- post a bid</p>

          <div className="mt-6 flex justify-center gap-4">
            <Link href="/pages/postAJob" className="px-5 py-3 bg-primary text-white rounded-lg">Post a Job</Link>
            <Link href="/pages/auth/signup" className="px-5 py-3 border border-blue-200 rounded-lg">Create Account</Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold">Frequently asked questions</h3>
          <div className="mt-4 space-y-4">
            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="cursor-pointer font-medium">Can I change my plan later?</summary>
              <p className="mt-2 text-sm text-slate-600">Yes — you can upgrade or downgrade at any time from your account settings.</p>
            </details>

            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="cursor-pointer font-medium">Do you offer annual discounts?</summary>
              <p className="mt-2 text-sm text-slate-600">Yes — we offer discounts for annual commitments. Contact sales for custom pricing.</p>
            </details>

            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="cursor-pointer font-medium">Is there a free trial?</summary>
              <p className="mt-2 text-sm text-slate-600">We offer a 7-day free trial for Starter and a 14-day trial for Pro Recruiter.</p>
            </details>
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
            <Link href="/pages/postAJob" className="px-5 py-3 bg-primary text-white rounded-lg font-medium">Post a Job</Link>
            <Link href="/contact" className="px-5 py-3 border border-slate-200 rounded-lg">Contact Sales</Link>
          </div>
        </div>
      </footer>
       
      <Footer/>
    </div>
  );
};

export default Pricing;


[ "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Cuba", "Dominica", "Dominican Republic", "Grenada", "Guyana", "Haiti", "Jamaica", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago" ]
