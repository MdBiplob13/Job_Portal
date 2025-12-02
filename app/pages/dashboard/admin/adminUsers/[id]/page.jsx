"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useGetUserWithId from "@/app/hooks/user/GetUserWithId";
import useGetUserSkills from "@/app/hooks/user/skillsHook";

const AdminUserSinglePage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { singleUser } = useGetUserWithId(id);
  const [loading, setLoading] = useState(false);
  const { skills } = useGetUserSkills(singleUser?._id);
  console.log("🚀 ~ AdminUserSinglePage ~ skills:", skills);

  const [languages, setLanguages] = useState(singleUser?.languages || []);
  const [certificates, setCertificates] = useState(
    singleUser?.certificates || []
  );

  if (!singleUser) {
    return <div className="p-6 text-center text-lg">Loading user...</div>;
  }

  const handleBlockUnblock = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/getUsers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: singleUser._id }),
      });
      const data = await res.json();
      alert(data.message);
      setLoading(false);
    } catch (error) {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Banner */}
      {singleUser.banner && (
        <div className="w-full h-56 mb-6 overflow-hidden rounded-lg">
          <img
            src={singleUser.banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={singleUser.photo || "/defaultProfilePic.jpg"}
            alt={singleUser.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-4">
              {singleUser.name}
            </h2>
            <p className="text-gray-500">@{singleUser.userName}</p>
            {singleUser.headline && (
              <p className="mt-1 font-medium">{singleUser.headline}</p>
            )}
          </div>
        </div>

        {/* Block/Unblock button */}
        <div className="flex gap-5">
          {/* Back Button */}
          <div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded bg-gray-300 cursor-pointer"
            >
              Back
            </button>
          </div>
          <button
            onClick={handleBlockUnblock}
            className={`px-4 py-2 rounded ${
              singleUser.status === "blocked"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            } cursor-pointer`}
            disabled={loading}
          >
            {singleUser.status === "blocked" ? "Unblock" : "Block"}
          </button>
        </div>
      </div>

      {/* About & Bio */}
      {singleUser.bio && (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Bio</h3>
          <p className="text-gray-700">{singleUser.bio}</p>
        </div>
      )}

      {/* Job Stats */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-4">Job Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-2 rounded text-center">
            <p className="font-semibold">{singleUser.job.jobPosted}</p>
            <p className="text-gray-500 text-sm">Job Posted</p>
          </div>
          <div className="bg-gray-100 p-2 rounded text-center">
            <p className="font-semibold">{singleUser.job.jobCompleted}</p>
            <p className="text-gray-500 text-sm">Job Completed</p>
          </div>
          <div className="bg-gray-100 p-2 rounded text-center">
            <p className="font-semibold">{singleUser.job.ongoingProjects}</p>
            <p className="text-gray-500 text-sm">Ongoing Projects</p>
          </div>
          <div className="bg-gray-100 p-2 rounded text-center">
            <p className="font-semibold">{singleUser.job.jobSuccessRate}%</p>
            <p className="text-gray-500 text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">Contact & Details</h3>
        <ul className="space-y-1 text-gray-700">
          {singleUser.email && <li>Email: {singleUser.email}</li>}
          {singleUser.phone && <li>Phone: {singleUser.phone}</li>}
          {singleUser.location && <li>Location: {singleUser.location}</li>}
          <li>Charge per Hour: ${singleUser.chargeParHour}</li>
          <li>Current Job Status: {singleUser.currentJobStatus}</li>
          <li>Status: {singleUser.status}</li>
        </ul>
      </div>

      {/* Skills & Languages */}
      {(singleUser.languages?.length || singleUser.skills?.length) && (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Skills & Languages</h3>
          <div className="flex flex-wrap gap-2">
            {singleUser.languages?.map((lang, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <h1>{`${lang.language}(${lang.proficiency})`}</h1>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {skills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                <h1>{`${skill.skillName}(${skill.proficiency}%)`}</h1>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">Reviews</h3>
        <p>
          ⭐ {singleUser.review.rating} ({singleUser.review.totalRatings}{" "}
          ratings)
        </p>
      </div>

      {/* Social Links */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-3">
        {singleUser.social?.facebook && (
          <a
            href={singleUser.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Facebook
          </a>
        )}
        {singleUser.social?.linkedin && (
          <a
            href={singleUser.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            LinkedIn
          </a>
        )}
        {singleUser.social?.instagram && (
          <a
            href={singleUser.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Instagram
          </a>
        )}
        {singleUser.social?.portfolio && (
          <a
            href={singleUser.social.portfolio}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
};

export default AdminUserSinglePage;
