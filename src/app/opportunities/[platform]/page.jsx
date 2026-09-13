import Link from "next/link";
import { notFound } from "next/navigation";
import { opportunitiesData, brandData } from "@/data/knowvy-data";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Compass, Calendar, MapPin, Trophy, Users, Sparkles } from "lucide-react";
import { getEventsByPlatform } from "@/lib/supabase";
import { PLATFORM_FEEDS } from "@/lib/eventsSync";
import EventCard3D from "@/components/events/EventCard3D";

export function generateStaticParams() {
  return opportunitiesData.map((plat) => ({
    platform: plat.id,
  }));
}

export async function generateMetadata({ params }) {
  const { platform } = await params;
  const plat = opportunitiesData.find((p) => p.id === platform);
  if (!plat) return { title: "Platform Not Found" };

  return {
    title: `${plat.name} Guide & Live Events — Knowvy`,
    description: plat.description,
  };
}

export default async function PlatformDetailPage({ params }) {
  const { platform } = await params;
  const plat = opportunitiesData.find((p) => p.id === platform);

  if (!plat) {
    notFound();
  }

  // Fetch live events from Supabase, or fall back to platform seed feed
  let liveEvents = [];
  try {
    const dbResult = await getEventsByPlatform(platform, 10);
    if (dbResult.success && dbResult.data?.length > 0) {
      liveEvents = dbResult.data;
    } else {
      liveEvents = PLATFORM_FEEDS[platform] || [];
    }
  } catch {
    liveEvents = PLATFORM_FEEDS[platform] || [];
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Opportunities Hub
        </Link>

        {/* Platform Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            {plat.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            {plat.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {plat.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200">
            <a
              href={plat.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-display font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Visit Official Platform
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-display font-semibold text-xs hover:border-blue-400 shadow-xs transition-colors"
            >
              Find a Teammate on WhatsApp
            </a>
          </div>
        </div>

        {/* Live Synced Events Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Live & Upcoming {plat.name} Sprints
              </h2>
            </div>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 font-semibold shadow-xs">
              Synced via Supabase & Cloudinary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {liveEvents.map((evt) => (
              <EventCard3D
                key={evt.slug || evt.id || evt.title}
                event={{
                  ...evt,
                  platform: evt.platform || platform,
                }}
              />
            ))}
          </div>
        </div>

        {/* Curated Pathways Deep Dive */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-display font-bold text-slate-900">
            Curated Tracks & Sprints
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plat.curatedTracks.map((track, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600 font-mono leading-relaxed">
                  {track}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guidance Support */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h3 className="text-xl font-display font-bold text-slate-900">
            How Knowvy Accelerates Your {plat.name} Journey
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {plat.knowvyGuidance}
          </p>
        </div>
      </div>
    </div>
  );
}
