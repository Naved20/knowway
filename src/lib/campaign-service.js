import { getDb, saveDb, enqueueEmail } from "./db";
import { generateDailyPromotionalCampaignCopy } from "./gemini";
import { processEmailQueue, wrapEmailTemplate } from "./email-service";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://knowvy.xyz";

/**
 * Helper to calculate approximate days remaining from human date strings
 */
export function calculateDaysRemaining(dateStr) {
  if (!dateStr) return 7;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    const diffMs = parsed - Date.now();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }
  // Fallback for strings like "October 2026"
  if (dateStr.toLowerCase().includes("2026")) return 14;
  return 7;
}

/**
 * Builds high-converting HTML email with Gemini AI copy
 */
function buildGeminiPromoEmailHtml(event, promoData, recipientUser) {
  const recipientName = recipientUser.name || "Builder";

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; padding: 4px 14px; background-color: #F3E8FF; border: 1px solid #D8B4FE; border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #7E22CE; margin-bottom: 12px; letter-spacing: 0.05em;">
        🤖 KNOWVY AI DAILY DISPATCH • ${event.category || "HACKATHON"}
      </span>
      <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 10px 0; line-height: 1.3; letter-spacing: -0.5px;">
        ${promoData.headline}
      </h2>
      <p style="font-size: 14px; color: #64748B; margin: 0;">
        Special update for ${recipientName} • Central India Builder Network
      </p>
    </div>

    ${
      event.banner
        ? `<div style="margin: 20px 0; border-radius: 14px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <img src="${event.banner}" alt="${event.title}" style="width: 100%; height: auto; display: block;" />
          </div>`
        : ""
    }

    <!-- Gemini AI Generated Body Copy -->
    <div style="font-size: 14px; color: #334155; line-height: 1.7; margin: 24px 0;">
      ${promoData.paragraphs
        .map(
          (p) =>
            `<p style="margin: 0 0 14px 0;">${p.replace(
              /Hey Builder/gi,
              `Hey ${recipientName}`
            )}</p>`
        )
        .join("")}
    </div>

    <!-- Highlight Callout Box -->
    <div style="background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%); border: 1px solid #BFDBFE; border-radius: 14px; padding: 18px 20px; margin: 24px 0;">
      <div style="font-size: 11px; font-family: monospace; font-weight: 700; color: #2563EB; text-transform: uppercase; margin-bottom: 6px;">
        🌟 WHY YOU CANNOT MISS THIS:
      </div>
      <div style="font-size: 14px; font-weight: 600; color: #1E293B;">
        ${promoData.highlightCallout}
      </div>
    </div>

    <!-- Event Quick Specs -->
    <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px 20px; margin: 24px 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #334155; line-height: 2;">
        <tr>
          <td style="color: #64748B; width: 100px;">Event:</td>
          <td><strong>${event.title}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748B;">Date & Time:</td>
          <td><strong>${event.date}</strong> • ${event.time || "10:00 AM IST"}</td>
        </tr>
        <tr>
          <td style="color: #64748B;">Venue:</td>
          <td><strong>${event.location || "MANIT Bhopal, India"}</strong></td>
        </tr>
      </table>
    </div>

    <!-- Call to action button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="${BASE_URL}/events/${event.slug}" style="display: inline-block; padding: 14px 36px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF; font-weight: 700; font-size: 14px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);">
        ${promoData.actionText || "Claim Your Free Digital Pass"} &rarr;
      </a>
      <p style="font-size: 11px; color: #94A3B8; margin-top: 10px; font-family: monospace;">
        1-Click RSVP for verified Knowvy builders • Instant ticket generation
      </p>
    </div>
  `;

  return wrapEmailTemplate(content, {
    title: promoData.subject,
    showUnsubscribe: true,
  });
}

/**
 * Execute the automated daily promotional campaign powered by Gemini AI
 */
export async function runDailyPromotionalCampaign({ eventSlug = null, force = false } = {}) {
  const db = await getDb();
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Ensure campaign storage exists
  if (!Array.isArray(db.campaigns)) db.campaigns = [];
  if (!Array.isArray(db.campaignLogs)) db.campaignLogs = [];

  // 1. Identify upcoming eligible events
  let eligibleEvents = db.events.filter((e) => {
    if (!e.isPublished) return false;
    if (e.status === "Completed" || e.status === "Concluded") return false;
    return true;
  });

  if (eventSlug) {
    eligibleEvents = eligibleEvents.filter((e) => e.slug === eventSlug);
  }

  if (eligibleEvents.length === 0) {
    return {
      success: true,
      message: "No upcoming eligible events found for promotional campaign.",
      processedEvents: 0,
      totalQueued: 0,
    };
  }

  // 2. Identify all subscribed users
  const subscribedUsers = db.users.filter(
    (u) => u.emailPreferences?.promotional !== false && u.email
  );

  if (subscribedUsers.length === 0) {
    return {
      success: true,
      message: "No users currently subscribed to promotional emails.",
      processedEvents: eligibleEvents.length,
      totalQueued: 0,
    };
  }

  let totalQueued = 0;
  const processedSummaries = [];

  for (const event of eligibleEvents) {
    // Find or initialize campaign state for this event
    let campaign = db.campaigns.find((c) => c.eventSlug === event.slug);
    if (!campaign) {
      campaign = {
        id: `camp_${event.slug}`,
        eventSlug: event.slug,
        eventId: event.id,
        isActive: true,
        lastRunDate: null,
        totalDispatched: 0,
        createdAt: new Date().toISOString(),
      };
      db.campaigns.push(campaign);
    }

    // If campaign was manually paused by admin, skip
    if (!campaign.isActive) {
      processedSummaries.push({
        eventSlug: event.slug,
        status: "paused",
        message: "Campaign is paused by admin.",
      });
      continue;
    }

    // If already ran today and not forced, skip
    if (!force && campaign.lastRunDate === todayStr) {
      processedSummaries.push({
        eventSlug: event.slug,
        status: "already_ran_today",
        message: `Already dispatched for ${todayStr}.`,
      });
      continue;
    }

    // Filter target users: Subscribed builders who haven't registered for this event yet!
    const confirmedEmails = new Set(
      db.registrations
        .filter((r) => r.eventSlug === event.slug && r.status === "confirmed")
        .map((r) => r.userEmail.toLowerCase().trim())
    );

    const targetUsers = subscribedUsers.filter(
      (u) => !confirmedEmails.has(u.email.toLowerCase().trim())
    );

    if (targetUsers.length === 0) {
      processedSummaries.push({
        eventSlug: event.slug,
        status: "all_registered",
        message: "All subscribed builders are already registered for this event!",
      });
      continue;
    }

    const daysRemaining = calculateDaysRemaining(event.date);

    // Call Gemini AI to write today's promotional copy!
    const aiResult = await generateDailyPromotionalCampaignCopy(event, daysRemaining);
    const promoData = aiResult.data;

    let queuedForEvent = 0;
    for (const user of targetUsers) {
      const emailHtml = buildGeminiPromoEmailHtml(event, promoData, user);

      await enqueueEmail({
        recipient: user.email,
        emailType: "promotional",
        subject: promoData.subject,
        html: emailHtml,
        campaignId: `daily_ai_${event.slug}_${todayStr}`,
      });
      queuedForEvent++;
    }

    // Update campaign record
    campaign.lastRunDate = todayStr;
    campaign.totalDispatched = (campaign.totalDispatched || 0) + queuedForEvent;
    campaign.lastSubject = promoData.subject;
    campaign.lastHeadline = promoData.headline;

    // Log run in campaignLogs
    db.campaignLogs.unshift({
      id: `camplog_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      eventSlug: event.slug,
      eventTitle: event.title,
      runDate: todayStr,
      subject: promoData.subject,
      headline: promoData.headline,
      paragraphs: promoData.paragraphs,
      highlightCallout: promoData.highlightCallout,
      recipientsCount: queuedForEvent,
      aiGenerated: promoData.aiGenerated !== false,
      timestamp: new Date().toISOString(),
    });

    totalQueued += queuedForEvent;
    processedSummaries.push({
      eventSlug: event.slug,
      status: "dispatched",
      subject: promoData.subject,
      recipientsCount: queuedForEvent,
      aiGenerated: promoData.aiGenerated !== false,
    });
  }

  await saveDb();

  // Trigger queue flush non-blockingly
  processEmailQueue().catch((err) => console.error("[Campaign] Queue flush error:", err));

  return {
    success: true,
    message: `Gemini AI promotional campaign queued ${totalQueued} emails across ${eligibleEvents.length} events.`,
    processedEvents: eligibleEvents.length,
    totalQueued,
    summaries: processedSummaries,
  };
}

