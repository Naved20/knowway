import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { updateRegistrationStatus, getUserRegistrations } from "@/lib/db";

export async function POST(request) {
  try {
    const session = getSessionUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await request.json();
    const { registrationId } = body;

    if (!registrationId) {
      return NextResponse.json({ error: "Registration ID is required." }, { status: 400 });
    }

    // Verify ownership: ensure this registration belongs to the logged-in user
    const userRegistrations = await getUserRegistrations(session.email, session.userId);
    const target = userRegistrations.find((r) => r.id === registrationId);

    if (!target) {
      return NextResponse.json(
        { error: "Registration not found or not owned by you." },
        { status: 404 }
      );
    }

    const updated = await updateRegistrationStatus(registrationId, "cancelled");

    return NextResponse.json({
      success: true,
      message: "Registration cancelled successfully.",
      registration: updated,
    });
  } catch (error) {
    console.error("[API User Registration Cancel Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
