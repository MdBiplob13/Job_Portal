import Link from "next/link";
import React from "react";

const StepSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            We make it simple to win more bids.
          </h2>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold text-gray-800">BidNet Direct</span>{" "}
            connects your company with state, local, and federal government
            agencies so you can find the most relevant opportunities without
            wasting time. Our smart tools help you save effort and focus on
            winning.
          </p>
          <Link href="/pages/auth/signup" className="bg-blue-600 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-md shadow-md transition">
            Sign up Now
          </Link>
        </div>

        {/* Right Side Steps */}
        <div className="space-y-8">
          {[
            {
              number: "01",
              title: "Search",
              desc: "Discover thousands of government opportunities with smart filters and saved searches.",
            },
            {
              number: "02",
              title: "Find",
              desc: "Target the right bids for your business and uncover partnership opportunities.",
            },
            {
              number: "03",
              title: "Apply",
              desc: "Submit proposals with confidence and maximize your chances of winning contracts.",
            },
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg shadow-md">
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepSection;
