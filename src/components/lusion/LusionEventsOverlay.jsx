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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full lusion-tag text-xs font-mono text-blue-600 bg-blue-50/80 border-blue-200">
              <Flame className="w-3.5 h-3.5" />
              Act IV // Flagship Initiatives
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Where competitive <br />
              <span className="gradient-text-blue">building happens.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Camera focal depth shifts into the Hackathon and Cloud Sprint clusters. Explore real event portals with live problem statements and prizes.
            </p>
          </div>

          <Link
            href="/events"
            className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-2xl lusion-glass text-xs font-mono text-blue-600 hover:text-blue-800 border-slate-200 bg-white/90 shadow-sm transition-all w-fit font-bold"
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
              className="p-7 rounded-3xl lusion-glass border border-slate-200 bg-white/90 shadow-md hover:border-blue-400 hover:shadow-lg transition-all duration-500 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[10px] font-mono font-bold uppercase">
                    {ev.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {ev.category}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {ev.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ev.shortDescription}
                </p>

                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    <span>{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{ev.participants}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/events/${ev.slug}`}
                className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 text-slate-800 group-hover:text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-md"
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
