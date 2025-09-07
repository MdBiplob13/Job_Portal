"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  Job Portal — Connecting talent with opportunity
                </h1>
                <p className="mt-4 text-lg opacity-90 max-w-2xl">
                  Job Portal is a modern hiring platform built to help companies find
                  great people and help candidates discover meaningful careers. We
                  focus on transparency, relevant matches and a human-first
                  application experience.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/pages/searchAJob"
                    className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:shadow-md transition"
                  >
                    Search Jobs
                  </Link>
                  <Link
                    href="/pages/postAJob"
                    className="inline-block px-6 py-3 border border-white/40 text-white rounded-lg hover:bg-white/10 transition"
                  >
                    Post a Job
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">10k+</div>
                    <div className="text-sm opacity-80">Jobs Posted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">6k+</div>
                    <div className="text-sm opacity-80">Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm opacity-80">Successful Hires</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg -translate-y-6">
                  <img
                    src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                    alt="Founder avatar"
                    className="w-28 h-28 rounded-full object-cover mx-auto shadow-md"
                  />

                  <h3 className="text-center mt-4 font-semibold text-lg">A. Rahman</h3>
                  <p className="text-center text-sm opacity-80">Founder & CEO, Job Portal</p>

                  <p className="mt-4 text-sm text-slate-600">
                    A. Rahman built Job Portal to make hiring fairer and faster for
                    everyone. With a background in product and recruitment tech, he
                    believes great outcomes come from clear communication and smart
                    tooling.
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <a
                      href="#team"
                      className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-medium"
                    >
                      Meet the team
                    </a>
                    <a
                      href="/contact"
                      className="text-sm px-4 py-2 border border-slate-200 rounded-full text-slate-700"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* decorative svg */}
        <svg
          className="absolute right-0 bottom-0 -mb-1 hidden lg:block"
          width="400"
          height="200"
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M0 100 C100 0 300 200 400 100 L400 200 L0 200 Z" fill="#eff6ff" />
        </svg>
      </header>

      {/* MISSION & VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-slate-600 max-w-prose">
              We help people find jobs they love and companies find people that
              actually fit. Job Portal focuses on clear job descriptions, better
              matching and removing unnecessary barriers so hiring is faster and
              more human.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl shadow">
                <h4 className="font-medium">Transparent Hiring</h4>
                <p className="text-sm mt-2 text-slate-600">Clear job posts and honest expectations.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow">
                <h4 className="font-medium">Smart Matching</h4>
                <p className="text-sm mt-2 text-slate-600">We prioritize relevance over noise.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow">
                <h4 className="font-medium">Candidate First</h4>
                <p className="text-sm mt-2 text-slate-600">Simple applications and helpful feedback.</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow">
                <h4 className="font-medium">Secure & Private</h4>
                <p className="text-sm mt-2 text-slate-600">Your data is safe with us.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quick Facts</h3>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>• Founded in 2023 in Dhaka, Bangladesh</li>
              <li>• Built by a small team of product and engineering enthusiasts</li>
              <li>• Focused on local hiring and remote opportunities</li>
              <li>• Supports employers of all sizes — startups to enterprises</li>
            </ul>

            <div className="mt-6 bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-inner">
              <p className="text-sm text-slate-700">
                Job Portal was created to reduce friction between companies and
                candidates. We iterate fast, listen closely to feedback and keep a
                high bar for quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "A. Rahman", title: "Founder & CEO" },
              { name: "S. Karim", title: "Head of Product" },
              { name: "M. Noor", title: "Lead Engineer" },
              { name: "R. Hossain", title: "Customer Success" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow">
                <img
                  src={`https://xsgames.co/randomusers/assets/avatars/male/${idx}.jpg`}
                  alt={`${member.name}`}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
                <h4 className="text-center mt-3 font-medium">{member.name}</h4>
                <p className="text-center text-sm text-slate-600">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-semibold">Ready to find the right fit?</h4>
            <p className="text-sm text-slate-600">Search thousands of jobs or post a position in minutes.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/pages/searchAJob" className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium">Search Jobs</Link>
            <Link href="/pages/postAJob" className="px-5 py-3 border border-slate-200 rounded-lg">Post a Job</Link>
          </div>
        </div>
      </footer>

      <Footer/>
    </div>
  );
};

export default AboutUs;
