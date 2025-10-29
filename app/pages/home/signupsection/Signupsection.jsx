"use client";

import Link from "next/link";

export default function SignUp() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#53cbfb]">
    
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <span className="inline-block px-5 py-1 text-sm font-semibold text-white bg-white/20 rounded-full shadow-sm">
            Stay Ahead
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Get job <span className="text-white">alerts</span> <br className="hidden md:block" /> straight to your
            inbox
          </h2>

          <p className="text-white text-lg max-w-md mx-auto md:mx-0">
            Unlock thousands of opportunities and never miss a role that matches
            your skills. Our smart alerts connect you instantly with the best
            jobs.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/pages/searchAJob"
              className="relative px-8 py-3 rounded-lg border border-white text-white font-medium overflow-hidden group transition-all duration-500"
            >
              {/* Background fill on hover */}
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

              {/* Text */}
              <span className="relative z-10 group-hover:text-[#53cbfb] transition-colors duration-500">
                Find Your Future Job
              </span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative ">
          <div className="relative z-10">
            <img
              src="/signin.jpg"
              alt="Job Alert"
              className="max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}