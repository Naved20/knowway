"use client";

import dynamic from "next/dynamic";
import { Network } from "lucide-react";

const EcosystemScene = dynamic(() => import("@/components/three/EcosystemScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-[#0D1118] border border-[#1C2430] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#4D8DFF]/20 border-t-[#4D8DFF] animate-spin" />
    </div>
  ),
});

export default function EcosystemSection() {
  return (
    <section className="py-24 bg-[#07090D] relative border-t border-[#1C2430] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Network className="w-3.5 h-3.5" />
            Signature Architecture
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The Knowvy <span className="gradient-text-blue">Ecosystem.</span>
          </h2>

          <p className="text-base text-[#8B95A5] leading-relaxed">
            A self-sustaining technology universe engineered for student builders. Each node represents an active pathway to build, learn, collaborate, and launch.
          </p>
        </div>

        {/* 3D WebGL Ecosystem Interactive Canvas */}
        <EcosystemScene />
      </div>
    </section>
  );
}
