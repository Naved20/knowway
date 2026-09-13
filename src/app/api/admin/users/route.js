import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers, getAllRegistrations } from "@/lib/db";

export async function GET(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const [users, registrations] = await Promise.all([
      getAllUsers(),
      getAllRegistrations(),
    ]);

    // Attach registration stats to each user
    const enrichedUsers = users.map((u) => {
      const userRegs = registrations.filter(
        (r) => r.userEmail === u.email || (r.userId && r.userId === u.id)
      );
      const { passwordHash: _, ...safeUser } = u;
      return {
        ...safeUser,
        registrationsCount: userRegs.length,
        activeRegistrationsCount: userRegs.filter((r) => r.status === "confirmed").length,
      };
    });

    return NextResponse.json({ users: enrichedUsers });
  } catch (error) {
    console.error("[API Admin Users Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
