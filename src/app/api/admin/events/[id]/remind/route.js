import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getEventBySlug, getDb } from "@/lib/db";
import { sendEventReminder } from "@/lib/email-service";

export async function POST(request, { params }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const reminderType = body.reminderType || "24h";

    const db = await getDb();
    const event = db.events.find((e) => e.id === id || e.slug === id);

    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const result = await sendEventReminder(event, reminderType);

    return NextResponse.json({
      success: true,
      message: `Event ${reminderType} reminder queued for ${result.queued} attendees.`,
      result,
    });
  } catch (error) {
    console.error("[API Admin Event Remind Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
