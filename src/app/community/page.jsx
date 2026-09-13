import CommunitySection from "@/components/home/CommunitySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Community — Knowvy",
  description: "Connect with 2,000+ student builders, core leads, and mentors across Bhopal and India.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Sparkles className="w-3.5 h-3.5" />
            Active Student Network
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            The Knowvy <span className="gradient-text-blue">Community.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            Founded in Bhopal by student builders, Knowvy is home to engineers, competitive coders, designers, and open-source enthusiasts collaborating 24/7.
          </p>

          <div className="pt-2">
            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-lg shadow-[#4D8DFF]/25 hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              Join Official WhatsApp Community
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Member Directory */}
        <CommunitySection />

        {/* Testimonials */}
        <TestimonialsSection />
      </div>
    </div>
  );
}
