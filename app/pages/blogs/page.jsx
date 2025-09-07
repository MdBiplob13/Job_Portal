"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import Footer from "@/app/components/Footer/Footer";

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
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold">Insights from the Job Portal Team</h1>
              <p className="mt-4 text-lg max-w-2xl opacity-90">
                Practical hiring advice and product updates from the Job Portal team — focused on actionable, recruiter-friendly tips.
              </p>
              <p className="mt-3 text-sm opacity-80 max-w-xl">
                Note: Blog content is curated and published only by Job Portal administrators to keep guidance consistent and high-quality.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/post-job" className="px-5 py-3 bg-white text-blue-600 rounded-lg font-medium shadow">Post a Job</Link>
              <Link href="/signup" className="px-5 py-3 border border-white/30 rounded-lg text-white">Sign Up</Link>
            </div>
          </div>
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
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <div className="text-sm text-slate-400">• Admin post</div>
                </div>

                <h2 className="mt-4 text-2xl font-bold">Write job posts that actually work</h2>
                <p className="mt-3 text-slate-600">An in-depth guide on how to craft a job post that attracts qualified candidates fast — with templates you can copy.</p>

                <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                  {/* Admin chip (no photo) */}
                  <div className="inline-flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">A</div>
                    <div>
                      <div className="font-medium">Admin</div>
                      <div className="text-xs text-slate-400">Sep 1, 2025 • 8 min read</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link href="/blogs/featured" className="px-4 py-2 bg-blue-600 text-white rounded-md">Read article</Link>
                  <Link href="/signup" className="px-4 py-2 border border-blue-200 rounded-md text-blue-600">Create account to save</Link>
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
                  <div className="w-16 h-16 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-semibold">
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
                    <Link href={`/blogs/${post.id}`} className="text-sm font-medium text-blue-600">Read more →</Link>
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
              <button className="px-3 py-2 bg-blue-600 text-white rounded-md">Search</button>
            </div>
          </div>

          {/* Categories (pill UI with counts) */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Categories</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(counts).map(([cat, cnt]) => (
                <button key={cat} className="text-xs px-3 py-1 bg-slate-100 rounded-full hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 cursor-pointer">
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
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-medium">
                    A
                  </div>
                  <div>
                    <Link href={`/blogs/${p.id}`} className="text-sm font-medium text-slate-800 hover:text-blue-600">{p.title}</Link>
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
                <a key={t} href="#" className="text-xs px-3 py-1 bg-slate-100 rounded-full hover:bg-blue-50 hover:text-blue-600">#{t}</a>
              ))}
            </div>
          </div>

          {/* CTA: Get hiring insights (no subscribe) */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-xl shadow">
            <h4 className="font-semibold">Get hiring insights</h4>
            <p className="text-sm mt-2">Create an account to save articles, bookmark guides, and get product updates tailored for recruiters.</p>
            <div className="mt-4 flex gap-2">
              <Link href="/pages/auth/signup" className="flex-1 px-3 py-2 bg-white text-blue-600 rounded-md text-center">Create account</Link>
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
            <Link href="/blogs" className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium">All Articles</Link>
            <Link href="/pages/auth/signup" className="px-5 py-3 border border-slate-200 rounded-lg">Create Account</Link>
          </div>
        </div>
      </footer>
      <Footer/>
    </div>
  );
}
