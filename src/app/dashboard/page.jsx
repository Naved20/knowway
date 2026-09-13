"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Ticket,
  User,
  Shield,
  Bell,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
  Copy,
  ExternalLink,
  ChevronRight,
  School,
  Phone,
  Lock,
  CalendarPlus,
  XCircle,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

export default function DashboardPage() {
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState("events"); // "events" | "explore" | "profile" | "preferences"
  const [allEvents, setAllEvents] = useState([]);

  // Profile Edit State
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [github, setGithub] = useState("");
  const [phone, setPhone] = useState("");
  const [promotionalEmails, setPromotionalEmails] = useState(true);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback notifications
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [copiedCode, setCopiedCode] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Initial Fetch
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);

        // 1. Fetch user session & profile
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (!meRes.ok || !meData.authenticated) {
          router.push("/login?redirect=/dashboard");
          return;
        }

        setUser(meData.user);
        setName(meData.user.name || "");
        setCollege(meData.user.college || "");
        setYear(meData.user.year || "");
        setGithub(meData.user.github || "");
        setPhone(meData.user.phone || "");
        setPromotionalEmails(meData.user.emailPreferences?.promotional !== false);

        // 2. Fetch registrations
        const regRes = await fetch("/api/user/events");
        const regData = await regRes.json();
        if (regRes.ok) {
          setRegistrations(regData.registrations || []);
        }

        // 3. Fetch explore events
        const eventsRes = await fetch("/api/events");
        const eventsData = await eventsRes.json();
        if (eventsRes.ok) {
          setAllEvents(eventsData.events || []);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Copy Ticket Code
  const handleCopyTicket = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // Cancel Registration
  const handleCancelRegistration = async (regId, eventTitle) => {
    if (!confirm(`Are you sure you want to cancel your RSVP for "${eventTitle}"?`)) {
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch("/api/user/events/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: regId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel registration.");

      // Refresh registrations list
      setRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: "cancelled" } : r))
      );
      setFeedback({ type: "success", message: "Registration cancelled successfully." });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
      setTimeout(() => setFeedback({ type: "", message: "" }), 4000);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const payload = {
        name,
        college,
        year,
        github,
        phone,
        emailPreferences: { promotional: promotionalEmails },
      };

      if (newPassword) {
        if (!currentPassword) {
          throw new Error("Current password is required to change password.");
        }
        if (newPassword.length < 8) {
          throw new Error("New password must be at least 8 characters long.");
        }
        if (newPassword !== confirmPassword) {
          throw new Error("New passwords do not match.");
        }
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile.");

      setUser(data.user);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFeedback({ type: "success", message: "Profile & preferences saved successfully!" });
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
      setTimeout(() => setFeedback({ type: "", message: "" }), 4000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="mt-4 text-xs font-mono text-slate-500">Loading your builder profile...</p>
      </div>
    );
  }

  const confirmedPasses = registrations.filter((r) => r.status === "confirmed");

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto bg-slate-50">
      {/* Top Banner & User Profile Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-display font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : "B"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  {user?.name || "Knowvy Builder"}
                </h1>
                {user?.role === "admin" && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-200">
                    ADMIN
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                  CENTRAL INDIA BUILDER
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <span>{user?.email}</span>
                {user?.college && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      {user.college}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="block text-xl font-bold font-display text-slate-900">
                {confirmedPasses.length}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Active Passes</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="block text-xl font-bold font-display text-slate-900">
                {registrations.length}
              </span>
              <span className="text-[11px] font-medium text-slate-500">Total RSVPs</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "events"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            My Event Passes ({registrations.length})
          </button>

          <button
            onClick={() => setActiveTab("explore")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "explore"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Explore Hackathons
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile & Security
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "preferences"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Email Notifications
          </button>

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="ml-auto px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              Admin Portal
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Global Toast Feedback */}
      {feedback.message && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{feedback.message}</span>
        </div>
      )}

      {/* TAB 1: MY REGISTERED EVENTS / PASSES */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Your Registered Events & Digital Passes
            </h2>
            <button
              onClick={() => setActiveTab("explore")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              Browse more events <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {registrations.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Ticket className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No event passes yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                You have not registered for any upcoming events. Explore upcoming Central India hackathons and claim your builder pass!
              </p>
              <button
                onClick={() => setActiveTab("explore")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-blue-500/20"
              >
                Explore Active Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrations.map((reg) => {
                const ev = reg.event || {};
                const isConfirmed = reg.status === "confirmed";

                return (
                  <div
                    key={reg.id}
                    className={`bg-white border rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                      isConfirmed ? "border-slate-200" : "border-slate-200/60 opacity-80"
                    }`}
                  >
                    {/* Event Banner & Badges */}
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      {ev.banner ? (
                        <Image
                          src={ev.banner}
                          alt={ev.title || "Event banner"}
                          fill
                          className="object-cover opacity-90"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
                          <Ticket className="w-12 h-12 text-slate-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                      {/* Top Floating Status Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md ${
                            reg.status === "confirmed"
                              ? "bg-emerald-500/90 text-white"
                              : reg.status === "attended"
                              ? "bg-blue-500/90 text-white"
                              : "bg-rose-500/90 text-white"
                          }`}
                        >
                          {reg.status}
                        </span>
                        {ev.category && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/80 text-slate-800 backdrop-blur-md">
                            {ev.category}
                          </span>
                        )}
                      </div>

                      {/* Title on Banner */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold font-display leading-tight truncate">
                          {ev.title || reg.eventSlug}
                        </h3>
                      </div>
                    </div>

                    {/* Pass Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2.5 mb-5">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{ev.date || "Date TBA"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                          <span>{ev.time || "10:00 AM - 06:00 PM IST"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          {ev.meetingLink ? (
                            <Video className="w-4 h-4 text-purple-600 shrink-0" />
                          ) : (
                            <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                          <span className="truncate">{ev.location || "Central India"}</span>
                        </div>
                      </div>

                      {/* Digital Ticket Pass Stub */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between mb-4">
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                            DIGITAL TICKET PASS
                          </span>
                          <span className="text-sm font-mono font-bold text-slate-900 tracking-wider">
                            {reg.ticketCode}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyTicket(reg.ticketCode)}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCode === reg.ticketCode ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy Code
                            </>
                          )}
                        </button>
                      </div>

                      {/* Action Links */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/events/${reg.eventSlug}`}
                            className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            View Event <ExternalLink className="w-3 h-3" />
                          </Link>

                          {ev.meetingLink && (
                            <a
                              href={ev.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                            >
                              Join Meet <Video className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {isConfirmed && (
                          <button
                            disabled={actionLoading}
                            onClick={() => handleCancelRegistration(reg.id, ev.title)}
                            className="text-slate-400 hover:text-rose-600 text-[11px] font-medium transition-colors cursor-pointer"
                          >
                            Cancel RSVP
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EXPLORE EVENTS */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">
                Explore Flagship Hackathons & Tracks
              </h2>
              <p className="text-xs text-slate-500">
                RSVP directly using your authenticated Knowvy builder profile
              </p>
            </div>
            <Link
              href="/events"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              Full Events Directory <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((ev) => {
              const alreadyRegistered = registrations.some(
                (r) => r.eventSlug === ev.slug && r.status === "confirmed"
              );

              return (
                <div
                  key={ev.id || ev.slug}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    {ev.banner ? (
                      <Image
                        src={ev.banner}
                        alt={ev.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-600">
                        <Calendar className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-sm">
                        {ev.category || "Hackathon"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold font-display text-slate-900 mb-1.5">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                        {ev.shortDescription || ev.about}
                      </p>

                      <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{ev.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-600" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/events/${ev.slug}`}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                      >
                        Learn Details
                      </Link>

                      {alreadyRegistered ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Registered
                        </span>
                      ) : (
                        <Link
                          href={`/events/${ev.slug}#rsvp`}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm shadow-blue-500/20"
                        >
                          Register Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PROFILE & SECURITY */}
      {activeTab === "profile" && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
            Builder Profile & Credentials
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Keep your student and developer information up to date for hackathon registrations
          </p>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address (Verified)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-mono text-slate-500 cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. MANIT Bhopal"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g. 2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="e.g. aditya-dev"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Change Password Section */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold font-display text-slate-900 mb-1">
                Change Password (Optional)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Leave blank if you do not wish to change your password
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? "Saving Changes..." : "Save Profile Settings"}
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: EMAIL NOTIFICATION PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
            Email & Notification Preferences
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Configure how and when the Knowvy Ecosystem communicates with your email address
          </p>

          <div className="space-y-6">
            {/* Essential Notifications (Immutable) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-semibold text-sm text-slate-900 block">
                  Transactional & Event Passes (Always Active)
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Required notifications for your registrations, 6-digit OTP codes, digital ticket passes, and critical venue/schedule updates.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                MANDATORY
              </span>
            </div>

            {/* Promotional Broadcasts (Toggleable) */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="font-semibold text-sm text-slate-900 block">
                  New Hackathon & Meetup Announcements
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Receive email invitations when new hackathons, mentor sessions, partner tracks, or bounties are announced.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={promotionalEmails}
                  onChange={(e) => {
                    setPromotionalEmails(e.target.checked);
                    // Autosave immediately
                    fetch("/api/auth/profile", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        emailPreferences: { promotional: e.target.checked },
                      }),
                    }).then(() => {
                      setFeedback({
                        type: "success",
                        message: `Email preferences updated: Promotional emails ${
                          e.target.checked ? "enabled" : "disabled"
                        }.`,
                      });
                      setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
                    });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
