import Link from "next/link";
import { notFound } from "next/navigation";
import { opportunitiesData, brandData } from "@/data/knowvy-data";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Compass, Calendar, MapPin, Trophy, Users, Sparkles } from "lucide-react";
import { getEventsByPlatform } from "@/lib/supabase";
import { PLATFORM_FEEDS } from "@/lib/eventsSync";

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
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8B95A5] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Opportunities Hub
        </Link>

        {/* Platform Hero */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1118] border border-[#1C2430] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Compass className="w-3.5 h-3.5" />
            {plat.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {plat.name}
          </h1>

          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            {plat.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1C2430]">
            <a
              href={plat.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-lg shadow-[#4D8DFF]/25 flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Visit Official Platform
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#111722] border border-[#1C2430] text-white font-display font-semibold text-xs hover:border-[#4D8DFF] transition-colors"
            >
              Find a Teammate on WhatsApp
            </a>
          </div>
        </div>

        {/* Live Synced Events Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <h2 className="text-2xl font-display font-bold text-white">
                Live & Upcoming {plat.name} Sprints
              </h2>
            </div>
            <span className="text-xs font-mono text-[#4D8DFF] bg-[#4D8DFF]/10 px-3 py-1 rounded-full border border-[#4D8DFF]/30">
              Synced via Supabase & Cloudinary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveEvents.map((evt) => (
              <div
                key={evt.slug}
                className="rounded-2xl overflow-hidden bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/50 transition-all group flex flex-col justify-between"
              >
                {/* Banner Image with Cloudinary Optimization */}
                <div className="relative h-48 w-full overflow-hidden bg-black/50">
                  <img
                    src={evt.banner_url}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white font-bold uppercase">
                    {evt.status}
                  </div>
                  {evt.prizes && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]/40 backdrop-blur-md text-[11px] font-mono text-[#F59E0B] font-bold flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      {evt.prizes}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#8B5CF6] uppercase tracking-wider block">
                      {evt.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors line-clamp-2">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[#8B95A5] leading-relaxed line-clamp-3">
                      {evt.short_description || evt.about}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-[#1C2430]">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#8B95A5]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#4D8DFF]" />
                        <span className="truncate">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>

                    <a
                      href={evt.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#111722] hover:bg-[#4D8DFF] border border-[#1C2430] hover:border-transparent text-white text-xs font-display font-bold flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
                    >
                      Register on {plat.name}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Pathways Deep Dive */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-display font-bold text-white">
            Curated Tracks & Sprints
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plat.curatedTracks.map((track, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0D1118] border border-[#1C2430] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#8B95A5] font-mono leading-relaxed">
                  {track}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Knowvy Student Guidance Strategy */}
        <div className="p-7 rounded-2xl bg-[#111722] border border-[#1C2430] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
            <ShieldCheck className="w-4 h-4" />
            <span>How Knowvy Accelerates Your Chances</span>
          </div>
          <p className="text-sm text-[#8B95A5] leading-relaxed">
            {plat.knowvyGuidance}
          </p>
        </div>
      </div>
    </div>
  );
}

