import { NextResponse } from "next/server";
import { getEventBySlug, updateEvent, deleteEvent } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { sendEventUpdatedAlert, queueNewEventPromotionalBroadcast } from "@/lib/email-service";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("[API Event GET Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { slug } = await params;
    const existing = await getEventBySlug(slug);
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await request.json();
    const { notifyAttendees = false, changeSummary = "", ...updates } = body;

    const updated = await updateEvent(existing.id, updates);

    // If previously unpublished and now published, queue promotional broadcast
    if (!existing.isPublished && updated.isPublished) {
      queueNewEventPromotionalBroadcast(updated).catch((e) =>
        console.error("[Broadcast Error]:", e)
      );
    }

    // If admin explicitly requested to notify attendees of date/time/venue changes
    if (notifyAttendees && updated.registeredCount > 0) {
      sendEventUpdatedAlert(updated, changeSummary).catch((e) =>
        console.error("[Update Notification Error]:", e)
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      event: updated,
    });
  } catch (error) {
    console.error("[API Event PATCH Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { slug } = await params;
    const deleted = await deleteEvent(slug);

    if (!deleted) {
      return NextResponse.json({ error: "Event not found or failed to delete" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("[API Event DELETE Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