/**
 * Generate preview of Gemini promotional copy for admin review without sending
 */
export async function previewGeminiPromotionalCopy(eventSlug) {
  const db = await getDb();
  const event = db.events.find((e) => e.slug === eventSlug || e.id === eventSlug);
  if (!event) {
    throw new Error("Event not found");
  }

  const daysRemaining = calculateDaysRemaining(event.date);
  const aiResult = await generateDailyPromotionalCampaignCopy(event, daysRemaining);
  return {
    event,
    daysRemaining,
    copy: aiResult.data,
  };
}

/**
 * Fetch campaign overview analytics for the Admin Studio
 */
export async function getCampaignDashboardData() {
  const db = await getDb();
  if (!Array.isArray(db.campaigns)) db.campaigns = [];
  if (!Array.isArray(db.campaignLogs)) db.campaignLogs = [];

  const totalUsers = db.users.length;
  const subscribedUsersCount = db.users.filter(
    (u) => u.emailPreferences?.promotional !== false
  ).length;

  const upcomingEvents = db.events.filter(
    (e) => e.isPublished && e.status !== "Completed" && e.status !== "Concluded"
  );

  const eventCampaigns = upcomingEvents.map((ev) => {
    const campaign = db.campaigns.find((c) => c.eventSlug === ev.slug) || {
      isActive: true,
      lastRunDate: null,
      totalDispatched: 0,
    };

    const confirmedCount = db.registrations.filter(
      (r) => r.eventSlug === ev.slug && r.status === "confirmed"
    ).length;

    const daysRemaining = calculateDaysRemaining(ev.date);

    return {
      event: {
        id: ev.id,
        slug: ev.slug,
        title: ev.title,
        date: ev.date,
        time: ev.time,
        location: ev.location,
        banner: ev.banner,
        category: ev.category,
      },
      campaign,
      daysRemaining,
      registeredCount: confirmedCount,
      eligiblePendingCount: Math.max(0, subscribedUsersCount - confirmedCount),
    };
  });

  return {
    metrics: {
      totalUsers,
      subscribedUsersCount,
      optedOutCount: totalUsers - subscribedUsersCount,
      activeCampaignsCount: eventCampaigns.filter((c) => c.campaign.isActive).length,
      totalCampaignDispatches: db.campaignLogs.length,
    },
    eventCampaigns,
    recentLogs: db.campaignLogs.slice(0, 30),
  };
}
