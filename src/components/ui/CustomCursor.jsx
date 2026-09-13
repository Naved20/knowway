"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState("default"); // default, link, view, open
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      if (!target) return;

      if (target.closest("[data-cursor='view']")) {
        setCursorState("view");
      } else if (target.closest("[data-cursor='open']")) {
        setCursorState("open");
      } else if (target.closest("a, button, [role='button']")) {
        setCursorState("link");
      } else {
        setCursorState("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Follower Dot / Badge */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          transition: "width 0.2s, height 0.2s, background-color 0.2s, opacity 0.2s",
        }}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none ${
          cursorState === "view"
            ? "w-16 h-16 bg-[#4D8DFF] text-black font-bold text-[10px] tracking-wider uppercase font-mono shadow-lg shadow-[#4D8DFF]/40"
            : cursorState === "open"
            ? "w-16 h-16 bg-[#8B5CF6] text-white font-bold text-[10px] tracking-wider uppercase font-mono shadow-lg shadow-[#8B5CF6]/40"
            : cursorState === "link"
            ? "w-10 h-10 bg-[#4D8DFF]/20 border border-[#4D8DFF]/60 backdrop-blur-sm"
            : "w-2.5 h-2.5 bg-[#4D8DFF] shadow-sm shadow-[#4D8DFF]"
        }`}
      >
        {cursorState === "view" && "VIEW"}
        {cursorState === "open" && "OPEN"}
      </div>
    </div>
  );
}
