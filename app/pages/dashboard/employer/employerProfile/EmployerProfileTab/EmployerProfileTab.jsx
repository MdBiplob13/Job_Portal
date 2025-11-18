import React, { useState } from "react";
import {
  FiGlobe,
  FiMail,
  FiPhone,
  FiUser,
  FiEdit,
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";

const EmployerProfileTab = ({ profileData, isEditing }) => {
  const [showLanguageForm, setShowLanguageForm] = useState(false);

  const isEmailVerified = profileData.personal.emailVerified;
  const isPhoneVerified = profileData.personal.phoneVerified;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* LEFT SIDE - PERSONAL INFO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative">

        {/* EDIT BUTTON */}
        <button
          className="absolute top-6 right-6 px-4 py-2 bg-blue-500 text-white rounded-xl flex items-center gap-2 hover:bg-primary transition"
        >
          <FiEdit /> Edit
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiUser className="text-blue-500" />
          Personal Information
        </h3>

        <div className="space-y-6">
          {/* Name + Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={profileData.personal.name}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Title
              </label>
              <input
                type="text"
                defaultValue={profileData.personal.title}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              defaultValue={profileData.personal.description}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border rounded-xl disabled:bg-gray-100 resize-none"
            />
          </div>

          {/* Rate + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate
              </label>
              <input
                type="text"
                defaultValue={profileData.personal.hourlyRate}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                defaultValue={profileData.personal.location}
                disabled={!isEditing}
                className="w-full px-4 py-3 bg-gray-50 border rounded-xl disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-8">

        {/* CONTACT INFORMATION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiMail className="text-blue-500" />
            Contact Information
          </h3>

          <div className="space-y-4">

            {/* EMAIL */}
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {isEmailVerified && (
                  <FiCheckCircle className="text-green-500 text-xl" />
                )}
                <FiMail className="text-gray-400 text-xl" />

                <div>
                  <div className="font-medium text-gray-800">Email</div>
                  <div className="text-gray-600 text-sm">
                    {profileData.personal.email || "Not added"}
                  </div>
                </div>
              </div>

              {/* Email Actions */}
              <div className="ml-9 mt-2 flex gap-3">
                {!profileData.personal.email ? (
                  <button className="text-blue-500 font-medium">Add</button>
                ) : (
                  <button className="text-blue-500 font-medium">Change</button>
                )}

                {!isEmailVerified && profileData.personal.email && (
                  <button className="text-orange-500 font-medium">
                    Verify Email
                  </button>
                )}
              </div>
            </div>

            {/* PHONE */}
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {isPhoneVerified && (
                  <FiCheckCircle className="text-green-500 text-xl" />
                )}
                <FiPhone className="text-gray-400 text-xl" />

                <div>
                  <div className="font-medium text-gray-800">Phone</div>
                  <div className="text-gray-600 text-sm">
                    {profileData.personal.phone || "Not added"}
                  </div>
                </div>
              </div>

              {/* Phone Actions */}
              <div className="ml-9 mt-2 flex gap-3">
                {!profileData.personal.phone ? (
                  <button className="text-blue-500 font-medium">Add</button>
                ) : (
                  <button className="text-blue-500 font-medium">Change</button>
                )}

                {!isPhoneVerified && profileData.personal.phone && (
                  <button className="text-orange-500 font-medium">
                    Verify Phone
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* LANGUAGES */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiGlobe className="text-blue-500" />
            Languages
          </h3>

          <div className="flex flex-wrap gap-2">
            {profileData.personal.languages.map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-50 text-secondary rounded-xl text-sm"
              >
                {item.language} — {item.level}
              </span>
            ))}

            {/* Add Language Button */}
            <button
              onClick={() => setShowLanguageForm(!showLanguageForm)}
              className="px-4 py-2 border border-gray-300 bg-gray-50 rounded-xl flex items-center gap-2 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <FiPlus /> Add Language
            </button>
          </div>

          {/* Add Language Form */}
          {showLanguageForm && (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Language"
                  className="px-3 py-2 border rounded-xl"
                />

                <select className="px-3 py-2 border rounded-xl">
                  <option>Read</option>
                  <option>Write</option>
                  <option>Fluent</option>
                  <option>Native</option>
                </select>
              </div>

              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileTab;
