"use client";

import Link from "next/link";

export default function SignUp() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            Stay Ahead
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Get job alerts <br className="hidden md:block" /> straight to your inbox
          </h2>

          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Unlock thousands of opportunities and never miss a role that matches 
            your skills. Our smart alerts connect you instantly with the best jobs.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/pages/searchAJob" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
              Find Your Future Job
            </Link>
            <Link href="/pages/aboutUs" className="px-6 py-3 border border-blue-600 text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
          <img
            src="/signin.jpg"
            alt="Job Alert"
            className="relative z-10 max-w-xs sm:max-w-sm md:max-w-md rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
