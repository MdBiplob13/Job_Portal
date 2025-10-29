"use client";
import { FaRegFileAlt } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { motion } from "framer-motion";

export default function StepSection() {
  const steps = [
    {
      icon: <FaRegFileAlt className="w-10 h-10" />,
      title: "Post",
      desc: "Create and publish your job requirements to attract qualified professionals and service providers.",
    },
    {
      icon: <FaGavel className="w-10 h-10" />,
      title: "Bid",
      desc: "Receive competitive offers and proposals from multiple providers vying for your project.",
    },
    {
      icon: <MdOutlineEmojiEvents className="w-10 h-10" />,
      title: "Win",
      desc: "Select the best provider and successfully complete your project with guaranteed satisfaction.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#CFCFCF]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Heading */}
        <h2 className="text-3xl md:text-7xl font-extrabold text-[#040404] mb-10">
          How It <span className="text-[#53cbfb]">Works</span>
        </h2>
        <p className="text-[#040404] max-w-2xl mx-auto mb-14 text-[20px]">
          A streamlined process to post jobs, receive bids, and win with the perfect provider—all in one platform.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative"
            >
              
              {/* Icon container */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#53cbfb] to-[#0443f2] text-white mb-6 group-hover:scale-110 transform transition-transform duration-500 shadow-lg">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#040404] mb-4 group-hover:text-[#53cbfb] transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#040404] leading-relaxed">
                {step.desc}
              </p>

              {/* Decorative hover effect */}
              <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#53cbfb]/20 transition-colors duration-500 pointer-events-none"></span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}