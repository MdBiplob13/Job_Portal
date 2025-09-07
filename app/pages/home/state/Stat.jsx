// app/components/Stats.jsx
"use client";
import { useEffect, useState } from "react";

function Counter({ target, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = end / (duration / 16); // approx 60fps
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
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const section = document.getElementById("stats");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="stats" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-blue-600">
            {visible ? <Counter target={30000} duration={2000} /> : 0}+
          </h3>
          <p className="mt-2 text-gray-600 text-sm">Total Jobs</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-blue-600">
            {visible ? <Counter target={1650} duration={2000} /> : 0}
          </h3>
          <p className="mt-2 text-gray-600 text-sm">Member Agency Jobs</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-blue-600">
            {visible ? <Counter target={22000} duration={2000} /> : 0}+
          </h3>
          <p className="mt-2 text-gray-600 text-sm">State & Local Jobs</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold text-blue-600">
            {visible ? <Counter target={6351} duration={2000} /> : 0}
          </h3>
          <p className="mt-2 text-gray-600 text-sm">Federal Jobs</p>
        </div>
      </div>
    </section>
  );
}
