import { NextResponse } from "next/server";
import { runDailyPromotionalCampaign } from "@/lib/campaign-service";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is configured, check authorization
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const url = new URL(request.url);
      const secretQuery = url.searchParams.get("secret");
      if (secretQuery !== cronSecret) {
        return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
      }
    }

    const result = await runDailyPromotionalCampaign({ force: false });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Daily Promotions Cron Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  return GET(request);
}
