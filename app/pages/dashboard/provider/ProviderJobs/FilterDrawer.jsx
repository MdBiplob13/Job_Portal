// app/components/Dashboard/Jobs/JobCard.jsx
"use client";
import React from "react";
import { FiClock, FiCheckCircle, FiMapPin, FiDollarSign, FiEye, FiEdit, FiMessageCircle } from "react-icons/fi";

export default function JobCard({ job }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionButtons = (status) => {
    switch (status) {
      case 'published':
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-[#D90A2C] hover:text-[#D90A2C] transition-colors">
              <FiEdit className="text-sm" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#D90A2C] text-white rounded-lg hover:bg-red-700 transition-colors">
              <FiEye className="text-sm" />
              View Bids
            </button>
          </>
        );
      case 'in-progress':
        return (
          <>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-[#D90A2C] hover:text-[#D90A2C] transition-colors">
              <FiMessageCircle className="text-sm" />
              Message
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <FiCheckCircle className="text-sm" />
              Complete
            </button>
          </>
        );
      case 'completed':
        return (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-[#D90A2C] hover:text-[#D90A2C] transition-colors w-full justify-center">
            <FiEye className="text-sm" />
            View Details
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#D90A2C] transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1">{job.department}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(job.status)}`}>
              {job.statusLabel}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(job.urgency)}`}>
              {job.urgency}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 leading-relaxed">{job.summary}</p>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin className="text-gray-400" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiDollarSign className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-800">{job.budget}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiClock className="text-gray-400" />
            <span className="text-sm">{job.deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FiCheckCircle className="text-gray-400" />
            <span className="text-sm">{job.milestones} milestones</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {job.bids} bids
            </span>
            <span className="text-gray-400">{job.time}</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {job.category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
          {getActionButtons(job.status)}
        </div>
      </div>
    </div>
  );
}