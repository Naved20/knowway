import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/supabase";
import { sendEmail, EmailTemplates, verifySmtp } from "@/lib/smtp";

export async function GET() {
  // Quick health check to test SMTP connectivity
  const status = await verifySmtp();
  return NextResponse.json({
    smtp: status,
    configuredUser: process.env.SMTP_USER ? "Configured" : "Missing",
  });
}

export async function POST(request) {
  try {
    const { name, email, subject, message, isTest } = await request.json();

    // If it's an explicit SMTP test
    if (isTest) {
      const testRecipient = email || process.env.SMTP_USER;
      const testResult = await sendEmail({
        to: testRecipient,
        subject: "⚡ Knowvy SMTP Test Email Verification",
        html: EmailTemplates.welcomeBuilder({ name: name || "Developer", email: testRecipient }),
      });
      return NextResponse.json({
        success: testResult.success,
        message: testResult.success ? "Test email sent successfully!" : "Failed to send test email",
        details: testResult,
      });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // 1. Save message to Supabase
    const dbResult = await submitContactMessage({ name, email, subject, message });

    // 2. Dispatch Email via SMTP to Admin
    let mailStatus = null;
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      mailStatus = await sendEmail({
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `[Knowvy Inquiry] ${subject || "New Message from " + name}`,
        html: EmailTemplates.contactInquiry({ name, email, subject, message }),
      });

      // Also send a confirmation receipt to the student
      sendEmail({
        to: email,
        subject: "We received your message — Knowvy Community",
        html: EmailTemplates.welcomeBuilder({ name, email }),
      }).catch((err) => console.error("Receipt email failed:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received and processed.",
      database: dbResult.success ? "Saved" : "Skipped",
      emailSent: mailStatus?.success ?? false,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
