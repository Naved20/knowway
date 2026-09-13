"use client";

import dynamic from "next/dynamic";
import { Milestone } from "lucide-react";

const ImpactScene = dynamic(() => import("@/components/three/ImpactScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] rounded-2xl bg-[#0D1118] border border-[#1C2430] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
    </div>
  ),
});

export default function ImpactStorySection() {
  return (
    <section className="py-24 bg-[#07090D] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Milestone className="w-3.5 h-3.5" />
            Milestone Storytelling
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            From participation <br />
            <span className="gradient-text-blue">to outcomes.</span>
          </h2>

          <p className="text-base text-[#8B95A5] leading-relaxed">
            Trace the abstract growth of Knowvy: from a small group of ambitious student builders in Bhopal to a collaborative collegiate network spanning campuses and cities.
          </p>
        </div>

        {/* 3D Impact Progression Visualizer */}
        <ImpactScene />
      </div>
    </section>
  );
}
