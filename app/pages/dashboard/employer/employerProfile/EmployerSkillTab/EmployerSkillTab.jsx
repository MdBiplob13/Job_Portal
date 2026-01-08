"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiAward, FiPlus } from "react-icons/fi";
import useUser from "@/app/hooks/user/userHook";
import useGetUserSkills from "@/app/hooks/user/skillsHook";
import { FaTrash } from "react-icons/fa";

/* ----------------------------------------------------
   EmployerSkillTab
   ---------------------------------------------------- */
const EmployerSkillTab = ({}) => {
  const { user } = useUser();
  const { skills, skillsRefresh, setSkillsRefresh } = useGetUserSkills(
    user?._id
  );

  const [showSkillForm, setShowSkillForm] = useState(false);

  // ------------------------------------------------------
  // ADD SKILL HANDLER
  // ------------------------------------------------------
  const handleAddSkill = async (e) => {
    e.preventDefault();

    const skill = e.target.skill.value?.trim();
    const proficiency = e.target.proficiency.value?.trim();

    if (!skill || !proficiency) return;

    const res = await fetch("/api/dashboard/profile/skill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        skill,
        proficiency,
      }),
    });

    const data = await res.json();

    if (data.status === "success") {
      setShowSkillForm(false);
      setSkillsRefresh(!skillsRefresh);
      e.target.reset();
    } 
  };

  // ------------------------------------------------------
  // DELETE SKILL HANDLER
  // ------------------------------------------------------
  const handleDeleteSkill = async (skillId) => {
    const res = await fetch("/api/dashboard/profile/skill", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?._id,
        skillId,
      }),
    });

    const data = await res.json();
    if (data.status === "success") {
      setSkillsRefresh(!skillsRefresh);
    } 
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FiAward className="text-blue-500" />
          Skills & Expertise
        </h3>

        {/* ADD SKILL BUTTON */}
        <button
          onClick={() => setShowSkillForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          <FiPlus /> Add Skill
        </button>
      </div>

      {/* DIALOG */}
      <Dialog.Root open={showSkillForm} onOpenChange={setShowSkillForm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] bg-white p-8 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold mb-6">
              Add New Skill
            </Dialog.Title>

            <form
              onSubmit={handleAddSkill}
              className="flex flex-col gap-6 mb-6"
            >
              {/* SKILL NAME */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  name="skill"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., HTML, JavaScript, React"
                />
              </div>

              {/* SKILL PROFICIENCY */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Skill Proficiency (%)
                </label>
                <input
                  type="number"
                  name="proficiency"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 80"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-5 py-2 border rounded-xl hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* SKILL LIST */}
      <div className="mt-6">
        {Array.isArray(skills) && skills.length > 0 ? (
          <div className="space-y-6 grid grid-cols-3 gap-5">
            {skills.map((skill) => (
              <div
                key={skill._id || skill.skillId || skill.skillName}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300 "
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800 text-lg">
                        {skill.skillName}
                      </span>
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-50 cursor-pointer"
                      title="Delete skill"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, Number(skill.proficiency) || 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerSkillTab;
