// pages/partners.jsx
"use client";
import React from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiCheck } from "react-icons/fi"; // Removed FiExternalLink

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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-blue-400 text-white py-20">
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
                  {/* Removed FiExternalLink icon */}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Partner since {partner.since}</span>
                  {/* Removed "Learn More" button */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership & Contact Section */}
<div className="grid lg:grid-cols-2 gap-12 mb-16">
  {/* Benefits Column */}
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Partnership Benefits</h2>
    <p className="text-gray-500 mb-6">What you gain when you join our network</p>
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <FiCheck className="text-primary" />
          </div>
          <span className="text-gray-700">{benefit}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Become a Partner Column (Redesigned) */}
  <div className="bg-gradient-to-br from-primary to-blue-500 rounded-2xl p-8 text-white flex flex-col relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10"></div>

    <div className="relative z-10">
      <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
      <p className="text-white/90 leading-relaxed mb-6">
        Join our network of industry leaders and expand your reach while 
        delivering exceptional value to our shared professionals.
      </p>

      {/* Contact information as plain text (no buttons/links) */}
      <div className="border-t border-white/20 pt-6 mt-4">
        <p className="text-white/80 text-sm mb-2">Get in touch</p>
        <p className="text-white font-medium">partnerships@bidpole.com</p>
        <p className="text-white/70 text-sm mt-1">+1 (800) 123‑4567</p>
        <p className="text-white/70 text-sm mt-4">We welcome innovative collaborators across all industries.</p>
      </div>
    </div>
  </div>
</div>
      </div>

      <Footer />
    </div>
  );
};

export default Partners;