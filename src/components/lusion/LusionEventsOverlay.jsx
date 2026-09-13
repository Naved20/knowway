"use client";

import Link from "next/link";
import { eventsData } from "@/data/knowvy-data";
import { Calendar, MapPin, Users, ArrowRight, Flame } from "lucide-react";

export default function LusionEventsOverlay() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center py-28 px-4 sm:px-6 lg:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-[#4D8DFF]">
              <Flame className="w-3.5 h-3.5" />
              Act IV // Flagship Initiatives
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.05]">
              Where competitive <br />
              <span className="gradient-text-blue">building happens.</span>
            </h2>

            <p className="text-base text-[#8B95A5] leading-relaxed">
              Camera focal depth shifts into the Hackathon and Cloud Sprint clusters. Explore real event portals with live problem statements and prizes.
            </p>
          </div>

          <Link
            href="/events"
            className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-2xl lusion-glass text-xs font-mono text-[#4D8DFF] hover:text-white transition-all w-fit"
          >
            Full Event Archive
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Spatial Frosted Glass Event Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {eventsData.slice(0, 3).map((ev) => (
            <div
              key={ev.slug}
              className="p-7 rounded-3xl lusion-glass border border-white/5 hover:border-[#4D8DFF]/50 transition-all duration-500 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#4D8DFF]/15 text-[#4D8DFF] text-[10px] font-mono font-bold uppercase">
                    {ev.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#5A6475]">
                    {ev.category}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors leading-snug">
                  {ev.title}
                </h3>

                <p className="text-xs text-[#8B95A5] line-clamp-2 leading-relaxed">
                  {ev.shortDescription}
                </p>

                <div className="pt-3 border-t border-white/5 space-y-2 text-xs font-mono text-[#8B95A5]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#4D8DFF]" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{ev.participants}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/events/${ev.slug}`}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#4D8DFF] group-hover:border-[#4D8DFF] text-white group-hover:text-black font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
              >
                Enter Event Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
