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
      prev === 0 ? testimonialsData.length - 1 : prev + 1
    );
  };

  const t = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-transparent border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
            <Quote className="w-3.5 h-3.5" />
            Builder Voices
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Built with and for the community.
          </h2>
        </div>

        {/* Testimonial Presentation Card */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between min-h-[300px]">
          <Quote className="w-10 h-10 text-blue-500/30 mb-6" />

          <p className="text-lg sm:text-xl text-slate-800 leading-relaxed font-body italic mb-8">
            "{t.quote}"
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <div>
              <h4 className="text-base font-display font-bold text-slate-900">
                {t.author}
              </h4>
              <p className="text-xs font-mono text-purple-600 font-medium">
                {t.role} • {t.college}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={prev}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all cursor-pointer shadow-xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-500 font-medium">
                0{currentIndex + 1} / 0{testimonialsData.length}
              </span>
              <button
                onClick={next}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-blue-500 transition-all cursor-pointer shadow-xs"
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
