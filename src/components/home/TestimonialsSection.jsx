"use client";

import { useState } from "react";
import { testimonialsData } from "@/data/knowvy-data";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const t = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-[#07090D] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Quote className="w-3.5 h-3.5" />
            Builder Voices
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Built with and for the community.
          </h2>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#0D1118] border border-[#1C2430] shadow-2xl flex flex-col justify-between min-h-[300px]">
          <Quote className="w-10 h-10 text-[#4D8DFF]/30 mb-6" />

          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-body italic mb-8">
            "{t.quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1C2430]">
            <div>
              <h4 className="text-base font-display font-bold text-white">
                {t.author}
              </h4>
              <p className="text-xs font-mono text-[#8B5CF6]">
                {t.role} • {t.college}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={prev}
                className="p-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-white hover:border-[#4D8DFF] transition-all"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#5A6475]">
                0{currentIndex + 1} / 0{testimonialsData.length}
              </span>
              <button
                onClick={next}
                className="p-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-white hover:border-[#4D8DFF] transition-all"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
