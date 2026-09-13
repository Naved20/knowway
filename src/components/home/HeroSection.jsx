"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { brandData } from "@/data/knowvy-data";

// Dynamically load Three.js scene to keep initial HTML bundle tiny and performant
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#4D8DFF]/20 border-t-[#4D8DFF] animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#F8FAFC]">
      {/* Light Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-100/50 via-violet-100/30 to-transparent blur-3xl opacity-70" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-tech-grid opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span className="text-slate-900 font-semibold">Knowvy 2.0</span>
              <span className="text-slate-400">•</span>
              <span>Central India's Student Tech Ecosystem</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Where students <br className="hidden sm:inline" />
              <span className="gradient-text-blue">build what’s next.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
              {brandData.supportingCopy}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/events"
                data-cursor="view"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 text-white font-display font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Explore Events
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-display font-semibold text-sm hover:border-blue-400 hover:text-blue-600 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                Join Knowvy
                <span className="text-xs font-mono text-violet-600 font-medium">1.5k+ Members</span>
              </a>
            </div>

            {/* Quick Metrics / Signals */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-600" />
                <span>3 National Hackathons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <span>Bhopal Genesis</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Knowvy Ecosystem Object */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
}
