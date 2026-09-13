import Link from "next/link";
import { opportunitiesData } from "@/data/knowvy-data";
import { ArrowUpRight, Compass, CheckCircle2, ShieldCheck } from "lucide-react";

export default function OpportunitiesSection() {
  return (
    <section className="py-24 bg-[#07090D] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
              <Compass className="w-3.5 h-3.5" />
              Ecosystem Launchpad
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Find your next <span className="gradient-text-blue">opportunity.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5] max-w-2xl">
              We curate verified national and global developer pathways. Distinct from internal Knowvy programs, these platforms offer global grants, fellowships, and enterprise hackathons.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-sm font-semibold text-white hover:border-[#4D8DFF] hover:text-[#4D8DFF] transition-all w-fit"
          >
            Explore Opportunities Hub
            <ArrowUpRight className="w-4 h-4 text-[#4D8DFF]" />
          </Link>
        </div>

        {/* 4 Interactive Opportunity Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunitiesData.map((platform) => (
            <div
              key={platform.id}
              className="p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/40 hover:bg-[#111722] transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#8B5CF6] uppercase tracking-wider block">
                      {platform.badge}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors mt-0.5">
                      {platform.name}
                    </h3>
                  </div>
                  <a
                    href={platform.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#161F2E] border border-[#1C2430] text-[#8B95A5] group-hover:text-white group-hover:border-[#4D8DFF]/50 transition-colors"
                    title={`Visit ${platform.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-sm text-[#8B95A5] leading-relaxed">
                  {platform.description}
                </p>

                {/* Curated Tracks */}
                <div className="space-y-2 pt-2 border-t border-[#1C2430]">
                  <span className="text-xs font-mono text-[#5A6475] uppercase block">
                    Curated Pathways:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#8B95A5] font-mono">
                    {platform.curatedTracks.map((track, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4D8DFF] flex-shrink-0" />
                        <span className="truncate">{track}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Knowvy Mentorship Layer */}
              <div className="p-3.5 rounded-xl bg-[#07090D] border border-[#1C2430] flex items-start gap-2.5 text-xs text-[#8B95A5]">
                <ShieldCheck className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Knowvy Support: </strong>
                  {platform.knowvyGuidance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
