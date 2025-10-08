// app/components/Dashboard/Jobs/JobCard.jsx
"use client";
import React from "react";
import Image from "next/image";
import { FiMessageCircle, FiClock, FiCheckCircle, FiEdit, FiEye } from "react-icons/fi";

export default function JobCard({ job, onEdit, onView, onMessage, onMarkComplete }) {
  return (
    <article className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden border">
          <Image src="/user1.jpeg" alt="org" width={56} height={56} className="object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">{job.title}</h3>
              <div className="text-xs text-slate-500">{job.department}</div>
            </div>

            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                ${job.status === "published" ? "bg-blue-50 text-blue-600" : ""}
                ${job.status === "in-progress" ? "bg-yellow-50 text-yellow-700" : ""}
                ${job.status === "completed" ? "bg-green-50 text-emerald-700" : ""}`}>
                {job.statusLabel}
              </div>

              <div className="text-xs text-slate-400 mt-2">{job.time}</div>
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-3 leading-snug">{job.summary}</p>

          <div className="flex items-center justify-between mt-4 text-xs text-slate-500 border-t pt-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiClock />
                <span>{job.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">{job.bids}</span>
                <span className="text-slate-400">bids</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle />
                <span>{job.milestones} milestones</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* status-specific actions */}
              {job.status === "published" && (
                <>
                  <button onClick={() => onEdit?.(job)} className="px-3 py-1 text-sm border rounded-md text-slate-700 hover:bg-slate-50">
                    <FiEdit className="inline mr-1" /> Edit
                  </button>
                  <button onClick={() => onView?.(job)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <FiEye className="inline mr-1" /> View
                  </button>
                </>
              )}

              {job.status === "in-progress" && (
                <>
                  <button onClick={() => onMessage?.(job)} className="px-3 py-1 text-sm border rounded-md text-slate-700 hover:bg-slate-50">
                    <FiMessageCircle className="inline mr-1" /> Message
                  </button>
                  <button onClick={() => onMarkComplete?.(job)} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Mark Complete
                  </button>
                </>
              )}

              {job.status === "completed" && (
                <button onClick={() => onView?.(job)} className="px-3 py-1 text-sm border rounded-md text-slate-700 hover:bg-slate-50">
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
