"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// Dynamically import the real-time Three.js WebGL card canvas (client-side only)
const WebGLCardCanvas = dynamic(
  () => import("@/components/three/WebGLCardCanvas"),
  { ssr: false }
);

const PLATFORM_THEMES = {
  knowvy: {
    accent: "#2563EB",
    glow: "rgba(37, 99, 235, 0.18)",
    border: "group-hover:border-blue-500/70",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
  },
  unstop: {
    accent: "#0284C7",
    glow: "rgba(2, 132, 199, 0.18)",
    border: "group-hover:border-sky-500/70",
    badgeBg: "bg-sky-50 text-sky-600 border-sky-200",
  },
  mlh: {
    accent: "#E11D48",
    glow: "rgba(225, 29, 72, 0.18)",
    border: "group-hover:border-rose-500/70",
    badgeBg: "bg-rose-50 text-rose-600 border-rose-200",
  },
  devfolio: {
    accent: "#2563EB",
    glow: "rgba(37, 99, 235, 0.18)",
    border: "group-hover:border-blue-500/70",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
  },
  devpost: {
    accent: "#059669",
    glow: "rgba(5, 150, 105, 0.18)",
    border: "group-hover:border-emerald-500/70",
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
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
    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    setRotations({ x: rotX, y: rotY });
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
        className={`relative w-full h-full rounded-2xl bg-white border border-slate-200 ${theme.border} overflow-hidden transition-all duration-300 ease-out flex flex-col`}
        style={{
          transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) ${
            isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
          }`,
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 20px 35px -10px rgba(0, 0, 0, 0.1), 0 0 20px 0 ${theme.glow}`
            : "0 4px 15px -3px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Holographic Specular Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6), ${theme.glow} 35%, transparent 70%)`,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
          }}
        />

        {/* --- Top Banner & WebGL 3D Zone --- */}
        <div
          className="relative h-56 overflow-hidden bg-slate-100"
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
            className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Vignette Gradients for Immersion */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />

          {/* Top Floating Status Pill (Pops out in 3D: translateZ 35px) */}
          <div
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(35px)" : "translateZ(0px)" }}
          >
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs backdrop-blur-md ${
                event.status === "Upcoming"
                  ? "bg-blue-600 text-white shadow-blue-500/30"
                  : event.status === "Ongoing"
                  ? "bg-emerald-600 text-white shadow-emerald-500/30 font-extrabold"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
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
              className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-xs ${theme.badgeBg}`}
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
              <div className="text-xs font-mono text-amber-800 px-3 py-1 rounded-xl bg-amber-50/95 backdrop-blur-md border border-amber-200 flex items-center gap-1.5 font-bold shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
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
            <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {event.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-xs text-slate-600 line-clamp-2 leading-relaxed transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)" }}
          >
            {event.shortDescription || event.short_description}
          </p>

          {/* Metadata Grid (translateZ 30px) */}
          <div
            className="pt-3 border-t border-slate-200 space-y-2.5 text-xs font-mono text-slate-500 transition-transform duration-200"
            style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0px)" }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.participants && (
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
                className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-blue-600 group-hover:border-blue-600 text-slate-800 group-hover:text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-md"
              >
                View Details & Challenges
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            ) : (
              <a
                href={event.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-display font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-xs group-hover:shadow-md"
                style={{
                  backgroundColor: isHovered ? theme.accent : undefined,
                  borderColor: isHovered ? theme.accent : undefined,
                  color: isHovered ? "#FFFFFF" : undefined,
                  boxShadow: isHovered ? `0 8px 20px ${theme.glow}` : undefined,
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
