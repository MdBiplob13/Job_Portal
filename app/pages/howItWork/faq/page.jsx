// pages/faq.jsx
"use client";
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = {
    general: {
      title: "General Questions",
      icon: "💼"
    },
    jobSeekers: {
      title: "For Job Seekers",
      icon: "👤"
    },
    employers: {
      title: "For Employers",
      icon: "🏢"
    },
    bidding: {
      title: "Bidding & Tenders",
      icon: "💰"
    }
  };

  const faqs = {
    general: [
      {
        question: "What is JobPole?",
        answer: "JobPole is a comprehensive platform that connects job seekers with employers through advanced matching algorithms, bidding systems, and career development tools."
      },
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign Up' button in the top navigation, fill in your details, verify your email, and you're ready to start your journey with JobPole."
      },
      {
        question: "Is JobPole free to use?",
        answer: "Yes, basic features are free for job seekers. Employers can post jobs with our free plan or upgrade for premium features and enhanced visibility."
      }
    ],
    jobSeekers: [
      {
        question: "How do I search for jobs?",
        answer: "Use our advanced search filters to find jobs by location, salary, experience level, and keywords. You can also set up job alerts for new opportunities."
      },
      {
        question: "How do I apply for jobs?",
        answer: "Create a complete profile, then click 'Apply' on any job posting. Some jobs may require additional questions or portfolio submissions."
      },
      {
        question: "Can I track my applications?",
        answer: "Yes, your dashboard shows all applications with status updates, interview invitations, and employer responses in one place."
      }
    ],
    employers: [
      {
        question: "How do I post a job?",
        answer: "Register as an employer, complete your company profile, then click 'Post a Job' to create your listing with detailed requirements and preferences."
      },
      {
        question: "What's the bidding system?",
        answer: "Our bidding system allows service providers to submit proposals for your projects, helping you find the best talent at competitive rates."
      },
      {
        question: "How do I review applicants?",
        answer: "Access your employer dashboard to view all applications, filter candidates, schedule interviews, and manage the entire hiring process."
      }
    ],
    bidding: [
      {
        question: "How does the bidding process work?",
        answer: "Employers post projects, service providers submit bids with proposals and pricing, employers review bids and select the best match for their needs."
      },
      {
        question: "What makes a good bid?",
        answer: "A good bid includes clear pricing, detailed project understanding, relevant experience examples, realistic timelines, and professional presentation."
      },
      {
        question: "Are there bidding fees?",
        answer: "No, submitting bids is free for verified service providers. We only charge success fees when projects are successfully awarded and completed."
      }
    ]
  };

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, items]) => {
    if (category === activeCategory) {
      const filtered = items.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about JobPole and how to make the most of our platform.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeCategory === key
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {categories[activeCategory].title}
          </h2>
          
          {filteredFaqs[activeCategory]?.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs[activeCategory].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                    {openItems.includes(index) ? (
                      <FiChevronUp className="text-primary flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="text-primary flex-shrink-0" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="p-6 pt-0 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Our support team is here to help you with any additional questions or concerns.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;