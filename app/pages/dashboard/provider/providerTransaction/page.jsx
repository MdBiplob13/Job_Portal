"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const transactions = [
  {
    id: 1,
    title: "Received for Potable Water and Sewage Disposal",
    from: "Samuel Morgan",
    amount: "+$151,000",
    date: "Dec 10, 2019",
    type: "income",
  },
  {
    id: 2,
    title: "Received for E-Waste Recycling Partnership",
    from: "Samuel Morgan",
    amount: "+$151,000",
    date: "Dec 10, 2019",
    type: "income",
  },
  {
    id: 3,
    title: "Purchased 100 Bids",
    from: "BidPole Package",
    amount: "-$999",
    date: "Dec 10, 2019",
    type: "expense",
  },
  {
    id: 4,
    title: "Profile Boost for a month",
    from: "Goldman Package",
    amount: "-$999",
    date: "Dec 10, 2019",
    type: "expense",
  },
  {
    id: 5,
    title: "Received for Dock Reconstruction",
    from: "Samuel Morgan",
    amount: "+$151,000",
    date: "Dec 10, 2019",
    type: "income",
  },
];

const ProviderTransaction = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            TRANSACTIONS
          </h2>
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50 outline-none w-64"
              />
            </div>
            <p className="text-xs text-gray-500">Dec 1, 2019 - Dec 10, 2019</p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-gray-100">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-start gap-3">
                {item.type === "income" ? (
                  <FaCheckCircle className="text-green-500 text-xl mt-1" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl mt-1" />
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">From: {item.from}</p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end mt-3 md:mt-0 w-full md:w-auto">
                <p
                  className={`text-sm font-semibold ${
                    item.type === "income" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.amount}
                </p>
                <p className="text-xs text-gray-400 ml-4">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderTransaction;
