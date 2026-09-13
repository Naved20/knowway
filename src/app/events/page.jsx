"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { eventsData } from "@/data/knowvy-data";
import { Calendar, MapPin, Users, ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Sparkles, Trophy } from "lucide-react";
import { PLATFORM_FEEDS } from "@/lib/eventsSync";
import EventCard3D from "@/components/events/EventCard3D";
import EventsAmbientCanvas from "@/components/three/EventsAmbientCanvas";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [allEvents, setAllEvents] = useState([]);

  // Merge flagship Knowvy events with multi-platform synced feeds
  useEffect(() => {
    const knowvyFormatted = eventsData.map((e) => ({
      ...e,
      platform: "knowvy",
      banner_url: e.banner,
      short_description: e.shortDescription,
      external_url: `/events/${e.slug}`,
      isInternal: true,
    }));

    const externalFeeds = [];
    Object.keys(PLATFORM_FEEDS).forEach((plat) => {
      PLATFORM_FEEDS[plat].forEach((ev) => {
        externalFeeds.push({
          ...ev,
          banner: ev.banner_url,
          shortDescription: ev.short_description,
          isInternal: false,
        });
      });
    });

    setAllEvents([...knowvyFormatted, ...externalFeeds]);
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    const title = event.title || "";
    const desc = event.short_description || event.shortDescription || "";
    const loc = event.location || "";

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (event.status && event.status.toLowerCase() === statusFilter.toLowerCase());

    const matchesPlatform =
      platformFilter === "all" || (event.platform && event.platform.toLowerCase() === platformFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900 relative overflow-hidden">
      {/* 3D Ambient WebGL Background Constellation */}
      <EventsAmbientCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Active & Past Initiatives
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
            Explore <span className="gradient-text-blue">Events.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From central India's flagship 36-hour hackathons to focused cloud deployments with Azure Tech Group Bhopal.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, cities, topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["all", "upcoming", "ongoing", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  statusFilter === st
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-mono text-slate-500 uppercase mr-2 flex-shrink-0 font-medium">
            Platform:
          </span>
          {[
            { id: "all", label: "All Platforms" },
            { id: "knowvy", label: "Knowvy Flagship" },
            { id: "unstop", label: "Unstop" },
            { id: "mlh", label: "MLH" },
            { id: "devfolio", label: "Devfolio" },
            { id: "devpost", label: "Devpost" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatformFilter(p.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex-shrink-0 cursor-pointer ${
                platformFilter === p.id
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 3D WebGL Interactive Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard3D
              key={event.slug || event.id || event.title}
              event={event}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="py-20 text-center rounded-2xl bg-white border border-dashed border-slate-200 space-y-3 shadow-xs">
            <p className="text-base text-slate-600">No events match your selected filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setPlatformFilter("all");
              }}
              className="text-xs font-mono text-blue-600 hover:underline cursor-pointer font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
