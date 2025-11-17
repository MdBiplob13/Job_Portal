// pages/posting-guide.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiFileText, FiCheckCircle, FiAlertCircle, FiLightbulb } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa";

const PostingGuide = () => {
  const steps = [
    {
      step: "01",
      title: "Prepare Your Content",
      description: "Gather all necessary information about the job or project",
      tips: [
        "Clear job title and description",
        "Required skills and qualifications",
        "Budget or salary range",
        "Project timeline and deadlines"
      ]
    },
    {
      step: "02",
      title: "Create Your Post",
      description: "Use our posting form to create an attractive opportunity",
      tips: [
        "Use specific, descriptive titles",
        "Include detailed requirements",
        "Set clear expectations",
        "Add relevant tags and categories"
      ]
    },
    {
      step: "03",
      title: "Set Preferences",
      description: "Define your ideal candidate or service employer",
      tips: [
        "Experience level requirements",
        "Location preferences",
        "Required certifications",
        "Communication preferences"
      ]
    },
    {
      step: "04",
      title: "Review & Publish",
      description: "Final check before making your post live",
      tips: [
        "Proofread for errors",
        "Verify contact information",
        "Set appropriate visibility",
        "Choose publication date"
      ]
    }
  ];

  const bestPractices = [
    {
      icon: <FiCheckCircle className="text-2xl text-green-500" />,
      title: "Do's",
      items: [
        "Be specific about requirements",
        "Include company/project background",
        "Set realistic timelines",
        "Offer competitive compensation",
        "Respond to applicants promptly"
      ]
    },
    {
      icon: <FiAlertCircle className="text-2xl text-red-500" />,
      title: "Don'ts",
      items: [
        "Use vague job descriptions",
        "Forget to include budget/salary",
        "Ignore applicant messages",
        "Set unrealistic deadlines",
        "Use discriminatory language"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Posting Guide</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Learn how to create effective job posts and project listings that attract the right talent.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <FiFileText className="text-3xl text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Creating Successful Posts</h2>
              <p className="text-gray-600 mt-2">Follow this guide to maximize your posting success</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            A well-crafted post attracts better candidates, saves time in the hiring process, 
            and increases the likelihood of finding the perfect match for your needs.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="lg:w-3/4">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaLightbulb className="text-primary" />
                    Pro Tips:
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-center gap-3 text-gray-600">
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {bestPractices.map((practice, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                {practice.icon}
                <h3 className="text-2xl font-bold text-gray-800">{practice.title}</h3>
              </div>
              <ul className="space-y-3">
                {practice.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-gray-300 rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-primary to-blue-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Post?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Start creating your job post or project listing now and connect with qualified professionals.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Post a Job
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Create Project
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostingGuide;