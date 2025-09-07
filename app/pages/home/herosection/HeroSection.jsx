// app/components/Hero.jsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-100 via-white to-gray-50 -mt-[62px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center">
        
        {/* Left Side Content */}
        <div className="w-full md:w-3/4 space-y-6 text-center md:text-left">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            CAMEROON’S #1 JOB PLATFORM
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Find the career <br className="hidden md:block" /> that fits your life
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Explore thousands of opportunities across industries. Whether you’re a fresher 
            or an experienced professional, we’ll help you land your dream job.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/pages/searchAJob" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
              Browse Jobs
            </Link>
            <Link href="/pages/postAJob" className="px-6 py-3 border border-blue-600 text-blue-700 font-medium rounded-lg hover:bg-green-50 transition">
              Post a Job
            </Link>
          </div>

          {/* Support Logos */}
          <div className="mt-8">
            <p className="font-medium text-gray-700">Trusted by leading companies</p>
            <div className="flex flex-wrap items-center gap-5 mt-3 opacity-80">
              <div className="h-6 px-2 bg-gray-300 rounded">Meta</div>
              <div className="h-6 px-2 bg-gray-300 rounded">Whatsapp</div>
              <div className="h-6 px-2 bg-gray-300 rounded">LinkedIn</div>
              <div className="h-6 px-2 bg-gray-300 rounded">Google</div>
            </div>
          </div>
        </div>

        {/* Right Side Image (unchanged) */}
        <div className="w-full md:w-1/4 mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src="/hero-model.png"
            alt="Model"
            className="max-w-xs md:max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}
