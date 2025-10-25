// pages/mission-vision.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiTarget, FiEye, FiStar } from "react-icons/fi";

const MissionVision = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Mission & Vision</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Driving innovation in the job market with clear purpose and ambitious vision for the future.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FiTarget className="text-3xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              To revolutionize the employment landscape by creating seamless connections between 
              talented professionals and forward-thinking organizations through innovative technology 
              and personalized service.
            </p>
            <ul className="space-y-3">
              {[
                "Simplify the job search and hiring process",
                "Provide equal opportunities for all professionals",
                "Foster meaningful career growth and development",
                "Build trust through transparency and integrity"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <FiStar className="text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FiEye className="text-3xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              To become the world's most trusted career platform where every individual can discover 
              their potential and every organization can find the talent needed to thrive in the 
              evolving global economy.
            </p>
            <ul className="space-y-3">
              {[
                "Global reach with local impact",
                "AI-powered career matching",
                "Lifelong career development support",
                "Sustainable employment ecosystems"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-600">
                  <FiStar className="text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Our 2025 Goals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "50+", label: "Countries Served" },
              { number: "95%", label: "Satisfaction Rate" }
            ].map((goal, index) => (
              <div key={index} className="text-center p-6 bg-white/10 rounded-xl">
                <div className="text-4xl font-bold mb-2">{goal.number}</div>
                <div className="text-white/90">{goal.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MissionVision;