"use client";
import { FaRegFileAlt } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { motion } from "framer-motion";

export default function StepSection() {
  const steps = [
    {
      icon: <FaRegFileAlt className="w-12 h-12" />,
      title: "Post",
      desc: "Create and publish your job requirements to attract qualified professionals and service providers.",
    },
    {
      icon: <FaGavel className="w-12 h-12" />,
      title: "Bid",
      desc: "Receive competitive offers and proposals from multiple providers vying for your project.",
    },
    {
      icon: <MdOutlineEmojiEvents className="w-12 h-12" />,
      title: "Win",
      desc: "Select the best provider and successfully complete your project with guaranteed satisfaction.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#CFCFCF] to-[#53CBFB]/30">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Heading */}
        <h2 className="text-5xl md:text-8xl font-extrabold text-[#040404] mb-8">
          How It <span className="text-[#53CBFB]">Works</span>
        </h2>
        <p className="text-2xl text-[#040404] max-w-3xl mx-auto mb-16 font-medium">
          A streamlined process to post jobs, receive bids, and win with the perfect provider—all in one platform.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center p-10 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 relative border-2 border-transparent hover:border-[#53CBFB]"
            >
              
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0443F2] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                {idx + 1}
              </div>

              {/* Icon container */}
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-[#53CBFB] to-[#0443F2] text-white mb-8 group-hover:scale-110 transform transition-transform duration-500 shadow-xl">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[#040404] mb-6 group-hover:text-[#53CBFB] transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xl text-[#040404] leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}