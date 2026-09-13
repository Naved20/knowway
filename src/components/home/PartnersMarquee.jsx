import { partnersData } from "@/data/knowvy-data";
import { Handshake } from "lucide-react";

export default function PartnersMarquee() {
  // Duplicate for smooth seamless infinite marquee loop
  const marqueeItems = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section className="py-20 bg-[#07090D] border-t border-[#1C2430] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111722] border border-[#1C2430] text-xs font-mono text-[#5A6475] mb-3">
          <Handshake className="w-3.5 h-3.5 text-[#4D8DFF]" />
          Verified Community Collaborations
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
          Supported by trusted developer networks.
        </h3>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090D] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6">
          {marqueeItems.map((partner, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-6 py-4 rounded-xl bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/40 transition-all duration-300 group cursor-default flex items-center gap-3.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#5A6475] group-hover:bg-[#4D8DFF] transition-colors" />
              <div>
                <span className="text-sm font-display font-bold text-[#8B95A5] group-hover:text-white transition-colors block">
                  {partner.name}
                </span>
                <span className="text-[11px] font-mono text-[#5A6475] group-hover:text-[#4D8DFF] transition-colors block">
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
