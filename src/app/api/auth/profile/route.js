import { NextResponse } from "next/server";
import { getSessionUser, verifyPassword, hashPassword } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";

export async function PUT(request) {
  try {
    const session = getSessionUser(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      college,
      year,
      github,
      phone,
      emailPreferences,
      currentPassword,
      newPassword,
    } = body;

    const user = await findUserById(session.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updates = {};
    if (name && typeof name === "string") updates.name = name.trim();
    if (typeof college === "string") updates.college = college.trim();
    if (typeof year === "string") updates.year = year.trim();
    if (typeof github === "string") updates.github = github.trim();
    if (typeof phone === "string") updates.phone = phone.trim();
    if (emailPreferences && typeof emailPreferences === "object") {
      updates.emailPreferences = {
        ...user.emailPreferences,
        ...emailPreferences,
      };
    }

    // Password change request
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to change password." }, { status: 400 });
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
      }

      const isValidCurrent = await verifyPassword(currentPassword, user.passwordHash);
      if (!isValidCurrent) {
        return NextResponse.json({ error: "Current password does not match." }, { status: 400 });
      }

      updates.passwordHash = await hashPassword(newPassword);
    }

    const updatedUser = await updateUser(user.id, updates);
    const { passwordHash: _, ...safeUser } = updatedUser;

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: safeUser,
    });
  } catch (error) {
    console.error("[API Profile Update Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
