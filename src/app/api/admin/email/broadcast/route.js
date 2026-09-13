import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllUsers, getEventRegistrations, enqueueEmail } from "@/lib/db";
import { processEmailQueue } from "@/lib/email-service";

export async function POST(request) {
  try {
    const admin = requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const {
      subject,
      content,
      targetAudience = "subscribers", // "subscribers" | "all" | "event"
      eventSlug = "",
      actionText = "Open Knowvy",
      actionUrl = "https://knowvy.xyz",
    } = body;

    if (!subject || !content) {
      return NextResponse.json({ error: "Subject and content are required." }, { status: 400 });
    }

    let recipients = [];

    if (targetAudience === "event" && eventSlug) {
      const registrations = await getEventRegistrations(eventSlug);
      const active = registrations.filter((r) => r.status === "confirmed" || r.status === "attended");
      recipients = active.map((r) => ({
        email: r.userEmail,
        name: r.userName || "Builder",
      }));
    } else {
      const users = await getAllUsers();
      if (targetAudience === "subscribers") {
        recipients = users
          .filter((u) => u.emailPreferences?.promotional !== false)
          .map((u) => ({ email: u.email, name: u.name || "Builder" }));
      } else {
        recipients = users.map((u) => ({ email: u.email, name: u.name || "Builder" }));
      }
    }

    // Deduplicate by email
    const uniqueMap = new Map();
    for (const r of recipients) {
      if (r.email && !uniqueMap.has(r.email.toLowerCase())) {
        uniqueMap.set(r.email.toLowerCase(), r);
      }
    }
    const finalRecipients = Array.from(uniqueMap.values());

    let queuedCount = 0;
    for (const recipient of finalRecipients) {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: 0.05em;">KNOWVY ECOSYSTEM</h1>
            <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Central India's Premier Builder Network</p>
          </div>
          <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">
            <p style="font-size: 15px; margin-top: 0;">Hey ${recipient.name || "Builder"},</p>
            <div style="font-size: 15px; color: #334155; margin: 20px 0; white-space: pre-wrap;">${content}</div>
            ${
              actionUrl
                ? `<div style="text-align: center; margin: 32px 0;">
                    <a href="${actionUrl}" style="background: #f97316; color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block; font-size: 14px; letter-spacing: 0.02em;">${actionText}</a>
                  </div>`
                : ""
            }
            <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center;">
              <p style="margin: 0 0 8px 0;">Knowvy • MANIT Bhopal & Central India Builder Community</p>
              <p style="margin: 0;">You received this update because you are registered on Knowvy. Manage your preferences anytime in your <a href="https://knowvy.xyz/dashboard" style="color: #f97316; text-decoration: underline;">Dashboard</a>.</p>
            </div>
          </div>
        </div>
      `;

      await enqueueEmail({
        to: recipient.email,
        subject,
        html: emailHtml,
        category: "broadcast",
        metadata: { targetAudience, eventSlug },
      });
      queuedCount++;
    }

    // Trigger queue processor in background
    processEmailQueue().catch((e) => console.error("[Queue Process Error]:", e));

    return NextResponse.json({
      success: true,
      message: `Broadcast queued for ${queuedCount} recipients.`,
      queuedCount,
    });
  } catch (error) {
    console.error("[API Admin Broadcast Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
