import { NextResponse } from "next/server";
import { registerEvent } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { eventSlug, name, email, github, college, year } = await request.json();
    if (!eventSlug || !name || !email) {
      return NextResponse.json({ error: "eventSlug, name, and email are required" }, { status: 400 });
    }

    const result = await registerEvent({ eventSlug, name, email, github, college, year });
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Event RSVP recorded in Supabase", data: result.data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
