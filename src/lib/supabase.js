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
