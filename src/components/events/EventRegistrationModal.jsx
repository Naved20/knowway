"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Ticket,
  Calendar,
  MapPin,
  Mail,
  User,
  School,
  Github,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function EventRegistrationModal({ isOpen, onClose, event, onRegistered }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [github, setGithub] = useState("");

  // Check auth session on open
  useEffect(() => {
    if (!isOpen) return;

    setError("");
    setSuccessData(null);
    setCopied(false);

    async function checkAuth() {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setSession(data.user);
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setCollege(data.user.college || "");
          setYear(data.user.year || "");
          setGithub(data.user.github || "");
        } else {
          setSession(null);
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          college: college.trim(),
          year: year.trim(),
          github: github.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register for this event.");
      }

      setSuccessData(data);
      if (onRegistered) onRegistered(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="bg-slate-950 text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {event.category || "Hackathon"}
            </span>
            <span className="text-xs text-slate-400 font-mono">Free Builder RSVP</span>
          </div>
          <h2 className="text-xl font-bold font-display leading-tight pr-6">
            {event.title}
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-300 mt-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {event.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              {event.location}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {/* SUCCESS STATE */}
          {successData ? (
            <div className="text-center py-2 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Registration Confirmed! 🎉
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  Your spot is secured. We have dispatched a confirmation email with your digital ticket pass and Google Calendar invite to <strong className="text-slate-900">{email}</strong>.
                </p>
              </div>

              {/* Ticket Pass Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    YOUR TICKET PASS CODE
                  </span>
                  <button
                    onClick={() => handleCopyCode(successData.ticketCode)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? (
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
                <div className="text-lg font-mono font-black text-slate-900 tracking-wider">
                  {successData.ticketCode}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                  >
                    <span>View Pass in Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    href={`/register?redirect=/dashboard`}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-orange-300" />
                    <span>Create Free Account to Save Pass</span>
                  </Link>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 font-medium text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Authenticated user banner */}
              {session ? (
                <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Registering as <strong>{session.name}</strong> ({session.email})</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Already have an account?</span>
                  <Link
                    href={`/login?redirect=/events/${event.slug}`}
                    className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Sign In for 1-Click RSVP
                  </Link>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aditya Sharma"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="builder@knowvy.xyz"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / Institute
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="MANIT Bhopal"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GitHub Username
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="octocat"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold font-display text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Claim Free Digital Pass</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-2 font-mono">
                  Instant ticket pass & Google Calendar invite sent via Knowvy SMTP
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
