import Link from "next/link";
import { opportunitiesData } from "@/data/knowvy-data";
import { Compass, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Opportunities Ecosystem — Knowvy",
  description:
    "Curated external developer opportunities across MLH, Unstop, Devpost, and Devfolio with mentorship support from Knowvy.",
};

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Compass className="w-3.5 h-3.5" />
            Global & National Builder Pathways
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Opportunities <span className="gradient-text-blue">Ecosystem.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            Knowvy connects student builders directly with world-class competitions, open-source fellowships, and grant programs. We provide team matching, project feedback, and pitch preparation.
          </p>
        </div>

        {/* Clear Boundary Notice */}
        <div className="p-4 rounded-xl bg-[#0D1118] border border-[#1C2430] flex items-start gap-3 text-xs text-[#8B95A5]">
          <ShieldCheck className="w-4 h-4 text-[#4D8DFF] flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Transparency Notice: </strong>
            These are curated external opportunities from verified partner platforms (MLH, Unstop, Devpost, Devfolio). Knowvy acts as your student preparation and team-formation layer.
          </span>
        </div>

        {/* Platform Deep-Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {opportunitiesData.map((plat) => (
            <div
              key={plat.id}
              className="p-8 rounded-2xl bg-[#0D1118] border border-[#1C2430] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider block">
                      {plat.badge}
                    </span>
                    <h2 className="text-2xl font-display font-bold text-white mt-1">
                      {plat.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/opportunities/${plat.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#111722] border border-[#1C2430] text-xs font-mono text-[#4D8DFF] hover:text-white transition-colors"
                    >
                      Guide
                    </Link>
                    <a
                      href={plat.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#161F2E] border border-[#1C2430] text-[#8B95A5] hover:text-white transition-colors"
                      title="Visit Platform"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-[#8B95A5] leading-relaxed">
                  {plat.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#1C2430]">
                  <span className="text-xs font-mono text-[#5A6475] uppercase block">
                    Curated Tracks & Sprints:
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-[#8B95A5]">
                    {plat.curatedTracks.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4D8DFF] flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#07090D] border border-[#1C2430] text-xs text-[#8B95A5]">
                <strong className="text-white block mb-1">Knowvy Support:</strong>
                {plat.knowvyGuidance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
