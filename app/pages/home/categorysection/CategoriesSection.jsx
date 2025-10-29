"use client";

import { motion } from "framer-motion";
import { FaGavel, FaCamera, FaBolt, FaShieldAlt, FaPhoneAlt, FaPaintBrush } from "react-icons/fa";

export default function CategoriesSection() {
  const categories = [
    { name: "Legal Service", image: "/legal-min.jpg", icon: <FaGavel /> },
    { name: "Photography", image: "/photography-min.jpg", icon: <FaCamera /> },
    { name: "Electrical", image: "/electrical-min.jpg", icon: <FaBolt /> },
    { name: "Security Service", image: "/security-min.jpg", icon: <FaShieldAlt /> },
    { name: "Telecommunication", image: "/telecommunication-min.jpg", icon: <FaPhoneAlt /> },
    { name: "Beauty & Styling", image: "/makeup-min.jpg", icon: <FaPaintBrush /> },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-tr from-[#0443F2]/10 via-white to-[#53CBFB]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-8xl font-extrabold text-[#040404] mb-6"
          >
            Explore Popular <span className="text-[#53CBFB]">Categories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-[#040404] mt-3 font-medium"
          >
            Find services that fit your needs from our wide range of categories.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl bg-white cursor-pointer border-2 border-transparent hover:border-[#53CBFB]"
            >
              {/* Background Image */}
              <div className="h-64 w-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/50 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

              {/* Icon + Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="text-[#53CBFB] text-5xl mb-4 opacity-90 group-hover:opacity-100 transition duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-white font-bold text-2xl group-hover:text-[#53CBFB] transition-colors duration-300 mb-3">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-lg mt-2 opacity-0 group-hover:opacity-100 transition duration-500 font-medium">
                  Discover top-notch {cat.name.toLowerCase()} services tailored for you.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-20"
        >
          <button className="relative px-12 py-4 rounded-xl font-bold text-[#53CBFB] border-2 border-[#53CBFB] overflow-hidden group text-xl hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Browse All Categories
            </span>
            <span className="absolute inset-0 bg-[#53CBFB] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}