import Link from "next/link";
import { opportunitiesData } from "@/data/knowvy-data";
import { ArrowUpRight, Compass, CheckCircle2, ShieldCheck } from "lucide-react";

export default function OpportunitiesSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              Ecosystem Launchpad
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Find your next <span className="gradient-text-blue">opportunity.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              We curate verified national and global developer pathways. Distinct from internal Knowvy programs, these platforms offer global grants, fellowships, and enterprise hackathons.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-600 shadow-xs transition-all w-fit"
          >
            Explore Opportunities Hub
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>

        {/* 4 Interactive Opportunity Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunitiesData.map((platform) => (
            <div
              key={platform.id}
              className="p-7 rounded-2xl bg-slate-50/60 border border-slate-200 hover:border-blue-400/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-purple-600 uppercase tracking-wider block font-semibold">
                      {platform.badge}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                      {platform.name}
                    </h3>
                  </div>
                  <a
                    href={platform.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:text-blue-600 group-hover:border-blue-300 shadow-xs transition-colors"
                    title={`Visit ${platform.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {platform.description}
                </p>

                {/* Curated Tracks */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-xs font-mono text-slate-500 uppercase block font-medium">
                    Curated Pathways:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-mono">
                    {platform.curatedTracks.map((track, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{track}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Knowvy Mentorship Layer */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Knowvy Support: </strong>
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
