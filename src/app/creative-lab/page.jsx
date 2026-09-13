import Link from "next/link";
import { creativeLabData } from "@/data/knowvy-data";
import { Sparkles, ArrowRight, Video, Layers, Wand2 } from "lucide-react";

export const metadata = {
  title: "Luma Creative Lab — Knowvy",
  description:
    "Experimental motion studies, generative world models, and cinematic visual systems designed for Knowvy events.",
};

export default function CreativeLabPage() {
  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
              <Sparkles className="w-3.5 h-3.5" />
              Creative Engineering & Visual AI
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
              Create what’s <span className="gradient-text-violet">next.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
              Knowvy explores modern creative technology to build cinematic visuals, event identities, and 3D web experiences. Here we experiment with Luma Dream Machine, WebGL shaders, and procedural design.
            </p>
          </div>

          <Link
            href="/admin/luma"
            className="px-5 py-2.5 rounded-xl bg-[#111722] border border-[#8B5CF6]/40 text-xs font-mono text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all flex items-center gap-2 w-fit"
          >
            <Wand2 className="w-4 h-4" />
            Admin Luma Studio
          </Link>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creativeLabData.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] flex flex-col justify-between space-y-6 hover:border-[#8B5CF6]/50 transition-all group"
            >
              <div className="space-y-4">
                <div className="relative h-56 rounded-xl overflow-hidden bg-[#07090D] border border-[#1C2430]">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase text-[#8B5CF6] font-bold border border-white/10">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#4D8DFF] mt-1">
                    {item.theme}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#07090D] border border-[#1C2430] text-xs font-mono text-[#8B95A5] leading-relaxed">
                  <span className="text-[#5A6475] uppercase block text-[10px] mb-1 font-bold">
                    Generative Prompt Direction:
                  </span>
                  "{item.prompt}"
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C2430] flex items-center justify-between text-xs font-mono text-[#5A6475]">
                <span>Format: {item.aspectRatio}</span>
                <span className="text-[#8B5CF6] font-bold">Cinematic Pass</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Behind Lab */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1118] border border-[#1C2430] space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">
            The Creative Technology Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#8B95A5]">
            <div className="space-y-2 p-5 rounded-xl bg-[#07090D] border border-[#1C2430]">
              <div className="flex items-center gap-2 text-white font-bold">
                <Video className="w-4 h-4 text-[#4D8DFF]" />
                Luma Dream Machine
              </div>
              <p className="text-xs leading-relaxed">
                Text-to-video diffusion models generating atmospheric backgrounds, camera pans, and concept worlds without stock watermark limitations.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-[#07090D] border border-[#1C2430]">
              <div className="flex items-center gap-2 text-white font-bold">
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
                Three.js & WebGL
              </div>
              <p className="text-xs leading-relaxed">
                Real-time 60fps GPU-accelerated interactive geometries, physics lerping, and raycasted node inspection in the browser.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-[#07090D] border border-[#1C2430]">
              <div className="flex items-center gap-2 text-white font-bold">
                <Sparkles className="w-4 h-4 text-[#10B981]" />
                Cloudinary Asset Delivery
              </div>
              <p className="text-xs leading-relaxed">
                Automated multi-codec video streaming, AVIF/WebP image compression, and dynamic on-the-fly transformations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
