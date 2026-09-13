import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getUserRegistrations, getEventBySlug } from "@/lib/db";

export async function GET(request) {
  try {
    const session = getSessionUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const registrations = await getUserRegistrations(session.email, session.userId);

    // Enrich registrations with full event details
    const enriched = await Promise.all(
      registrations.map(async (reg) => {
        const event = await getEventBySlug(reg.eventSlug);
        return {
          ...reg,
          event: event || {
            title: reg.eventSlug,
            date: "Date TBA",
            time: "Time TBA",
            location: "Venue TBA",
            status: "Scheduled",
          },
        };
      })
    );

    return NextResponse.json({ registrations: enriched });
  } catch (error) {
    console.error("[API User Events GET Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
