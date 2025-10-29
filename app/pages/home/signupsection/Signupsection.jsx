"use client";

import Link from "next/link";

export default function SignUp() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-l from-[#53CBFB]/40 via-[#CFCFCF] to-[#0443F2]/30">
    
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <span className="inline-block px-6 py-2 text-lg font-bold text-white bg-[#0443F2] rounded-full shadow-lg">
            Stay Ahead
          </span>

          <h2 className="text-5xl md:text-7xl font-extrabold text-[#040404] leading-tight">
            Get job <span className="text-[#53CBFB]">alerts</span> <br className="hidden md:block" /> straight to your
            inbox
          </h2>

          <p className="text-2xl text-[#040404] max-w-md mx-auto md:mx-0 font-medium">
            Unlock thousands of opportunities and never miss a role that matches
            your skills. Our smart alerts connect you instantly with the best
            jobs.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-12">
            <Link
              href="/pages/searchAJob"
              className="relative px-10 py-5 rounded-xl border-2 border-[#53CBFB] text-[#0443F2] font-bold overflow-hidden group transition-all duration-500 text-xl hover:scale-105"
            >
              {/* Background fill on hover */}
              <span className="absolute inset-0 bg-[#53CBFB] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

              {/* Text */}
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Find Your Future Job
              </span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative z-10">
            <img
              src="/signin.jpg"
              alt="Job Alert"
              className="max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white"
            />
            {/* Floating Glow */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#53CBFB]/30 to-[#0443F2]/20 rounded-3xl opacity-30 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}