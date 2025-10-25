"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer/Footer";
import { Briefcase, Building2, UserCheck } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    title: "How to write a job post that attracts top talent",
    excerpt:
      "A clear job post saves time and brings better candidates. Learn what to include and what to skip.",
    date: "Aug 12, 2025",
    author: "Admin",
    category: "Hiring",
    tags: ["job-post", "writing"],
  },
  {
    id: 2,
    title: "5 interview questions that reveal real skills",
    excerpt:
      "Forget generic questions — try these practical prompts to uncover real candidate ability.",
    date: "Jul 30, 2025",
    author: "Admin",
    category: "Interviews",
    tags: ["interview", "questions"],
  },
  {
    id: 3,
    title: "Remote hiring: building trust across timezones",
    excerpt:
      "Remote teams need clearer processes. This guide covers interviews, onboarding and culture.",
    date: "Jun 5, 2025",
    author: "Admin",
    category: "Remote",
    tags: ["remote", "culture"],
  },
  {
    id: 4,
    title: "How to reduce time-to-hire without sacrificing quality",
    excerpt:
      "Speed and quality can coexist. Use data, automation and better job ads.",
    date: "May 18, 2025",
    author: "Admin",
    category: "Hiring",
    tags: ["hiring", "metrics"],
  },
];

function computeCategoryCounts(posts) {
  return posts.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
}

