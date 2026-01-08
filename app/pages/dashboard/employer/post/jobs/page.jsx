"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/user/userHook";

const REGIONS = [
  "Antigua and Barbuda",
  "Cameroon",
  "Bahamas",
  "Barbados",
  "Belize",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Guyana",
  "Haiti",
  "Jamaica",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Suriname",
  "Trinidad and Tobago",
];
const JOB_TYPES = ["Full-time", "Part-time", "Internship"];
const WORK_DAYS = ["Mon-Fri", "Mon-Sat", "Flexible", "Any"];
const SALARY_TYPES = ["Monthly", "Hourly", "Fixed"];
const SEARCH_TYPE = ["Individual", "Tender"];

export default function EmployerPost() {
  const router = useRouter();
  const { user } = useUser();

  // 🔥 All form inputs using event target names
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    companyLocation: REGIONS[0],
    jobType: JOB_TYPES[0],
    workType: "On-site",
    salary: "",
    salaryType: SALARY_TYPES[0],
    totalHiring: "1",
    applicationLimitEnabled: false,
    applicationLimit: "",
    workTime: "",
    workDays: WORK_DAYS[0],
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    description: "",
    contactEmail: "",
    searchType: SEARCH_TYPE[0],
  });

  // 🔥 Array states
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Temporary inputs for arrays
  const [inputs, setInputs] = useState({
    skill: "",
    language: "",
    benefit: "",
    requirement: "",
    responsibility: "",
  });

  // Generic input handler
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Checkbox handler
  const handleCheckbox = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.checked }));
  };

  // Add array item
  const addItem = (field, value) => {
    const trimmed =
      value.trim().charAt(0).toUpperCase() +
      value.trim().slice(1).toLowerCase();

    if (!trimmed) return;
    if (eval(field).includes(trimmed)) return;

    if (field === "skills") setSkills([...skills, trimmed.toUpperCase()]);
    if (field === "languages")
      setLanguages([...languages, trimmed.toUpperCase()]);
    if (field === "benefits") setBenefits([...benefits, trimmed]);
    if (field === "requirements") setRequirements([...requirements, trimmed]);
    if (field === "responsibilities")
      setResponsibilities([...responsibilities, trimmed]);

    // clear input
    setInputs((prev) => ({ ...prev, [field.slice(0, -1)]: "" }));
  };

  // Remove array item
  const removeItem = (field, item) => {
    if (field === "skills") setSkills(skills.filter((x) => x !== item));
    if (field === "languages")
      setLanguages(languages.filter((x) => x !== item));
    if (field === "benefits") setBenefits(benefits.filter((x) => x !== item));
    if (field === "requirements")
      setRequirements(requirements.filter((x) => x !== item));
    if (field === "responsibilities")
      setResponsibilities(responsibilities.filter((x) => x !== item));
  };

  // handle clear button
  const handleClear = (e) => {
    e.preventDefault();
    // Clear form
    setForm({
      title: "",
      companyName: "",
      companyLocation: REGIONS[0],
      jobType: JOB_TYPES[0],
      workType: "On-site",
      salary: "",
      salaryType: SALARY_TYPES[0],
      totalHiring: "1",
      applicationLimitEnabled: false,
      applicationLimit: "",
      workTime: "",
      workDays: WORK_DAYS[0],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      description: "",
      contactEmail: "",
      searchType: SEARCH_TYPE[0],
    });

    // Clear arrays
    setSkills([]);
    setLanguages([]);
    setBenefits([]);
    setRequirements([]);
    setResponsibilities([]);
  };

  // handle job post submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // data verification
    if (!form.title || !form.companyName || !form.description) {
      setError("All fields are required!");
      setSubmitting(false);
      return;
    }

    // check if array is empty
    if (
      skills.length === 0 ||
      languages.length === 0 ||
      benefits.length === 0 ||
      requirements.length === 0 ||
      responsibilities.length === 0
    ) {
      setError(
        "Add at least one skill, language, benefit, requirement, and responsibility each."
      );
      setSubmitting(false);
      return;
    }
    // check deadline assigned or in future
    const today = new Date();
    const selectedDeadline = new Date(form.deadline);
    if (selectedDeadline < today) {
      setError("Deadline must be in the future.");
      setSubmitting(false);
      return;
    }

    const jobData = {
      ...form,
      skills,
      languages,
      benefits,
      requirements,
      responsibilities,
      employerEmail: user?.email,
    };
    fetch("/api/dashboard/employer/job/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Job posted successfully!");
          // Clear form after successful submission
          handleClear(e);
          router.push("/pages/dashboard/employer/employerJobs");
        } 
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100">
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">Post a Job</h1>

        <form className="bg-white p-8 rounded-3xl shadow space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Job Title *"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              required
            />
            <Input
              label="Company Name *"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="e.g., Tech Solutions Ltd."
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Company Location *"
              name="companyLocation"
              value={form.companyLocation}
              onChange={handleChange}
              options={REGIONS}
              required
              placeholder="Select a location"
            />
            <Select
              label="Job Type *"
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              options={JOB_TYPES}
              required
              placeholder="Select job type"
            />
            <Select
              label="Work Type *"
              name="workType"
              value={form.workType}
              onChange={handleChange}
              options={["On-site", "Remote", "Hybrid"]}
              required
              placeholder="Select work type"
            />
          </div>

          {/* Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Salary *"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              required
              placeholder="e.g., 50000$"
            />
            <Select
              label="Salary Type *"
              name="salaryType"
              value={form.salaryType}
              onChange={handleChange}
              options={SALARY_TYPES}
              required
              placeholder="Select salary type"
            />
            <Input
              label="Total Hiring"
              name="totalHiring"
              type="number"
              value={form.totalHiring}
              onChange={handleChange}
              placeholder={"e.g. 10"}
            />
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Checkbox
              label="Enable Application Limit"
              name="applicationLimitEnabled"
              checked={form.applicationLimitEnabled}
              onChange={handleCheckbox}
            />
            <Input
              label="Application Limit"
              name="applicationLimit"
              type="number"
              disabled={!form.applicationLimitEnabled}
              value={form.applicationLimit}
              onChange={handleChange}
              placeholder={"e.g. 100"}
            />
            <Input
              label="Work Time *"
              name="workTime"
              value={form.workTime}
              onChange={handleChange}
              placeholder="e.g., 9am - 5pm"
              required
            />
          </div>

          {/* Work Days  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Working Days *"
              name="workDays"
              value={form.workDays}
              onChange={handleChange}
              options={WORK_DAYS}
              required
              placeholder="Select working days"
            />
            <Input
              label="Application Deadline *"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          {/* Deadline */}

          {/* Arrays */}
          <div className="flex justify-between gap-5">
            <div className="w-1/2">
              <TagInput
                label="Skills"
                field="skills"
                items={skills}
                inputs={inputs}
                setInputs={setInputs}
                addItem={addItem}
                removeItem={removeItem}
                placeholder="e.g., React, Node.js"
              />
            </div>
            <div className="w-1/2">
              <TagInput
                label="Languages"
                field="languages"
                items={languages}
                inputs={inputs}
                setInputs={setInputs}
                addItem={addItem}
                removeItem={removeItem}
                placeholder="e.g., English, Spanish"
              />
            </div>
          </div>
          <TagInput
            label="Benefits"
            field="benefits"
            items={benefits}
            inputs={inputs}
            setInputs={setInputs}
            addItem={addItem}
            removeItem={removeItem}
            placeholder="e.g., Health Insurance, Paid Time Off"
          />
          <TagInput
            label="Requirements"
            field="requirements"
            items={requirements}
            inputs={inputs}
            setInputs={setInputs}
            addItem={addItem}
            removeItem={removeItem}
            placeholder="e.g., Bachelor's Degree, 3+ years experience"
          />
          <TagInput
            label="Responsibilities"
            field="responsibilities"
            items={responsibilities}
            inputs={inputs}
            setInputs={setInputs}
            addItem={addItem}
            removeItem={removeItem}
            placeholder="e.g., Develop and maintain web applications"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Job Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Provide a detailed description of the job role, responsibilities, and expectations."
              className="w-full border rounded-xl px-4 py-3 bg-slate-50"
            />
          </div>

          <p className="text-red-600 text-center">{error}</p>

          {/* Buttons */}
          <div className="flex items-center justify-end pr-5 gap-4 pt-6">
            <button
              type="button"
              onClick={(e) => handleClear(e)}
              className="px-6 py-3 rounded-xl border cursor-pointer"
            >
              Clear
            </button>

            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-primary text-white cursor-pointer"
            >
              {submitting ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

/* ========================== COMPONENTS ============================= */

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-xl px-4 py-2.5 bg-slate-50"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-2.5 bg-slate-50"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <div className="flex items-center gap-3 mt-5">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-primary cursor-pointer"
      />
      <span>{label}</span>
    </div>
  );
}

function TagInput({
  label,
  field,
  items,
  inputs,
  setInputs,
  addItem,
  removeItem,
  placeholder,
}) {
  const key = field.slice(0, -1); // skill, language, benefit etc.

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>

      <div className="flex gap-2">
        <input
          value={inputs[key]}
          onChange={(e) => setInputs((i) => ({ ...i, [key]: e.target.value }))}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.preventDefault(), addItem(field, inputs[key]))
          }
          placeholder={
            placeholder || `e.g., ${key.charAt(0).toUpperCase() + key.slice(1)}`
          }
          className="flex-1 px-4 py-2.5 border rounded-xl bg-slate-50"
        />

        <button
          type="button"
          onClick={() => addItem(field, inputs[key])}
          className="px-5 py-2 bg-primary text-white rounded-xl cursor-pointer"
        >
          Add
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-blue-50 rounded-full flex items-center gap-2 text-sm"
          >
            {i}
            <button
              className="cursor-pointer"
              onClick={() => removeItem(field, i)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
