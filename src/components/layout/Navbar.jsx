"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  User,
  Ticket,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { brandData } from "@/data/knowvy-data";

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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Fetch session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    }

    checkAuth();
  }, [pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setUserDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setUserDropdownOpen(false);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

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
          <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-black border border-slate-200 flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 group-hover:border-blue-500/60 transition-all">
            <Image
              src="/images/knowvy-logo.png"
              alt="Knowvy Tiger Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              KNOWVY
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
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
                    ? "bg-blue-50 text-blue-600 font-semibold border border-blue-200 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Profile Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {user ? (
            /* Logged in User Menu */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 text-slate-800 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-xs font-semibold max-w-[120px] truncate">
                  {user.name || "Builder"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 p-2 shadow-xl shadow-slate-300/30 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate font-mono">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
                  >
                    <Ticket className="w-4 h-4 text-blue-600" />
                    <span>My Passes & Dashboard</span>
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span>Admin Workspace</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors mt-1 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged out: Sign In & Register */
            <>
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>Register</span>
              </Link>
            </>
          )}

          <a
            href={brandData.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold font-display shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all ml-1"
          >
            <span>Join</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Controls (Hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          {user && (
            <Link
              href="/dashboard"
              className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center"
            >
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl glass-nav-pill text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 p-5 shadow-2xl animate-in slide-in-from-top-3 duration-200 pointer-events-auto">
          <nav className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-bold border border-blue-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 text-center font-bold text-sm border border-blue-200"
                  >
                    My Passes & Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="w-full py-2 rounded-xl bg-purple-50 text-purple-700 text-center font-bold text-xs border border-purple-200"
                    >
                      Admin Portal
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-xl bg-slate-100 text-slate-600 text-center text-xs"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    className="py-2.5 rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="py-2.5 rounded-xl bg-slate-900 text-center text-xs font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              )}

              <a
                href={brandData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center font-bold font-display text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 mt-1"
              >
                Join Knowvy Community
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
