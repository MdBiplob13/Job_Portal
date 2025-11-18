import React from "react";
import { FiAward } from "react-icons/fi";

const EmployerSkillTab = ({ profileData, isEditing, SkillBar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FiAward className="text-blue-500" />
          Skills & Expertise
        </h3>
        {isEditing && (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
            Add Skill
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Technical Skills
          </h4>
          <div className="space-y-4">
            {profileData.skills
              .filter((skill) => skill.category === "Technical")
              .map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
          </div>
        </div>

        {/* Management & Business Skills */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Management & Business
          </h4>
          <div className="space-y-4">
            {profileData.skills
              .filter((skill) => skill.category !== "Technical")
              .map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSkillTab;
