// pages/partners.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiExternalLink, FiCheck } from "react-icons/fi";

const Partners = () => {
  const partners = [
    {
      name: "Tech Innovators Inc.",
      description: "Leading technology partner providing cutting-edge solutions",
      category: "Technology",
      since: "2022"
    },
    {
      name: "Global Recruiters Network",
      description: "Worldwide recruitment and talent acquisition specialists",
      category: "Recruitment",
      since: "2021"
    },
    {
      name: "Career Development Institute",
      description: "Professional training and career advancement programs",
      category: "Education",
      since: "2023"
    },
    {
      name: "Business Solutions Group",
      description: "Comprehensive business consulting and support services",
      category: "Consulting",
      since: "2022"
    },
    {
      name: "Digital Marketing Pros",
      description: "Expert digital marketing and brand promotion",
      category: "Marketing",
      since: "2023"
    },
    {
      name: "International Trade Alliance",
      description: "Global business expansion and market entry specialists",
      category: "International",
      since: "2021"
    }
  ];

  const benefits = [
    "Exclusive partner discounts",
    "Early access to new features",
    "Dedicated account management",
    "Joint marketing opportunities",
    "Technical support priority",
    "Training and certification"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Partners & Affiliates</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Building strong partnerships to deliver exceptional value and expand our global reach.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Partners Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Trusted Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {partner.category}
                    </span>
                  </div>
                  <FiExternalLink className="text-gray-400 hover:text-primary transition-colors cursor-pointer" />
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Partner since {partner.since}</span>
                  <button className="text-primary hover:text-blue-600 font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Partnership Benefits</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <FiCheck className="text-primary" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Join our network of industry leaders and expand your reach while 
              delivering exceptional value to our shared customers.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-white text-primary py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Apply for Partnership
              </button>
              <button className="w-full border-2 border-white text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Download Partnership Kit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Partners;