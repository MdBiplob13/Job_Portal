// pages/core-values.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { 
  FiHeart, 
  FiUsers, 
  FiTarget, 
  FiAward, 
  FiShield,
  FiTrendingUp 
} from "react-icons/fi";

const CoreValues = () => {
  const values = [
    {
      icon: <FiHeart className="text-3xl" />,
      title: "Passion for People",
      description: "We genuinely care about every individual's career journey and success.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and building strong partnerships.",
      color: "from-blue-400 to-primary"
    },
    {
      icon: <FiTarget className="text-3xl" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we deliver.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Innovation",
      description: "We continuously evolve to provide cutting-edge solutions.",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical practices.",
      color: "from-orange-400 to-amber-500"
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: "Growth Mindset",
      description: "We embrace learning and continuous improvement.",
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Core Values</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            The principles that guide our decisions, shape our culture, and define who we are.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Culture Section */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
              <p className="text-white/90 leading-relaxed mb-6">
                Our values come to life through our daily actions, team collaborations, 
                and the way we serve our community. We foster an environment where 
                everyone can thrive and make a meaningful impact.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-white/80 text-sm">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-white/80 text-sm">Team Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">What We Believe In</h3>
              <ul className="space-y-3 text-white/90">
                {[
                  "Every person deserves meaningful work",
                  "Technology should serve humanity",
                  "Diversity drives innovation",
                  "Trust is earned through actions"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoreValues;