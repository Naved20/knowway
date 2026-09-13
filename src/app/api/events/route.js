import { NextResponse } from "next/server";
import { getPublishedEvents, getAllEventsAdmin, createEvent } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { runDailyPromotionalCampaign } from "@/lib/campaign-service";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    const url = new URL(request.url);
    const viewAll = url.searchParams.get("all") === "true";

    let events;
    if (admin && viewAll) {
      events = await getAllEventsAdmin();
    } else {
      events = await getPublishedEvents();
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error("[API Events GET Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, date, time, location, shortDescription, about, isPublished = true } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required." }, { status: 400 });
    }

    const newEvent = await createEvent({
      ...body,
      isPublished: Boolean(isPublished),
    });

    // If published immediately, queue Gemini AI promotional broadcast to opted-in subscribers
    if (newEvent.isPublished) {
      runDailyPromotionalCampaign({ eventSlug: newEvent.slug, force: true }).catch((e) =>
        console.error("[Promotional Campaign Error]:", e)
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event created successfully.",
      event: newEvent,
    });
  } catch (error) {
    console.error("[API Events POST Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
