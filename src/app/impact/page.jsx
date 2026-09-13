import ImpactStorySection from "@/components/home/ImpactStorySection";
import StatsSection from "@/components/home/StatsSection";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import { Milestone } from "lucide-react";

export const metadata = {
  title: "Impact — Knowvy",
  description: "Explore the real outcomes of the Knowvy student developer ecosystem across central India and nationwide.",
};

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Milestone className="w-3.5 h-3.5" />
            Ecosystem Growth
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Impact & <span className="gradient-text-blue">Outcomes.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            Measuring our success not just by attendance numbers, but by projects shipped, pull requests merged, internships unlocked, and student startups seeded.
          </p>
        </div>

        <StatsSection />
        <ImpactStorySection />
        <PartnersMarquee />
      </div>
    </div>
  );
}
