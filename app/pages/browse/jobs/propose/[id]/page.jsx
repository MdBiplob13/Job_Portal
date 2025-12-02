"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import useGetSinglePropose from "@/app/hooks/jobs/GetSinglePropose";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";

const ShortText = ({ text = "", limit = 240 }) => {
  const [open, setOpen] = useState(false);
  if (!text) return <span className="text-slate-500">Not provided</span>;
  if (text.length <= limit) return <p className="text-slate-700">{text}</p>;
  return (
    <div className="text-slate-700">
      <p>{open ? text : text.substring(0, limit) + "..."}</p>
      <button
        onClick={() => setOpen((s) => !s)}
        className="mt-2 text-sm text-primary underline"
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
};

const SingleProposePage = () => {
  const params = useParams();
  const router = useRouter();
  const { proposal, loading, error } = useGetSinglePropose(params.id);

  // defensive accessors
  const job = proposal?.jobId || proposal?.job || null;
  const user = proposal?.professionalId || proposal?.professional || null;

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Application Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View the applicant details and their submission for this job.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
            >
              ← Back
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <p className="text-slate-600">Loading proposal...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <p className="text-red-500">Failed to load proposal — {error}</p>
          </div>
        )}

        {!loading && !proposal && !error && (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <p className="text-slate-600">No proposal found.</p>
          </div>
        )}

        {!loading && proposal && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Applicant Card */}
            <aside className="col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={user?.photo || "/default-avatar.png"}
                  alt={user?.name || "Applicant"}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {user?.name || "Unknown"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {user?.headline || "No headline provided"}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Jobs posted</div>
                    <div className="font-semibold text-slate-800">
                      {user?.job?.jobPosted ?? 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Jobs done</div>
                    <div className="font-semibold text-slate-800">
                      {user?.job?.jobCompleted ?? 0}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Rating</div>
                    <div className="font-semibold text-slate-800">
                      {user?.review?.rating ? user.review.rating : "—"}{" "}
                      <span className="text-xs text-slate-500">(
                        {user?.review?.totalRatings ?? 0})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{user?.location || "Not specified"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email || "No email"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                    <Phone className="w-4 h-4" />
                    <span>{user?.phone || "No phone"}</span>
                  </div>

                  {/* Social */}
                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Social
                    </div>
                    <div className="flex flex-col gap-2">
                      {user?.social?.facebook && (
                        <a
                          href={user.social.facebook}
                          target="_blank"
                          className="text-sm text-blue-600 underline flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Facebook
                        </a>
                      )}
                      {user?.social?.linkedin && (
                        <a
                          href={user.social.linkedin}
                          target="_blank"
                          className="text-sm text-blue-600 underline flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {user?.social?.instagram && (
                        <a
                          href={user.social.instagram}
                          target="_blank"
                          className="text-sm text-blue-600 underline flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Instagram
                        </a>
                      )}
                      {user?.social?.portfolio && (
                        <a
                          href={user.social.portfolio}
                          target="_blank"
                          className="text-sm text-blue-600 underline flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Portfolio
                        </a>
                      )}

                      {!user?.social?.facebook &&
                        !user?.social?.linkedin &&
                        !user?.social?.instagram &&
                        !user?.social?.portfolio && (
                          <div className="text-sm text-slate-500">No links</div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* MIDDLE: Application details */}
            <main className="col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {job?.title || "Job Title"}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {job?.companyName || job?.company || "Company"}
                      {" • "}
                      {job?.companyLocation || "Location"}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {job?.salary
                            ? `${job.salaryType === "Hourly" ||
                              job.salaryType === "hourly"
                                ? `$${job.salary}/hr`
                                : job.salaryType === "Monthly" ||
                                  job.salaryType === "monthly"
                                ? `৳${job.salary}/mo`
                                : `৳${job.salary}`
                              }`
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          Deadline:{" "}
                          {job?.deadline
                            ? new Date(job.deadline).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{job?.totalHiring ?? job?.totalHiring ?? "—"} hiring</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 md:ml-6">
                    <span className="text-sm text-slate-500">Applied on</span>
                    <div className="font-semibold text-slate-800">
                      {new Date(proposal.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-slate-700">
                  <h4 className="font-semibold mb-2">Cover Letter</h4>
                  <ShortText text={proposal.coverLetter} limit={400} />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Resume</h4>
                    {proposal.resume ? (
                      <>
                        {/* if resume is a URL show link, otherwise show text */}
                        {proposal.resume.startsWith("http") ? (
                          <a
                            href={proposal.resume}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            View resume
                          </a>
                        ) : (
                          <p className="text-slate-700">{proposal.resume}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-slate-500">No resume provided</p>
                    )}

                    {/* proposal links */}
                    <div className="mt-3">
                      <h4 className="font-semibold mb-2">Submitted Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {proposal.links && proposal.links.length > 0 ? (
                          proposal.links.map((l, i) => (
                            <a
                              key={i}
                              href={l.linkURL}
                              target="_blank"
                              className="text-sm text-blue-600 underline"
                            >
                              {l.linkName || l.linkURL}
                            </a>
                          ))
                        ) : (
                          <span className="text-slate-500">No links</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Skills & Languages</h4>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {user?.skills && user.skills.length > 0 ? (
                          user.skills.slice(0, 8).map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500">No skills listed</span>
                        )}
                        {user?.skills && user.skills.length > 8 && (
                          <div className="text-sm text-slate-500 px-2 py-1 rounded">
                            +{user.skills.length - 8} more
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-600">
                        Languages:{" "}
                        {Array.isArray(user?.languages) && user.languages.length
                          ? user.languages.join(", ")
                          : "Not specified"}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Other info</h4>
                      <div className="text-sm text-slate-600">
                        Current status: {user?.currentJobStatus || "—"}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        Charge per hour: {user?.chargeParHour ? `৳${user.chargeParHour}` : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    href={`mailto:${user?.email}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
                  >
                    Message Now
                  </button>

                  {user?.phone && (
                    <button
                      href={`tel:${user.phone}`}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Call
                    </button>
                  )}

                  <button
                    onClick={() => {
                      // accept or other actions can be wired here
                      alert("Accept action placeholder");
                    }}
                    className="px-4 py-2 border rounded-lg cursor-pointer"
                  >
                    Accept Application
                  </button>
                </div>
              </div>

              {/* Job description card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Job Details
                </h3>
                <p className="text-slate-700 mb-3">{job?.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job?.companyLocation || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      {job?.salary ? `${job.salary} (${job.salaryType})` : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Deadline:{" "}
                      {job?.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{job?.workType || "N/A"}</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProposePage;
