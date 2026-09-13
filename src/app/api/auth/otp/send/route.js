import { NextResponse } from "next/server";
import { findUserByEmail, getOtpRecord, saveOtp } from "@/lib/db";
import { generateOtp, hashOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/email-service";

export async function POST(request) {
  try {
    const { email, purpose = "register" } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await findUserByEmail(cleanEmail);

    if (purpose === "register" && existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in instead." },
        { status: 409 }
      );
    }

    if (purpose === "forgot_password" && !existingUser) {
      return NextResponse.json(
        { error: "No account found with this email address. Please register." },
        { status: 404 }
      );
    }

    // Cooldown check: 60s between resend requests
    const prevOtp = await getOtpRecord(cleanEmail, purpose);
    if (prevOtp && Date.now() - prevOtp.createdAt < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (Date.now() - prevOtp.createdAt)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitSec} seconds before requesting a new code.` },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);

    await saveOtp({ email: cleanEmail, otpHash, purpose, expiresInMinutes: 10 });
    const sendResult = await sendOtpEmail(cleanEmail, otp, purpose);

    if (!sendResult.success) {
      return NextResponse.json(
        { error: "Failed to dispatch verification email. Please check your address or try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${cleanEmail}.`,
    });
  } catch (error) {
    console.error("[API OTP Send Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
