"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[#53cbfb] -mt-[62px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center min-h-[600px] gap-8 md:gap-12">
        {/* Left Side Content */}
        <div className="w-full md:w-3/4 space-y-6 text-center md:text-left mt-20">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-[#0443f2] rounded-full">
            The Caribbean's first AI job seeker tool
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug">
            Post. Bid. Win.
          </h1>

          <p className="text-base sm:text-lg text-white max-w-xl mx-auto md:mx-0">
            One platform, endless opportunities
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {[
              ["Browse Opportunities", "/pages/searchAJob"],
              ["Post Bid", "/pages/postAJob"],
            ].map(([text, href], idx) => (
              <Link
                key={idx}
                href={href}
                className="relative overflow-hidden px-4 py-3 border border-white text-white font-medium rounded-lg transition group w-full sm:w-auto"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-[#53cbfb]">
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
              className="w-full sm:w-[280px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <select className="w-full sm:w-[180px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition">
              <option>Location</option>
              <option>Yaoundé</option>
              <option>Douala</option>
              <option>Bamenda</option>
            </select>
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-[#53cbfb] rounded-lg font-medium hover:bg-gray-100 transition">
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