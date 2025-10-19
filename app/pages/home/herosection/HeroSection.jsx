"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-100 via-white to-gray-50 -mt-[62px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center min-h-[600px] gap-8 md:gap-12">
        {/* Left Side Content */}
        <div className="w-full md:w-3/4 space-y-6 text-center md:text-left mt-20">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            CAMEROON’S #1 JOB PLATFORM
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Find the career <br className="hidden md:block" /> that fits your
            life
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            Explore thousands of opportunities across industries. Whether you’re
            a fresher or an experienced professional, we’ll help you land your
            dream job.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {[
              ["Earn from bid", "/pages/searchAJob"],
              ["Post a bid", "/pages/postAJob"],
            ].map(([text, href], idx) => (
              <Link
                key={idx}
                href={href}
                className="relative overflow-hidden px-4 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg transition group w-full sm:w-auto"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-blue-600 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-white">
                  {text}
                </span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <input
              type="text"
              placeholder="Search job or professional"
              className="w-full sm:w-[280px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <select className="w-full sm:w-[180px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option>Location</option>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Bamenda</option>
            </select>
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-1/4 mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src="/hero-model.png"
            alt="Model"
            className="max-w-[250px] sm:max-w-[300px] md:max-w-xs lg:max-w-sm object-contain mt-24"
          />
        </div>
      </div>
    </section>
  );
}
