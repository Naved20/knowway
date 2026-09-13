"use client";

import { useEffect, useRef, useState } from "react";
import { brandData } from "@/data/knowvy-data";

function CountUpNumber({ endValue, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * endValue));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [endValue, duration, hasAnimated]);

  return (
    <span ref={ref} className="font-display font-black">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16 bg-[#07090D] border-y border-[#1C2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {brandData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-6 sm:p-8 rounded-2xl bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/40 hover:bg-[#111722] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#4D8DFF]/5"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#1C2430] to-transparent group-hover:via-[#4D8DFF] transition-all duration-300" />

              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white group-hover:text-[#4D8DFF] transition-colors">
                  <CountUpNumber endValue={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-sm sm:text-base font-display font-bold text-white">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#8B95A5] leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
