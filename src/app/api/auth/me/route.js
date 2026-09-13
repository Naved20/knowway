import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { findUserById, getUserRegistrations } from "@/lib/db";

export async function GET(request) {
  try {
    const session = getSessionUser(request);
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const user = await findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
    }

    const registrations = await getUserRegistrations(user.email, user.id);
    const { passwordHash: _, ...safeUser } = user;

    return NextResponse.json({
      authenticated: true,
      user: safeUser,
      stats: {
        totalRegistrations: registrations.length,
        upcomingRegistrations: registrations.filter((r) => r.status === "confirmed").length,
      },
    });
  } catch (error) {
    console.error("[API Me Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
