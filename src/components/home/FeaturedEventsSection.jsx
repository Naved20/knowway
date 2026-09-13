"use client";

import Link from "next/link";
import { eventsData } from "@/data/knowvy-data";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedEventsSection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Track Record
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Featured <span className="gradient-text-blue">Events.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              From flagship 36h national hackathons to focused cloud sprints with Azure Tech Group Bhopal.
            </p>
          </div>

          <Link
            href="/events"
            data-cursor="view"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 hover:border-blue-500 hover:text-blue-600 shadow-xs transition-all w-fit"
          >
            Browse All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Rich Horizontal Event Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.slice(0, 3).map((event) => (
            <div
              key={event.slug}
              data-cursor="view"
              className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-blue-400/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl shadow-xs"
            >
              {/* Event Visual with subtle zoom on hover */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase shadow-xs ${
                      event.status === "Upcoming"
                        ? "bg-blue-600 text-white"
                        : event.status === "Ongoing"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-800 font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-4">
                <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {event.title}
                </h3>

                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {event.shortDescription}
                </p>

                {/* Metadata details */}
                <div className="pt-2 border-t border-slate-200 space-y-2 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{event.participants}</span>
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4 mt-auto">
                  <Link
                    href={`/events/${event.slug}`}
                    className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 text-slate-800 group-hover:text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-md"
                  >
                    Explore Event
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
