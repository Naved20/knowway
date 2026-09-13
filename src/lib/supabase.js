import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oaigwpwlrbylmzvlfskq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== "your-supabase-anon-key" &&
  !supabaseAnonKey.includes("placeholder")
);

// Graceful dummy fallback if key isn't provided yet to avoid throwing during SSG/build
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase Anon Key not set yet in .env") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase Anon Key not set yet in .env") }),
        delete: () => Promise.resolve({ data: null, error: new Error("Supabase Anon Key not set yet in .env") }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        signOut: () => Promise.resolve({ error: null }),
      },
    };

export function isSupabaseReady() {
  return isConfigured;
}

// -------------------------------------------------------------
// Core Helper Operations
// -------------------------------------------------------------

export async function subscribeNewsletter(email) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env" };
  }
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email, subscribed_at: new Date().toISOString() }]);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function submitContactMessage({ name, email, subject, message }) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env" };
  }
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([{ name, email, subject, message, created_at: new Date().toISOString() }]);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function registerEvent({ eventSlug, name, email, github, college, year }) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env" };
  }
  const { data, error } = await supabase
    .from("event_registrations")
    .insert([{
      event_slug: eventSlug,
      name,
      email,
      github,
      college,
      year,
      registered_at: new Date().toISOString()
    }]);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function submitFeedback({ name, email, rating, comment }) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env" };
  }
  const { data, error } = await supabase
    .from("feedback")
    .insert([{ name, email, rating, comment, submitted_at: new Date().toISOString() }]);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function requestMentorship({ studentName, email, track, message, github }) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to .env" };
  }
  const { data, error } = await supabase
    .from("mentorship_requests")
    .insert([{
      student_name: studentName,
      email,
      track,
      message,
      github,
      status: "pending",
      created_at: new Date().toISOString()
    }]);

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// -------------------------------------------------------------
// Multi-Platform Events Operations (Unstop, MLH, Devpost, Devfolio)
// -------------------------------------------------------------

export async function upsertEvents(events) {
  if (!isConfigured) {
    return { success: false, error: "Supabase not configured" };
  }
  if (!Array.isArray(events) || events.length === 0) {
    return { success: true, count: 0 };
  }

  const { data, error } = await supabase
    .from("events")
    .upsert(events, { onConflict: "slug" });

  if (error) {
    console.error("[Supabase] Failed to upsert events:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data, count: events.length };
}

export async function getEventsByPlatform(platform, limit = 20) {
  if (!isConfigured) {
    return { success: false, data: [] };
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("platform", platform.toLowerCase())
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn(`[Supabase] Failed to get events for ${platform}:`, error.message);
    return { success: false, data: [], error: error.message };
  }
  return { success: true, data: data || [] };
}

export async function getAllEvents({ limit = 50, platform = null, status = null } = {}) {
  if (!isConfigured) {
    return { success: false, data: [] };
  }

  let query = supabase.from("events").select("*").order("created_at", { ascending: false }).limit(limit);

  if (platform && platform !== "all") {
    query = query.eq("platform", platform.toLowerCase());
  }
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.warn("[Supabase] Failed to get all events:", error.message);
    return { success: false, data: [], error: error.message };
  }
  return { success: true, data: data || [] };
}

