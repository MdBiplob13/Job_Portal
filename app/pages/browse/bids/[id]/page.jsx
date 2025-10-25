"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import React, { useState } from "react";
import { MapPin, Clock, DollarSign, Users, Star, User, ArrowLeft } from "lucide-react";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Frontend Engineer",
    subtitle: "React & Next.js Development",
    company: "Pixel Web Makers",
    location: "Dhaka, Bangladesh",
    proposedPrice: 120000,
    priceType: "monthly",
    currentBids: 8,
    maxBids: 15,
    skills: ["React", "Tailwind", "Next.js"],
    language: ["English", "Bangla"],
    jobType: "full-time",
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 24,
    totalHiring: 2,
    posterName: "A. Rahman",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "We are looking for a passionate Frontend Engineer who loves building UIs with React and Next.js. You will be responsible for creating responsive, user-friendly web applications and collaborating with our design team to implement pixel-perfect interfaces.",
    workTime: "9:00 - 17:00",
    workDays: "Mon-Fri",
    requirements: [
      "3+ years of experience with React and Next.js",
      "Strong understanding of JavaScript ES6+",
      "Experience with Tailwind CSS or similar CSS frameworks",
      "Knowledge of responsive web design",
      "Experience with version control (Git)",
      "Good communication skills in English"
    ],
    responsibilities: [
      "Develop and maintain web applications using React and Next.js",
      "Collaborate with designers to implement UI/UX designs",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and team meetings",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging technologies"
    ]
  },
  {
    id: 2,
    title: "Backend Engineer (Node.js)",
    subtitle: "API Development & Database Management",
    company: "Hirely",
    location: "Remote",
    proposedPrice: 40,
    priceType: "hourly",
    currentBids: 12,
    maxBids: 20,
    skills: ["Node.js", "MongoDB", "Express"],
    language: ["English"],
    jobType: "remote",
    postDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 56,
    totalHiring: 1,
    posterName: "S. Karim",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Experienced Node.js developer needed to build scalable APIs and services. You will work on our core backend infrastructure and help scale our platform to serve millions of users.",
    workTime: "Flexible",
    workDays: "Any",
    requirements: [
      "5+ years of Node.js development experience",
      "Strong knowledge of MongoDB and database design",
      "Experience with Express.js framework",
      "Understanding of RESTful API design",
      "Experience with cloud platforms (AWS/GCP)",
      "Knowledge of microservices architecture"
    ],
    responsibilities: [
      "Design and develop scalable backend APIs",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Collaborate with frontend teams",
      "Write comprehensive tests",
      "Monitor and maintain production systems"
    ]
  },
  {
    id: 3,
    title: "Junior QA Tester",
    subtitle: "Web Application Testing",
    company: "Startup X",
    location: "Chittagong, Bangladesh",
    proposedPrice: 20000,
    priceType: "monthly",
    currentBids: 5,
    maxBids: 10,
    skills: ["Testing", "Attention to detail"],
    language: ["Bangla"],
    jobType: "part-time",
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applyDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalApplications: 8,
    totalHiring: 1,
    posterName: "M. Noor",
    posterAvatar: "https://xsgames.co/randomusers/assets/avatars/male/5.jpg",
    description: "Entry-level QA tester position for web applications. Perfect opportunity for someone looking to start their career in software testing.",
    workTime: "10:00 - 18:00",
    workDays: "Mon-Sat",
    requirements: [
      "Basic understanding of software testing concepts",
      "Attention to detail and analytical thinking",
      "Good communication skills",
      "Basic knowledge of web technologies",
      "Ability to work in a team environment",
      "Willingness to learn and grow"
    ],
    responsibilities: [
      "Execute test cases and report bugs",
      "Perform manual testing of web applications",
      "Document test results and findings",
      "Collaborate with development team",
      "Participate in test planning meetings",
      "Learn and apply testing methodologies"
    ]
  },
];

