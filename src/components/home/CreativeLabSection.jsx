import Link from "next/link";
import { creativeLabData } from "@/data/knowvy-data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CreativeLabSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Generative Tech & Visual Direction
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Luma Creative <span className="gradient-text-violet">Lab.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Where students harness generative video, 3D world models, and cinematic motion tools to build next-generation event visuals and digital identities.
            </p>
          </div>

          <Link
            href="/creative-lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 hover:border-purple-500 hover:text-purple-600 shadow-xs transition-all w-fit"
          >
            Visit Creative Lab
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Visual Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creativeLabData.map((item) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5 shadow-xs"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-mono text-purple-700 uppercase font-bold shadow-xs">
                    {item.type}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-600 mt-0.5 font-medium">
                    {item.theme}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-700 line-clamp-3 shadow-xs">
                  <span className="text-purple-600 uppercase block text-[9px] mb-1 font-bold">
                    Luma Dream Prompt:
                  </span>
                  "{item.prompt}"
                </div>

              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Aspect: {item.aspectRatio}</span>
                <span className="text-purple-600 flex items-center gap-1 font-bold">
                  View Study <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
