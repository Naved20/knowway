"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { brandData } from "@/data/knowvy-data";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "HeyGen RoadShow", href: "/heygen" },
  { label: "Community", href: "/community" },
  { label: "Programs", href: "/programs" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Impact", href: "/impact" },
  { label: "Creative Lab", href: "/creative-lab" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, isMounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none px-3 sm:px-6 pt-3 sm:pt-4">
      {/* Floating Glassmorphism Container */}
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 pointer-events-auto flex items-center justify-between ${
          isScrolled ? "glass-header-scrolled" : "glass-header"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-black border border-white/20 flex items-center justify-center p-0.5 shadow-md shadow-[#4D8DFF]/25 group-hover:scale-105 group-hover:border-[#4D8DFF]/60 group-hover:shadow-[#4D8DFF]/50 transition-all">
            <Image
              src="/images/knowvy-logo.png"
              alt="Knowvy Tiger Logo"
              width={28}
              height={28}
              className="object-contain filter drop-shadow-[0_0_8px_rgba(77,141,255,0.4)]"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-black tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              KNOWVY
              <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-nav-pill rounded-full px-4 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#4D8DFF]/20 text-[#4D8DFF] font-semibold border border-[#4D8DFF]/40 shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Theme Switch */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          {isMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-nav-pill hover:border-[#4D8DFF]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Light / Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#F59E0B] hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#4D8DFF] hover:-rotate-12 transition-transform" />
              )}
            </button>
          )}

          <Link
            href="/admin"
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-secondary)] px-2 py-1 transition-colors"
          >
            Admin
          </Link>
          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white text-xs font-bold font-display shadow-lg shadow-[#4D8DFF]/25 hover:shadow-[#4D8DFF]/45 hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Join Knowvy
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Controls (Theme + Hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          {isMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full glass-nav-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#4D8DFF]" />
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl glass-nav-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Glassmorphic Floating Panel) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl glass-header-scrolled p-5 shadow-2xl animate-in slide-in-from-top-3 duration-200 pointer-events-auto">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#4D8DFF]/20 text-[#4D8DFF] font-bold border border-[#4D8DFF]/30"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[var(--border-color)] flex flex-col gap-2.5">
              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white text-center font-bold font-display text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#4D8DFF]/20"
              >
                Join Knowvy Community
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/admin"
                className="text-xs text-center font-mono text-[var(--text-muted)] py-1.5 hover:text-[var(--text-secondary)]"
              >
                Admin Workspace
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
