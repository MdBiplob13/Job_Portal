"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "bidnet direct is an exceptionally well-designed system and very easy to use. The bid notifications are very helpful, and we appreciate having the ability to use it.",
    author: "Kären Siwek",
    company: "Brown & Brown Insurance",
  },
  {
    text: "This platform has simplified our process tremendously. The alerts keep us informed and save us a lot of time.",
    author: "Michael Johnson",
    company: "Tech Solutions Inc.",
  },
  {
    text: "I love how intuitive and efficient the system is. It's a must-have tool for our daily work.",
    author: "Sophia Lee",
    company: "Creative Agency",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#53CBFB] to-[#0443F2] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-8xl font-extrabold text-white mb-16">
          What Our Clients Say
        </h2>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-12 md:p-16 relative border-2 border-white/20"
            >
              <p className="text-2xl md:text-3xl text-[#040404] font-medium leading-relaxed">
                <span className="text-6xl text-[#53CBFB] font-serif">"</span>{" "}
                {testimonials[current].text}{" "}
                <span className="text-6xl text-[#53CBFB] font-serif">"</span>
              </p>
              <div className="mt-12">
                <p className="text-2xl font-bold text-[#0443F2]">
                  {testimonials[current].author}
                </p>
                <p className="text-xl text-[#040404] mt-2">{testimonials[current].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}