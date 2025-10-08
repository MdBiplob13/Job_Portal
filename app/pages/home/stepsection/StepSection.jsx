"use client";
import { FaRegFileAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { MdOutlineTaskAlt } from "react-icons/md";
import { motion } from "framer-motion";

export default function StepSection() {
  const steps = [
    {
      icon: <FaRegFileAlt className="w-10 h-10" />,
      title: "Post Jobs",
      desc: "Quickly publish job details and requirements to reach the right professionals.",
    },
    {
      icon: <HiOutlineDocumentText className="w-10 h-10" />,
      title: "Get Bids",
      desc: "Receive competitive offers from multiple providers instantly.",
    },
    {
      icon: <MdOutlinePersonSearch className="w-10 h-10" />,
      title: "Select Provider",
      desc: "Compare providers, check reviews, and select the perfect match.",
    },
    {
      icon: <MdOutlineTaskAlt className="w-10 h-10" />,
      title: "Complete Jobs",
      desc: "Track progress and complete your job with satisfaction guaranteed.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-blue-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          Let's make thing <span className="text-blue-600">easily</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          A simple and efficient process designed to save your time and connect you with the right providers.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 relative"
            >
              {/* Icon container */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white mb-6 group-hover:scale-110 transform transition-transform duration-500 shadow-lg">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Decorative hover effect */}
              <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-200 transition-colors duration-500 pointer-events-none"></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
