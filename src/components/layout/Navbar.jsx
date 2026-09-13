"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { brandData } from "@/data/knowvy-data";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-primary)]/85 backdrop-blur-xl border-b border-[var(--border-color)] py-3 shadow-2xl shadow-black/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4D8DFF] to-[#8B5CF6] flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md shadow-[#4D8DFF]/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-black tracking-tight text-[var(--text-primary)] flex items-center gap-1">
              KNOWVY
              <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 lusion-glass rounded-full px-5 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#4D8DFF]/20 text-[#4D8DFF] font-semibold border border-[#4D8DFF]/40"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Theme Switch */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Theme Toggle Button */}
          {isMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl lusion-glass hover:border-[#4D8DFF]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Light / Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#4D8DFF]" />
              )}
            </button>
          )}

          <Link
            href="/admin"
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Admin
          </Link>
          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white text-xs font-bold font-display shadow-lg shadow-[#4D8DFF]/25 hover:shadow-[#4D8DFF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Join Knowvy
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>


        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#07090D]/98 backdrop-blur-2xl border-b border-[#1C2430] p-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#4D8DFF]/15 text-[#4D8DFF] font-bold border border-[#4D8DFF]/30"
                      : "text-[#8B95A5] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[var(--border-color)] flex flex-col gap-3">
              {isMounted && (
                <button
                  onClick={toggleTheme}
                  className="w-full py-2.5 rounded-xl lusion-glass flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-primary)]"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4 text-[#F59E0B]" />
                      <span>Switch to Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[#4D8DFF]" />
                      <span>Switch to Dark Theme</span>
                    </>
                  )}
                </button>
              )}

              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#4D8DFF] text-white text-center font-bold font-display text-sm flex items-center justify-center gap-2"
              >
                Join Knowvy Community
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/admin"
                className="text-xs text-center font-mono text-[#5A6475] py-2"
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
