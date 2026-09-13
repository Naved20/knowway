"use client";

import { useState } from "react";
import { brandData } from "@/data/knowvy-data";
import { BookOpen, Hammer, Network, Sparkles, CheckCircle2 } from "lucide-react";

const PILLAR_ICONS = {
  "student-community": Network,
  "learning-programs": BookOpen,
  "hackathons-events": Hammer,
};

export default function AboutSection() {
  const [activePillar, setActivePillar] = useState(brandData.pillars[0]?.id || "student-community");

  return (
    <section className="py-24 bg-white relative overflow-hidden text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Typography & Visual Narrative */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              The Knowvy Philosophy
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              More than <br />
              <span className="gradient-text-blue">a club.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Traditional college clubs stop at occasional webinars. Knowvy was built from the ground up in Bhopal as a continuous developer acceleration engine.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block">
                The Builder Funnel:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                <span className="text-slate-900 font-semibold">Students</span>
                <span>→</span>
                <span className="text-slate-900 font-semibold">Community</span>
                <span>→</span>
                <span className="text-slate-900 font-semibold">Learning</span>
                <span>→</span>
                <span className="text-slate-900 font-semibold">Building</span>
                <span>→</span>
                <span className="text-blue-600 font-bold">Opportunities</span>
                <span>→</span>
                <span className="text-purple-600 font-bold">Growth</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Interactive Pillars (Learn, Build, Connect) */}
          <div className="lg:col-span-7 space-y-4">
            {brandData.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id] || Sparkles;
              const isSelected = activePillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setActivePillar(pillar.id)}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`cursor-pointer p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-xs ${
                    isSelected
                      ? "bg-blue-50/40 border-blue-400/80 shadow-md scale-[1.01]"
                      : "bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-110"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-display font-bold text-slate-900">
                          {pillar.title}
                        </h3>
                        <span className="text-xs font-mono text-purple-600 font-medium">
                          {pillar.subtitle}
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Pillar tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {pillar.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                              isSelected
                                ? "bg-blue-100 text-blue-700 border border-blue-200 font-semibold"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-blue-600" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
