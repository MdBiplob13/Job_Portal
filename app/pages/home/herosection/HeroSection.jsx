"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-[#53CBFB] via-[#CFCFCF] to-[#0443F2]/20 -mt-[62px]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center min-h-[600px] gap-8 md:gap-12">
        {/* Left Side Content */}
        <div className="w-full md:w-3/4 space-y-6 text-center md:text-left mt-20">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[#0443F2] rounded-full">
            The Caribbean's first AI job seeker tool
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-[#040404] leading-tight">
            Post. Bid. Win.
          </h1>

          <p className="text-xl sm:text-2xl text-[#040404] max-w-xl mx-auto md:mx-0 font-medium">
            One platform, endless opportunities
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-16">
            {[
              ["Browse Opportunities", "/pages/searchAJob"],
              ["Post Bid", "/pages/postAJob"],
            ].map(([text, href], idx) => (
              <Link
                key={idx}
                href={href}
                className="relative overflow-hidden px-8 py-4 border-2 border-[#53CBFB] text-[#0443F2] font-bold rounded-xl transition-all duration-500 group w-full sm:w-auto hover:scale-105"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-[#53CBFB] transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-white text-lg">
                  {text}
                </span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start bg-transparent p-6 rounded-2xl">
            <input
              type="text"
              placeholder="Search job or professional"
              className="w-full sm:w-[280px] px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53CBFB] focus:border-transparent transition bg-white text-lg"
            />
            <select className="w-full sm:w-[180px] px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53CBFB] focus:border-transparent transition bg-white text-lg">
              <option>Location</option>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Bamenda</option>
            </select>
            <button className="w-full sm:w-auto px-8 py-4 bg-[#53CBFB] text-white rounded-xl font-bold hover:bg-[#0443F2] transition-all duration-300 text-lg hover:scale-105">
              Search
            </button>
          </div>
        </div>

        {/* Right Side Image - Even more prominent */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-end items-end">
          <div className="relative w-full h-full">
            {/* Background effects */}
            <div className="absolute -inset-12 bg-gradient-to-bl from-[#53CBFB]/25 via-[#0443F2]/15 to-transparent rounded-full blur-3xl"></div>

            {/* Main image - full viewport height */}
            <img
              src="/office_2.png"
              alt="Office"
              className="relative w-full h-[550px] md:h-[700px] lg:h-[800px] object-cover object-left-bottom drop-shadow-3xl rounded-l-3xl transform hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient overlay for better blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#53CBFB]/10 rounded-l-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
