import React from 'react'
import { FiAward, FiBriefcase, FiCheck, FiEdit } from 'react-icons/fi'

const EmployerExperienceTab = ({ profileData, isEditing}) => {
  return (
    <div className="space-y-8">
            {/* Work Experience */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiBriefcase className="text-blue-500" />
                  Work Experience
                </h3>
                {isEditing && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
                    Add Experience
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {profileData.experience
                  .filter((exp) => exp.type === "work")
                  .map((exp) => (
                    <div
                      key={exp.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                        {exp.company.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-lg">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-gray-500 text-sm mb-2">
                          {exp.period}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                      {isEditing && (
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-blue-500">
                          <FiEdit />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiAward className="text-blue-500" />
                  Certificates & Licenses
                </h3>
                {isEditing && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-primary transition-colors">
                    Add Certificate
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {profileData.experience
                  .filter((exp) => exp.type === "certificate")
                  .map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-primary shrink-0">
                          <FiCheck className="text-lg" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {cert.name}
                          </h4>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {cert.date}
                          </p>
                          <p className="text-gray-600 text-sm mt-2">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
  )
}

export default EmployerExperienceTab
