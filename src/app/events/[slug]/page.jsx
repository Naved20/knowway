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
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-24 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all events
        </Link>

        {/* Hero Visual & Title */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-mono font-bold uppercase shadow-xs">
                {event.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-mono text-slate-800 shadow-xs">
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
              <h2 className="text-2xl font-display font-bold text-slate-900">
                About the Event
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {event.about}
              </p>
            </div>

            {/* Key Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Event Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 leading-relaxed">
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
                <h3 className="text-xl font-display font-bold text-slate-900">
                  Problem Statements & Tracks
                </h3>
                <div className="space-y-3">
                  {event.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-sm text-slate-800 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-mono font-bold text-xs flex items-center justify-center border border-blue-200">
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
                <h3 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Winners & Standout Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {event.winningTeams.map((win, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs"
                    >
                      <span className="text-xs font-mono text-amber-600 font-bold block">
                        {win.rank}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {win.team}
                      </h4>
                      <p className="text-xs text-slate-600">
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
            <div className="p-7 rounded-2xl bg-white border border-slate-200 space-y-6 sticky top-28 shadow-md">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase block font-semibold">
                  Registration Status
                </span>
                <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
                  {event.status === "Upcoming" ? "Open for Submissions" : "Event Concluded"}
                </h3>
              </div>

              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-display font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 flex items-center justify-center gap-2 transition-all"
              >
                Join Event Community
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Verified Partners for this event */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <span className="text-xs font-mono text-slate-500 uppercase block font-medium">
                  Event Collaborators:
                </span>
                <div className="space-y-2">
                  {event.partners.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-mono text-slate-600"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
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
          <div className="pt-12 border-t border-slate-200 space-y-6">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Related Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedEvents.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/events/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-mono text-blue-600 uppercase block font-semibold">
                      {rel.category}
                    </span>
                    <h4 className="text-lg font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                      {rel.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {rel.date} • {rel.location}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
