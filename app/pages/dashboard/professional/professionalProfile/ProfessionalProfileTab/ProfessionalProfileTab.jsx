import useUser from "@/app/hooks/user/userHook";
import Link from "next/link";
import { Dialog } from "radix-ui";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiGlobe, FiMail, FiPhone, FiUser, FiPlus } from "react-icons/fi";

const ProfessionalProfileTab = ({}) => {
  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // Get hourly rate display
  const getHourlyRate = () => {
    return user?.chargeParHour ? `$${user.chargeParHour}/hour` : "Rate not set";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleAddLanguage = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const language = form.language.value.trim();
    const proficiency = form.proficiency.value;

    fetch("/api/dashboard/profile/language", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        language,
        proficiency,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Language added successfully!");
          setShowLanguageForm(false);
          form.reset();
        } else {
          toast.error(data.message || "Failed to add language.");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteLanguage = (languageId) => {
    const confirm =window.confirm("Are you sure you want to delete this language?")

    if(!confirm){
      return;
    }
    setLoading(true);

    fetch("/api/dashboard/profile/language", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        languageId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Language deleted successfully!");
        } else {
          toast.error(data.message || "Failed to delete language.");
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* LEFT SIDE - PERSONAL INFO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-h-[500px]">
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
                Current Job Status
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl">
                {user.currentJobStatus || "Not specified"}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <div className="w-full px-4 py-3 bg-gray-50 border rounded-xl min-h-[120px]">
              {user.bio || "No bio provided."}
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

            <button
              onClick={() => setShowLanguageForm(!showLanguageForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              <FiPlus /> Add Language
            </button>

            <Dialog.Root
              open={showLanguageForm}
              onOpenChange={setShowLanguageForm}
            >
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-4xl bg-white p-8 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto">
                  <Dialog.Title className="text-2xl font-bold mb-6">
                    Add New Language
                  </Dialog.Title>

                  <form
                    onSubmit={handleAddLanguage}
                    className="flex flex-col gap-6 mb-6"
                  >
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language Name
                      </label>
                      <input
                        type="text"
                        name="language"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., English, Spanish"
                      />
                    </div>

                    <div className=" w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proficiency
                      </label>
                      <select
                        name="proficiency"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Read only">Read only</option>
                        <option value="Write only">Write only</option>
                        <option value="Read and write">Read and write</option>
                        <option value="Speak fluently">Speak fluently</option>
                        <option value="Native speaker">Native speaker</option>
                      </select>
                    </div>

                    {/* BUTTONS */}
                    <div className="md:col-span-2 flex justify-end gap-3">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="px-5 py-2 border rounded-xl hover:bg-gray-100"
                          onClick={() => setShowLanguageForm(false)}
                        >
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50"
                      >
                        Add Language
                      </button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="space-y-4">
            {user.languages && user.languages.length > 0 ? (
              <div>
                {user.languages.map((lang) => (
                  <div
                    key={lang._id}
                    className="p-3 bg-gray-50 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">
                          {lang.language}
                        </div>
                        <div className="text-gray-600 text-sm ml-1">
                          {` (${lang.proficiency})`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteLanguage(lang._id)}
                        className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
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
                  <Link
                    href={user.social?.facebook}
                    className="text-gray-600 text-sm truncate"
                  >
                    {user.social?.facebook}
                  </Link>
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
                  <Link
                    href={user.social?.linkedin}
                    className="text-gray-600 text-sm truncate"
                  >
                    {user.social?.linkedin}
                  </Link>
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
                  <Link
                    href={user.social?.instagram}
                    className="text-gray-600 text-sm truncate"
                  >
                    {user.social?.instagram}
                  </Link>
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
                  <Link
                    href={user.social.portfolio}
                    className="text-gray-600 text-sm truncate"
                  >
                    {user?.social?.portfolio}
                  </Link>
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

export default ProfessionalProfileTab;
