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
    <section className="relative py-20 bg-[#CFCFCF] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-7xl font-extrabold text-[#0443f2] mb-12">
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
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 md:p-12 relative"
            >
              <p className="text-xl md:text-2xl text-[#040404] font-medium leading-relaxed">
                <span className="text-5xl text-[#53cbfb] font-serif">"</span>{" "}
                {testimonials[current].text}{" "}
                <span className="text-5xl text-[#53cbfb] font-serif">"</span>
              </p>
              <div className="mt-8">
                <p className="text-lg font-semibold text-[#040404]">
                  {testimonials[current].author}
                </p>
                <p className="text-[#040404]">{testimonials[current].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === current
                    ? "bg-[#53cbfb] w-6"
                    : "bg-gray-400 hover:bg-[#53cbfb]"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}