"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiAward, FiBriefcase, FiCheck, FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import useUser from "@/app/hooks/user/userHook";
import useGetUserExperience from "@/app/hooks/user/experienceHook";
import useGetUserCertificates from "@/app/hooks/user/certificateHook";

const EmployerExperienceTab = () => {
  const { user } = useUser();

  // Fetch all experiences + certificates
  const { experiences, expLoading, expRefresh, setExpRefresh, setExperiences } =
    useGetUserExperience(user?._id);

  const {
    certificates,
    certLoading,
    certRefresh,
    setCertRefresh,
    setCertificates,
  } = useGetUserCertificates(user?._id);

  // Controls the two dialogs
  const [expOpen, setExpOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  // --------------------------------------------------------------------------
  // ADD EXPERIENCE HANDLER
  // --------------------------------------------------------------------------
  const handleAddExperience = async (e) => {
    e.preventDefault();
    const form = e.target;

    const experienceData = {
      userId: user._id,
      company: form.company.value,
      position: form.position.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      description: form.description.value,
    };

    const res = await fetch("/api/dashboard/profile/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experienceData),
    });

    const data = await res.json();

    if (data.status === "success") {
      setExpOpen(false);

      setExperiences(data.data);
    }
  };

  // --------------------------------------------------------------------------
  // ADD CERTIFICATE HANDLER
  // --------------------------------------------------------------------------
  const handleAddCertificate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const certificateData = {
      userId: user._id,
      certificateName: form.certificateName.value,
      institute: form.institute.value,
      date: form.date.value,
      description: form.description.value,
    };

    const res = await fetch("/api/dashboard/profile/certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certificateData),
    });

    const data = await res.json();

    if (data.status === "success") {
      setCertOpen(false);
      setCertificates(data.data);
    }
  };

  // --------------------------------------------------------------------------
  // DELETE EXPERIENCE OR CERTIFICATE
  // --------------------------------------------------------------------------
  const handleDeleteExperience = (experienceId) => {
    fetch(`/api/dashboard/profile/experience`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experienceId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const newExperiences = experiences.filter(
            (exp) => exp._id !== experienceId
          );
          setExperiences(newExperiences);
        } else {
          // console.error("Delete experience failed:", data);
        }
      });
  };
  const handleDeleteCertificate = (certificateId) => {
    fetch(`/api/dashboard/profile/certificate`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificateId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const newCertificates = certificates.filter(
            (certificate) => certificate._id !== certificateId
          );
          setCertificates(newCertificates);
        } else {
          // console.error("Delete experience failed:", data);
        }
      });
  };

  // Separate items by type

  return (
    <div className="space-y-8">
      {/* =============================================================
          WORK EXPERIENCE SECTION
      ============================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiBriefcase className="text-blue-500" /> Work Experience
          </h3>

          <button
            onClick={() => {
              setExpOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer"
          >
            <FiPlus /> Add Experience
          </button>
        </div>

        {/* Experience Items */}
        <div className="space-y-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div
                key={exp._id}
                className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:shadow-md transition group bg-white"
              >
                {/* Logo Box */}
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold">
                  {exp.company?.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800">
                    {exp.position}
                  </h4>
                  <p className="text-gray-600 font-medium">{exp.company}</p>

                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <h1>{exp.startDate}</h1> → <h1>{exp.endDate}</h1>
                  </p>

                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteExperience(exp._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-2 transition cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No work experience added yet.
            </p>
          )}
        </div>
      </div>

      {/* =============================================================
          CERTIFICATES SECTION
      ============================================================= */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FiAward className="text-blue-500" /> Certificates & Licenses
          </h3>

          <button
            onClick={() => {
              setCertOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer"
          >
            <FiPlus /> Add Certificate
          </button>
        </div>

        {/* Certificate Items */}
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <div
                key={cert._id}
                className="flex gap-4 p-5 border border-gray-200 rounded-2xl hover:shadow-md transition group bg-white"
              >
                {/* Logo Box */}
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-semibold">
                  {cert.institute?.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800">
                    {cert.certificateName}
                  </h4>
                  <p className="text-gray-600 font-medium">{cert.institute}</p>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(cert.date).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteCertificate(cert._id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-2 transition cursor-pointer"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No certificates added yet.</p>
          )}
        </div>
      </div>

      {/* =============================================================
          EXPERIENCE DIALOG
      ============================================================= */}
      <Dialog.Root open={expOpen} onOpenChange={setExpOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] bg-white p-8 rounded-2xl shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-6">
              Add Work Experience
            </Dialog.Title>

            <form onSubmit={handleAddExperience} className="grid gap-5">
              <input
                name="position"
                className="p-3 border rounded-xl"
                placeholder="e.g. Software Engineer"
              />
              <input
                name="company"
                className="p-3 border rounded-xl"
                placeholder="e.g. Google LLC"
              />
              <input
                name="startDate"
                className="p-3 border rounded-xl"
                placeholder="e.g. 9 Jan 2020"
              />
              <input
                name="endDate"
                className="p-3 border rounded-xl"
                placeholder="e.g. 9 Jan 2020/Present"
              />
              <textarea
                name="description"
                rows={4}
                className="p-3 border rounded-xl"
                placeholder="Details..."
              />

              <div className="flex justify-end gap-3 mt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-5 py-2 border rounded-xl cursor-pointer "
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* =============================================================
          CERTIFICATE DIALOG
      ============================================================= */}
      <Dialog.Root open={certOpen} onOpenChange={setCertOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] bg-white p-8 rounded-2xl shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-6">
              Add Certificate
            </Dialog.Title>

            <form onSubmit={handleAddCertificate} className="grid gap-5">
              <input
                name="certificateName"
                className="p-3 border rounded-xl"
                placeholder="Certificate Name"
              />
              <input
                name="institute"
                className="p-3 border rounded-xl"
                placeholder="Institute"
              />
              <input
                name="date"
                className="p-3 border rounded-xl"
                placeholder="2023"
              />
              <textarea
                name="description"
                rows={4}
                className="p-3 border rounded-xl"
                placeholder="Details..."
              />

              <div className="flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-5 py-2 border rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default EmployerExperienceTab;
