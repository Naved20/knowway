"use client";

import Link from "next/link";
import { eventsData } from "@/data/knowvy-data";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedEventsSection() {
  return (
    <section className="py-24 bg-[#0D1118] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Track Record
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Featured <span className="gradient-text-blue">Events.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5] max-w-xl">
              From flagship 36h national hackathons to focused cloud sprints with Azure Tech Group Bhopal.
            </p>
          </div>

          <Link
            href="/events"
            data-cursor="view"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-sm font-semibold text-white hover:border-[#4D8DFF] hover:text-[#4D8DFF] transition-all w-fit"
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
              className="group flex flex-col rounded-2xl bg-[#111722] border border-[#1C2430] overflow-hidden hover:border-[#4D8DFF]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#4D8DFF]/10"
            >
              {/* Event Visual with subtle zoom on hover */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-[#07090D]">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111722] via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase shadow-md ${
                      event.status === "Upcoming"
                        ? "bg-[#4D8DFF] text-white"
                        : event.status === "Ongoing"
                        ? "bg-[#10B981] text-black"
                        : "bg-[#1C2430] text-[#8B95A5] border border-[#2C3A4E]"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Card Content & Metadata */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-4">
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors leading-snug">
                  {event.title}
                </h3>

                <p className="text-sm text-[#8B95A5] line-clamp-2 leading-relaxed">
                  {event.shortDescription}
                </p>

                {/* Metadata details */}
                <div className="pt-2 border-t border-[#1C2430] space-y-2 text-xs font-mono text-[#8B95A5]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#4D8DFF]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{event.participants}</span>
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-4 mt-auto">
                  <Link
                    href={`/events/${event.slug}`}
                    className="w-full py-3 rounded-xl bg-[#161F2E] border border-[#1C2430] group-hover:bg-[#4D8DFF] group-hover:border-[#4D8DFF] text-white group-hover:text-black font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
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
