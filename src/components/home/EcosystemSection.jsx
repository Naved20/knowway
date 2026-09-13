"use client";

import dynamic from "next/dynamic";
import { Network } from "lucide-react";

const EcosystemScene = dynamic(() => import("@/components/three/EcosystemScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
    </div>
  ),
});

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-[#F8FAFC] relative border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600">
            <Network className="w-3.5 h-3.5" />
            Signature Architecture
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            The Knowvy <span className="gradient-text-blue">Ecosystem.</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            A self-sustaining technology universe engineered for student builders. Each node represents an active pathway to build, learn, collaborate, and launch.
          </p>
        </div>

        {/* 3D WebGL Ecosystem Interactive Canvas */}
        <EcosystemScene />
      </div>
    </section>
  );
}
