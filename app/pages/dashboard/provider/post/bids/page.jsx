"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import toast from "react-hot-toast";

const REGIONS = ["Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Remote"];
const PROJECT_TYPES = ["Construction", "Electrical", "Environmental", "Renovation", "Landscaping", "IT Services", "Consulting"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any", "Flexible"];
const BUDGET_TYPES = ["Fixed Price", "Hourly Rate", "Monthly", "Project-based"];
const BID_CATEGORIES = ["Construction", "Electrical", "Environmental", "Renovation", "Landscaping", "IT", "Consulting", "Other"];

export default function ProviderPost() {
  const [form, setForm] = useState({
    title: "",
    client: "",
    location: REGIONS[0],
    projectType: PROJECT_TYPES[0],
    workType: "On-site",
    budget: "",
    budgetType: BUDGET_TYPES[0],
    projectDuration: "",
    bidDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    skills: [],
    requirements: [],
    languages: [],
    description: "",
    contactEmail: "",
    bidCategory: BID_CATEGORIES[0],
    milestones: "1",
    maxBidders: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");

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
    if (!form.title.trim()) return toast.error("Project title is required");
    if (!form.client.trim()) return toast.error("Client name is required");
    if (!form.description.trim()) return toast.error("Project description is required");
    if (!form.budget) return toast.error("Budget is required");

    toast.success("Bid posted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-blue-800 bg-clip-text text-transparent">
            Post a Tender / Bid Opportunity
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create a new bidding opportunity for service providers. Provide clear project details 
            and requirements to attract qualified bidders.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={onSubmit}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl border border-blue-100 px-6 sm:px-10 py-10 space-y-8"
        >
          {/* === Project Basic Info === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Project Title *" 
              value={form.title} 
              onChange={(v) => update("title", v)} 
              placeholder="e.g. Port Shed Repair Project" 
            />
            <Input 
              label="Client/Organization *" 
              value={form.client} 
              onChange={(v) => update("client", v)} 
              placeholder="e.g. Port Authority Department" 
            />
          </div>

          {/* === Project Details === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select label="Location" options={REGIONS} value={form.location} onChange={(v) => update("location", v)} />
            <Select label="Project Type" options={PROJECT_TYPES} value={form.projectType} onChange={(v) => update("projectType", v)} />
            <Select label="Work Type" options={["On-site", "Remote", "Hybrid"]} value={form.workType} onChange={(v) => update("workType", v)} />
          </div>

          {/* === Budget & Timeline === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input 
              label="Project Budget *" 
              type="number" 
              value={form.budget} 
              onChange={(v) => update("budget", v)} 
              placeholder="e.g. 15000" 
            />
            <Select 
              label="Budget Type" 
              options={BUDGET_TYPES} 
              value={form.budgetType} 
              onChange={(v) => update("budgetType", v)} 
            />
            <Input 
              label="Project Duration" 
              value={form.projectDuration} 
              onChange={(v) => update("projectDuration", v)} 
              placeholder="e.g. 3 months" 
            />
          </div>

          {/* === Bid Management === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input 
              label="Maximum Bidders" 
              type="number" 
              value={form.maxBidders} 
              onChange={(v) => update("maxBidders", v)} 
              placeholder="e.g. 20" 
            />
            <Input 
              label="Number of Milestones" 
              type="number" 
              value={form.milestones} 
              onChange={(v) => update("milestones", v)} 
              placeholder="e.g. 3" 
            />
            <Select 
              label="Bid Category" 
              options={BID_CATEGORIES} 
              value={form.bidCategory} 
              onChange={(v) => update("bidCategory", v)} 
            />
          </div>

          {/* === Work Conditions === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Work Time" 
              value={form.workTime} 
              onChange={(v) => update("workTime", v)} 
              placeholder="e.g. 9:00 - 17:00 or Flexible" 
            />
            <Select 
              label="Working Days" 
              options={WORK_DAYS} 
              value={form.workDays} 
              onChange={(v) => update("workDays", v)} 
            />
          </div>

          {/* === Bid Deadline === */}
          <Input 
            label="Bid Submission Deadline *" 
            type="date" 
            value={form.bidDeadline} 
            onChange={(v) => update("bidDeadline", v)} 
          />

          {/* === Skills, Requirements, Languages === */}
          <TagInput
            label="Required Skills"
            value={skillInput}
            setValue={setSkillInput}
            items={form.skills}
            addItem={(v) => addItem("skills", v, setSkillInput)}
            removeItem={(v) => removeItem("skills", v)}
            placeholder="e.g. Construction, Project Management"
          />
          
          <TagInput
            label="Project Requirements"
            value={requirementInput}
            setValue={setRequirementInput}
            items={form.requirements}
            addItem={(v) => addItem("requirements", v, setRequirementInput)}
            removeItem={(v) => removeItem("requirements", v)}
            placeholder="e.g. 5+ years experience, Licensed contractor"
          />
          
          <TagInput
            label="Required Languages"
            value={languageInput}
            setValue={setLanguageInput}
            items={form.languages}
            addItem={(v) => addItem("languages", v, setLanguageInput)}
            removeItem={(v) => removeItem("languages", v)}
            placeholder="e.g. English, Bangla"
          />

          {/* === Project Description === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Description & Scope *
            </label>
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the project scope, objectives, deliverables, timeline, and any specific requirements..."
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* === Contact & Actions === */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <input
              type="email"
              placeholder="Contact Email for Bidders *"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full md:w-2/3 px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 focus:border-blue-500 outline-none transition"
              required
            />
            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    title: "",
                    client: "",
                    location: REGIONS[0],
                    projectType: PROJECT_TYPES[0],
                    workType: "On-site",
                    budget: "",
                    budgetType: BUDGET_TYPES[0],
                    projectDuration: "",
                    bidDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
                    skills: [],
                    requirements: [],
                    languages: [],
                    description: "",
                    contactEmail: "",
                    bidCategory: BID_CATEGORIES[0],
                    milestones: "1",
                    maxBidders: "",
                  });
                  toast.success("Form cleared");
                }}
                className="flex-1 md:flex-none px-6 py-3 border border-blue-200 text-primary font-medium rounded-xl hover:bg-blue-50 transition"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="flex-1 md:flex-none px-6 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition"
              >
                Publish Bid Opportunity
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
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

function TagInput({ label, value, setValue, addItem, removeItem, items, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addItem(value))}
          placeholder={placeholder || `Add ${label.toLowerCase()}`}
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