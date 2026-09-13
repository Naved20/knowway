import Link from "next/link";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight, ArrowRight, MessageSquareCode } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-28 bg-slate-50/80 relative overflow-hidden border-t border-slate-200 text-slate-900">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-blue-600 shadow-xs font-semibold">
          <MessageSquareCode className="w-3.5 h-3.5" />
          The Builder Frontier
        </div>

        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
          Your next project <br />
          <span className="gradient-text-blue">could start here.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Join 2,000+ student builders, creators, and founders across Bhopal and India who are shipping real software and unlocking career opportunities.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-display font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Join Knowvy Community
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-display font-semibold text-sm hover:bg-slate-50 hover:border-blue-400 shadow-xs transition-all flex items-center justify-center gap-2"
          >
            Explore Events
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 text-sm font-display font-semibold"
          >
            Partner with Knowvy
          </Link>
        </div>
      </div>
    </section>
  );
}
