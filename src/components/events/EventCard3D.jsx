"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  ArrowUpRight,
  Trophy,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import WebGLCardCanvas from "@/components/three/WebGLCardCanvas";

const PLATFORM_THEMES = {
  knowvy: {
    accent: "#4D8DFF",
    glow: "rgba(77, 141, 255, 0.25)",
    border: "group-hover:border-[#4D8DFF]/60",
    badgeBg: "bg-[#4D8DFF]/15 text-[#4D8DFF] border-[#4D8DFF]/30",
  },
  unstop: {
    accent: "#00B4D8",
    glow: "rgba(0, 180, 216, 0.25)",
    border: "group-hover:border-[#00B4D8]/60",
    badgeBg: "bg-[#00B4D8]/15 text-[#00B4D8] border-[#00B4D8]/30",
  },
  mlh: {
    accent: "#FF4757",
    glow: "rgba(255, 71, 87, 0.25)",
    border: "group-hover:border-[#FF4757]/60",
    badgeBg: "bg-[#FF4757]/15 text-[#FF4757] border-[#FF4757]/30",
  },
  devfolio: {
    accent: "#3B82F6",
    glow: "rgba(59, 130, 246, 0.25)",
    border: "group-hover:border-[#3B82F6]/60",
    badgeBg: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30",
  },
  devpost: {
    accent: "#00E5A3",
    glow: "rgba(0, 229, 163, 0.25)",
    border: "group-hover:border-[#00E5A3]/60",
    badgeBg: "bg-[#00E5A3]/15 text-[#00E5A3] border-[#00E5A3]/30",
  },
};

export default function EventCard3D({ event }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotations, setRotations] = useState({ x: 0, y: 0 });
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const platformKey = (event.platform || "knowvy").toLowerCase();
  const theme = PLATFORM_THEMES[platformKey] || PLATFORM_THEMES.knowvy;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Maximum tilt angles in degrees
    const maxTilt = 12;
    setRotations({
      x: -normY * maxTilt,
      y: normX * maxTilt,
    });

    setPointerOffset({ x: normX, y: normY });
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotations({ x: 0, y: 0 });
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl cursor-pointer select-none group transition-transform duration-200 ease-out"
      style={{
        perspective: 1200,
      }}
    >
      {/* 3D Transform Stage Container */}
      <div
        className={`relative w-full h-full rounded-2xl bg-[#0D1118]/90 backdrop-blur-xl border border-[#1C2430] ${theme.border} overflow-hidden transition-all duration-300 ease-out flex flex-col`}
        style={{
          transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) ${
            isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
          }`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 24px 48px -12px ${theme.glow}, 0 0 20px 0 ${theme.glow}`
            : "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Holographic Specular Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25), ${theme.glow} 35%, transparent 70%)`,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
          }}
        />

        {/* --- Top Banner & WebGL 3D Zone --- */}
        <div
          className="relative h-56 overflow-hidden bg-[#07090D]"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Real-time 3D WebGL Scene */}
          <WebGLCardCanvas
            platform={platformKey}
            isHovered={isHovered}
            pointerOffset={pointerOffset}
          />

          {/* Background Event Banner Image */}
          <img
            src={event.banner || event.banner_url}
            alt={event.title}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Vignette Gradients for Immersion */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1118] via-[#0D1118]/30 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,#0D1118_95%)] pointer-events-none" />

          {/* Top Floating Status Pill (Pops out in 3D: translateZ 35px) */}
          <div
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(35px)" : "translateZ(0px)" }}
          >
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg backdrop-blur-md ${
                event.status === "Upcoming"
                  ? "bg-[#4D8DFF] text-white shadow-[#4D8DFF]/30"
                  : event.status === "Ongoing"
                  ? "bg-[#10B981] text-black shadow-[#10B981]/30 font-extrabold"
                  : "bg-[#1C2430]/90 text-[#8B95A5] border border-white/5"
              }`}
            >
              {event.status || "Upcoming"}
            </span>
          </div>

          {/* Top Floating Platform Badge (Pops out in 3D: translateZ 35px) */}
          <div
            className="absolute top-4 right-4 z-20 transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(35px)" : "translateZ(0px)" }}
          >
            <div
              className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-lg ${theme.badgeBg}`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              {event.platform || "Knowvy"}
            </div>
          </div>

          {/* Prize Tag Floating in 3D (translateZ 40px) */}
          {event.prizes && (
            <div
              className="absolute bottom-3 left-4 z-20 transition-transform duration-200"
              style={{ transform: isHovered ? "translateZ(40px)" : "translateZ(0px)" }}
            >
              <div className="text-xs font-mono text-[#F59E0B] px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#F59E0B]/30 flex items-center gap-1.5 font-bold shadow-lg">
                <Trophy className="w-3.5 h-3.5" />
                <span>{event.prizes}</span>
              </div>
            </div>
          )}
        </div>

        {/* --- Card Body & Floating Content --- */}
        <div className="p-6 flex flex-col flex-1 space-y-4 relative z-20">
          {/* Category & Title (translateZ 40px) */}
          <div
            className="transition-transform duration-200 space-y-1.5"
            style={{ transform: isHovered ? "translateZ(40px)" : "translateZ(0px)" }}
          >
            <span
              className="text-[11px] font-mono uppercase tracking-wider block font-bold transition-colors"
              style={{ color: theme.accent }}
            >
              {event.category || "Technical Initiative"}
            </span>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-white transition-colors line-clamp-2 leading-tight">
              {event.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-xs text-[#8B95A5] line-clamp-2 leading-relaxed transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }}
          >
            {event.shortDescription || event.short_description}
          </p>

          {/* Metadata Grid (translateZ 30px) */}
          <div
            className="pt-3 border-t border-[#1C2430] space-y-2.5 text-xs font-mono text-[#8B95A5] transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)" }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#4D8DFF] shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.participants && (
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="truncate">{event.participants}</span>
              </div>
            )}
          </div>

          {/* Action CTA Button (Pops out forward in 3D: translateZ 55px) */}
          <div
            className="pt-4 mt-auto transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(55px)" : "translateZ(0px)" }}
          >
            {event.isInternal ? (
              <Link
                href={`/events/${event.slug}`}
                className="w-full py-3 rounded-xl bg-[#111722] border border-[#1C2430] group-hover:bg-[#4D8DFF] group-hover:border-[#4D8DFF] text-white group-hover:text-black font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-[#4D8DFF]/25"
              >
                View Details & Challenges
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            ) : (
              <a
                href={event.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#111722] border border-[#1C2430] text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg"
                style={{
                  backgroundColor: isHovered ? theme.accent : undefined,
                  borderColor: isHovered ? theme.accent : undefined,
                  color: isHovered ? "#000000" : undefined,
                  boxShadow: isHovered ? `0 8px 24px ${theme.glow}` : undefined,
                }}
              >
                Register on {(event.platform || "Platform").toUpperCase()}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
