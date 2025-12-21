"use client";

import { useState, useEffect } from "react";
import {
  User,
  Star,
  Plus,
  X,
  Link as LinkIcon,
  FileText,
  ExternalLink,
  Calendar,
  Briefcase,
} from "lucide-react";
import toast from "react-hot-toast";
import useUser from "@/app/hooks/user/userHook";
import useGetAllProposeForSingleJob from "@/app/hooks/jobs/GetAllProposeForSingleJob";
import Link from "next/link";

const shortenText = (text, limit = 150) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const JobPageProposeSection = ({ job, jobId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([{ linkName: "", linkURL: "" }]);
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const { user } = useUser();
  const { allProposals, loading, refresh, setRefresh } =
    useGetAllProposeForSingleJob(jobId);

  // AUTO LOAD USER SOCIAL LINKS
  useEffect(() => {
    if (user?.socialLinks?.length > 0) {
      setLinks(user.socialLinks);
    }
  }, [user]);

  const addLinkField = () => {
    setLinks([...links, { linkName: "", linkURL: "" }]);
  };

  const removeLink = (i) => {
    const updated = links.filter((_, idx) => idx !== i);
    setLinks(updated);
  };

  // SUBMIT PROPOSAL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      jobId,
      professionalId: user?._id,
      resume,
      coverLetter,
      links,
    };

    const res = await fetch("/api/dashboard/professional/proposeForJob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.status === "success") {
      toast.success("Proposal submitted successfully!");
      setOpenModal(false);
      setRefresh(refresh + 1);
      // Reset form
      setResume("");
      setCoverLetter("");
      setLinks([{ linkName: "", linkURL: "" }]);
    } else {
      toast.error(data.message || "Failed to submit proposal");
    }
  };

  const deadline = job?.deadline;
  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };



  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 ${timeLeft(deadline) === "Closed" ? "hidden" : ""} ${user?.email === job?.employerEmail ? "hidden" : ""}`}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Job Proposals
                </h1>
              </div>
              <p className="text-slate-600">
                Review and manage professional proposals for this position
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Submit Proposal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Proposals */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-blue-600 font-medium mb-1">
                    Total Proposals
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {allProposals.length}
                  </div>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-blue-500 mt-2">
                {allProposals.length === 0
                  ? "No submissions yet"
                  : allProposals.length === 1
                  ? "1 professional applied"
                  : `${allProposals.length} professionals applied`}
              </div>
            </div>

            {/* Applications vs Limit */}
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-amber-600 font-medium mb-1">
                    Application Status
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {job?.applicationCount || 0}
                    <span className="text-lg text-slate-500">
                      /{job?.applicationLimit || "∞"}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-amber-500 mt-2">
                {job?.applicationLimit
                  ? `${
                      job.applicationLimit - (job.applicationCount || 0)
                    } spots available`
                  : "No limit set"}
              </div>
            </div>

            {/* Total Hiring */}
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-600 font-medium mb-1">
                    Total Hiring
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {job?.hiringCount || job?.totalHires || 1}
                  </div>
                </div>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xs text-emerald-500 mt-2">
                {job?.hiringCount === 1
                  ? "Looking for 1 professional"
                  : job?.hiringCount > 1
                  ? `Looking for ${job.hiringCount} professionals`
                  : "Individual position"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposals Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : allProposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProposals.map((proposal) => {
              const professional = proposal.professionalId;
              const jobsDone =
                professional?.jobsDone || professional?.job?.jobCompleted || 0;
              const rating = professional?.review?.rating || 0;
              const totalRatings = professional?.review?.totalRatings || 0;

              return (
                <div
                  key={proposal._id}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Professional Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      {professional?.photo ? (
                        <img
                          src={professional.photo}
                          alt={professional.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {professional?.verification?.email && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 truncate">
                        {professional?.name || "Anonymous"}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {professional?.headline || "Professional"}
                      </p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700 font-medium">
                            {jobsDone}
                          </span>
                          <span className="text-xs text-slate-500">jobs</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-slate-700">
                            {rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({totalRatings})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter Preview */}
                  <div className="mt-4">
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {shortenText(proposal.coverLetter, 180)}
                    </p>
                  </div>

                  {/* Links Section */}
                  {proposal.links && proposal.links.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">
                          Additional Links
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proposal.links.slice(0, 2).map((link, i) => (
                          <a
                            key={i}
                            href={link.linkURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-lg text-xs transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.linkName || "Link"}
                          </a>
                        ))}
                        {proposal.links.length > 2 && (
                          <span className="px-2 py-1.5 bg-slate-100 text-slate-500 text-xs rounded-lg">
                            +{proposal.links.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resume Link */}
                  {proposal.resume && (
                    <div className="mt-4">
                      <a
                        href={proposal.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume/Portfolio
                      </a>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/pages/browse/jobs/propose/${proposal._id}`}
                      className="w-full px-4 py-2.5 bg-linear-to-r from-slate-50 to-white border border-slate-200 text-slate-700 rounded-xl hover:from-blue-50 hover:to-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all flex items-center justify-center gap-2 group-hover:from-blue-50 group-hover:to-blue-50 group-hover:border-blue-300 group-hover:text-blue-700"
                    >
                      View Full Profile
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Proposals Yet
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Be the first to submit a proposal for this job and increase your
              chances of being selected.
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              Submit First Proposal
            </button>
          </div>
        )}
      </div>

      {/* Submit Proposal Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Submit Proposal
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Apply for: <span className="font-medium">{job?.title}</span>
                </p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Resume Link */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Resume / Portfolio Link
                    </div>
                  </label>
                  <input
                    type="url"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="https://your-portfolio.com or https://drive.google.com/your-resume"
                    required
                  />
                  <p className="mt-2 text-sm text-slate-500">
                    Provide a link to your resume, portfolio, or LinkedIn
                    profile
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Additional Links (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={addLinkField}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>

                  <div className="space-y-3">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Link name (e.g., GitHub, Portfolio)"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={link.linkName}
                            onChange={(e) => {
                              const updated = [...links];
                              updated[index].linkName = e.target.value;
                              setLinks(updated);
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="url"
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={link.linkURL}
                            onChange={(e) => {
                              const updated = [...links];
                              updated[index].linkURL = e.target.value;
                              setLinks(updated);
                            }}
                          />
                        </div>
                        {links.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLink(index)}
                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    rows={6}
                    placeholder="Describe why you're the best fit for this job. Include your relevant experience, approach to the project, and availability..."
                    required
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-slate-500">
                      Minimum 200 characters recommended
                    </p>
                    <p
                      className={`text-sm ${
                        coverLetter.length < 200
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}
                    >
                      {coverLetter.length} characters
                    </p>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    💡 Tips for a strong proposal
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      • Address the specific requirements mentioned in the job
                      description
                    </li>
                    <li>• Highlight relevant past work or experience</li>
                    <li>• Be clear about your availability and timeline</li>
                    <li>• Explain your approach to solving the problem</li>
                  </ul>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow cursor-pointer"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPageProposeSection;
