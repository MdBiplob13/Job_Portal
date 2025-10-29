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
    <section className="w-full py-20 bg-[#CFCFCF]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-7xl font-extrabold text-[#040404]"
          >
            Explore Popular <span className="text-[#53cbfb]">Categories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#040404] mt-3 text-[20px]"
          >
            Find services that fit your needs from our wide range of categories.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-md cursor-pointer"
            >
              {/* Background Image */}
              <div className="h-56 w-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>

              {/* Icon + Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="text-[#53cbfb] text-4xl mb-3 opacity-80 group-hover:opacity-100 transition duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-white font-semibold text-lg group-hover:text-[#53cbfb] transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transition duration-500">
                  Discover top-notch {cat.name.toLowerCase()} services tailored for you.
                </p>
              </div>

              {/* Glow Border Effect */}
              <span className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#53cbfb] group-hover:shadow-[0_0_15px_rgba(83,203,251,0.6)] transition duration-500"></span>
            </motion.div>
          ))}
        </div>

        {/* Browse Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <button className="relative px-10 py-3 rounded-full font-medium text-[#53cbfb] border border-[#53cbfb] overflow-hidden group">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Browse All Categories
            </span>
            <span className="absolute inset-0 bg-[#53cbfb] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}