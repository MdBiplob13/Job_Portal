import React, { useState } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEdit,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

import * as Dialog from "@radix-ui/react-dialog";

const EmployerPageTopSection = ({ profileData, stats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(
    profileData.personal.banner
  );
  const [photoPreview, setPhotoPreview] = useState(profileData.personal.photo);

  const StarRating = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-gray-600 text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div>
      {/* MODAL */}
      <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

          <Dialog.Content
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
  w-[95%] max-w-4xl bg-white p-8 rounded-2xl shadow-xl z-50"
          >
            <Dialog.Title className="text-xl font-semibold mb-6">
              Edit Profile
            </Dialog.Title>

            {/* LANDSCAPE GRID */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT SIDE */}
              <div className="flex flex-col gap-6">
                {/* Banner Upload */}
                <div>
                  <label className="text-sm font-medium">Banner</label>
                  <div className="mt-2">
                    {bannerPreview ? (
                      <img
                        src={bannerPreview}
                        alt="Banner"
                        className="w-full h-32 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 border">
                        No banner uploaded
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    name="banner"
                    className="mt-2"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setBannerPreview(URL.createObjectURL(file));
                    }}
                  />
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="text-sm font-medium">Profile Photo</label>
                  <div className="mt-2 flex items-center gap-4">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        className="w-20 h-20 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border">
                        No photo
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="photo"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setPhotoPreview(URL.createObjectURL(file));
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    name="name"
                    defaultValue={profileData.personal.name}
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input
                    name="title"
                    defaultValue={profileData.personal.title}
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <input
                    name="location"
                    defaultValue={profileData.personal.location}
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="text-sm font-medium">Hourly Rate</label>
                  <input
                    name="hourlyRate"
                    defaultValue={profileData.personal.hourlyRate}
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>
              </div>

              {/* FULL-WIDTH DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={profileData.personal.description}
                  className="w-full mt-1 p-3 border rounded-xl min-h-[120px]"
                />
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-2 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button className="px-5 py-2 border rounded-xl hover:bg-gray-100">
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* MAIN UI */}
      <div className="relative">
        <div className="h-48 bg-linear-to-r from-blue-500 to-primary"></div>

        <div className="relative -top-16 px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Photo */}
              <div className="relative -top-20 lg:top-0 lg:shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.personal.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-primary transition-colors">
                    <FiEdit className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 lg:mt-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {profileData.personal.name}
                    </h1>
                    <p className="text-xl text-gray-600 mt-1">
                      {profileData.personal.title}
                    </p>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-6 mt-4">
                      <StarRating rating={stats.rating} size="md" />
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>⭐ {stats.totalReviews} reviews</span>
                        <span>✅ {stats.jobsCompleted} jobs</span>
                        <span>🔄 {stats.responseRate}% response rate</span>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-gray-400" />
                        {profileData.personal.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        {profileData.personal.joinDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBriefcase className="text-gray-400" />
                        {profileData.personal.hourlyRate}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                      Share Profile
                    </button>

                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors flex items-center gap-2"
                    >
                      <FiEdit className="text-lg" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {profileData.personal.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPageTopSection;
