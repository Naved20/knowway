import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/db";

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const { eventSlug, isActive } = body;

    if (!eventSlug) {
      return NextResponse.json({ error: "Event slug is required." }, { status: 400 });
    }

    const db = await getDb();
    if (!Array.isArray(db.campaigns)) db.campaigns = [];

    let campaign = db.campaigns.find((c) => c.eventSlug === eventSlug);
    if (!campaign) {
      campaign = {
        id: `camp_${eventSlug}`,
        eventSlug,
        isActive: Boolean(isActive),
        lastRunDate: null,
        totalDispatched: 0,
        createdAt: new Date().toISOString(),
      };
      db.campaigns.push(campaign);
    } else {
      campaign.isActive = Boolean(isActive);
    }

    await saveDb();

    return NextResponse.json({
      success: true,
      message: `Daily campaign for ${eventSlug} is now ${campaign.isActive ? "ACTIVE" : "PAUSED"}.`,
      campaign,
    });
  } catch (error) {
    console.error("[API Campaign Toggle Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
