import { NextResponse } from "next/server";
import { syncPlatformEvents } from "@/lib/eventsSync";
import { getAllEvents } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform") || "all";

  // Optionally trigger sync if requested via ?action=sync
  if (searchParams.get("action") === "sync") {
    const result = await syncPlatformEvents(platform);
    return NextResponse.json(result);
  }

  // Otherwise return existing events
  const events = await getAllEvents({ platform: platform === "all" ? null : platform });
  return NextResponse.json({
    platform,
    count: events.data?.length || 0,
    events: events.data || [],
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { platform = "all", customEvents = null } = body;

    const result = await syncPlatformEvents(platform, customEvents);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      message: `Successfully processed ${result.syncedCount} events with Cloudinary and Supabase`,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to sync events" },
      { status: 500 }
    );
  }
}
