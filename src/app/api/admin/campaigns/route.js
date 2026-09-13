import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getCampaignDashboardData, runDailyPromotionalCampaign } from "@/lib/campaign-service";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const data = await getCampaignDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API Admin Campaigns GET Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const { eventSlug = null, force = true } = body;

    const result = await runDailyPromotionalCampaign({ eventSlug, force });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API Admin Campaigns POST Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
