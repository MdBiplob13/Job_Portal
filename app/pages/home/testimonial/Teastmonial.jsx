"use client";

import { useState, useEffect } from "react";

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
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setFade(true); 
      }, 500); 
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20 text-center flex flex-col items-center justify-center min-h-[350px] bg-gradient-to-r from-blue-100 via-white to-indigo-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-xl font-bold text-blue-900 mb-12">
          What Our Clients Say
        </h2>

        {/* Animated block */}
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <p className="text-3xl text-gray-700 font-medium mb-6">
            <span className="text-4xl text-gray-500 font-serif">“</span>{" "}
            <span className="font-semibold text-gray-800">
              {testimonials[current].text}
            </span>{" "}
            <span className="text-4xl text-gray-500 font-serif">”</span>
          </p>
          <p className="text-gray-600 mt-6">
            <span className="font-semibold text-gray-800">
              {testimonials[current].author}
            </span>{" "}
            - {testimonials[current].company}
          </p>
        </div>
      </div>
    </section>
  );
}
