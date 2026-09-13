"use client";

import { LUSION_TRACKS } from "@/components/three/LusionWorldCanvas";
import { Network, ArrowRight } from "lucide-react";

export default function LusionEcosystemOverlay({ activeTrack, onSelectTrack }) {
  const currentTrack = activeTrack || LUSION_TRACKS[0];

  return (
    <section className="relative min-h-screen flex flex-col justify-center py-28 px-4 sm:px-6 lg:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Section Header & Track Selector HUD */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-purple-700 bg-purple-50/80 border-purple-200">
            <Network className="w-3.5 h-3.5" />
            Act III // Spatial Constellation
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Seven interconnected <br />
            <span className="gradient-text-blue">developer tracks.</span>
          </h2>

          <p className="text-base text-slate-600 leading-relaxed max-w-lg">
            Each glowing node in the WebGL canvas represents an active student builder pathway. Pulsing filaments transfer knowledge and energy across the ecosystem.
          </p>

          {/* 7 Track Selector Pills */}
          <div className="space-y-2 pointer-events-auto pt-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
              Direct Spatial Hotspots:
            </span>
            <div className="flex flex-wrap gap-2">
              {LUSION_TRACKS.map((t) => {
                const isSelected = currentTrack.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTrack(t)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25 scale-105"
                        : "lusion-glass text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white/80"
                    }`}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Focused Track Telemetry HUD Card */}
        <div className="lg:col-span-6 pointer-events-auto">
          <div className="p-8 sm:p-10 rounded-3xl lusion-glass border border-slate-200 bg-white/90 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full animate-ping"
                  style={{ backgroundColor: currentTrack.color }}
                />
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  {currentTrack.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-purple-600 uppercase font-semibold">
                [{currentTrack.tag}]
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 uppercase block font-medium">
                Verified Community Telemetry:
              </span>
              <p className="text-lg font-mono font-bold text-blue-600">
                {currentTrack.metric}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {currentTrack.desc}
            </p>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Real-time WebGL Node</span>
              <span className="text-blue-600 flex items-center gap-1 font-bold">
                Raycasting Active <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
