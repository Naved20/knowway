"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket, CheckCircle2, ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, Video } from "lucide-react";
import EventRegistrationModal from "./EventRegistrationModal";

export default function EventRegistrationSection({ event }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  useEffect(() => {
    async function checkUserStatus() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (meData.authenticated && meData.user) {
          setUser(meData.user);

          // Check if already registered
          const regRes = await fetch("/api/user/events");
          const regData = await regRes.json();
          if (regData.registrations) {
            const found = regData.registrations.find(
              (r) => r.eventSlug === event.slug && r.status === "confirmed"
            );
            if (found) {
              setIsRegistered(true);
              setTicketCode(found.ticketCode);
            }
          }
        }
      } catch (e) {
        console.error("Failed to check registration status:", e);
      }
    }

    checkUserStatus();
  }, [event.slug]);

  const handleRegistrationComplete = (data) => {
    setIsRegistered(true);
    setTicketCode(data.ticketCode);
  };

  const isConcluded = event.status === "Completed" || event.status === "Concluded";

  return (
    <>
      <div className="space-y-4">
        {isRegistered ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider block text-emerald-800">
                  You are registered!
                </span>
                <span className="text-xs text-emerald-700">Digital pass code:</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center font-mono font-bold text-sm text-slate-900">
              {ticketCode}
            </div>
            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View in Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : isConcluded ? (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-center">
            <span className="text-xs font-semibold block">Event Completed</span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Registrations are closed for this past edition.
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-display font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 active:scale-[0.99] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>{user ? "1-Click Register for Event" : "Register / Claim Free Pass"}</span>
            </button>

            {user && (
              <p className="text-[11px] text-center text-slate-500">
                Logged in as <strong>{user.name}</strong> • Instant pass issue
              </p>
            )}
          </div>
        )}

        {/* Benefits list */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Instant email confirmation with digital pass</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Google Calendar .ics invite automatically sent</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Ecosystem networking & mentor access</span>
          </div>
        </div>
      </div>

      <EventRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={event}
        onRegistered={handleRegistrationComplete}
      />
    </>
  );
}
