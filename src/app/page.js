"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LusionHeroOverlay from "@/components/lusion/LusionHeroOverlay";
import LusionPillarsOverlay from "@/components/lusion/LusionPillarsOverlay";
import LusionEcosystemOverlay from "@/components/lusion/LusionEcosystemOverlay";
import LusionEventsOverlay from "@/components/lusion/LusionEventsOverlay";
import LusionImpactOverlay from "@/components/lusion/LusionImpactOverlay";
import LusionCTAOverlay from "@/components/lusion/LusionCTAOverlay";
import CommunitySection from "@/components/home/CommunitySection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { LUSION_TRACKS } from "@/components/three/LusionWorldCanvas";

// Dynamically load the Master WebGL Canvas to ensure optimal client-side rendering
const LusionWorldCanvas = dynamic(
  () => import("@/components/three/LusionWorldCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-[#F8FAFC] flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    ),
  }
);

export default function LusionHomePage() {
  const [activeTrack, setActiveTrack] = useState(LUSION_TRACKS[0]);

  return (
    <main className="relative w-full min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-slate-900 overflow-x-hidden">
      {/* -------------------------------------------------------------
          1. Master Continuous WebGL Canvas Engine (Fixed Background)
          ------------------------------------------------------------- */}
      <LusionWorldCanvas
        activeTrackId={activeTrack.id}
        onSelectTrack={(track) => setActiveTrack(track)}
      />

      {/* -------------------------------------------------------------
          2. Scroll-Choreographed Cinematic DOM Overlay (6 Acts)
          ------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Act I: Hero — The Builder Nexus */}
        <LusionHeroOverlay />

        {/* Act II: Core Dissection & Telemetry (Learn, Build, Connect) */}
        <LusionPillarsOverlay />

        {/* Act III: Spatial Constellation (7 Interconnected Tracks) */}
        <LusionEcosystemOverlay
          activeTrack={activeTrack}
          onSelectTrack={(track) => setActiveTrack(track)}
        />

        {/* Act IV: Flagship Initiatives & Event Portals */}
        <LusionEventsOverlay />

        {/* Act V: Galactic Scale (Bhopal Genesis to Nationwide Network) */}
        <LusionImpactOverlay />

        {/* Verified Community Voices & Leadership */}
        <div className="relative z-10 bg-white/85 backdrop-blur-xl border-t border-slate-200 shadow-sm">
          <CommunitySection />
          <TestimonialsSection />
          <GallerySection />
        </div>

        {/* Act VI: The Final Cosmic Horizon & Call to Action */}
        <LusionCTAOverlay />
      </div>
    </main>
  );
}
