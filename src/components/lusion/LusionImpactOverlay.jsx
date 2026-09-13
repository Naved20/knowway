"use client";

import { Milestone, Globe2, ShieldCheck } from "lucide-react";
import { partnersData } from "@/data/knowvy-data";

export default function LusionImpactOverlay() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-28 px-4 sm:px-6 lg:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-[#8B5CF6]">
            <Milestone className="w-3.5 h-3.5" />
            Act V // Galactic Expansion
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
            From Bhopal roots <br />
            <span className="gradient-text-violet">to nationwide scale.</span>
          </h2>

          <p className="text-base text-[#8B95A5] leading-relaxed">
            The 3D network expands into an 80+ node galactic constellation. Tracking real outcomes: hackathon wins, open-source PRs, and student tech chapters.
          </p>
        </div>

        {/* 4 Milestone Progression Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
          {[
            {
              phase: "01",
              title: "Bhopal Genesis",
              loc: "City Hub",
              detail: "Founded by student builders to solve the academic-industry disconnect.",
            },
            {
              phase: "02",
              title: "15+ Campuses",
              loc: "MANIT, RGPV, LNCT",
              detail: "Weekly study jams, Git masterclasses, and on-ground developer meetups.",
            },
            {
              phase: "03",
              title: "10+ Cities",
              loc: "Central India Hubs",
              detail: "Regional hackathon caravans and hybrid cloud deployment sprints.",
            },
            {
              phase: "04",
              title: "1,500+ Builders",
              loc: "National Ecosystem",
              detail: "3 National Hackathons, 150+ PRs merged, and direct startup incubation.",
            },
          ].map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl lusion-glass border border-white/5 space-y-2 hover:border-[#8B5CF6]/50 transition-colors"
            >
              <span className="text-xs font-mono text-[#8B5CF6] font-bold block">
                PHASE // {m.phase}
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                {m.title}
              </h3>
              <span className="text-xs font-mono text-[#4D8DFF] block">
                {m.loc}
              </span>
              <p className="text-xs text-[#8B95A5] leading-relaxed pt-1">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Ecosystem Partners Bar */}
        <div className="p-6 rounded-2xl lusion-glass border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3 text-xs font-mono text-[#8B95A5]">
            <Globe2 className="w-4 h-4 text-[#4D8DFF]" />
            <span>Verified Ecosystem Affiliates:</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/90">
            {partnersData.map((p, pIdx) => (
              <span key={pIdx} className="flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
