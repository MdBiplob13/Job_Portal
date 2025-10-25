import React from "react";
import {
  FiEye,
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";

const ProviderHomePage = () => {
  const stats = [
    {
      title: "Total Jobs Posted",
      value: 105,
      color: "from-yellow-400 to-yellow-500",
      icon: <FiBriefcase className="text-white text-xl" />,
      trend: "+12%",
    },
    {
      title: "Active Jobs",
      value: 15,
      color: "from-blue-400 to-blue-500",
      icon: <FiTrendingUp className="text-white text-xl" />,
      trend: "+5%",
    },
    {
      title: "Bids in 24 Hour",
      value: 80,
      color: "from-green-400 to-green-500",
      icon: <FiDollarSign className="text-white text-xl" />,
      trend: "+23%",
    },
    {
      title: "Completed Jobs",
      value: 90,
      color: "from-emerald-400 to-emerald-500",
      icon: <FiCheckCircle className="text-white text-xl" />,
      trend: "+8%",
    },
  ];

  const completedJobs = [
    {
      title: "Dock Reconstruction",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      assigned: "Emma Richards",
      completed: "Dec 04, 2019",
      rating: 4.8,
      amount: "$12,500"
    },
  ];

  const recentBids = [
    {
      title: "Energy Finance Expert",
      org: "United Nations Development Programme",
      time: "10 min ago",
      status: "Pending",
      bidAmount: "$8,200",
    },
    {
      title: "Potable Water and Sewage Disposal",
      org: "United Nations Development Programme",
      time: "10 min ago",
      status: "Under Review",
      bidAmount: "$15,750",
    },
    {
      title: "Execution of Marketing Plan",
      org: "UNICEF",
      time: "10 min ago",
      status: "Approved",
      bidAmount: "$6,500",
    },
    {
      title: "E-Waste Recycling Partnership",
      org: "World Health Organization",
      time: "10 min ago",
      status: "Pending",
      bidAmount: "$22,300",
    },
  ];

  const postedJobs = [
    {
      title: "Potable Water and Sewage Disposal",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 80,
      views: 200,
      time: "1 day ago",
      budget: "$15,000 - $20,000",
      urgency: "High",
    },
    {
      title: "Energy Finance Expert",
      department: "United Nations Development Programme",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 50,
      views: 180,
      time: "1 day ago",
      budget: "$8,000 - $12,000",
      urgency: "Medium",
    },
    {
      title: "E-Waste Recycling Partnership",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 80,
      views: 200,
      time: "1 day ago",
      budget: "$20,000 - $25,000",
      urgency: "High",
    },
    {
      title: "Dock Reconstruction",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 40,
      views: 120,
      time: "1 day ago",
      budget: "$10,000 - $15,000",
      urgency: "Low",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening with your jobs.
          </p>
        </div>
      </div>

      {/* ---- Top Stats ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
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

      {/* ---- Middle Section ---- */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bids */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Recent Bids</h3>
            <span className="text-sm text-gray-500">View All</span>
          </div>
          <div className="space-y-4">
            {recentBids.map((bid, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 group-hover:text-[#D90A2C] transition-colors">
                    {bid.title}
                  </h4>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                      bid.status
                    )}`}
                  >
                    {bid.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{bid.org}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-800">
                    {bid.bidAmount}
                  </div>
                  <div className="flex items-center text-gray-400 text-xs">
                    <FiClock className="mr-1" />
                    {bid.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Completed */}
        <div
          className={`${
            completedJobs.length === 0 ? "hidden" : "block"
          } bg-white rounded-2xl shadow-sm border border-gray-100 p-6`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recently Completed
            </h3>
            <span className="text-sm text-gray-500">View All</span>
          </div>
          {completedJobs.map((job, i) => (
            <div
              key={i}
              className="space-y-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">{job.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {job.amount}
                  </div>
                  <div className="flex items-center text-yellow-600 text-sm">
                    ⭐ {job.rating}
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {job.desc}
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Assigned to:{" "}
                  <span className="font-semibold text-gray-800">
                    {job.assigned}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Completed:{" "}
                  <span className="font-semibold text-gray-800">
                    {job.completed}
                  </span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-[#D90A2C] to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Rate The Provider
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Recently Posted By Me ---- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Recently Posted by Me
          </h3>
          <span className="text-sm text-gray-500">View All</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {postedJobs.map((job, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800 group-hover:text-[#D90A2C] transition-colors text-lg">
                  {job.title}
                </h4>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(
                    job.urgency
                  )}`}
                >
                  {job.urgency}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{job.department}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {job.desc}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="font-semibold">Budget:</span>
                  <span className="text-gray-800">{job.budget}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 pt-3 border-t border-gray-200">
                  <div className="flex space-x-4">
                    <span className="flex items-center">
                      💬 {job.bids} Bids
                    </span>
                    <span className="flex items-center">
                      <FiEye className="mr-1" /> {job.views} Views
                    </span>
                  </div>
                  <span className="text-gray-500">{job.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderHomePage;
