import React from "react";
import {
  FiUsers,
  FiBriefcase,
  FiTrendingUp,
  FiCheckCircle,
  FiDatabase,
  FiActivity,
  FiArrowRight,
  FiEye,
} from "react-icons/fi";

const AdminHomePage = () => {
  const stats = [
    {
      title: "Total Users",
      value: 1280,
      color: "from-blue-500 to-blue-600",
      icon: <FiUsers className="text-white text-xl" />,
      trend: "+8%",
    },
    {
      title: "Total Employers",
      value: 540,
      color: "from-purple-500 to-purple-600",
      icon: <FiBriefcase className="text-white text-xl" />,
      trend: "+4%",
    },
    {
      title: "Total Jobs",
      value: 351,
      color: "from-green-500 to-green-600",
      icon: <FiTrendingUp className="text-white text-xl" />,
      trend: "+12%",
    },
    {
      title: "Completed Jobs",
      value: 207,
      color: "from-emerald-500 to-emerald-600",
      icon: <FiCheckCircle className="text-white text-xl" />,
      trend: "+10%",
    },
  ];

  const recentUsers = [
    { name: "Ayesha Khan", email: "ayesha@example.com", date: "Today" },
    { name: "Rahim Uddin", email: "rahim@example.com", date: "Today" },
    { name: "John Wayne", email: "john@example.com", date: "1 day ago" },
  ];

  const recentJobs = [
    {
      title: "UI/UX Designer Needed",
      employer: "Pixel Company",
      bids: 40,
      views: 200,
      status: "Active",
    },
    {
      title: "Mobile App Development",
      employer: "Tech Army",
      bids: 52,
      views: 350,
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome sir, manage the entire platform here.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-r ${item.color} flex items-center justify-center shadow-lg`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-primary bg-green-50 px-2 py-1 rounded-full">
                {item.trend}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">
                {item.value}
              </div>
              <p className="text-gray-600 text-sm font-medium">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Recent Users */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Users</h3>
            <span className="text-sm text-gray-500 hover:text-primary cursor-pointer">
              View All
            </span>
          </div>

          <div className="space-y-4">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <span className="text-sm text-gray-400">{user.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">System Summary</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex justify-between">
              <div>
                <p className="text-gray-600">Server Status</p>
                <p className="font-semibold text-gray-800 mt-1">Running Smoothly</p>
              </div>
              <FiActivity className="text-green-600 text-2xl" />
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex justify-between">
              <div>
                <p className="text-gray-600">Total Database Size</p>
                <p className="font-semibold text-gray-800 mt-1">1.2 GB</p>
              </div>
              <FiDatabase className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Posted Jobs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Jobs</h3>
          <span className="text-sm text-gray-500 hover:text-primary cursor-pointer">
            View All
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recentJobs.map((job, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors text-lg">
                  {job.title}
                </h4>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {job.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{job.employer}</p>

              <div className="flex justify-between text-sm text-gray-600 mt-4 pt-3 border-t border-gray-200">
                <span className="flex items-center">💬 {job.bids} Bids</span>
                <span className="flex items-center">
                  <FiEye className="mr-1" /> {job.views} Views
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
