// app/(your-path)/proposals/[id]/page.jsx  (or component file: SingleProposePage.jsx)
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useGetSinglePropose from "@/app/hooks/jobs/GetSinglePropose";

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString() : "-");

const SingleProposePage = () => {
  const params = useParams();
  const { id } = params || {};
  const router = useRouter();
  const proposeId = id;
  const { proposal, loading, error } = useGetSinglePropose(proposeId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (loading) return <div className="p-6">Loading proposal...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!proposal) return <div className="p-6">No proposal found.</div>;

  const job = proposal.jobId || {};
  const prof = proposal.professionalId || {};

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{job.title || "Job detail"}</h1>
          <p className="text-sm text-slate-600">{job.companyName || job.company || "-"}</p>
        </div>

        <div className="flex gap-3 items-center">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded cursor-pointer">
            Back
          </button>
          <Link href={`/pages/browse/jobs/${job._id}`} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            View Job
          </Link>
        </div>
      </div>

      {/* Job summary */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Company</p>
            <p className="font-medium">{job.companyName || "-"}</p>

            <p className="text-sm text-slate-500 mt-3">Location</p>
            <p className="">{job.companyLocation || job.location || "-"}</p>

            <p className="text-sm text-slate-500 mt-3">Type</p>
            <p>{job.jobType || job.workType || "-"}</p>

            <p className="text-sm text-slate-500 mt-3">Deadline</p>
            <p>{job.deadline ? new Date(job.deadline).toLocaleString() : "-"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Salary</p>
            <p className="font-medium">{job.salary ? `${job.salary} ${job.salaryType || ""}` : "-"}</p>

            <p className="text-sm text-slate-500 mt-3">Work Days/Time</p>
            <p>{job.workDays || job.workTime || "-"}</p>

            <p className="text-sm text-slate-500 mt-3">Skills</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {(job.skills || []).map((s, i) => (
                <span key={i} className="px-2 py-1 bg-slate-100 rounded text-sm">
                  {typeof s === "string" ? s : s.name || s.skillName || JSON.stringify(s)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Job Description</h3>
          <p className="text-slate-700 mt-2">{job.description || "-"}</p>
        </div>
      </div>

      {/* Proposal section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-start gap-4">
          <img
            src={prof.photo || "/defaultProfilePic.jpg"}
            alt={prof.name || "User"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{prof.name || prof.userName || "-"}</h4>
                <p className="text-xs text-slate-500">@{prof.userName || "-"}</p>
              </div>

              <div className="text-sm text-slate-500">
                Submitted: {fmtDate(proposal.createdAt)}
              </div>
            </div>

            <div className="mt-3 text-slate-700">
              <p className="font-medium">Cover Letter</p>
              <p className="mt-1">{proposal.coverLetter || proposal.resume || "-"}</p>

              <div className="mt-3">
                <p className="font-medium">Resume</p>
                <p className="mt-1">{proposal.resume || "-"}</p>
                {/* if resume URL you can convert to link */}
              </div>

              {proposal.links?.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium">Links</p>
                  <ul className="mt-2 space-y-1">
                    {proposal.links.map((l, i) => (
                      <li key={i}>
                        <a className="text-blue-600 underline" href={l.linkURL || "#"} target="_blank" rel="noreferrer">
                          {l.linkName || l.linkURL}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Proposal meta */}
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
          <div>Application Count: {job.applicationCount ?? "-"}</div>
          <div>|</div>
          <div>Work Type: {job.workType || job.jobType || "-"}</div>
          <div>|</div>
          <div>Work Days: {job.workDays || "-"}</div>
        </div>

        {/* Action area (for employer/admin) - optional handlers
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">Accept</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer">Reject</button>
        </div> */}
      </div>
    </div>
  );
};

export default SingleProposePage;
