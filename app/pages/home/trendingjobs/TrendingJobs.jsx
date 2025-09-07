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
    <section className="w-full py-12 bg-white">
      <div className="max-w-full mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Trending job roles on Cameroon
        </h2>

        {/* Top Marquee Row */}
        <div className="overflow-hidden relative w-full mb-6">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...jobsTop, ...jobsTop].map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-5 mx-3 min-w-[240px] shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-blue-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row (reverse direction) */}
        <div className="overflow-hidden relative w-full">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...jobsBottom, ...jobsBottom].map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-5 mx-3 min-w-[240px] shadow-md hover:shadow-lg hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500">{job.openings}</p>
                </div>
                <ArrowRight className="ml-3 w-5 h-5 text-blue-600" />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="mt-8">
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            View all
          </button>
        </div> */}
      </div>
    </section>
  );
}