export default function JobDetailPage() {
  const params = useParams();
  const [activeSection, setActiveSection] = useState("overview");
  
  const job = MOCK_JOBS.find(j => j.id === parseInt(params.id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Job Not Found</h1>
            <Link href="/pages/searchAJob" className="text-primary hover:underline">
              ← Back to Job Listings
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const timeLeft = (deadline) => {
    const ms = new Date(deadline).getTime() - Date.now();
    if (ms <= 0) return "Closed";
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    return `${days}d ${hours}h`;
  };

  const sections = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "provider", label: "Provider Info", icon: "👤" },
    { id: "bids", label: "Current Bids", icon: "💰" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-white">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 md:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/pages/searchAJob" 
              className="flex items-center gap-2 text-slate-600 hover:text-primary transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Jobs
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>
          <p className="text-xl text-slate-600 mt-2">{job.subtitle}</p>
          <div className="flex items-center gap-4 mt-4 text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {job.workTime}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.priceType === "hourly"
                ? `$${job.proposedPrice}/hr`
                : job.priceType === "monthly"
                ? `৳${job.proposedPrice}/mo`
                : `৳${job.proposedPrice}`}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.currentBids}/{job.maxBids} bids
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 mb-8">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                    activeSection === section.id
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:text-primary hover:bg-blue-50"
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Job Description</h2>
                  <p className="text-slate-700 leading-relaxed">{job.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Responsibilities</h3>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-slate-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-blue-100 text-secondary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Job Type</h4>
                    <p className="text-slate-600 capitalize">{job.jobType}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Work Days</h4>
                    <p className="text-slate-600">{job.workDays}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Languages</h4>
                    <p className="text-slate-600">{job.language.join(", ")}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Provider Info Section */}
            {activeSection === "provider" && (
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <img 
                    src={job.posterAvatar} 
                    alt={job.posterName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{job.posterName}</h2>
                    <p className="text-xl text-slate-600">{job.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        4.8 (127 reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Company Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-slate-700">Company:</span>
                        <span className="ml-2 text-slate-600">{job.company}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Location:</span>
                        <span className="ml-2 text-slate-600">{job.location}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Posted:</span>
                        <span className="ml-2 text-slate-600">{new Date(job.postDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Deadline:</span>
                        <span className="ml-2 text-slate-600">{timeLeft(job.applyDeadline)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-600">{job.posterName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">📧</span>
                        <span className="text-slate-600">contact@{job.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">📱</span>
                        <span className="text-slate-600">+1 (555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">About the Company</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {job.company} is a leading technology company specializing in innovative solutions. 
                    We are committed to creating exceptional products and providing outstanding service to our clients. 
                    Our team consists of talented professionals who are passionate about technology and dedicated to excellence.
                  </p>
                </div>
              </div>
            )}

            {/* Current Bids Section */}
            {activeSection === "bids" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Current Bids ({job.currentBids})</h2>
                  <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                    Propose Bid
                  </button>
                </div>

                <div className="space-y-4">
                  {Array.from({ length: Math.min(job.currentBids, 5) }).map((_, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">Bidder {index + 1}</h4>
                            <p className="text-sm text-slate-600">Proposed: ${Math.floor(Math.random() * 50) + 30}/hr</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">4.{Math.floor(Math.random() * 9) + 1}</span>
                            <span className="text-sm text-slate-500">({Math.floor(Math.random() * 50) + 20} reviews)</span>
                          </div>
                          <p className="text-sm text-slate-500">{Math.floor(Math.random() * 5) + 1} days ago</p>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm">
                        I have extensive experience in this field and can deliver high-quality results within your timeline. 
                        I'm available to start immediately and can work {job.workDays.toLowerCase()} from {job.workTime}.
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <button className="px-4 py-2 bg-primary   text-white rounded-lg hover:bg-secondary transition text-sm">
                          Accept Bid
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm">
                          View Profile
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {job.currentBids > 5 && (
                    <div className="text-center py-4">
                      <p className="text-slate-500">
                        +{job.currentBids - 5} more bids available
                      </p>
                      <button className="mt-2 text-primary hover:underline">
                        View All Bids
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}