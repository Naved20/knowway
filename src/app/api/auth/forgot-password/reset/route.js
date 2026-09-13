import { NextResponse } from "next/server";
import { findUserByEmail, updateUser } from "@/lib/db";
import { verifyToken, hashPassword } from "@/lib/auth";
import { sendPasswordResetSuccessEmail } from "@/lib/email-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, verificationToken, newPassword } = body;

    if (!email || !verificationToken || !newPassword) {
      return NextResponse.json(
        { error: "Email, verification token, and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Verify token
    const tokenPayload = verifyToken(verificationToken);
    if (
      !tokenPayload ||
      tokenPayload.email !== email.toLowerCase().trim() ||
      tokenPayload.purpose !== "reset" ||
      !tokenPayload.verified
    ) {
      return NextResponse.json(
        { error: "Invalid or expired reset token. Please request a new OTP." },
        { status: 403 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(cleanEmail);
    if (!user) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    const passwordHash = await hashPassword(newPassword);
    await updateUser(user.id, { passwordHash });

    // Send security notification
    sendPasswordResetSuccessEmail(user.email).catch((e) =>
      console.error("[Password Reset Email Alert Error]:", e)
    );

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("[API Forgot Password Reset Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
