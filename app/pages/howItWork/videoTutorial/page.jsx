// pages/video-tutorial.jsx
"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiPlay, FiDownload, FiBookOpen, FiCheckCircle } from "react-icons/fi";

const VideoTutorial = () => {
  const [activeVideo, setActiveVideo] = useState(0);

  const tutorials = [
    {
      title: "Getting Started with JobPole",
      description: "Learn the basics of creating your account and setting up your profile",
      duration: "15:30",
      level: "Beginner",
      topics: ["Account Creation", "Profile Setup", "Basic Navigation"]
    },
    {
      title: "Job Search Mastery",
      description: "Advanced techniques for finding and applying to your dream jobs",
      duration: "22:15",
      level: "Intermediate",
      topics: ["Advanced Search", "Job Alerts", "Application Tracking"]
    },
    {
      title: "Bidding & Project Management",
      description: "Complete guide to bidding on projects and managing your work",
      duration: "28:45",
      level: "Advanced",
      topics: ["Bid Submission", "Project Management", "Client Communication"]
    },
    {
      title: "Employer Dashboard Deep Dive",
      description: "Maximize your hiring success with our employer tools",
      duration: "19:20",
      level: "Intermediate",
      topics: ["Job Posting", "Candidate Management", "Analytics"]
    }
  ];

  const resources = [
    {
      title: "Quick Start Guide PDF",
      type: "PDF",
      size: "2.4 MB",
      icon: <FiDownload />
    },
    {
      title: "Keyboard Shortcuts",
      type: "Cheat Sheet",
      size: "1.1 MB",
      icon: <FiBookOpen />
    },
    {
      title: "Templates Library",
      type: "Resource Pack",
      size: "5.7 MB",
      icon: <FiDownload />
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Video Tutorials</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Master JobPole with our comprehensive video guides and learning resources.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden mb-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <div className="text-xl font-semibold">{tutorials[activeVideo].title}</div>
                  <div className="text-gray-400 mt-2">Click play to watch the tutorial</div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{tutorials[activeVideo].title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{tutorials[activeVideo].description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="ml-2 font-semibold text-gray-800">{tutorials[activeVideo].duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">Level:</span>
                  <span className="ml-2 font-semibold text-gray-800">{tutorials[activeVideo].level}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="ml-2 font-semibold text-gray-800">March 2024</span>
                </div>
              </div>
            </div>

            {/* Topics Covered */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Topics Covered</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {tutorials[activeVideo].topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FiCheckCircle className="text-green-500 shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tutorial List & Resources */}
          <div className="space-y-6">
            {/* Tutorial List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">All Tutorials</h3>
              <div className="space-y-3">
                {tutorials.map((tutorial, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveVideo(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeVideo === index
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 pr-4">{tutorial.title}</h4>
                      <FiPlay className={`text-lg shrink-0 ${
                        activeVideo === index ? "text-primary" : "text-gray-400"
                      }`} />
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{tutorial.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tutorial.level === "Beginner" 
                          ? "bg-green-100 text-green-800"
                          : tutorial.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {tutorial.level}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Download Resources</h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {resource.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{resource.title}</div>
                        <div className="text-sm text-gray-500">{resource.type} • {resource.size}</div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                      <FiDownload />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="bg-linear-to-r from-primary to-blue-400 rounded-2xl p-6 text-white text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-white/90 text-sm mb-4">Our support team is here for you</p>
              <button className="w-full bg-white text-primary py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoTutorial;