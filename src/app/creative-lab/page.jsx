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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-mono text-violet-600">
              <Sparkles className="w-3.5 h-3.5" />
              Creative Engineering & Visual AI
            </div>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
              Create what’s <span className="gradient-text-violet">next.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Knowvy explores modern creative technology to build cinematic visuals, event identities, and 3D web experiences. Here we experiment with Luma Dream Machine, WebGL shaders, and procedural design.
            </p>
          </div>

          <Link
            href="/admin/luma"
            className="px-5 py-2.5 rounded-xl bg-white border border-violet-200 text-xs font-mono text-violet-600 hover:bg-violet-600 hover:text-white shadow-sm transition-all flex items-center gap-2 w-fit"
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
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="relative h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase text-violet-700 font-bold border border-slate-200 shadow-sm">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-600 mt-1 font-medium">
                    {item.theme}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
                  <span className="text-violet-600 uppercase block text-[10px] mb-1 font-bold">
                    Generative Prompt Direction:
                  </span>
                  "{item.prompt}"
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Format: {item.aspectRatio}</span>
                <span className="text-violet-600 font-bold">Cinematic Pass</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Behind Lab */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            The Creative Technology Pipeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="space-y-2 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Video className="w-4 h-4 text-blue-600" />
                Luma Dream Machine
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Text-to-video diffusion models generating atmospheric backgrounds, camera pans, and concept worlds without stock watermark limitations.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Layers className="w-4 h-4 text-violet-600" />
                Three.js & WebGL
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Real-time 60fps GPU-accelerated interactive geometries, physics lerping, and raycasted node inspection in the browser.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Cloudinary Asset Delivery
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Automated multi-codec video streaming, AVIF/WebP image compression, and dynamic on-the-fly transformations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
