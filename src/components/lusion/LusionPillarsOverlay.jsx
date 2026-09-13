"use client";

import { brandData } from "@/data/knowvy-data";
import { BookOpen, Hammer, Network, Sparkles, CheckCircle2 } from "lucide-react";

export default function LusionPillarsOverlay() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-28 px-4 sm:px-6 lg:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Headline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-[#4D8DFF]">
            <Sparkles className="w-3.5 h-3.5" />
            Act II // The Internal Engine
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            More than a club. <br />
            <span className="gradient-text-blue">An acceleration engine.</span>
          </h2>

          <p className="text-base text-[#8B95A5] leading-relaxed">
            As you scroll closer to the core, the outer cage unfolds. Knowvy bridges the gap between passive academic lectures and production engineering reality.
          </p>

          {/* Telemetry Stats Strip */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {brandData.stats.map((st, i) => (
              <div key={i} className="p-4 rounded-xl lusion-glass border border-white/5 space-y-1">
                <span className="text-2xl sm:text-3xl font-display font-black text-white block">
                  {st.value.toLocaleString()}{st.suffix}
                </span>
                <span className="text-[11px] font-mono text-[#8B5CF6] uppercase block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3 Frosted Glass HUD Cards */}
        <div className="lg:col-span-7 space-y-4 pointer-events-auto">
          {brandData.pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-6 sm:p-7 rounded-2xl lusion-glass border border-white/5 hover:border-[#4D8DFF]/40 transition-all duration-300 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#4D8DFF] font-bold">
                    0{idx + 1} //
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8B5CF6]">
                  {pillar.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#8B95A5] leading-relaxed">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {pillar.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-[#8B95A5] bg-black/40 border border-white/5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#4D8DFF]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
