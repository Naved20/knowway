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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Active Student Network
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
            The Knowvy <span className="gradient-text-blue">Community.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded in Bhopal by student builders, Knowvy is home to engineers, competitive coders, designers, and open-source enthusiasts collaborating 24/7.
          </p>

          <div className="pt-2">
            <a
              href={brandData.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-display font-bold text-xs shadow-md shadow-blue-500/25 hover:scale-[1.02] transition-transform"
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
