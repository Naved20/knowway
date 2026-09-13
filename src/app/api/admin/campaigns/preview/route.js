import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { previewGeminiPromotionalCopy } from "@/lib/campaign-service";

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const { eventSlug } = body;

    if (!eventSlug) {
      return NextResponse.json({ error: "Event slug is required." }, { status: 400 });
    }

    const preview = await previewGeminiPromotionalCopy(eventSlug);
    return NextResponse.json({ success: true, preview });
  } catch (error) {
    console.error("[API Admin Campaign Preview Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
