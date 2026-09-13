import { NextResponse } from "next/server";
import { findUserByEmail, getDb, saveDb } from "@/lib/db";
import { verifyPassword, hashPassword, signToken, buildSessionCookieHeader } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    // Ensure DB is initialized
    await getDb();

    const user = await findUserByEmail(cleanEmail);
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email. Please register first." },
        { status: 401 }
      );
    }

    const adminEnvPass = (process.env.ADMIN_PASSWORD || "KnowvyAdmin2026!#")
      .replace(/^["']|["']$/g, "")  // strip leading/trailing quotes only
      .trim();
    const adminEmail = (process.env.SMTP_USER || "knowvy1@gmail.com").toLowerCase().trim();
    const isMasterAdmin = (cleanEmail === adminEmail || user.role === "admin") && password === adminEnvPass;

    let isMatch = isMasterAdmin;
    if (!isMatch) {
      isMatch = await verifyPassword(password, user.passwordHash);
    }

    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again or reset your password." },
        { status: 401 }
      );
    }

    // If master admin password was used, ensure role is admin and update hash
    if (isMasterAdmin && user.role !== "admin") {
      user.role = "admin";
      user.passwordHash = await hashPassword(password);
      await saveDb();
    }

    // Sign session token
    const sessionToken = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
    });

    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully!",
      user: safeUser,
    });

    response.headers.set("Set-Cookie", buildSessionCookieHeader(sessionToken));
    return response;
  } catch (error) {
    console.error("[API Login Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
