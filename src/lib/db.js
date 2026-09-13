import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { eventsData } from "@/data/knowvy-data";
import { hashPassword, verifyPassword } from "./auth";

// ─────────────────────────────────────────────────────────────────────────────
// Supabase Client (lazy-initialized)
// ─────────────────────────────────────────────────────────────────────────────
let supabaseClient = null;

function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || key === url) {
    throw new Error(
      "[DB] Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables."
    );
  }

  supabaseClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return supabaseClient;
}

const STORE_KEY = "knowvy_main_db";

// ─────────────────────────────────────────────────────────────────────────────
// In-memory cache (warm requests within same function instance)
// ─────────────────────────────────────────────────────────────────────────────
let cache = null;
let initPromise = null;

function getInitialState() {
  return {
    users: [],
    otps: [],
    events: [],
    registrations: [],
    emailLogs: [],
    emailQueue: [],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Read from Supabase
// ─────────────────────────────────────────────────────────────────────────────
async function readFromSupabase() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("knowvy_store")
    .select("value")
    .eq("key", STORE_KEY)
    .maybeSingle();

  if (error) {
    console.error("[DB] Supabase read error:", error.message);
    return null;
  }
  return data?.value || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Write to Supabase (upsert)
// ─────────────────────────────────────────────────────────────────────────────
async function writeToSupabase(data) {
  const supabase = getSupabase();
  const { error } = await supabase.from("knowvy_store").upsert(
    { key: STORE_KEY, value: data, updated_at: new Date().toISOString() },
    { onConflict: "key" }
  );

  if (error) {
    console.error("[DB] Supabase write error:", error.message);
    throw new Error(`Failed to save database: ${error.message}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Initialize Database
// ─────────────────────────────────────────────────────────────────────────────
async function initializeDatabase() {
  // Try to load from Supabase
  let existing = null;
  try {
    existing = await readFromSupabase();
  } catch (e) {
    console.error("[DB] Could not connect to Supabase:", e.message);
  }

  if (existing && typeof existing === "object") {
    cache = existing;
  } else {
    cache = getInitialState();
  }

  // Ensure all collections exist
  if (!Array.isArray(cache.users)) cache.users = [];
  if (!Array.isArray(cache.otps)) cache.otps = [];
  if (!Array.isArray(cache.events)) cache.events = [];
  if (!Array.isArray(cache.registrations)) cache.registrations = [];
  if (!Array.isArray(cache.emailLogs)) cache.emailLogs = [];
  if (!Array.isArray(cache.emailQueue)) cache.emailQueue = [];

  let needsSave = false;

  // 1. Seed Events if empty
  if (cache.events.length === 0 && Array.isArray(eventsData) && eventsData.length > 0) {
    cache.events = eventsData.map((ev) => ({
      id: `evt_${crypto.randomUUID()}`,
      slug: ev.slug,
      title: ev.title,
      category: ev.category || "Hackathon",
      status: ev.status || "Upcoming",
      isPublished: true,
      date: ev.date || "Upcoming 2026",
      time: "10:00 AM - 06:00 PM IST",
      location: ev.location || "Bhopal, India",
      meetingLink:
        ev.location?.includes("Online") || ev.location?.includes("Hybrid")
          ? "https://meet.google.com/kno-wvy-bho"
          : "",
      banner: ev.banner,
      shortDescription: ev.shortDescription || "",
      about: ev.about || "",
      highlights: ev.highlights || [],
      challenges: ev.challenges || [],
      partners: ev.partners || ["Knowvy Community"],
      winningTeams: ev.winningTeams || [],
      maxCapacity: 200,
      registeredCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    needsSave = true;
  }

  // 2. Seed Default Admin Account
  const adminEmail = (
    process.env.ADMIN_EMAIL ||
    process.env.SMTP_USER ||
    "knowvy1@gmail.com"
  ).toLowerCase().trim();
  const existingAdmin = cache.users.find((u) => u.email === adminEmail);

  if (!existingAdmin) {
    const adminPass = (process.env.ADMIN_PASSWORD || "KnowvyAdmin2026!#")
      .replace(/^["']|["']$/g, "")
      .trim();
    const passwordHash = await hashPassword(adminPass);

    cache.users.push({
      id: `usr_admin_${crypto.randomBytes(4).toString("hex")}`,
      email: adminEmail,
      passwordHash,
      name: "Knowvy Administrator",
      role: "admin",
      college: "MANIT Bhopal",
      year: "Alumni",
      github: "knowvytech",
      phone: "+91 93026 89234",
      bio: "Official administrative lead of Knowvy Technologies developer ecosystem.",
      avatar: "/images/knowvy-logo.png",
      emailPreferences: { promotional: true, transactional: true },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    needsSave = true;
  }

  if (needsSave) {
    await writeToSupabase(cache);
  }

  return cache;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API — same as before, no changes needed in calling code
// ─────────────────────────────────────────────────────────────────────────────
export async function getDb() {
  if (cache) return cache;
  if (!initPromise) {
    initPromise = initializeDatabase().catch((err) => {
      initPromise = null;
      cache = null;
      throw err;
    });
  }
  return await initPromise;
}

export async function saveDb() {
  if (!cache) return;
  await writeToSupabase(cache);
}

// ─────────────────────────────────────────────────────────────────────────────
// User Operations
// ─────────────────────────────────────────────────────────────────────────────
export async function findUserByEmail(email) {
  const db = await getDb();
  if (!email) return null;
  return db.users.find((u) => u.email === email.toLowerCase().trim()) || null;
}

export async function findUserById(id) {
  const db = await getDb();
  return db.users.find((u) => u.id === id) || null;
}

export async function createUser({
  email, passwordHash, name, role = "user",
  college = "", year = "", github = "", phone = "", bio = "",
  emailPreferences = { promotional: true, transactional: true },
}) {
  const db = await getDb();
  const user = {
    id: `usr_${crypto.randomUUID()}`,
    email: email.toLowerCase().trim(),
    passwordHash,
    name: name.trim(),
    role: role === "admin" ? "admin" : "user",
    college: college.trim(),
    year: year.trim(),
    github: github.trim(),
    phone: phone.trim(),
    bio: bio.trim(),
    avatar: "",
    emailPreferences: {
      promotional: emailPreferences?.promotional !== false,
      transactional: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.users.push(user);
  await saveDb();
  return user;
}

export async function updateUser(id, updates) {
  const db = await getDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDb();
  return db.users[index];
}

export async function getAllUsers() {
  const db = await getDb();
  return db.users.map(({ passwordHash, ...safeUser }) => safeUser);
}

// ─────────────────────────────────────────────────────────────────────────────
// OTP Operations
// ─────────────────────────────────────────────────────────────────────────────
export async function saveOtp({ email, otpHash, purpose = "register", expiresInMinutes = 10 }) {
  const db = await getDb();
  const cleanEmail = email.toLowerCase().trim();
  db.otps = db.otps.filter((o) => !(o.email === cleanEmail && o.purpose === purpose));
  const otpRecord = {
    id: `otp_${crypto.randomUUID()}`,
    email: cleanEmail,
    otpHash,
    purpose,
    attempts: 0,
    maxAttempts: 5,
    expiresAt: Date.now() + expiresInMinutes * 60 * 1000,
    createdAt: Date.now(),
  };
  db.otps.push(otpRecord);
  await saveDb();
  return otpRecord;
}

export async function getOtpRecord(email, purpose = "register") {
  const db = await getDb();
  return db.otps.find((o) => o.email === email.toLowerCase().trim() && o.purpose === purpose) || null;
}

export async function incrementOtpAttempts(id) {
  const db = await getDb();
  const idx = db.otps.findIndex((o) => o.id === id);
  if (idx !== -1) { db.otps[idx].attempts += 1; await saveDb(); }
}

export async function deleteOtpRecord(id) {
  const db = await getDb();
  db.otps = db.otps.filter((o) => o.id !== id);
  await saveDb();
}

// ─────────────────────────────────────────────────────────────────────────────
// Events Operations
// ─────────────────────────────────────────────────────────────────────────────
export async function getPublishedEvents() {
  const db = await getDb();
  return db.events.filter((e) => e.isPublished !== false);
}

export async function getAllEventsAdmin() {
  return (await getDb()).events;
}

export async function getEventBySlug(slug) {
  const db = await getDb();
  return db.events.find((e) => e.slug === slug) || null;
}

export async function createEvent(eventData) {
  const db = await getDb();
  const slug = eventData.slug || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const newEvent = {
    id: `evt_${crypto.randomUUID()}`,
    slug,
    title: eventData.title,
    category: eventData.category || "Technical Workshop",
    status: eventData.status || "Upcoming",
    isPublished: eventData.isPublished !== false,
    date: eventData.date || "Upcoming 2026",
    time: eventData.time || "10:00 AM - 05:00 PM IST",
    location: eventData.location || "Bhopal, India",
    meetingLink: eventData.meetingLink || "",
    banner: eventData.banner || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    shortDescription: eventData.shortDescription || "",
    about: eventData.about || "",
    highlights: Array.isArray(eventData.highlights) ? eventData.highlights : [],
    challenges: Array.isArray(eventData.challenges) ? eventData.challenges : [],
    partners: Array.isArray(eventData.partners) ? eventData.partners : ["Knowvy Community"],
    winningTeams: Array.isArray(eventData.winningTeams) ? eventData.winningTeams : [],
    maxCapacity: Number(eventData.maxCapacity) || 150,
    registeredCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.events.unshift(newEvent);
  await saveDb();
  return newEvent;
}

export async function updateEvent(idOrSlug, updates) {
  const db = await getDb();
  const index = db.events.findIndex((e) => e.id === idOrSlug || e.slug === idOrSlug);
  if (index === -1) return null;
  db.events[index] = { ...db.events[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDb();
  return db.events[index];
}

export async function deleteEvent(idOrSlug) {
  const db = await getDb();
  const index = db.events.findIndex((e) => e.id === idOrSlug || e.slug === idOrSlug);
  if (index === -1) return false;
  db.events.splice(index, 1);
  await saveDb();
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Registrations Operations
// ─────────────────────────────────────────────────────────────────────────────
export function generateTicketCode(eventSlug) {
  const cleanSlug = (eventSlug || "EVT").toUpperCase().slice(0, 4);
  return `KNOWVY-${new Date().getFullYear()}-${cleanSlug}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function createRegistration({ eventSlug, eventTitle, userId, userEmail, userName, college = "", github = "", phone = "" }) {
  const db = await getDb();
  const cleanEmail = userEmail.toLowerCase().trim();
  const existing = db.registrations.find(
    (r) => r.eventSlug === eventSlug && r.userEmail === cleanEmail && r.status !== "cancelled"
  );
  if (existing) return { success: false, alreadyRegistered: true, registration: existing };

  const event = db.events.find((e) => e.slug === eventSlug);
  if (event?.maxCapacity && event.registeredCount >= event.maxCapacity) {
    return { success: false, capacityFull: true, error: "Event registration is at maximum capacity." };
  }

  const registration = {
    id: `reg_${crypto.randomUUID()}`,
    eventSlug,
    eventTitle: eventTitle || event?.title || eventSlug,
    userId: userId || null,
    userEmail: cleanEmail,
    userName: userName.trim(),
    college: college.trim(),
    github: github.trim(),
    phone: phone.trim(),
    status: "confirmed",
    ticketCode: generateTicketCode(eventSlug),
    registeredAt: new Date().toISOString(),
    reminder24hSent: false,
    reminder2hSent: false,
  };

  db.registrations.push(registration);
  if (event) event.registeredCount = (event.registeredCount || 0) + 1;
  await saveDb();
  return { success: true, registration };
}

export async function getUserRegistrations(userEmail, userId = null) {
  const db = await getDb();
  const cleanEmail = (userEmail || "").toLowerCase().trim();
  return db.registrations
    .filter((r) => (cleanEmail && r.userEmail === cleanEmail) || (userId && r.userId === userId))
    .map((reg) => {
      const event = db.events.find((e) => e.slug === reg.eventSlug) || {};
      return { ...reg, event: { title: event.title || reg.eventTitle, date: event.date, time: event.time, location: event.location, meetingLink: event.meetingLink, banner: event.banner, status: event.status } };
    })
    .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
}

export async function getEventRegistrations(eventSlug) {
  return (await getDb()).registrations.filter((r) => r.eventSlug === eventSlug);
}

export async function getAllRegistrations() {
  return (await getDb()).registrations;
}

export async function updateRegistrationStatus(id, status) {
  const db = await getDb();
  const reg = db.registrations.find((r) => r.id === id);
  if (!reg) return null;
  const oldStatus = reg.status;
  reg.status = status;
  const event = db.events.find((e) => e.slug === reg.eventSlug);
  if (event) {
    if (oldStatus !== "cancelled" && status === "cancelled") event.registeredCount = Math.max(0, (event.registeredCount || 1) - 1);
    else if (oldStatus === "cancelled" && status === "confirmed") event.registeredCount = (event.registeredCount || 0) + 1;
  }
  await saveDb();
  return reg;
}

// ─────────────────────────────────────────────────────────────────────────────
// Email Queue & Delivery Logging
// ─────────────────────────────────────────────────────────────────────────────
export async function enqueueEmail({ recipient, emailType = "transactional", subject, html, text, campaignId = null }) {
  const db = await getDb();
  const item = {
    id: `queue_${crypto.randomUUID()}`,
    recipient: recipient.toLowerCase().trim(),
    emailType, subject, html, text, campaignId,
    status: "pending", attempts: 0, maxAttempts: 3,
    error: null, scheduledAt: new Date().toISOString(), sentAt: null,
  };
  db.emailQueue.push(item);
  await saveDb();
  return item;
}

export async function logEmailDelivery({ recipient, emailType, subject, status, error = null, campaignId = null }) {
  const db = await getDb();
  const logItem = {
    id: `log_${crypto.randomUUID()}`,
    recipient: recipient.toLowerCase().trim(),
    emailType, subject, status, error, campaignId,
    sentAt: new Date().toISOString(),
  };
  db.emailLogs.unshift(logItem);
  if (db.emailLogs.length > 1000) db.emailLogs = db.emailLogs.slice(0, 1000);
  await saveDb();
  return logItem;
}

export async function getEmailLogs(limit = 100) {
  return (await getDb()).emailLogs.slice(0, limit);
}

export async function getQueueStatus() {
  const db = await getDb();
  return {
    pending: db.emailQueue.filter((q) => q.status === "pending").length,
    processing: db.emailQueue.filter((q) => q.status === "processing").length,
    failed: db.emailQueue.filter((q) => q.status === "failed").length,
    sent: db.emailLogs.filter((l) => l.status === "sent").length,
    totalLogs: db.emailLogs.length,
  };
}

export { verifyPassword };
