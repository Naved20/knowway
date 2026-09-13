"use client";

import Link from "next/link";
import Image from "next/image";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight, ArrowRight, Compass, ChevronDown } from "lucide-react";

export default function LusionHeroOverlay() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-12 pointer-events-none">
      {/* Top Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono tracking-wider text-[#8B95A5] uppercase">
        <div className="flex items-center gap-2.5 lusion-tag px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg shadow-black/40">
          <div className="w-5 h-5 rounded-md overflow-hidden bg-black flex items-center justify-center">
            <Image
              src="/images/knowvy-logo.png"
              alt="Knowvy Mascot"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <span className="text-white font-bold tracking-widest">KNOWVY // 2.0</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#5A6475]">
          <span>Central India Dev Nexus</span>
          <span>•</span>
          <span>Bhopal, MP [23.2599° N, 77.4126° E]</span>
          <span>•</span>
          <span className="text-[#10B981]">1,500+ Active Builders</span>
        </div>
      </div>

      {/* Main Center-Left Headline Block */}
      <div className="max-w-3xl space-y-6 my-auto pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-[#8B5CF6]">
          <Compass className="w-3.5 h-3.5" />
          Interactive Student Technology Ecosystem
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[0.98] text-white">
          Where students <br />
          <span className="gradient-text-blue">build what’s next.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#8B95A5] max-w-xl font-body leading-relaxed">
          {brandData.supportingCopy}
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 pointer-events-auto">
          <Link
            href="/events"
            data-cursor="view"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-xl shadow-[#4D8DFF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Explore Flagship Events
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl lusion-glass text-white font-display font-semibold text-xs hover:border-[#4D8DFF]/50 transition-all flex items-center justify-center gap-2"
          >
            Join Knowvy Community
            <ArrowUpRight className="w-4 h-4 text-[#4D8DFF]" />
          </a>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#5A6475] uppercase tracking-wider pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-[#4D8DFF]" />
          <span>Scroll to dissect ecosystem core</span>
        </div>
        <div className="hidden sm:block">
          <span>WebGL 60FPS • Spatial Physics</span>
        </div>
      </div>
    </section>
  );
}
