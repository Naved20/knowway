"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { eventsData } from "@/data/knowvy-data";
import { Calendar, MapPin, Users, ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Sparkles, Trophy } from "lucide-react";
import { PLATFORM_FEEDS } from "@/lib/eventsSync";

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
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Sparkles className="w-3.5 h-3.5" />
            Active & Past Initiatives
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Explore <span className="gradient-text-blue">Events.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            From central India's flagship 36-hour hackathons to focused cloud deployments with Azure Tech Group Bhopal.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-[#0D1118] border border-[#1C2430] flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6475]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, cities, topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF] transition-colors"
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
                    ? "bg-[#4D8DFF] text-white font-bold"
                    : "bg-[#111722] text-[#8B95A5] hover:text-white border border-[#1C2430]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-xs font-mono text-[#5A6475] uppercase mr-2 flex-shrink-0">
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
                  ? "bg-[#8B5CF6] text-white font-bold shadow-md shadow-[#8B5CF6]/30"
                  : "bg-[#111722] text-[#8B95A5] hover:text-white border border-[#1C2430]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.slug}
              className="group flex flex-col rounded-2xl bg-[#0D1118] border border-[#1C2430] overflow-hidden hover:border-[#4D8DFF]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4D8DFF]/10"
            >
              <div className="relative h-52 overflow-hidden bg-[#07090D]">
                <img
                  src={event.banner || event.banner_url}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-transparent to-transparent" />
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                    event.status === "Upcoming"
                      ? "bg-[#4D8DFF] text-white"
                      : event.status === "Ongoing"
                      ? "bg-[#10B981] text-black"
                      : "bg-[#1C2430] text-[#8B95A5]"
                  }`}
                >
                  {event.status}
                </span>

                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#4D8DFF] uppercase font-bold">
                  {event.platform || "Knowvy"}
                </div>

                {event.prizes && (
                  <div className="absolute bottom-3 left-4 text-xs font-mono text-[#F59E0B] px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-[#F59E0B]/30 flex items-center gap-1.5 font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    {event.prizes}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#8B5CF6] uppercase block mb-1">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                </div>

                <p className="text-xs text-[#8B95A5] line-clamp-2 leading-relaxed">
                  {event.shortDescription || event.short_description}
                </p>

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

                <div className="pt-4 mt-auto">
                  {event.isInternal ? (
                    <Link
                      href={`/events/${event.slug}`}
                      className="w-full py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] group-hover:bg-[#4D8DFF] group-hover:border-[#4D8DFF] text-white group-hover:text-black font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      View Details & Challenges
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <a
                      href={event.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] group-hover:bg-[#4D8DFF] group-hover:border-[#4D8DFF] text-white group-hover:text-black font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      Register on {(event.platform || "Platform").toUpperCase()}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="py-20 text-center rounded-2xl bg-[#0D1118] border border-dashed border-[#1C2430] space-y-3">
            <p className="text-base text-[#8B95A5]">No events match your selected filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="text-xs font-mono text-[#4D8DFF] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
