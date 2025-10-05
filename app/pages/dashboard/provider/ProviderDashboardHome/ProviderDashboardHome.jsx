import React from "react";
import { FiEye, FiClock } from "react-icons/fi";

const ProviderDashboardHome = () => {
  const stats = [
    { title: "Total Jobs Posted", value: 105, color: "bg-yellow-100 text-yellow-600" },
    { title: "Active Jobs", value: 15, color: "bg-blue-100 text-blue-600" },
    { title: "Bids in 24 Hour", value: 80, color: "bg-green-100 text-green-600" },
    { title: "Completed Jobs", value: 90, color: "bg-emerald-100 text-emerald-600" },
  ];

  const completedJobs = [
    {
      title: "Dock Reconstruction",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      assigned: "Emma Richards",
      completed: "Dec 04, 2019",
    },
  ];

  const recentBids = [
    { title: "Energy Finance Expert", org: "United Nations Development Programme", time: "10 min ago" },
    { title: "Potable Water and Sewage Disposal", org: "United Nations Development Programme", time: "10 min ago" },
    { title: "Execution of Marketing Plan", org: "UNICEF", time: "10 min ago" },
    { title: "E-Waste Recycling Partnership", org: "World Health Organization", time: "10 min ago" },
  ];

  const postedJobs = [
    {
      title: "Potable Water and Sewage Disposal",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 80,
      views: 200,
      time: "1 day ago",
    },
    {
      title: "Energy Finance Expert",
      department: "United Nations Development Programme",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 50,
      views: 180,
      time: "1 day ago",
    },
    {
      title: "E-Waste Recycling Partnership",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 80,
      views: 200,
      time: "1 day ago",
    },
    {
      title: "Dock Reconstruction",
      department: "Department of Property and Procurement",
      desc: "Lorem Ipsum is simply dummy text of the printing type setting industry. Lorem Ipsum has been the industry's standard.",
      bids: 40,
      views: 120,
      time: "1 day ago",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 space-y-8">
      {/* ---- Top Stats ---- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white border rounded-2xl shadow-sm p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color} mb-3`}>
              <span className="text-lg font-semibold">{item.value}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{item.title}</p>
          </div>
        ))}
      </div>

      {/* ---- Middle Section ---- */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recently Completed */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Recently Completed</h3>
          {completedJobs.map((job, i) => (
            <div key={i} className="bg-white border rounded-2xl shadow-sm p-5 space-y-2">
              <h4 className="text-gray-800 font-semibold">{job.title}</h4>
              <p className="text-gray-500 text-sm">{job.department}</p>
              <p className="text-gray-400 text-sm leading-snug">{job.desc}</p>
              <div className="flex justify-between items-center text-sm text-gray-600 pt-3 border-t mt-2">
                <div>
                  <p>
                    Assigned To:{" "}
                    <span className="font-medium text-gray-800">{job.assigned}</span>
                  </p>
                </div>
                <div>
                  Completed On:{" "}
                  <span className="font-medium text-gray-800">{job.completed}</span>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                Rate The Provider
              </button>
            </div>
          ))}
        </div>

        {/* Recent Bids */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Recent Bids</h3>
          <div className="bg-white border rounded-2xl shadow-sm divide-y">
            {recentBids.map((bid, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition">
                <h4 className="font-semibold text-gray-800">{bid.title}</h4>
                <p className="text-gray-500 text-sm">{bid.org}</p>
                <p className="text-gray-400 text-xs mt-1 flex items-center">
                  <FiClock className="mr-1" /> {bid.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Recently Posted By Me ---- */}
      <div>
        <h3 className="text-gray-800 font-semibold mb-3">Recently Posted by Me</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {postedJobs.map((job, i) => (
            <div key={i} className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition">
              <h4 className="font-semibold text-gray-800">{job.title}</h4>
              <p className="text-gray-500 text-sm">{job.department}</p>
              <p className="text-gray-400 text-sm leading-snug mt-1">{job.desc}</p>
              <div className="flex justify-between text-gray-500 text-sm mt-3 pt-3 border-t">
                <span>💬 {job.bids} Bids</span>
                <span className="flex items-center">
                  <FiEye className="mr-1" /> {job.views} Views
                </span>
                <span>{job.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProviderDashboardHome;
