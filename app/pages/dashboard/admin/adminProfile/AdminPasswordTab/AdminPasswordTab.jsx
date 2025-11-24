import useUser from "@/app/hooks/user/userHook";
import React from "react";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";

const AdminPasswordTab = () => {
  const { user } = useUser();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const form = e.target;

    const oldPassword = form.oldPassword.value.trim();
    const newPassword = form.newPassword.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    if (!oldPassword) return toast.error("Old password is required");
    if (!newPassword) return toast.error("New password is required");
    if (!confirmPassword) return toast.error("Confirm password is required");

    if (newPassword !== confirmPassword) return toast.error("Passwords don't match");

    fetch(`/api/dashboard/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        oldPassword,
        newPassword
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Password changed successfully!");
          form.reset();
        } else {
          toast.error(data.message || "Failed to change password.");
          console.log(data);
        }
      });
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 max-w-2xl">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiLock className="text-blue-500" />
        Change Password
      </h3>

      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="oldPassword"
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
            name="newPassword"
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
            name="confirmPassword"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Confirm new password"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-primary transition-colors cursor-pointer">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AdminPasswordTab;
