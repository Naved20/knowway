"use client";

import dynamic from "next/dynamic";
import { Milestone } from "lucide-react";

const ImpactScene = dynamic(() => import("@/components/three/ImpactScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-violet-200 border-t-violet-600 animate-spin" />
    </div>
  ),
});

export default function ImpactStorySection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-mono text-violet-600">
            <Milestone className="w-3.5 h-3.5" />
            Milestone Storytelling
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            From participation <br />
            <span className="gradient-text-blue">to outcomes.</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Trace the abstract growth of Knowvy: from a small group of ambitious student builders in Bhopal to a collaborative collegiate network spanning campuses and cities.
          </p>
        </div>

        {/* 3D Impact Progression Visualizer */}
        <ImpactScene />
      </div>
    </section>
  );
}
