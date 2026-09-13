import Link from "next/link";
import { heyGenRoadShowData, brandData } from "@/data/knowvy-data";
import {
  Sparkles,
  MapPin,
  Users,
  ArrowUpRight,
  Video,
  Flame,
  CheckCircle2,
  Compass,
  Building2,
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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900 relative overflow-hidden">
      {/* 3D Ambient WebGL Background */}
      <EventsAmbientCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hosts}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
            {title}
            <span className="block gradient-text-blue">{tagline}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <blockquote className="p-5 rounded-2xl bg-white border-l-4 border-blue-600 border border-slate-200 text-sm text-slate-700 italic leading-relaxed shadow-xs">
            &ldquo;{statement}&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-display font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Join 2,000+ Builders on WhatsApp
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={brandData.links.founderTwitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-display font-semibold text-xs hover:border-purple-400 shadow-xs transition-colors flex items-center gap-2"
            >
              Follow Updates on X (@mohneesh_gupta1)
              <ArrowUpRight className="w-4 h-4 text-purple-600" />
            </a>
          </div>
        </div>

        {/* Why This Matters / No Fluff vs Actionable */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white backdrop-blur-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-display font-bold text-rose-600 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600" />
              No Fluff or Sales Pitch
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-mono">
              <li className="flex items-center gap-2">
                <span className="text-rose-600 font-bold">✕</span> Not a one-way lecture or webinar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-600 font-bold">✕</span> Not a generic software sales pitch
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-600 font-bold">✕</span> Not theoretical AI hype or buzzwords
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-600 font-bold">✕</span> Not just surface-level networking
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white backdrop-blur-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-display font-bold text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Actionable & Real
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-mono">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Real-talk marketing case studies
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Hands-on AI avatar workflows live
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Founder-to-founder genuine relationships
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Practical distribution playbooks that scale 10x
              </li>
            </ul>
          </div>
        </div>

        {/* 9 Cities Route Grid */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold shadow-xs">
              <Compass className="w-3.5 h-3.5" />
              The Nationwide Route
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
              9 Cities Across India
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Dates and venue locations roll out city by city across Central, Western, Southern, and Northern tech hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 font-bold">
                    {city.number}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    {city.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    {city.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 block">
                    {city.state}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-500 pt-2 border-t border-slate-200">
                  Landmark: <span className="text-slate-800 font-medium">{city.landmark}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Curated Tracks */}
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold shadow-xs">
              <Video className="w-3.5 h-3.5" />
              Event Structure
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
              Five Curated Sprints
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Structured for maximum insight, direct craft sharing, and genuine creator connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.number}
                className={`p-6 rounded-2xl bg-white border ${
                  track.isFlagship
                    ? "border-blue-400 shadow-md shadow-blue-500/10"
                    : "border-slate-200 shadow-xs"
                } space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-600 font-bold">
                    Track {track.number}
                  </span>
                  {track.isFlagship && (
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold uppercase">
                      Flagship
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900">
                  {track.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Host / Partner CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <Building2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Want to Host or Partner with HeyGen in Your City?
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            We partner with tech hubs, co-working spaces, colleges, and marketing communities across all 9 stops.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-display font-bold text-xs hover:bg-blue-700 hover:scale-105 transition-all shadow-md shadow-blue-500/20"
            >
              Reach Out for Partnership
            </Link>

            <a
              href={`tel:${brandData.links.phone}`}
              className="px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-display font-bold text-xs hover:border-slate-400 shadow-xs transition-colors"
            >
              Direct Line: {brandData.links.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
