// app/components/Dashboard/Jobs/JobTabs.jsx
"use client";
import React from "react";

export default function JobTabs({ active, setActive }) {
  const tabs = [
    { id: "published", label: "Published" },
    { id: "inProgress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            active === t.id ? "bg-blue-600 text-white" : "bg-white border text-slate-700"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
