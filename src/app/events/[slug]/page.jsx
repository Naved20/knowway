import Link from "next/link";
import { notFound } from "next/navigation";
import { eventsData, brandData } from "@/data/knowvy-data";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Trophy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} — Knowvy Events`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const relatedEvents = eventsData.filter((e) => e.slug !== event.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#07090D] pt-28 pb-24 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8B95A5] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all events
        </Link>

        {/* Hero Visual & Title */}
        <div className="relative rounded-3xl overflow-hidden border border-[#1C2430] bg-[#0D1118]">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-[#0D1118]/60 to-transparent" />
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#4D8DFF] text-white text-xs font-mono font-bold uppercase">
                {event.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-white/90">
                {event.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
              {event.title}
            </h1>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-[#8B95A5] pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4D8DFF]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#10B981]" />
                <span>{event.participants}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details, Highlights & Challenges */}
          <div className="lg:col-span-8 space-y-12">
            {/* About Event */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-white">
                About the Event
              </h2>
              <p className="text-[#8B95A5] text-base leading-relaxed">
                {event.about}
              </p>
            </div>

            {/* Key Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#4D8DFF]" />
                  Event Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0D1118] border border-[#1C2430] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4D8DFF] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#8B95A5] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Problem Statements */}
            {event.challenges && event.challenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-white">
                  Problem Statements & Tracks
                </h3>
                <div className="space-y-3">
                  {event.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#111722] border border-[#1C2430] flex items-center gap-3 text-sm text-white"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#4D8DFF]/20 text-[#4D8DFF] font-mono font-bold text-xs flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Winning Teams (for completed editions) */}
            {event.winningTeams && event.winningTeams.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#EAB308]" />
                  Winners & Standout Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.winningTeams.map((win, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#0D1118] border border-[#1C2430] space-y-2"
                    >
                      <span className="text-xs font-mono text-[#EAB308] font-bold block">
                        {win.rank}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {win.team}
                      </h4>
                      <p className="text-xs text-[#8B95A5]">
                        {win.project}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Registration & Partners Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] space-y-6 sticky top-28">
              <div>
                <span className="text-xs font-mono text-[#4D8DFF] uppercase block">
                  Registration Status
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  {event.status === "Upcoming" ? "Open for Submissions" : "Event Concluded"}
                </h3>
              </div>

              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-sm shadow-xl shadow-[#4D8DFF]/25 hover:shadow-[#4D8DFF]/40 flex items-center justify-center gap-2 transition-all"
              >
                Join Event Community
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Verified Partners for this event */}
              <div className="pt-4 border-t border-[#1C2430] space-y-3">
                <span className="text-xs font-mono text-[#5A6475] uppercase block">
                  Event Collaborators:
                </span>
                <div className="space-y-2">
                  {event.partners.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-mono text-[#8B95A5]"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4D8DFF]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="pt-12 border-t border-[#1C2430] space-y-6">
            <h3 className="text-2xl font-display font-bold text-white">
              Related Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedEvents.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/events/${rel.slug}`}
                  className="p-6 rounded-2xl bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono text-[#4D8DFF] uppercase block">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors mt-0.5">
                      {rel.title}
                    </h4>
                    <span className="text-xs font-mono text-[#5A6475]">
                      {rel.date} • {rel.location}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B95A5] group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
