import React, { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiEdit,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import * as Dialog from "@radix-ui/react-dialog";
import useUser from "@/app/hooks/user/userHook";
import hostPhoto from "@/utils/hostPhoto/hostPhoto";
import toast from "react-hot-toast";

const ProfessionalPageTopSection = () => {
  const { user, updateUser, setUserRefresh, userRefresh } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(user?.banner || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setBannerPreview(user.banner || "");
      setPhotoPreview(user.photo || "");
    }
  }, [user]);

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

  // Calculate stats from user data
  const stats = {
    rating: user?.review?.rating || 0,
    totalReviews: user?.review?.totalRatings || 0,
    jobsCompleted: user?.job?.jobCompleted || 0,
    responseRate: 95,
  };

  // Format join date from createDate
  const formatJoinDate = (dateString) => {
    if (!dateString) return "Recently joined";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  };

  // Get hourly rate display
  const getHourlyRate = () => {
    return user?.chargeParHour ? `$${user.chargeParHour}/hour` : "Rate not set";
  };

  const handleFileChange = (field, file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (field === "banner") {
        setBannerPreview(previewUrl);
        setSelectedBanner(file);
      } else if (field === "photo") {
        setPhotoPreview(previewUrl);
        setSelectedPhoto(file);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const facebookUrl = form.facebookUrl.value;
    const linkedinUrl = form.linkedinUrl.value;
    const instagramUrl = form.instagramUrl.value;
    const portfolioUrl = form.portfolioUrl.value;
    const name = form.name.value;
    const headline = form.headline.value;
    const bio = form.bio.value;
    const chargeParHour = form.chargeParHour.value;
    const phone = form.phone.value;
    const currentJobStatus = form.currentJobStatus.value;

    // charge par hour validation
    if (chargeParHour < 0) {
      toast.error("Charge per hour cannot be negative");
      setIsLoading(false);
      return;
    }

    // host photos
    const banner = selectedBanner || user?.banner;
    const photo = selectedPhoto || user?.photo;

    const bannerUrl = await hostPhoto(banner);
    const photoUrl = await hostPhoto(photo);

    const userUpdatedData = {
      name,
      headline,
      bio,
      chargeParHour,
      phone,
      currentJobStatus,
      banner: bannerUrl,
      photo: photoUrl,
      social: {
        facebook: facebookUrl,
        linkedin: linkedinUrl,
        instagram: instagramUrl,
        portfolio: portfolioUrl,
      },
    };


    fetch("/api/dashboard/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        userData: userUpdatedData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Profile updated successfully");
          setUserRefresh(userRefresh + 1);
          setIsEditing(false);
        } else {
          toast.error(data.message || "Failed to update profile");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* MODAL */}
      <Dialog.Root open={isEditing} onOpenChange={setIsEditing}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl bg-white p-8 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-semibold mb-6">
              Edit Profile
            </Dialog.Title>

            <form
              onSubmit={handleUpdateProfile}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
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
                    className="mt-2"
                    onChange={(e) =>
                      handleFileChange("banner", e.target.files[0])
                    }
                  />
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="text-sm font-medium">Profile Photo</label>
                  <div className="mt-2 flex items-center gap-4">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile"
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
                      onChange={(e) =>
                        handleFileChange("photo", e.target.files[0])
                      }
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Social Links</label>
                  <input
                    type="url"
                    placeholder="Facebook URL"
                    name="facebookUrl"
                    className="w-full p-3 border rounded-xl"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    name="linkedinUrl"
                    className="w-full p-3 border rounded-xl"
                  />
                  <input
                    type="url"
                    placeholder="Instagram URL"
                    name="instagramUrl"
                    className="w-full p-3 border rounded-xl"
                  />
                  <input
                    type="url"
                    placeholder="Portfolio URL"
                    name="portfolioUrl"
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    name="name"
                    defaultValue={user?.name}
                    required
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Charge Per Hour ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={user?.chargeParHour}
                    name="chargeParHour"
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone}
                    name="phone"
                    className="w-full mt-1 p-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Job Status</label>
                  <select
                    name="currentJobStatus"
                    defaultValue={user?.currentJobStatus}
                    className="w-full mt-1 p-3 border rounded-xl"
                  >
                    <option value="Open to work">Open to work</option>
                    <option value="Working">Working</option>
                    <option value="Not available">Not available</option>
                  </select>
                </div>
              </div>

              {/* FULL-WIDTH FIELDS */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Headline</label>
                <textarea
                  name="headline"
                  defaultValue={user?.headline}
                  className="w-full mt-1 p-3 border rounded-xl min-h-[100px]"
                  placeholder="Short description about yourself..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  defaultValue={user?.bio}
                  className="w-full mt-1 p-3 border rounded-xl min-h-[120px]"
                  placeholder="Your detailed bio..."
                />
              </div>

              {/* BUTTONS */}
              <div className="md:col-span-2 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-5 py-2 border rounded-xl hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* MAIN UI */}
      <div className="relative">
        {/* Banner */}
        {user.banner ? (
          <img
            src={user.banner}
            alt="Banner"
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 bg-linear-to-r from-blue-500 to-primary"></div>
        )}

        <div className="relative -top-16 px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Photo */}
              <div className="relative -top-20 lg:top-0 lg:shrink-0">
                <div className="relative">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-300 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 lg:mt-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {user.name}
                    </h1>
                    <p className="text-gray-500">@{user.userName}</p>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-6 mt-4">
                      <StarRating rating={stats.rating} size="md" />
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>⭐ {stats.totalReviews} reviews</span>
                        <span>✅ {stats.jobsCompleted} jobs</span>
                        {/* <span>🔄 {stats.responseRate}% response rate</span> */}
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-gray-400" />
                        {user.location || "Location not set"}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-400" />
                        {formatJoinDate(user.createDate)}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiBriefcase className="text-gray-400" />
                        {getHourlyRate()}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                  {user.headline || "No Headline provided."}
                </p>

                {/* Languages */}
                {user.Languages && user.Languages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.Languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPageTopSection;
