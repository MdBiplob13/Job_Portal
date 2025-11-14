"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import toast from "react-hot-toast";

const REGIONS = ["Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Remote"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const SALARY_TYPES = ["Monthly", "Hourly", "Fixed"];
const SEARCH_TYPE = ["Individual", "Tender"];

export default function ProviderPost() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: REGIONS[0],
    jobType: JOB_TYPES[0],
    workType: "On-site",
    salary: "",
    salaryType: SALARY_TYPES[0],
    totalHiring: "1",
    applicationLimitEnabled: false,
    applicationLimit: "",
    workTime: "",
    workDays: WORK_DAYS[0],
    postDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    skills: [],
    benefits: [],
    languages: [],
    description: "",
    contactEmail: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const addItem = (field, value, setValue) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (form[field].includes(trimmed)) return;
    update(field, [...form[field], trimmed]);
    setValue("");
  };

  const removeItem = (field, value) => {
    update(field, form[field].filter((v) => v !== value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Job title is required");
    if (!form.company.trim()) return toast.error("Company name is required");
    if (!form.description.trim()) return toast.error("Job description is required");

    toast.success("Job posted successfully (mock submission)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-blue-800 bg-clip-text text-transparent">
            Post a Job
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Share your opportunity with thousands of professionals. Fill out the
            form below — make it clear and detailed for the best matches.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={onSubmit}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl border border-blue-100 px-6 sm:px-10 py-10 space-y-8"
        >
          {/* === Basic Info === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Job Title *" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Senior Frontend Developer" />
            <Input label="Company Name *" value={form.company} onChange={(v) => update("company", v)} placeholder="www.Shuvodesign.com" />
          </div>

          {/* === Work Details === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select label="Location" options={REGIONS} value={form.location} onChange={(v) => update("location", v)} />
            <Select label="Job Type" options={JOB_TYPES} value={form.jobType} onChange={(v) => update("jobType", v)} />
            <Select label="Work Type" options={["On-site", "Remote", "Hybrid"]} value={form.workType} onChange={(v) => update("workType", v)} />
          </div>

          {/* === Salary Details === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Salary" type="number" value={form.salary} onChange={(v) => update("salary", v)} placeholder="e.g. 50000" />
            <Select label="Salary Type" options={SALARY_TYPES} value={form.salaryType} onChange={(v) => update("salaryType", v)} />
            <Input label="Total Hiring" type="number" value={form.totalHiring} onChange={(v) => update("totalHiring", v)} />
          </div>

          {/* === Application & Work Conditions === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Checkbox
              label="Enable Application Limit"
              checked={form.applicationLimitEnabled}
              onChange={(checked) => update("applicationLimitEnabled", checked)}
            />
            <Input
              label="Application Limit"
              type="number"
              value={form.applicationLimit}
              onChange={(v) => update("applicationLimit", v)}
              disabled={!form.applicationLimitEnabled}
            />
            <Input label="Work Time" value={form.workTime} onChange={(v) => update("workTime", v)} placeholder="e.g. 9:00 - 17:00" />
          </div>

          {form.salaryType === "Monthly" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Working Days" options={WORK_DAYS} value={form.workDays} onChange={(v) => update("workDays", v)} />
              <Select label="Job Type" options={SEARCH_TYPE} value={form.searchType} onChange={(v) => update("searchType", v)} />
            </div>
          )}

          {/* === Deadline === */}
          <Input label="Application Deadline" type="date" value={form.postDeadline} onChange={(v) => update("postDeadline", v)} />

          {/* === Skills, Languages, Benefits === */}
          <TagInput
            label="Skills"
            value={skillInput}
            setValue={setSkillInput}
            items={form.skills}
            addItem={(v) => addItem("skills", v, setSkillInput)}
            removeItem={(v) => removeItem("skills", v)}
          />
          <TagInput
            label="Languages"
            value={languageInput}
            setValue={setLanguageInput}
            items={form.languages}
            addItem={(v) => addItem("languages", v, setLanguageInput)}
            removeItem={(v) => removeItem("languages", v)}
          />
          <TagInput
            label="Benefits (optional)"
            value={benefitInput}
            setValue={setBenefitInput}
            items={form.benefits}
            addItem={(v) => addItem("benefits", v, setBenefitInput)}
            removeItem={(v) => removeItem("benefits", v)}
          />

          {/* === Description === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description *</label>
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe responsibilities, skills required, and perks..."
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* === Contact & Actions === */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <input
              type="email"
              placeholder="Contact Email (optional)"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full md:w-2/3 px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 focus:border-blue-500 outline-none transition"
            />
            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    ...form,
                    title: "",
                    description: "",
                    skills: [],
                    benefits: [],
                    languages: [],
                    salary: "",
                  });
                  toast.success("Form cleared");
                }}
                className="flex-1 md:flex-none px-6 py-3 border border-blue-200 text-primary font-medium rounded-xl hover:bg-blue-50 transition"
              >
                Clear
              </button>
              <button
                type="submit"
                className="flex-1 md:flex-none px-6 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition"
              >
                Publish Job
              </button>
            </div>
          </div>
        </form>
      </main>

    </div>
  );
}

/* ==== Sub Components ==== */

function Input({ label, value, onChange, placeholder, type = "text", disabled }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 focus:border-blue-500 outline-none transition ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 focus:border-blue-500 outline-none transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-3 mt-5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-primary" />
      <label className="text-sm text-gray-700">{label}</label>
    </div>
  );
}

function TagInput({ label, value, setValue, addItem, removeItem, items }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem(value))}
          placeholder={`Add ${label.toLowerCase().split(" ")[0]}`}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 focus:border-blue-500 outline-none transition"
        />
        <button
          type="button"
          onClick={() => addItem(value)}
          className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 bg-blue-50 text-secondary px-3 py-1.5 rounded-full text-sm"
          >
            {i}
            <button type="button" onClick={() => removeItem(i)} className="hover:text-blue-900">✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}
