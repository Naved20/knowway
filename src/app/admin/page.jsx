"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Shield,
  Calendar,
  Users,
  Ticket,
  Mail,
  Send,
  Download,
  Plus,
  Edit2,
  Trash2,
  Bell,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter,
  Lock,
  ArrowRight,
  Sparkles,
  Search,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react";

function AdminPortal() {
  const router = useRouter();

  // Auth & Permissions State
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState("knowvy1@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Tab: "overview" | "events" | "attendees" | "users" | "broadcast" | "logs"
  const [activeTab, setActiveTab] = useState("overview");

  // Data States
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [queueStatus, setQueueStatus] = useState({ pending: 0, processing: 0, failed: 0 });
  const [loadingData, setLoadingData] = useState(false);

  // Modals & Forms
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderTargetEvent, setReminderTargetEvent] = useState(null);
  const [reminderType, setReminderType] = useState("24h");
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [followUpTargetEvent, setFollowUpTargetEvent] = useState(null);
  const [feedbackUrl, setFeedbackUrl] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: "",
    slug: "",
    category: "Hackathon",
    status: "Upcoming",
    isPublished: true,
    date: "",
    time: "10:00 AM - 06:00 PM IST",
    location: "MANIT Bhopal, India",
    meetingLink: "",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    shortDescription: "",
    about: "",
    maxCapacity: 200,
  });

  // Broadcast Form State
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastContent, setBroadcastContent] = useState("");
  const [broadcastAudience, setBroadcastAudience] = useState("subscribers"); // "subscribers" | "all" | "event"
  const [broadcastEventSlug, setBroadcastEventSlug] = useState("");
  const [broadcastActionText, setBroadcastActionText] = useState("Open Knowvy");
  const [broadcastActionUrl, setBroadcastActionUrl] = useState("https://knowvy.xyz");
  const [broadcastSending, setBroadcastSending] = useState(false);

  // Filter States
  const [attendeeEventFilter, setAttendeeEventFilter] = useState("all");
  const [attendeeSearch, setAttendeeSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Global Notification Feedback
  const [notice, setNotice] = useState({ type: "", text: "" });

  const showToast = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice({ type: "", text: "" }), 5000);
  };

  // 1. Check Admin Auth on load
  const checkAdminAuth = async () => {
    try {
      setAuthChecking(true);
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated && data.user?.role === "admin") {
        setIsAdmin(true);
        loadAdminData();
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      setIsAdmin(false);
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
  }, []);

  // 2. Fetch All Admin Datasets
  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [statsRes, eventsRes, regsRes, usersRes, logsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/events?all=true"),
        fetch("/api/admin/registrations"),
        fetch("/api/admin/users"),
        fetch("/api/admin/email/logs"),
      ]);

      if (statsRes.ok) {
        const d = await statsRes.json();
        setStats(d.stats);
        if (d.queueStatus) setQueueStatus(d.queueStatus);
      }
      if (eventsRes.ok) {
        const d = await eventsRes.json();
        setEvents(d.events || []);
      }
      if (regsRes.ok) {
        const d = await regsRes.json();
        setAttendees(d.registrations || []);
      }
      if (usersRes.ok) {
        const d = await usersRes.json();
        setUsers(d.users || []);
      }
      if (logsRes.ok) {
        const d = await logsRes.json();
        setLogs(d.logs || []);
        if (d.queueStatus) setQueueStatus(d.queueStatus);
      }
    } catch (err) {
      console.error("Failed to load admin datasets:", err);
      showToast("error", "Error loading some dashboard datasets.");
    } finally {
      setLoadingData(false);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid credentials.");

      if (data.user?.role !== "admin") {
        throw new Error("This account does not have administrative privileges.");
      }

      setIsAdmin(true);
      loadAdminData();
      showToast("success", "Admin session authenticated successfully!");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // Create or Update Event
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        // Update
        const res = await fetch(`/api/events/${editingEvent.slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update event.");
        showToast("success", "Event updated successfully!");
      } else {
        // Create
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create event.");
        showToast("success", "Event created! Promotional announcement queued.");
      }

      setShowEventModal(false);
      setEditingEvent(null);
      loadAdminData();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Delete Event
  const handleDeleteEvent = async (slug, title) => {
    if (!confirm(`Are you sure you want to delete event "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/events/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete event.");
      showToast("success", "Event deleted.");
      loadAdminData();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Update Attendee Status
  const handleUpdateAttendeeStatus = async (regId, status) => {
    try {
      const res = await fetch(`/api/admin/registrations/${regId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status.");

      setAttendees((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status } : r))
      );
      showToast("success", `Attendee marked as ${status}.`);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Trigger 24h / 2h Event Reminder
  const handleSendReminder = async () => {
    if (!reminderTargetEvent) return;
    try {
      const res = await fetch(`/api/admin/events/${reminderTargetEvent.id}/remind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reminderType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to queue reminders.");

      showToast("success", data.message);
      setShowReminderModal(false);
      loadAdminData();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Trigger Post-Event Follow-up
  const handleSendFollowUp = async () => {
    if (!followUpTargetEvent) return;
    try {
      const res = await fetch(`/api/admin/events/${followUpTargetEvent.id}/follow-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackUrl, resourceUrl, message: followUpMessage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to queue follow-ups.");

      showToast("success", data.message);
      setShowFollowUpModal(false);
      loadAdminData();
    } catch (err) {
      showToast("error", err.message);
    }
  };

  // Send Broadcast Announcement
  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastContent) return;

    setBroadcastSending(true);
    try {
      const res = await fetch("/api/admin/email/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: broadcastSubject,
          content: broadcastContent,
          targetAudience: broadcastAudience,
          eventSlug: broadcastEventSlug,
          actionText: broadcastActionText,
          actionUrl: broadcastActionUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to dispatch broadcast.");

      showToast("success", data.message);
      setBroadcastSubject("");
      setBroadcastContent("");
      loadAdminData();
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setBroadcastSending(false);
    }
  };

  // Flush Queue Now
  const handleFlushQueue = async () => {
    try {
      const res = await fetch("/api/admin/email/process-queue", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        showToast("success", data.message);
        loadAdminData();
      }
    } catch (e) {
      showToast("error", "Failed to process queue.");
    }
  };

  // Filtered Attendees
  const filteredAttendees = attendees.filter((a) => {
    const matchesEvent = attendeeEventFilter === "all" || a.eventSlug === attendeeEventFilter;
    const matchesSearch =
      !attendeeSearch ||
      (a.userName || "").toLowerCase().includes(attendeeSearch.toLowerCase()) ||
      (a.userEmail || "").toLowerCase().includes(attendeeSearch.toLowerCase()) ||
      (a.ticketCode || "").toLowerCase().includes(attendeeSearch.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    if (!userSearch) return true;
    const q = userSearch.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.college || "").toLowerCase().includes(q)
    );
  });

  // 1. Loading Screen
  if (authChecking) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-3 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
        <p className="mt-4 text-xs font-mono text-slate-500">Checking administrator authorization...</p>
      </div>
    );
  }

  // 2. Unauthenticated Admin Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden bg-slate-50">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto mb-3 text-purple-700 shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-900">Admin Studio</h1>
            <p className="text-xs text-slate-500 mt-1">
              Protected workspace for Knowvy community directors and event leads
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Master Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold font-display text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Admin Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs font-mono text-slate-400 hover:text-slate-700">
              ← Return to Knowvy Public Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                ADMIN CONTROL CENTER
              </span>
              <span className="text-xs text-slate-400 font-mono">Central India Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Knowvy Management Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Events CRUD, attendee management, ticket passes, and SMTP email broadcasting
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadAdminData}
              disabled={loadingData}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={() => {
                setEditingEvent(null);
                setEventForm({
                  title: "",
                  slug: "",
                  category: "Hackathon",
                  status: "Upcoming",
                  isPublished: true,
                  date: "",
                  time: "10:00 AM - 06:00 PM IST",
                  location: "MANIT Bhopal, India",
                  meetingLink: "",
                  banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
                  shortDescription: "",
                  about: "",
                  maxCapacity: 200,
                });
                setShowEventModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Overview & Metrics
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "events"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Event Studio ({events.length})
          </button>

          <button
            onClick={() => setActiveTab("attendees")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "attendees"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            Attendees & CSV ({attendees.length})
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "users"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            User Directory ({users.length})
          </button>

          <button
            onClick={() => setActiveTab("broadcast")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "broadcast"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Email Broadcast Center
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === "logs"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Delivery Logs ({logs.length})
          </button>
        </div>
      </div>

      {/* Global Toast Notice */}
      {notice.text && (
        <div
          className={`mb-6 p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200 ${
            notice.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{notice.text}</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Builders</span>
              <span className="text-2xl font-bold font-display text-slate-900 mt-1 block">
                {stats?.totalUsers || users.length}
              </span>
              <span className="text-[10px] text-emerald-600 font-mono mt-1 block">
                OTP verified & active
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total Events</span>
              <span className="text-2xl font-bold font-display text-slate-900 mt-1 block">
                {events.length}
              </span>
              <span className="text-[10px] text-blue-600 font-mono mt-1 block">
                {events.filter((e) => e.isPublished).length} published live
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">Total RSVPs Issued</span>
              <span className="text-2xl font-bold font-display text-slate-900 mt-1 block">
                {attendees.length}
              </span>
              <span className="text-[10px] text-purple-600 font-mono mt-1 block">
                Digital ticket passes
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block">SMTP Queue Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold font-display text-slate-900">
                  {queueStatus.pending}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  pending
                </span>
              </div>
              <button
                onClick={handleFlushQueue}
                className="text-[10px] text-blue-600 hover:underline font-semibold mt-1 block cursor-pointer"
              >
                Flush queue now →
              </button>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Publish New Event
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Draft a hackathon, tech session, or roadmap. Automatically notifies all opted-in subscribers.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowEventModal(true);
                }}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Launch Event Modal
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Export Attendee Roster
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Download real-time CSV of all registered builders, ticket codes, colleges, and contact info.
                </p>
              </div>
              <a
                href="/api/admin/registrations?format=csv"
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download All RSVPs (CSV)</span>
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Ecosystem Broadcast
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Send targeted announcements to subscribers or attendees of a specific event via background queue.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("broadcast")}
                className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Open Broadcast Composer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVENT STUDIO */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Manage Ecosystem Events ({events.length})
            </h2>
            <button
              onClick={() => {
                setEditingEvent(null);
                setEventForm({
                  title: "",
                  slug: "",
                  category: "Hackathon",
                  status: "Upcoming",
                  isPublished: true,
                  date: "",
                  time: "10:00 AM - 06:00 PM IST",
                  location: "MANIT Bhopal, India",
                  meetingLink: "",
                  banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
                  shortDescription: "",
                  about: "",
                  maxCapacity: 200,
                });
                setShowEventModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((ev) => {
              const count = attendees.filter((a) => a.eventSlug === ev.slug).length;

              return (
                <div
                  key={ev.id || ev.slug}
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            ev.isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {ev.isPublished ? "Published" : "Draft"}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {ev.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-800">
                        {count} / {ev.maxCapacity || "200"} RSVPs
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-display text-slate-900 mb-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mb-3">
                      Slug: <code className="text-blue-600">/events/{ev.slug}</code>
                    </p>

                    <div className="space-y-1 text-xs text-slate-600 mb-5">
                      <div>🗓️ {ev.date}</div>
                      <div>📍 {ev.location}</div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingEvent(ev);
                          setEventForm({
                            title: ev.title,
                            slug: ev.slug,
                            category: ev.category || "Hackathon",
                            status: ev.status || "Upcoming",
                            isPublished: Boolean(ev.isPublished),
                            date: ev.date || "",
                            time: ev.time || "",
                            location: ev.location || "",
                            meetingLink: ev.meetingLink || "",
                            banner: ev.banner || "",
                            shortDescription: ev.shortDescription || "",
                            about: ev.about || "",
                            maxCapacity: ev.maxCapacity || 200,
                          });
                          setShowEventModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setReminderTargetEvent(ev);
                          setShowReminderModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Bell className="w-3 h-3" />
                        Remind ({count})
                      </button>

                      <button
                        onClick={() => {
                          setFollowUpTargetEvent(ev);
                          setShowFollowUpModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        Follow-up
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(ev.slug, ev.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDEES & CSV EXPORT */}
      {activeTab === "attendees" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900">
                  Attendee Roster ({filteredAttendees.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time registry of event passes and check-in statuses
                </p>
              </div>

              {/* CSV Export Button */}
              <a
                href={`/api/admin/registrations?format=csv${
                  attendeeEventFilter !== "all" ? `&eventSlug=${attendeeEventFilter}` : ""
                }`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Roster (CSV)</span>
              </a>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Filter by Event
                </label>
                <select
                  value={attendeeEventFilter}
                  onChange={(e) => setAttendeeEventFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                >
                  <option value="all">All Events ({attendees.length})</option>
                  {events.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Search Attendee
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={attendeeSearch}
                    onChange={(e) => setAttendeeSearch(e.target.value)}
                    placeholder="Search by name, email, or ticket code..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Ticket Pass</th>
                    <th className="py-3 px-4">Attendee Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">College / Year</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAttendees.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                        No attendees found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendees.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {att.ticketCode}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {att.userName || "Anonymous"}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{att.userEmail}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium truncate max-w-[140px]">
                          {att.eventSlug}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {att.college || "—"} {att.year ? `(${att.year})` : ""}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              att.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : att.status === "attended"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {att.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={att.status}
                            onChange={(e) => handleUpdateAttendeeStatus(att.id, e.target.value)}
                            className="text-[11px] px-2 py-1 rounded bg-white border border-slate-200 text-slate-700 focus:outline-none cursor-pointer"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="attended">Attended</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="waitlist">Waitlist</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USER DIRECTORY */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900">
                  Registered Builder Directory ({filteredUsers.length})
                </h2>
                <p className="text-xs text-slate-500">
                  All builders registered on Knowvy with scrypt authentication
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user name or college..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">College</th>
                    <th className="py-3 px-4">GitHub</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">RSVPs</th>
                    <th className="py-3 px-4">Promotions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{u.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{u.email}</td>
                      <td className="py-3 px-4 text-slate-600">{u.college || "—"}</td>
                      <td className="py-3 px-4 font-mono text-blue-600">
                        {u.github ? `@${u.github}` : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        {u.registrationsCount || 0}
                      </td>
                      <td className="py-3 px-4">
                        {u.emailPreferences?.promotional !== false ? (
                          <span className="text-emerald-600 font-medium">Subscribed</span>
                        ) : (
                          <span className="text-slate-400 font-medium">Opted Out</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EMAIL BROADCAST CENTER */}
      {activeTab === "broadcast" && (
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <h2 className="text-lg font-bold font-display text-slate-900">
              Compose Ecosystem Broadcast
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dispatch branded announcements to your builder network. Emails are queued and delivered with rate-limit protection.
            </p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Audience *
              </label>
              <select
                value={broadcastAudience}
                onChange={(e) => setBroadcastAudience(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              >
                <option value="subscribers">
                  Subscribed Users Only (Promotional Opt-Ins) — Recommended
                </option>
                <option value="all">All Registered Builders (Important Ecosystem Updates)</option>
                <option value="event">Registered Attendees of Specific Event</option>
              </select>
            </div>

            {broadcastAudience === "event" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Event *
                </label>
                <select
                  value={broadcastEventSlug}
                  onChange={(e) => setBroadcastEventSlug(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                >
                  <option value="">Choose an event...</option>
                  {events.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.title} ({e.slug})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Subject *
              </label>
              <input
                type="text"
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                placeholder="🚀 New Flagship Hackathon Announcement: Register Now"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Message Body *
              </label>
              <textarea
                rows={6}
                value={broadcastContent}
                onChange={(e) => setBroadcastContent(e.target.value)}
                placeholder="Write your announcement message here..."
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Action Button Label
                </label>
                <input
                  type="text"
                  value={broadcastActionText}
                  onChange={(e) => setBroadcastActionText(e.target.value)}
                  placeholder="View Details & RSVP"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Action Link URL
                </label>
                <input
                  type="url"
                  value={broadcastActionUrl}
                  onChange={(e) => setBroadcastActionUrl(e.target.value)}
                  placeholder="https://knowvy.xyz/events"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={broadcastSending}
              className="w-full mt-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer disabled:opacity-50"
            >
              {broadcastSending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Queue Broadcast to Subscribers</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: EMAIL DELIVERY LOGS */}
      {activeTab === "logs" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900">
                  SMTP Delivery Logs ({logs.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Detailed delivery audit trail for OTP codes, tickets, and reminders
                </p>
              </div>

              <button
                onClick={handleFlushQueue}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Process Backlog Now
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Recipient</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-900">{l.to}</td>
                      <td className="py-3 px-4 font-mono uppercase text-[10px] text-slate-500">
                        {l.category}
                      </td>
                      <td className="py-3 px-4 text-slate-700 max-w-[200px] truncate">{l.subject}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            l.status === "delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : l.status === "queued"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                        {new Date(l.sentAt || l.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EVENT CREATE / EDIT */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <h2 className="text-xl font-bold font-display text-slate-900 mb-1">
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {editingEvent
                ? "Update event metadata and optionally notify registered attendees."
                : "New published events automatically queue promotional announcements."}
            </p>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "");
                      setEventForm((prev) => ({
                        ...prev,
                        title,
                        slug: editingEvent ? prev.slug : slug,
                      }));
                    }}
                    required
                    placeholder="Central India AI Hackathon"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Slug (URL path) *
                  </label>
                  <input
                    type="text"
                    value={eventForm.slug}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    required
                    disabled={Boolean(editingEvent)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="Hackathon"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={eventForm.maxCapacity}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        maxCapacity: parseInt(e.target.value, 10) || 200,
                      }))
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, date: e.target.value }))
                    }
                    placeholder="October 15, 2026"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, time: e.target.value }))
                    }
                    placeholder="10:00 AM - 06:00 PM IST"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="MANIT Bhopal (Auditorium Hall)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Virtual Meeting Link (If Online / Hybrid)
                </label>
                <input
                  type="url"
                  value={eventForm.meetingLink}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, meetingLink: e.target.value }))
                  }
                  placeholder="https://meet.google.com/xyz-abc-def"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={eventForm.banner}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, banner: e.target.value }))
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={eventForm.shortDescription}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, shortDescription: e.target.value }))
                  }
                  placeholder="Brief summary for event cards..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={eventForm.isPublished}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, isPublished: e.target.checked }))
                  }
                  className="rounded border-slate-300 text-blue-600"
                />
                <label htmlFor="pubCheck" className="text-xs text-slate-700 font-medium">
                  Publish live immediately (queues announcement broadcast)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REMINDER DISPATCH */}
      {showReminderModal && reminderTargetEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
              Dispatch Event Reminder
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Send an automated reminder with event date, time, and ticket pass to registered attendees of <strong>{reminderTargetEvent.title}</strong>.
            </p>

            <div className="space-y-3 mb-6">
              <label className="block text-xs font-semibold text-slate-700">Reminder Timing</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReminderType("24h")}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                    reminderType === "24h"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  24 Hours Before
                </button>
                <button
                  type="button"
                  onClick={() => setReminderType("2h")}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                    reminderType === "2h"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  2 Hours Before (Final Call)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowReminderModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReminder}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-md shadow-blue-500/20"
              >
                Send Reminders Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POST-EVENT FOLLOW-UP */}
      {showFollowUpModal && followUpTargetEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-lg font-bold font-display text-slate-900 mb-1">
              Post-Event Follow-Up
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Thank attendees for participating in <strong>{followUpTargetEvent.title}</strong> and share feedback forms, slides, or certificates.
            </p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Feedback Form URL (Optional)
                </label>
                <input
                  type="url"
                  value={feedbackUrl}
                  onChange={(e) => setFeedbackUrl(e.target.value)}
                  placeholder="https://forms.gle/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource / Certificate Folder Link (Optional)
                </label>
                <input
                  type="url"
                  value={resourceUrl}
                  onChange={(e) => setResourceUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFollowUp}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs cursor-pointer shadow-md shadow-purple-500/20"
              >
                Queue Follow-Up Emails
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-500">Loading admin console...</div>}>
      <AdminPortal />
    </Suspense>
  );
}
