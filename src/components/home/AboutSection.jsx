"use client";

import { useState } from "react";
import { brandData } from "@/data/knowvy-data";
import { BookOpen, Hammer, Network, Sparkles, CheckCircle2 } from "lucide-react";

const PILLAR_ICONS = {
  learn: BookOpen,
  build: Hammer,
  connect: Network,
};

export default function AboutSection() {
  const [activePillar, setActivePillar] = useState(brandData.pillars[0].id);

  return (
    <section className="py-24 bg-[#07090D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Typography & Visual Narrative */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
              <Sparkles className="w-3.5 h-3.5" />
              The Knowvy Philosophy
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              More than <br />
              <span className="gradient-text-blue">a club.</span>
            </h2>

            <p className="text-base text-[#8B95A5] leading-relaxed">
              Traditional college clubs stop at occasional webinars. Knowvy was built from the ground up in Bhopal as a continuous developer acceleration engine.
            </p>

            <div className="p-5 rounded-2xl bg-[#0D1118] border border-[#1C2430] space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#4D8DFF] font-bold block">
                The Builder Funnel:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#8B95A5]">
                <span className="text-white font-semibold">Students</span>
                <span>→</span>
                <span className="text-white font-semibold">Community</span>
                <span>→</span>
                <span className="text-white font-semibold">Learning</span>
                <span>→</span>
                <span className="text-white font-semibold">Building</span>
                <span>→</span>
                <span className="text-[#4D8DFF] font-bold">Opportunities</span>
                <span>→</span>
                <span className="text-[#8B5CF6] font-bold">Growth</span>
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
                  className={`cursor-pointer p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#111722] border-[#4D8DFF]/50 shadow-xl shadow-[#4D8DFF]/10 scale-[1.01]"
                      : "bg-[#0D1118]/80 border-[#1C2430] hover:bg-[#111722]/60 hover:border-[#1C2430]"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? "bg-[#4D8DFF] text-white shadow-md shadow-[#4D8DFF]/30 scale-110"
                          : "bg-[#161F2E] text-[#8B95A5]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-display font-bold text-white">
                          {pillar.title}
                        </h3>
                        <span className="text-xs font-mono text-[#8B5CF6]">
                          {pillar.subtitle}
                        </span>
                      </div>

                      <p className="text-[#8B95A5] text-sm leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Pillar tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {pillar.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                              isSelected
                                ? "bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/30"
                                : "bg-[#07090D] text-[#5A6475] border border-[#1C2430]"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
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
