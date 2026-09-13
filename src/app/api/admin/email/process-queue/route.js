import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { processEmailQueue } from "@/lib/email-service";
import { getQueueStatus } from "@/lib/db";

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const processed = await processEmailQueue();
    const queueStatus = await getQueueStatus();

    return NextResponse.json({
      success: true,
      message: `Processed ${processed} queued emails.`,
      processed,
      queueStatus,
    });
  } catch (error) {
    console.error("[API Admin Process Queue Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
