import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { sendEventFollowUp } from "@/lib/email-service";

export async function POST(request, { params }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { feedbackUrl = "", resourceUrl = "", message = "" } = body;

    const db = await getDb();
    const event = db.events.find((e) => e.id === id || e.slug === id);

    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const result = await sendEventFollowUp(event, { feedbackUrl, resourceUrl, message });

    return NextResponse.json({
      success: true,
      message: `Post-event follow-up queued for ${result.queued} attendees.`,
      result,
    });
  } catch (error) {
    console.error("[API Admin Event Follow-up Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
