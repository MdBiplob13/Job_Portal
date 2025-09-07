"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import toast from "react-hot-toast";
import Footer from "@/app/components/Footer/Footer";

const REGIONS = ["Dhaka, Bangladesh", "Chittagong, Bangladesh", "Sylhet, Bangladesh", "Remote"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Any"];
const SALARY_TYPES = ["Monthly", "Hourly", "Fixed"];

export default function PostAJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: REGIONS[0],
    jobType: JOB_TYPES[0],
    workType: "On-site", // On-site | Remote | Hybrid
    salary: "",
    salaryType: SALARY_TYPES[0],
    applicationLimitEnabled: false,
    applicationLimit: "",
    totalHiring: "1",
    workTime: "",
    workDays: WORK_DAYS[0],
    postDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
    skills: [],
    languages: [],
    description: "",
    benefits: [],
    contactEmail: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function addSkill() {
    const v = skillInput.trim();
    if (!v) return;
    if (form.skills.includes(v)) {
      setSkillInput("");
      return;
    }
    update("skills", [...form.skills, v]);
    setSkillInput("");
  }

  function removeSkill(s) {
    update("skills", form.skills.filter((x) => x !== s));
  }

  function addBenefit() {
    const v = benefitInput.trim();
    if (!v) return;
    update("benefits", [...form.benefits, v]);
    setBenefitInput("");
  }

  function removeBenefit(b) {
    update("benefits", form.benefits.filter((x) => x !== b));
  }

  function addLanguage() {
    const v = languageInput.trim();
    if (!v) return;
    if (form.languages.includes(v)) {
      setLanguageInput("");
      return;
    }
    update("languages", [...form.languages, v]);
    setLanguageInput("");
  }

  function removeLanguage(l) {
    update("languages", form.languages.filter((x) => x !== l));
  }

  function validate() {
    if (!form.title.trim()) return "Job title is required";
    if (!form.company.trim()) return "Company name is required";
    if (!form.description.trim()) return "Job description is required";
    if (!form.salary.toString().trim()) return "Salary is required";
    if (form.applicationLimitEnabled && !form.applicationLimit) return "Set application limit or disable it";
    if (form.contactEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contactEmail)) return "Contact email is invalid";
    return null;
  }

  function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    // mock submit: in real app, send to API
    const payload = { ...form };
    console.log("Submitting job:", payload);
    toast.success("Job posted (mock). Check console for payload.");

    // reset form to defaults (but keep company & contact maybe)
    setForm((f) => ({
      ...f,
      title: "",
      salary: "",
      applicationLimitEnabled: false,
      applicationLimit: "",
      totalHiring: "1",
      workTime: "",
      skills: [],
      languages: [],
      description: "",
      benefits: [],
      postDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
    }));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Post a Job</h1>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Reach thousands of qualified candidates. Fill out the form below to publish your job posting.
            Provide clear details to get better matches — you can always edit the post later.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow">
          {/* Row 1: Title & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Job title *</label>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Company name *</label>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none focus:border-blue-500"
                placeholder="e.g. Pixel Web Makers"
              />
            </div>
          </div>

          {/* Row 2: Location, Job Type, Work Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Location / Region</label>
              <select
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Job type</label>
              <select
                value={form.jobType}
                onChange={(e) => update("jobType", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              >
                {JOB_TYPES.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Work type</label>
              <select
                value={form.workType}
                onChange={(e) => update("workType", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              >
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          {/* Row 3: Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700">Salary</label>
              <input
                value={form.salary}
                onChange={(e) => update("salary", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
                placeholder="e.g. 50000 or 20 (for hourly)"
                type="number"
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Salary type</label>
              <select
                value={form.salaryType}
                onChange={(e) => update("salaryType", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              >
                {SALARY_TYPES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Total hiring</label>
              <input
                value={form.totalHiring}
                onChange={(e) => update("totalHiring", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
                type="number"
                min={1}
              />
            </div>
          </div>

          {/* Application limit, Work time, Work days conditional */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center gap-3">
              <input
                id="appLimit"
                type="checkbox"
                checked={form.applicationLimitEnabled}
                onChange={(e) => update("applicationLimitEnabled", e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="appLimit" className="text-sm text-slate-700">Enable application limit</label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Application limit (if enabled)</label>
              <input
                value={form.applicationLimit}
                onChange={(e) => update("applicationLimit", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
                type="number"
                min={1}
                disabled={!form.applicationLimitEnabled}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Work time (hours)</label>
              <input
                value={form.workTime}
                onChange={(e) => update("workTime", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
                placeholder="e.g. 9:00 - 17:00 or Flexible"
              />
            </div>
          </div>

          {/* Work days only if salary type is Monthly (as requested) */}
          {form.salaryType === "Monthly" && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Working days</label>
              <select
                value={form.workDays}
                onChange={(e) => update("workDays", e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              >
                {WORK_DAYS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          )}

          {/* Post deadline */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Application deadline</label>
            <input
              type="date"
              value={form.postDeadline}
              onChange={(e) => update("postDeadline", e.target.value)}
              className="mt-1 px-3 py-2 border rounded-md bg-slate-50 outline-none"
            />
          </div>

          {/* Skills input */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Skills</label>
            <div className="mt-2 flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                placeholder="Add a skill and press Enter or Add"
                className="flex-1 px-3 py-2 border rounded-md bg-slate-50 outline-none"
              />
              <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.skills.map((s) => (
                <div key={s} className="px-3 py-1 bg-slate-100 rounded-full inline-flex items-center gap-2">
                  <span className="text-sm">{s}</span>
                  <button type="button" onClick={() => removeSkill(s)} className="text-xs px-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Languages</label>
            <div className="mt-2 flex gap-2">
              <input
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLanguage(); } }}
                placeholder="Add a language and press Enter"
                className="flex-1 px-3 py-2 border rounded-md bg-slate-50 outline-none"
              />
              <button type="button" onClick={addLanguage} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.languages.map((l) => (
                <div key={l} className="px-3 py-1 bg-slate-100 rounded-full inline-flex items-center gap-2">
                  <span className="text-sm">{l}</span>
                  <button type="button" onClick={() => removeLanguage(l)} className="text-xs px-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Benefits (optional)</label>
            <div className="mt-2 flex gap-2">
              <input
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addBenefit(); } }}
                placeholder="e.g. Health insurance, Remote friendly"
                className="flex-1 px-3 py-2 border rounded-md bg-slate-50 outline-none"
              />
              <button type="button" onClick={addBenefit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.benefits.map((b) => (
                <div key={b} className="px-3 py-1 bg-slate-100 rounded-full inline-flex items-center gap-2">
                  <span className="text-sm">{b}</span>
                  <button type="button" onClick={() => removeBenefit(b)} className="text-xs px-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Job description *</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={8}
              placeholder="Describe responsibilities, requirements and what makes this role special."
              className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Contact email (optional)</label>
            <input
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              placeholder="hr@example.com"
              className="mt-1 w-full px-3 py-2 border rounded-md bg-slate-50 outline-none"
              type="email"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-slate-500">You can edit or remove this post anytime from your dashboard.</div>
            <div className="flex gap-3">
              <button type="button" onClick={() => {
                setForm((f) => ({ ...f, title: "", description: "", skills: [], benefits: [], languages: [], salary: "" }));
                toast?.success?.("Form cleared");
              }} className="px-4 py-2 border rounded-md">Clear</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Publish Job</button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