export default function Blogs() {
  const counts = computeCategoryCounts(samplePosts);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO */}
     <header className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT SIDE (unchanged) */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                Job Portal — Connecting talent with opportunity
              </h1>
              <p className="mt-4 text-lg opacity-90 max-w-2xl">
                Job Portal is a modern hiring platform built to help companies
                find great people and help candidates discover meaningful
                careers. We focus on transparency, relevant matches and a
                human-first application experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pages/searchAJob"
                  className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-lg shadow hover:shadow-md transition"
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

            {/* RIGHT SIDE */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                {/* Header Strip */}
                <div className="bg-gradient-to-r from-primary to-indigo-500 text-white p-5 rounded-t-2xl -mx-6 -mt-6 mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase size={22} /> Featured Job
                  </h3>
                  <p className="text-sm opacity-80">
                    Handpicked top opportunities for professionals
                  </p>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Frontend Developer
                      </h4>
                      <p className="text-sm text-gray-500">
                        Remote • Full Time
                      </p>
                    </div>
                    <div className="bg-blue-100 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      $80k - $100k
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Building2 size={18} />
                    <span className="text-sm">TechNova Solutions</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <UserCheck size={18} />
                    <span className="text-sm">3 days ago</span>
                  </div>

                  <div className="pt-3">
                    <Link
                      href="/pages/searchAJob"
                      className="w-full block text-center bg-primary hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Floating Accent */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
              </div>
            </div>

          </div>
        </div>

        {/* keep original wave unchanged */}
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
      </div>
    </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* POSTS COLUMN */}
        <section className="lg:col-span-2 space-y-6">
          {/* Featured Post */}
          <article className="relative bg-white rounded-2xl shadow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <div className="text-sm text-slate-400">• Admin post</div>
                </div>

                <h2 className="mt-4 text-2xl font-bold">Write job posts that actually work</h2>
                <p className="mt-3 text-slate-600">An in-depth guide on how to craft a job post that attracts qualified candidates fast — with templates you can copy.</p>

                <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                  {/* Admin chip (no photo) */}
                  <div className="inline-flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">A</div>
                    <div>
                      <div className="font-medium">Admin</div>
                      <div className="text-xs text-slate-400">Sep 1, 2025 • 8 min read</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href="/blogs/featured" className="px-4 py-2 bg-primary text-white rounded-md">Read article</Link>
                  <Link href="/signup" className="px-4 py-2 border border-blue-200 rounded-md text-primary">Create account to save</Link>
                </div>
              </div>

              <div className="h-56 md:h-auto flex items-center justify-center bg-blue-50">
                {/* decorative element instead of photo */}
                <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect width="220" height="140" rx="16" fill="#eff6ff"/>
                  <g transform="translate(20,30)" fill="#c7e0ff">
                    <rect x="0" y="0" width="80" height="12" rx="6" />
                    <rect x="0" y="24" width="150" height="12" rx="6" />
                    <rect x="0" y="48" width="110" height="12" rx="6" />
                  </g>
                </svg>
              </div>
            </div>
          </article>

          {/* Post List */}
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow p-4 md:p-6 flex gap-4 items-start">
                {/* removed photo: small category badge instead */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center text-secondary font-semibold">
                    {post.category.slice(0,2).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-500">{post.category}</div>
                    <div className="text-xs text-slate-400">{post.date}</div>
                  </div>

                  <h3 className="mt-2 font-semibold text-lg">{post.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{post.excerpt}</p>

                  <div className="mt-3 flex items-center gap-3">
                    <Link href={`/blogs/${post.id}`} className="text-sm font-medium text-primary">Read more →</Link>
                    <div className="text-sm text-slate-500">by {post.author}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow-sm" role="navigation" aria-label="Pagination">
              <a href="#" className="px-3 py-2 rounded-l-md border border-slate-200 bg-white">Prev</a>
              <a href="#" className="px-3 py-2 border-t border-b border-slate-200 bg-white">1</a>
              <a href="#" className="px-3 py-2 border border-slate-200 bg-white">2</a>
              <a href="#" className="px-3 py-2 rounded-r-md border border-slate-200 bg-white">Next</a>
            </nav>
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* Search */}
          <div className="bg-white p-4 rounded-xl shadow">
            <label className="sr-only">Search articles</label>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Search articles..." className="flex-1 px-3 py-2 bg-slate-50 rounded-md border border-slate-200" />
              <button className="px-3 py-2 bg-primary text-white rounded-md">Search</button>
            </div>
          </div>

          {/* Categories (pill UI with counts) */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Categories</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(counts).map(([cat, cnt]) => (
                <button key={cat} className="text-xs px-3 py-1 bg-slate-100 rounded-full hover:bg-blue-50 hover:text-primary flex items-center gap-2 cursor-pointer">
                  <span className="font-medium">{cat}</span>
                  <span className="text-slate-500 text-xs">({cnt})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent posts (no photos) */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Recent posts</h4>
            <ul className="mt-3 space-y-3">
              {samplePosts.slice(0,3).map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-secondary flex items-center justify-center font-medium">
                    A
                  </div>
                  <div>
                    <Link href={`/blogs/${p.id}`} className="text-sm font-medium text-slate-800 hover:text-primary">{p.title}</Link>
                    <div className="text-xs text-slate-400">{p.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Tags</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {['hiring','remote','interview','culture','tips'].map((t) => (
                <a key={t} href="#" className="text-xs px-3 py-1 bg-slate-100 rounded-full hover:bg-blue-50 hover:text-primary">#{t}</a>
              ))}
            </div>
          </div>

          {/* CTA: Get hiring insights (no subscribe) */}
          <div className="bg-gradient-to-r from-primary to-blue-500 text-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">Get hiring insights</h4>
            <p className="text-sm mt-2">Create an account to save articles, bookmark guides, and get product updates tailored for recruiters.</p>
            <div className="mt-4 flex gap-2">
              <Link href="/pages/auth/signup" className="flex-1 px-3 py-2 bg-white text-primary rounded-md text-center">Create account</Link>
              <Link href="/blogs/featured" className="flex-1 px-3 py-2 border border-white/40 rounded-md text-center">Read our guide</Link>
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER CTA */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-semibold">Love what you read?</h4>
            <p className="text-sm text-slate-600">Share with a colleague or create an account to keep your favorite articles.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/blogs" className="px-5 py-3 bg-primary text-white rounded-lg font-medium">All Articles</Link>
            <Link href="/pages/auth/signup" className="px-5 py-3 border border-slate-200 rounded-lg">Create Account</Link>
          </div>
        </div>
      </footer>
      <Footer/>
    </div>
  );
}
