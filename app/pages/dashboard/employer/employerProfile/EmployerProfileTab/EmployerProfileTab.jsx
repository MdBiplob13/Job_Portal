import useUser from "@/app/hooks/user/userHook";
import React, { useState } from "react";
import { FiGlobe, FiMail, FiPhone, FiUser, FiPlus } from "react-icons/fi";

const EmployerProfileTab = ({}) => {
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const { user } = useUser();

  // Get current position title or default
  const getCurrentPositionTitle = () => {
    return user?.currentPosition?.title || "Professional";
  };

  // Get hourly rate display
  const getHourlyRate = () => {
    return user?.chargeParHour ? `$${user.chargeParHour}/hour` : "Rate not set";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* LEFT SIDE - PERSONAL INFO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiUser className="text-blue-500" /> Personal Information
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl">
                {user.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl">
                {getCurrentPositionTitle()}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl min-h-[120px]">
              {user.discretion || user.intro || "No description provided."}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl">
                {getHourlyRate()}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl">
                {user.location || "Location not set"}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status
            </label>
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium inline-block ${
                user.currentJobStatus === "Open to work"
                  ? "bg-green-100 text-green-800"
                  : user.currentJobStatus === "Working"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {user.currentJobStatus}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-8">
        {/* CONTACT INFORMATION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiMail className="text-blue-500" /> Contact Information
          </h3>

          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiMail className="text-gray-400 text-xl" />
                <div>
                  <div className="font-medium text-gray-800">Email</div>
                  <div className="text-gray-600 text-sm">
                    {user.email || "Not added"}
                  </div>
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  user.verification?.email
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.verification?.email ? "Verified" : "Not Verified"}
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiPhone className="text-gray-400 text-xl" />
                <div>
                  <div className="font-medium text-gray-800">Phone</div>
                  <div className="text-gray-600 text-sm">
                    {user.phone || "Not added"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.verification?.phone
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.verification?.phone ? "Verified" : "Not Verified"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiGlobe className="text-blue-500" /> Languages
            </h3>
          </div>

          {user.Languages && user.Languages.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.Languages.map((language, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm flex items-center gap-2"
                >
                  <span className="font-semibold">{language}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">
              No languages added yet.
            </div>
          )}
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiGlobe className="text-blue-500" /> Social Links
          </h3>

          <div className="space-y-4">
            {user.social?.facebook && (
              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Facebook</div>
                  <div className="text-gray-600 text-sm truncate">
                    {user.social.facebook}
                  </div>
                </div>
              </div>
            )}

            {user.social?.linkedin && (
              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">LinkedIn</div>
                  <div className="text-gray-600 text-sm truncate">
                    {user.social.linkedin}
                  </div>
                </div>
              </div>
            )}

            {user.social?.instagram && (
              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ig</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Instagram</div>
                  <div className="text-gray-600 text-sm truncate">
                    {user.social.instagram}
                  </div>
                </div>
              </div>
            )}

            {user.social?.portfolio && (
              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🌐</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Portfolio</div>
                  <div className="text-gray-600 text-sm truncate">
                    {user.social.portfolio}
                  </div>
                </div>
              </div>
            )}

            {!user.social?.facebook &&
              !user.social?.linkedin &&
              !user.social?.instagram &&
              !user.social?.portfolio && (
                <div className="text-gray-500 text-sm italic">
                  No social links added yet.
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileTab;
