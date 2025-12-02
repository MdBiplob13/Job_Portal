"use client";
import React from "react";
import Link from "next/link";
import useAllUsers from "@/app/hooks/user/GetAllUser";

const AdminUsersPage = () => {
  const {
    allUsers,
    allUsersLoading,
    allUsersRefresh,
    setAllUsersRefresh,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
  } = useAllUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, username, email"
          className="border px-3 py-2 rounded w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded cursor-pointer"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="on leave">On Leave</option>
          <option value="blocked">Blocked</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => setAllUsersRefresh(allUsersRefresh + 1)}
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Job Posted</th>
              <th className="p-3 border">Job Completed</th>
              <th className="p-3 border">Ongoing Projects</th>
              <th className="p-3 border">Ratings</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {allUsersLoading && (
              <tr>
                <td className="p-4 text-center" colSpan="10">
                  Loading users...
                </td>
              </tr>
            )}

            {!allUsersLoading &&
              allUsers.map((user) => (
                <tr key={user._id} className="border">
                  <td className="p-3 border">
                    <img
                      src={user.photo || "/defaultProfilePic.jpg"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">@{user.userName}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.job.jobPosted}</td>
                  <td className="p-3 border">{user.job.jobCompleted}</td>
                  <td className="p-3 border">{user.job.ongoingProjects}</td>
                  <td className="p-3 border">
                    ⭐ {user.review.rating} ({user.review.totalRatings})
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        user.status === "active"
                          ? "bg-green-200 text-green-800"
                          : user.status === "blocked"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <Link
                      href={`/pages/dashboard/admin/adminUsers/${user._id}`}
                      className="text-blue-600 underline cursor-pointer"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

            {!allUsersLoading && allUsers.length === 0 && (
              <tr>
                <td className="p-4 text-center" colSpan="10">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page <= 1}
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsersPage;
