import ProgramsSection from "@/components/home/ProgramsSection";
import Link from "next/link";
import { Terminal, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Programs — Knowvy",
  description: "Explore Knowvy's core tracks: National Hackathons, Cloud & Azure Sprints, Local AI Masterclasses, and Open Source Jumpstart.",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Terminal className="w-3.5 h-3.5" />
            Curriculum & Sprints
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Developer <span className="gradient-text-blue">Programs.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            No endless slide decks. Every program is built around production outputs: deployed web apps, containerized backends, local AI pipelines, and merged pull requests.
          </p>
        </div>

        <ProgramsSection />

        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1118] border border-[#1C2430] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-white">
              Want to host a workshop at your college?
            </h3>
            <p className="text-sm text-[#8B95A5]">
              Partner with Knowvy mentors and Azure Tech Group Bhopal to bring cloud and AI sprints to your campus.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-[#4D8DFF] text-white font-display font-bold text-xs shadow-lg shadow-[#4D8DFF]/25 hover:scale-[1.02] transition-transform flex-shrink-0 flex items-center gap-2"
          >
            Propose Campus Session
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
