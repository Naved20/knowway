import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getEmailLogs, getQueueStatus } from "@/lib/db";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "100", 10);

    const [logs, queueStatus] = await Promise.all([
      getEmailLogs(limit),
      getQueueStatus(),
    ]);

    return NextResponse.json({
      logs,
      queueStatus,
    });
  } catch (error) {
    console.error("[API Admin Email Logs Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
