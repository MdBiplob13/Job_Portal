"use client";

import { ArrowRight } from "lucide-react";

const jobsTop = [
  { title: "Accounts / Finance", openings: "3,776 openings" },
  { title: "Delivery Person", openings: "2,686 openings" },
  { title: "Business Development", openings: "2,016 openings" },
  { title: "Retail / Counter Sales", openings: "1,424 openings" },
  { title: "Marketing", openings: "1,184 openings" },
  { title: "Logistics / Warehouse", openings: "1,043 openings" },
];

const jobsBottom = [
  { title: "Electrical Engineer", openings: "138 openings" },
  { title: "Maid / Baby Care", openings: "131 openings" },
  { title: "Security Guard", openings: "115 openings" },
  { title: "Hardware & Network", openings: "110 openings" },
  { title: "IT Support", openings: "102 openings" }, 
  { title: "Welder", openings: "82 openings" },
];

export default function TrendingJobs() {
  return (
    <section className="w-full py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10 text-gray-900">
          Trending Job Roles in <span className="text-primary">Cameroon</span>
        </h2>

        {/* --- MOBILE VERSION (Horizontal Scroll) --- */}
        <div className="md:hidden space-y-8">
          {/* Top Jobs */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-3">
            {jobsTop.map((job, i) => (
              <div
                key={i}
                className="snap-center min-w-[75%] flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div>
                  <p className="text-base font-semibold text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-primary" />
              </div>
            ))}
          </div>

          {/* Bottom Jobs */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-3">
            {jobsBottom.map((job, i) => (
              <div
                key={i}
                className="snap-center min-w-[75%] flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div>
                  <p className="text-base font-semibold text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* --- DESKTOP VERSION (Grid Layout) --- */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
            {jobsTop.map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-primary" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {jobsBottom.map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
