"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation"; // Note: in Next 13/14/15, you can access params differently — adapt if needed

// For demo we reuse same sample posts; in production fetch by id
const samplePosts = [
  /* same array as above or import from a shared mock file */
];

export default function SingleBlogPage({ params }) {
  // params.id should be available in app router: app/blogs/[id]/page.jsx
  const postId = params?.id ?? "1";
  const post = samplePosts.find((p) => String(p.id) === String(postId)) || samplePosts[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/blogs" className="inline-block text-sm text-blue-500 mb-6">← Back to articles</Link>

        <article className="bg-white rounded-2xl shadow p-8">
          <header className="mb-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
                  <img src={post.img} alt="author" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">Admin</div>
                    <div className="text-xs text-slate-400">{post.date} • 8 min read</div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-slate-500">{post.category}</div>
                <div className="mt-4 flex gap-2">
                  <Link href="/signup" className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Create account</Link>
                  <Link href="/post-job" className="px-3 py-2 border border-slate-200 rounded-md text-sm">Post a job</Link>
                </div>
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="mb-6">
            <img src="https://source.unsplash.com/collection/1163637/1200x700?sig=99" alt="hero" className="w-full rounded-lg object-cover" />
          </div>

          {/* Body (replace static text with markdown/html from DB) */}
          <div className="prose max-w-none text-slate-700">
            <p>{post.excerpt}</p>
            <h2>Why this matters</h2>
            <p>
              Writing clear, focused job posts saves time for recruiters and applicants.
              Remove vague statements, offer a clear role summary, and add a realistic responsibilities section.
            </p>

            <h3>Quick template</h3>
            <pre className="bg-slate-100 p-4 rounded">Job Title — Short summary (3 lines) — Key responsibilities — Required skills — Benefits</pre>

            <p>
              If you like this guide, create an account to save it and get access to templates and analytics for your postings.
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="px-4 py-3 bg-blue-600 text-white rounded-md text-center">Create account to save</Link>
            <Link href="/contact" className="px-4 py-3 border border-slate-200 rounded-md text-center">Contact us for custom help</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
