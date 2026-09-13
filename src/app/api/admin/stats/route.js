import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers, getAllEventsAdmin, getAllRegistrations, getQueueStatus, getEmailLogs } from "@/lib/db";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const [users, events, registrations, queueStatus, logs] = await Promise.all([
      getAllUsers(),
      getAllEventsAdmin(),
      getAllRegistrations(),
      getQueueStatus(),
      getEmailLogs(20),
    ]);

    const activeRegistrations = registrations.filter((r) => r.status === "confirmed").length;
    const attendedRegistrations = registrations.filter((r) => r.status === "attended").length;

    return NextResponse.json({
      stats: {
        totalUsers: users.length,
        totalEvents: events.length,
        publishedEvents: events.filter((e) => e.isPublished).length,
        totalRegistrations: registrations.length,
        activeRegistrations,
        attendedRegistrations,
      },
      queueStatus,
      recentLogs: logs,
    });
  } catch (error) {
    console.error("[API Admin Stats Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
