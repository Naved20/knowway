import Link from "next/link";
import { heyGenRoadShowData, brandData } from "@/data/knowvy-data";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ArrowUpRight,
  Video,
  Flame,
  CheckCircle2,
  Compass,
  Building2,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import EventsAmbientCanvas from "@/components/three/EventsAmbientCanvas";

export const metadata = {
  title: "HeyGen India RoadShow Series — 9 Cities | Knowvy Technologies",
  description:
    "Join the HeyGen India RoadShow Series across 9 cities. Connecting founders, creators, and marketers for real conversations on modern growth and AI video.",
};

export default function HeyGenRoadShowPage() {
  const { title, tagline, subtitle, statement, hosts, cities, tracks } = heyGenRoadShowData;

  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white relative overflow-hidden">
      {/* 3D Ambient WebGL Background */}
      <EventsAmbientCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hosts}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
            {title}
            <span className="block gradient-text-blue">{tagline}</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#CBD5E1] leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <blockquote className="p-5 rounded-2xl bg-[#0D1118]/80 border-l-4 border-[#4D8DFF] border border-[#1C2430] text-sm text-[#8B95A5] italic leading-relaxed">
            &ldquo;{statement}&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-lg shadow-[#4D8DFF]/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Join 2,000+ Builders on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={brandData.links.founderTwitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white font-display font-semibold text-xs hover:border-[#8B5CF6] transition-colors flex items-center gap-2"
            >
              Follow Updates on X (@mohneesh_gupta1)
              <ArrowUpRight className="w-4 h-4 text-[#8B5CF6]" />
            </a>
          </div>
        </div>

        {/* Why This Matters / No Fluff vs Actionable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#0D1118]/80 backdrop-blur-xl border border-[#1C2430] space-y-4">
            <h3 className="text-xl font-display font-bold text-red-400 flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-400" />
              No Fluff or Sales Pitch
            </h3>
            <ul className="space-y-3 text-sm text-[#8B95A5] font-mono">
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span> Not a one-way lecture or webinar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span> Not a generic software sales pitch
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span> Not theoretical AI hype or buzzwords
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span> Not just surface-level networking
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#0D1118]/80 backdrop-blur-xl border border-[#1C2430] space-y-4">
            <h3 className="text-xl font-display font-bold text-[#10B981] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              Actionable & Real
            </h3>
            <ul className="space-y-3 text-sm text-[#8B95A5] font-mono">
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">✓</span> Real-talk marketing case studies
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">✓</span> Hands-on AI avatar workflows live
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">✓</span> Founder-to-founder genuine relationships
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">✓</span> Practical distribution playbooks that scale 10x
              </li>
            </ul>
          </div>
        </div>

        {/* 9 Cities Route Grid */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
              <Compass className="w-3.5 h-3.5" />
              The Nationwide Route
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              9 Cities Across India
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5]">
              Dates and venue locations roll out city by city across Central, Western, Southern, and Northern tech hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className="group p-6 rounded-2xl bg-[#0D1118]/80 backdrop-blur-xl border border-[#1C2430] hover:border-[#4D8DFF]/50 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#4D8DFF] font-bold">
                    {city.number}
                  </span>
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                    {city.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                    {city.name}
                  </h3>
                  <span className="text-xs font-mono text-[#8B95A5] block">
                    {city.state}
                  </span>
                </div>

                <p className="text-xs font-mono text-[#5A6475] pt-2 border-t border-[#1C2430]">
                  Landmark: <span className="text-[#CBD5E1]">{city.landmark}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Curated Tracks */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
              <Video className="w-3.5 h-3.5" />
              Event Structure
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Five Curated Sprints
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5]">
              Structured for maximum insight, direct craft sharing, and genuine creator connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.number}
                className={`p-6 rounded-2xl bg-[#0D1118]/80 backdrop-blur-xl border ${
                  track.isFlagship
                    ? "border-[#4D8DFF]/60 shadow-lg shadow-[#4D8DFF]/15"
                    : "border-[#1C2430]"
                } space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8B5CF6] font-bold">
                    Track {track.number}
                  </span>
                  {track.isFlagship && (
                    <span className="text-[10px] font-mono text-[#4D8DFF] bg-[#4D8DFF]/15 px-2 py-0.5 rounded-full border border-[#4D8DFF]/30 font-bold uppercase">
                      Flagship
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-white">
                  {track.title}
                </h3>

                <p className="text-xs text-[#8B95A5] leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Host / Partner CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D1424] via-[#111722] to-[#07090D] border border-[#1C2430] space-y-6 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#4D8DFF]/15 border border-[#4D8DFF]/40 text-[#4D8DFF] flex items-center justify-center mx-auto shadow-lg shadow-[#4D8DFF]/20">
            <Building2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Want to Host or Partner with HeyGen in Your City?
          </h3>

          <p className="text-sm text-[#8B95A5] leading-relaxed">
            We partner with tech hubs, co-working spaces, colleges, and marketing communities across all 9 stops.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#4D8DFF] text-white font-display font-bold text-xs hover:scale-105 transition-all shadow-md shadow-[#4D8DFF]/30"
            >
              Reach Out for Partnership
            </Link>

            <a
              href={`tel:${brandData.links.phone}`}
              className="px-6 py-3 rounded-xl bg-[#111722] border border-[#1C2430] text-[#CBD5E1] font-display font-bold text-xs hover:border-white transition-colors"
            >
              Direct Line: {brandData.links.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
