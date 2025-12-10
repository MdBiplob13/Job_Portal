"use client";

import { useState, useEffect } from "react";
import { User, Star } from "lucide-react";
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

    const res = await fetch(
      "/api/dashboard/professional/proposeForJob",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (data.status === "success") {
      toast.success("Proposal submitted!");
      setOpenModal(false);
      setRefresh(refresh + 1);
    }
  };

  return (
    <div>
      {/* =================== PROPOSE SECTION =================== */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Current Proposals ({allProposals.length})
          </h2>

          <button
            onClick={() => setOpenModal(true)}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Propose for Job
          </button>
        </div>

        {/* =================== EXISTING PROPOSALS =================== */}
        <div className="space-y-4">
          {loading && <p>Loading proposals...</p>}

          {!loading &&
            allProposals.map((p) => (
              <div
                key={p._id}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-600" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {p.professionalId?.name || "Unknown User"}
                      </h4>

                      {/* HEADLINE */}
                      <p className="text-sm text-slate-600">
                        {p.professionalId?.headline || "No headline"}
                      </p>

                      {/* JOBS DONE */}
                      <p className="text-sm text-slate-600">
                        Jobs Done: {p.professionalId?.jobsDone ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">4.0</span>
                      <span className="text-sm text-slate-500">(0 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* COVER LETTER (SHORTENED) */}
                <p className="text-slate-700 text-sm">
                  {shortenText(p.coverLetter, 220)}
                </p>

                {/* LINKS */}
                <div className="mt-3 space-y-1">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.linkURL}
                      target="_blank"
                      className="text-blue-600 underline text-sm block"
                    >
                      {l.linkName}
                    </a>
                  ))}
                </div>

                {/* View Full Button */}
                <Link href={`/pages/browse/jobs/propose/${p._id}`}
                  className="mt-3 text-primary text-sm underline cursor-pointer"
                  
                >
                  View Full Profile →
                </Link>
              </div>
            ))}

          {allProposals.length === 0 && (
            <p className="text-slate-500">No proposals yet.</p>
          )}
        </div>
      </div>

      {/* =================== MODAL =================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Propose for Job</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Resume - NOW USER HEADLINE */}
              <div>
                <label className="block mb-1 font-medium">Resume (Link)</label>
                <input
                  type="text"
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Your resume link"
                />
              </div>

              {/* Auto-Loaded Links + Remove */}
              <div>
                <label className="block mb-1 font-medium">Social Links</label>

                {links.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Link Name"
                      className="w-1/3 border px-3 py-2 rounded-lg"
                      value={link.linkName}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[index].linkName = e.target.value;
                        setLinks(updated);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="URL"
                      className="w-2/3 border px-3 py-2 rounded-lg"
                      value={link.linkURL}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[index].linkURL = e.target.value;
                        setLinks(updated);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLinkField}
                  className="text-primary text-sm mt-1"
                >
                  + Add another link
                </button>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block mb-1 font-medium">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={4}
                  placeholder="Write your cover letter..."
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPageProposeSection;
