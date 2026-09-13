import { partnersData } from "@/data/knowvy-data";
import { Handshake } from "lucide-react";

export default function PartnersMarquee() {
  // Duplicate for smooth seamless infinite marquee loop
  const marqueeItems = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section className="py-20 bg-slate-50/80 border-t border-slate-200 overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-600 mb-3 shadow-xs font-semibold">
          <Handshake className="w-3.5 h-3.5 text-blue-600" />
          Verified Community Collaborations
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
          Supported by trusted developer networks.
        </h3>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6">
          {marqueeItems.map((partner, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-6 py-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 group cursor-default flex items-center gap-3.5 shadow-xs"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
              <div>
                <span className="text-sm font-display font-bold text-slate-700 group-hover:text-slate-900 transition-colors block">
                  {partner.name}
                </span>
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-blue-600 transition-colors block">
                  {partner.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
