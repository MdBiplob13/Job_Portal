"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold">Pricing for Job Posters</h1>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Fast, reliable hiring tools built for startups, scale-ups, and enterprises.
            Post jobs, reach top candidates, and manage applicants — all from one place.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link href="/pages/postAJob" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow">
              Post a Job
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-white/30 rounded-lg text-white">
              Talk to Sales
            </Link>
          </div>
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
              <Link href="/signup" className="block text-center px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
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
              <Link href="/signup" className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-lg font-medium">Get Started</Link>
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
              <Link href="/contact" className="block text-center px-4 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Marketing Pitch */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg text-center">
          <h4 className="text-lg font-semibold">Why Job Portal for your hiring?</h4>
          <p className="mt-3 text-slate-700 max-w-3xl mx-auto">
            We help you reach the right talent faster. Our platform is optimized to
            surface qualified candidates with tools that reduce time-to-hire and
            improve hiring quality. With transparent pricing and no hidden fees,
            companies of every size can scale their recruiting with confidence.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link href="/pages/postAJob" className="px-5 py-3 bg-blue-600 text-white rounded-lg">Post a Job</Link>
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
            <Link href="/pages/postAJob" className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium">Post a Job</Link>
            <Link href="/contact" className="px-5 py-3 border border-slate-200 rounded-lg">Contact Sales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
