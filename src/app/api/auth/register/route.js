import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/db";
import { verifyToken, hashPassword, signToken, buildSessionCookieHeader } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      verificationToken,
      college = "",
      year = "",
      github = "",
      phone = "",
      emailPreferences = { promotional: true },
    } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }

    // Verify the OTP verification token
    const tokenPayload = verifyToken(verificationToken);
    if (
      !tokenPayload ||
      tokenPayload.email !== email.toLowerCase().trim() ||
      tokenPayload.purpose !== "register" ||
      !tokenPayload.verified
    ) {
      return NextResponse.json(
        { error: "Invalid or expired verification session. Please verify your email again." },
        { status: 403 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await findUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Hash password with salt
    const passwordHash = await hashPassword(password);

    // Create user
    const newUser = await createUser({
      email: cleanEmail,
      passwordHash,
      name,
      role: "user",
      college,
      year,
      github,
      phone,
      emailPreferences,
    });

    // Generate Session Token
    const sessionToken = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    // Send Welcome Email in background
    sendWelcomeEmail(newUser).catch((e) => console.error("[Welcome Email Error]:", e));

    const { passwordHash: _, ...safeUser } = newUser;

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully!",
      user: safeUser,
    });

    response.headers.set("Set-Cookie", buildSessionCookieHeader(sessionToken));
    return response;
  } catch (error) {
    console.error("[API Register Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
