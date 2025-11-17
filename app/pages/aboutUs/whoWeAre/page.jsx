// pages/who-we-are.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiUsers, FiTarget, FiAward, FiHeart } from "react-icons/fi";

const WhoWeAre = () => {
  const features = [
    {
      icon: <FiUsers className="text-3xl text-primary" />,
      title: "Our Team",
      description: "A diverse group of professionals passionate about connecting talent with opportunity."
    },
    {
      icon: <FiTarget className="text-3xl text-primary" />,
      title: "Our Expertise",
      description: "Years of experience in recruitment, technology, and business development."
    },
    {
      icon: <FiAward className="text-3xl text-primary" />,
      title: "Our Achievements",
      description: "Successfully connected thousands of job seekers with their dream careers."
    },
    {
      icon: <FiHeart className="text-3xl text-primary" />,
      title: "Our Passion",
      description: "Driven by the belief that everyone deserves meaningful work and growth."
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Who We Are</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We are JobPole - a dedicated team revolutionizing the way job seekers and employers connect. 
            Our platform bridges the gap between talent and opportunity.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a vision to transform the job market, JobPole emerged from the need 
                for a more efficient, transparent, and user-friendly platform that serves both 
                job seekers and employers equally.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We understand the challenges faced by modern professionals and businesses. 
                That's why we've built a comprehensive ecosystem that simplifies the entire 
                employment process.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to be a trusted partner for thousands of companies and 
                professionals across various industries.
              </p>
            </div>
            <div className="bg-linear-to-br from-primary/10 to-blue-400/10 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                <div className="text-gray-600">Successful Placements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Values Preview */}
        <div className="bg-linear-to-r from-primary to-blue-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Integrity, Innovation, and Impact drive everything we do. 
            Discover what makes us different.
          </p>
          <a 
            href="/pages/core-values" 
            className="inline-block bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Our Values
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WhoWeAre;