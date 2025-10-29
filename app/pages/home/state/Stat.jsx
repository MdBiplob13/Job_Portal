"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaBuilding, FaLandmark, FaUniversity } from "react-icons/fa";

function Counter({ target, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16);
    let frame;

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(step);
      } else {
        setCount(end);
        cancelAnimationFrame(frame);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Stats() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    const section = document.getElementById("stats");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const stats = [
    {
      label: "Total Jobs",
      target: 30000,
      icon: <FaBriefcase />,
      suffix: "+",
    },
    {
      label: "Member Agency Jobs",
      target: 1650,
      icon: <FaBuilding />,
      suffix: "",
    },
    {
      label: "State & Local Jobs",
      target: 22000,
      icon: <FaLandmark />,
      suffix: "+",
    },
    {
      label: "Federal Jobs",
      target: 6351,
      icon: <FaUniversity />,
      suffix: "",
    },
  ];

  return (
    <section id="stats" className="py-24 bg-gradient-to-t from-[#CFCFCF] to-[#0443F2]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-[#53CBFB]/20 hover:border-[#53CBFB] hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#53CBFB]/20 to-transparent opacity-50 group-hover:opacity-80 transition"></div>

            {/* Icon */}
            <div className="relative z-10 flex justify-center mb-6 text-[#53CBFB] text-5xl">
              {stat.icon}
            </div>

            {/* Counter */}
            <h3 className="relative z-10 text-5xl font-extrabold text-[#0443F2] mb-4">
              {visible ? <Counter target={stat.target} duration={2000} /> : 0}
              {stat.suffix}
            </h3>

            {/* Label */}
            <p className="relative z-10 text-xl text-[#040404] font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}