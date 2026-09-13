import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateRegistrationStatus } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["confirmed", "attended", "cancelled", "waitlist"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed values: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updated = await updateRegistrationStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Registration record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Registration status updated to ${status}.`,
      registration: updated,
    });
  } catch (error) {
    console.error("[API Admin Registration Status Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
