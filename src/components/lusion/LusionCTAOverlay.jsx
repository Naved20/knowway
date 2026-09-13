"use client";

import Link from "next/link";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight, ArrowRight, MessageSquareCode, Sparkles } from "lucide-react";

export default function LusionCTAOverlay() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-28 px-4 sm:px-6 lg:px-12 text-center pointer-events-none">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-[#4D8DFF]">
          <MessageSquareCode className="w-3.5 h-3.5" />
          Act VI // The Final Horizon
        </div>

        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[0.98]">
          Your next project <br />
          <span className="gradient-text-blue">could start here.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#8B95A5] max-w-xl mx-auto leading-relaxed">
          Join 2,000+ student builders, creators, and founders across Bhopal and India who are shipping real software, winning national hackathons, and unlocking career opportunities.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto">
          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-xl shadow-[#4D8DFF]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Join Knowvy Community
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl lusion-glass text-white font-display font-semibold text-xs hover:border-[#4D8DFF]/50 transition-all flex items-center justify-center gap-2"
          >
            Explore Events
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl lusion-tag text-[#8B95A5] hover:text-white transition-all text-xs font-display font-semibold flex items-center justify-center gap-2"
          >
            Partner with Knowvy
          </Link>
        </div>

        {/* Telemetry Geolocation Badge */}
        <div className="pt-8 text-xs font-mono text-[#5A6475] flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Founded in Bhopal, Madhya Pradesh, India • Growing Nationwide</span>
        </div>
      </div>
    </section>
  );
}
