"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import toast from "react-hot-toast";
import useUser from "@/app/hooks/user/userHook";
import { useRouter } from "next/navigation";

const JOB_TYPES = ["remote", "onsite", "hybrid"];
const BUDGET_TYPES = ["fixed", "hourly", "weekly", "monthly", "project-based"];

export default function EmployerPost() {
  const { user } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: [],
    responsibilities: [],
    skills: [],
    jobType: "remote",
    companyName: "",
    companyLocation: "",
    budget: "",
    BudgetType: BUDGET_TYPES[0],
    ProjectDuration: "",
    applicationLimitEnabled: false,
    applicationLimit: "",
    workTime: "",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    employerEmail: user?.email || "",
  });

  const [reqInput, setReqInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [respInput, setRespInput] = useState("");

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addItem = (field, value, setValue) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (form[field].includes(trimmed)) return;
    update(field, [...form[field], trimmed]);
    setValue("");
  };

  const removeItem = (field, value) =>
    update(
      field,
      form[field].filter((item) => item !== value)
    );

  // ---------------------------
  // 🔥 POST FUNCTION
  // ---------------------------
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title required");
    if (!form.description.trim()) return toast.error("Description required");
    if (!form.companyName.trim()) return toast.error("Company name required");
    if (!form.companyLocation.trim())
      return toast.error("Company location required");
    if (!form.budget) return toast.error("Budget required");


    try {
      const res = await fetch("/api/dashboard/employer/bid/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          employerEmail: user?.email || "",
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Bid Posted Successfully!");
        router.push("/pages/dashboard/employer/employerBids");

        // clear from
        setForm({
          title: "",
          description: "",
          requirements: [],
          responsibilities: [],
          skills: [],
          jobType: "remote",
          companyName: "",
          companyLocation: "",
          budget: "",
          BudgetType: BUDGET_TYPES[0],
          ProjectDuration: "",
          applicationLimitEnabled: false,
          applicationLimit: "",
          workTime: "",
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
          employerEmail: user?.email || "",
        })
      } else {
        toast.error(data.message || "Error posting bid");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Post a Bid Opportunity
        </h1>

        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
        >
          {/* TITLE + COMPANY */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Project Title *"
              value={form.title}
              onChange={(v) => update("title", v)}
            />
            <Input
              label="Company Name *"
              value={form.companyName}
              onChange={(v) => update("companyName", v)}
            />
          </div>

          {/* LOCATION */}
          <Input
            label="Company Location *"
            value={form.companyLocation}
            onChange={(v) => update("companyLocation", v)}
          />

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium mb-2">Description *</label>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full border px-4 py-3 rounded-xl"
              placeholder="Project details, objectives, deliverables..."
            />
          </div>

          {/* JOB TYPE + BUDGET + PRICE */}
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Job Type"
              value={form.jobType}
              onChange={(v) => update("jobType", v)}
              options={JOB_TYPES}
            />
            <Input
              label="Budget *"
              type="number"
              value={form.budget}
              onChange={(v) => update("budget", v)}
            />
          </div>

          {/* BUDGET TYPE + DURATION */}
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Budget Type"
              options={BUDGET_TYPES}
              value={form.BudgetType}
              onChange={(v) => update("BudgetType", v)}
            />
            <Input
              label="Project Duration"
              value={form.ProjectDuration}
              onChange={(v) => update("ProjectDuration", v)}
              placeholder="e.g. 3 months"
            />
          </div>

          {/* LIMIT */}
          <Checkbox
            label="Enable Bid Limit"
            checked={form.applicationLimitEnabled}
            onChange={(v) => update("applicationLimitEnabled", v)}
          />

          {form.applicationLimitEnabled && (
            <Input
              label="Application Limit"
              type="number"
              value={form.applicationLimit}
              onChange={(v) => update("applicationLimit", v)}
            />
          )}

          {/* WORK TIME */}
          <Input
            label="Work Time"
            value={form.workTime}
            onChange={(v) => update("workTime", v)}
            placeholder="e.g. 9AM - 5PM or Flexible"
          />

          {/* DEADLINE */}
          <Input
            label="Bid Deadline"
            type="date"
            value={form.deadline}
            onChange={(v) => update("deadline", v)}
          />

          {/* TAG INPUTS */}
          <TagInput
            label="Skills"
            value={skillInput}
            setValue={setSkillInput}
            items={form.skills}
            addItem={(v) => addItem("skills", v, setSkillInput)}
            removeItem={(v) => removeItem("skills", v)}
          />

          <TagInput
            label="Requirements"
            value={reqInput}
            setValue={setReqInput}
            items={form.requirements}
            addItem={(v) => addItem("requirements", v, setReqInput)}
            removeItem={(v) => removeItem("requirements", v)}
          />

          <TagInput
            label="Responsibilities"
            value={respInput}
            setValue={setRespInput}
            items={form.responsibilities}
            addItem={(v) => addItem("responsibilities", v, setRespInput)}
            removeItem={(v) => removeItem("responsibilities", v)}
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 cursor-pointer"
          >
            Publish Bid
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border px-4 py-2 rounded-xl"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-4 py-2 rounded-xl"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
      {label}
    </label>
  );
}

function TagInput({ label, value, setValue, addItem, removeItem, items }) {
  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addItem(value))
          }
          className="flex-1 border px-4 py-2 rounded-xl"
        />
        <button
          type="button"
          onClick={() => addItem(value)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 bg-blue-100 rounded-full flex items-center gap-2"
          >
            {item}
            <button
              type="button"
              onClick={() => removeItem(item)}
              className="text-red-600 cursor-pointer"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
