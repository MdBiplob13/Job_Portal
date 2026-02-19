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
    <section className="relative py-16 bg-linear-to-br from-[#53CBFB] to-[#0443F2] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10">
          What Our Clients Say
        </h2>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8 md:p-10 relative border border-white/20"
            >
              <p className="text-lg md:text-xl text-[#040404] font-medium leading-relaxed">
                <span className="text-4xl text-[#53CBFB] font-serif">"</span>{" "}
                {testimonials[current].text}{" "}
                <span className="text-4xl text-[#53CBFB] font-serif">"</span>
              </p>
              <div className="mt-6">
                <p className="text-xl font-bold text-[#0443F2]">
                  {testimonials[current].author}
                </p>
                <p className="text-base text-[#040404] mt-1">{testimonials[current].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white w-3"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}