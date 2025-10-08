"use client";

import Link from "next/link";

export default function SignUp() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-blue-50">
      {/* Decorative Blobs */}
      {/* <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div> */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
          <span className="inline-block px-5 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full shadow-sm">
            Stay Ahead
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Get job <span className="text-blue-600">alerts</span> <br className="hidden md:block" /> straight to your
            inbox
          </h2>

          <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
            Unlock thousands of opportunities and never miss a role that matches
            your skills. Our smart alerts connect you instantly with the best
            jobs.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/pages/searchAJob"
              className="relative px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium overflow-hidden group transition-all duration-500"
            >
              {/* Background fill on hover */}
              <span className="absolute inset-0 bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>

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
              className="max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Floating Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r  rounded-2xl opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Blob Animation Keyframes */}
      <style jsx>{`
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}
