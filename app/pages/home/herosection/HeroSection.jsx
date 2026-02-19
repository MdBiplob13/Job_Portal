"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[720px] -mt-[62px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/home_banner.png"
        alt="Home Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B2C4A]/75"></div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
        <div className="max-w-3xl text-white space-y-6">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Post Job.
            <br />
            Win Bid & Earn.
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90">
            We value your time and Bidpole proves it.
            <br />
            Come to Bidpole and your search for best professional.
            <br />
            If you are professional come to Bidpole and start earning.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/pages/searchAJob"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B2C4A] font-semibold rounded-full hover:bg-[#53CBFB] hover:text-white transition cursor-pointer"
            >
              🔍 Looking for Professional
            </Link>

            <Link
              href="/pages/postAJob"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B2C4A] font-semibold rounded-full hover:bg-[#53CBFB] hover:text-white transition cursor-pointer"
            >
              💼 Earn as a Professional
            </Link>
          </div>

          {/* Search Section */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 shadow-xl max-w-3xl border border-white/20">
            <input
              type="text"
              placeholder="Search job or professional"
              className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#53CBFB]"
            />

            <select className="w-full sm:w-[180px] px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#53CBFB]">
              <option className="text-black">Location</option>
              <option className="text-black">Yaoundé</option>
              <option className="text-black">Douala</option>
              <option className="text-black">Bamenda</option>
            </select>

            <button className="px-6 py-3 bg-[#53CBFB] text-white font-semibold rounded-xl hover:bg-[#0B2C4A] transition cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
