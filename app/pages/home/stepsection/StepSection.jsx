"use client";
import { FaRegFileAlt } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { motion } from "framer-motion";

export default function StepSection() {
  const steps = [
    {
      icon: <FaRegFileAlt className="w-16 h-16" />,
      title: "Post",
      desc:
        "Create and publish your job requirements to attract qualified professionals and service employers.",
    },
    {
      icon: <FaGavel className="w-16 h-16" />,
      title: "Bid",
      desc:
        "Attract competitive offers and proposals from multiple qualified providers seeking to deliver your project.",
    },
    {
      icon: <MdOutlineEmojiEvents className="w-16 h-16" />,
      title: "Win",
      desc: "Choose the right candidate to deliver your project successfully.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            How It <span className="text-[#53CBFB]">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Three simple steps to connect with the right talent or land your next project.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center cursor-pointer h-80 overflow-hidden"
            >
              {/* Step Number Badge */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-[#0443F2] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">
                {idx + 1}
              </div>

              {/* Content container */}
              <div className="flex flex-col items-center justify-center h-full w-full transition-all duration-500 group-hover:-translate-y-5">
                {/* Icon */}
                <div className="text-[#0443F2] mb-3 transition-all duration-500 group-hover:scale-75 group-hover:opacity-80">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 transition-all duration-500 group-hover:scale-75 group-hover:opacity-80">
                  {step.title}
                </h3>
              </div>

              {/* Description (slides up on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-white via-white to-transparent">
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}