import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllRegistrations, getEventBySlug } from "@/lib/db";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const url = new URL(request.url);
    const eventSlug = url.searchParams.get("eventSlug");
    const status = url.searchParams.get("status");
    const format = url.searchParams.get("format");

    let registrations = await getAllRegistrations();

    if (eventSlug) {
      registrations = registrations.filter((r) => r.eventSlug === eventSlug);
    }
    if (status) {
      registrations = registrations.filter((r) => r.status === status);
    }

    // If CSV export is requested
    if (format === "csv") {
      const header = ["Ticket Code", "Name", "Email", "Event Slug", "Status", "College", "Year", "GitHub", "Registered At"];
      const rows = registrations.map((r) => [
        `"${r.ticketCode || ""}"`,
        `"${(r.userName || "").replace(/"/g, '""')}"`,
        `"${r.userEmail || ""}"`,
        `"${r.eventSlug || ""}"`,
        `"${r.status || ""}"`,
        `"${(r.college || "").replace(/"/g, '""')}"`,
        `"${(r.year || "").replace(/"/g, '""')}"`,
        `"${(r.github || "").replace(/"/g, '""')}"`,
        `"${r.registeredAt || ""}"`,
      ]);

      const csvContent = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
      const filename = `knowvy-attendees-${eventSlug || "all"}-${Date.now()}.csv`;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("[API Admin Registrations Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
