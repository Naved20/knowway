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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            Global & National Builder Pathways
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
            Opportunities <span className="gradient-text-blue">Ecosystem.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Knowvy connects student builders directly with world-class competitions, open-source fellowships, and grant programs. We provide team matching, project feedback, and pitch preparation.
          </p>
        </div>

        {/* Clear Boundary Notice */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 text-xs text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-900">Transparency Notice: </strong>
            These are curated external opportunities from verified partner platforms (MLH, Unstop, Devpost, Devfolio). Knowvy acts as your student preparation and team-formation layer.
          </span>
        </div>

        {/* Platform Deep-Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {opportunitiesData.map((plat) => (
            <div
              key={plat.id}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xs"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-purple-600 uppercase tracking-wider block font-semibold">
                      {plat.badge}
                    </span>
                    <h2 className="text-2xl font-display font-bold text-slate-900 mt-1">
                      {plat.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/opportunities/${plat.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 hover:bg-blue-100 font-semibold transition-colors"
                    >
                      Guide
                    </Link>
                    <a
                      href={plat.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs transition-colors"
                      title="Visit Platform"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {plat.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-xs font-mono text-slate-500 uppercase block font-medium">
                    Curated Tracks & Sprints:
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-slate-600">
                    {plat.curatedTracks.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 shadow-xs">
                <strong className="text-slate-900 block mb-1">Knowvy Support:</strong>
                {plat.knowvyGuidance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
