import React from "react";
import { FiLock } from "react-icons/fi";

const EmployerPasswordTab = ({ isEditing}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-2xl">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiLock className="text-blue-500" />
        Change Password
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter new password"
          />
          <p className="text-xs text-gray-500 mt-2">
            Must be at least 8 characters with numbers and symbols
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Confirm new password"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default EmployerPasswordTab;
