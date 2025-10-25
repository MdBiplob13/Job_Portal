// pages/bidding-tips.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiAward, FiDollarSign, FiClock, FiUsers, FiMessageSquare, FiCheck } from "react-icons/fi";

const BiddingTips = () => {
  const tips = [
    {
      icon: <FiAward className="text-2xl" />,
      title: "Understand the Project",
      description: "Thoroughly read the project description and requirements before bidding",
      details: [
        "Analyze client needs carefully",
        "Identify key deliverables",
        "Note any special requirements",
        "Research the client's background"
      ]
    },
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: "Price Competitively",
      description: "Set fair prices that reflect your expertise and market rates",
      details: [
        "Research market rates",
        "Consider project complexity",
        "Factor in your experience",
        "Include all costs in your quote"
      ]
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Set Realistic Timelines",
      description: "Provide accurate time estimates that you can confidently deliver",
      details: [
        "Include buffer time",
        "Consider your current workload",
        "Account for revisions",
        "Set clear milestone dates"
      ]
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Showcase Your Expertise",
      description: "Highlight relevant experience and successful projects",
      details: [
        "Share portfolio examples",
        "Mention similar projects",
        "Include client testimonials",
        "Highlight specific skills"
      ]
    },
    {
      icon: <FiMessageSquare className="text-2xl" />,
      title: "Write Compelling Proposals",
      description: "Craft personalized proposals that address client concerns",
      details: [
        "Personalize each proposal",
        "Address specific requirements",
        "Show understanding of needs",
        "Include a clear call-to-action"
      ]
    },
    {
      icon: <FiCheck className="text-2xl" />,
      title: "Follow Up Professionally",
      description: "Maintain professional communication throughout the process",
      details: [
        "Respond promptly to messages",
        "Ask clarifying questions",
        "Provide regular updates",
        "Seek feedback after completion"
      ]
    }
  ];

  const commonMistakes = [
    "Underpricing your services",
    "Overpromising on deadlines",
    "Using generic proposals",
    "Ignoring project specifications",
    "Poor communication",
    "Not asking enough questions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Tips for Bidding</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Master the art of bidding and increase your success rate on JobPole projects.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Win More Projects</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Successful bidding is about more than just price. It's about understanding client needs, 
            showcasing your value, and building trust through professional communication.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-400 rounded-2xl flex items-center justify-center text-white mb-4">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{tip.description}</p>
              <ul className="space-y-2">
                {tip.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Common Mistakes & Success Formula */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Common Mistakes */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Bidding Mistakes</h2>
            <div className="space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-red-100 bg-red-50 rounded-xl">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    ✕
                  </div>
                  <span className="text-gray-700">{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Formula */}
          <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Winning Bid Formula</h2>
            <div className="space-y-4">
              {[
                { percent: "40%", item: "Understanding Client Needs" },
                { percent: "25%", item: "Competitive Pricing" },
                { percent: "20%", item: "Professional Proposal" },
                { percent: "15%", item: "Portfolio & Reviews" }
              ].map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <span className="font-semibold">{formula.item}</span>
                  <span className="font-bold text-lg">{formula.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Bidding?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Apply these tips and start winning more projects on JobPole today.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Browse Projects
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Download Bidding Guide
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BiddingTips;