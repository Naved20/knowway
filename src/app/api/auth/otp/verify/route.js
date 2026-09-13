import { NextResponse } from "next/server";
import { getOtpRecord, incrementOtpAttempts, deleteOtpRecord } from "@/lib/db";
import { verifyOtpHash, signToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, otp, purpose = "register" } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and 6-digit OTP code are required." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();
    const otpRecord = await getOtpRecord(cleanEmail, purpose);

    if (!otpRecord) {
      return NextResponse.json(
        { error: "No pending verification code found. Please request a new code." },
        { status: 400 }
      );
    }

    // Check expiration
    if (Date.now() > otpRecord.expiresAt) {
      await deleteOtpRecord(otpRecord.id);
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check max attempts
    if (otpRecord.attempts >= otpRecord.maxAttempts) {
      await deleteOtpRecord(otpRecord.id);
      return NextResponse.json(
        { error: "Too many failed attempts. This code has been invalidated. Please request a new code." },
        { status: 429 }
      );
    }

    const isValid = verifyOtpHash(cleanOtp, otpRecord.otpHash);

    if (!isValid) {
      await incrementOtpAttempts(otpRecord.id);
      const remainingAttempts = otpRecord.maxAttempts - (otpRecord.attempts + 1);
      return NextResponse.json(
        {
          error: `Invalid verification code. ${remainingAttempts > 0 ? `${remainingAttempts} attempts remaining.` : "Code invalidated."}`,
        },
        { status: 400 }
      );
    }

    // Code is valid! Consume it
    await deleteOtpRecord(otpRecord.id);

    // Issue a short-lived verification token (15 mins) that allows setting the password
    const verificationToken = signToken(
      { email: cleanEmail, purpose, verified: true },
      15 * 60
    );

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
      verificationToken,
    });
  } catch (error) {
    console.error("[API OTP Verify Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
