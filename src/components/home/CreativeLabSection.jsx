import Link from "next/link";
import { creativeLabData } from "@/data/knowvy-data";
import { Sparkles, ArrowRight, Play, Eye } from "lucide-react";

export default function CreativeLabSection() {
  return (
    <section className="py-24 bg-[#07090D] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
              <Sparkles className="w-3.5 h-3.5" />
              Generative Tech & Visual Direction
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Luma Creative <span className="gradient-text-violet">Lab.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5] max-w-xl">
              Where students harness generative video, 3D world models, and cinematic motion tools to build next-generation event visuals and digital identities.
            </p>
          </div>

          <Link
            href="/creative-lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-sm font-semibold text-white hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-all w-fit"
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
              className="group p-6 rounded-2xl bg-[#0D1118] border border-[#1C2430] hover:border-[#8B5CF6]/50 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden bg-[#07090D] border border-[#1C2430]">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#8B5CF6] uppercase font-bold">
                    {item.type}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#4D8DFF] mt-0.5">
                    {item.theme}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#07090D] border border-[#1C2430] text-[11px] font-mono text-[#8B95A5] line-clamp-3">
                  <span className="text-[#5A6475] uppercase block text-[9px] mb-1">
                    Luma Dream Prompt:
                  </span>
                  "{item.prompt}"
                </div>
              </div>

              <div className="pt-3 border-t border-[#1C2430] flex items-center justify-between text-xs font-mono text-[#5A6475]">
                <span>Aspect: {item.aspectRatio}</span>
                <span className="text-[#8B5CF6] flex items-center gap-1 font-bold">
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
