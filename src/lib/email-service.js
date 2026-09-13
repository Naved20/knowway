import { sendEmail } from "./smtp";
import { enqueueEmail, logEmailDelivery, getDb, saveDb } from "./db";

const BRAND_NAME = "Knowvy Technologies";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Common Brand Header & Footer Wrapper
export function wrapEmailTemplate(content, { title = "Knowvy Notification", showUnsubscribe = false } = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
              
              <!-- Brand Header -->
              <tr>
                <td style="padding: 28px 32px; background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%); border-bottom: 1px solid #E2E8F0; text-align: center;">
                  <div style="display: inline-block; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #0F172A;">
                    <span style="color: #2563EB;">KNOWVY</span>
                    <span style="display: inline-block; width: 6px; height: 6px; background-color: #2563EB; border-radius: 50%; margin-left: 2px;"></span>
                  </div>
                  <div style="font-size: 11px; font-family: monospace; color: #64748B; margin-top: 4px; letter-spacing: 0.5px; text-transform: uppercase;">
                    Central India Student Developer Ecosystem
                  </div>
                </td>
              </tr>

              <!-- Main Content Body -->
              <tr>
                <td style="padding: 36px 32px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #64748B; line-height: 1.6;">
                  <p style="margin: 0 0 6px 0; font-weight: 500;">
                    Built with ❤️ for student builders across Bhopal & India.
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #94A3B8;">
                    Knowvy Technologies &bull; Bhopal, Madhya Pradesh, India
                  </p>
                  ${
                    showUnsubscribe
                      ? `<p style="margin: 12px 0 0 0; font-size: 11px;">
                          <a href="${BASE_URL}/dashboard?tab=preferences" style="color: #2563EB; text-decoration: underline;">Manage Email Preferences</a> &bull; 
                          <a href="${BASE_URL}/dashboard" style="color: #64748B; text-decoration: none;">View Dashboard</a>
                        </p>`
                      : ""
                  }
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// -------------------------------------------------------------
// 1. OTP Verification Email (Registration & Password Reset)
// -------------------------------------------------------------

export async function sendOtpEmail(email, otp, purpose = "register") {
  const isRegister = purpose === "register";
  const subject = isRegister
    ? "Verify your email to create your Knowvy account"
    : "Reset your Knowvy password";

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; padding: 4px 12px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #2563EB; margin-bottom: 12px;">
        ${isRegister ? "ACCOUNT VERIFICATION" : "PASSWORD RESET"}
      </span>
      <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0; letter-spacing: -0.5px;">
        ${isRegister ? "Confirm your email address" : "Reset your password"}
      </h2>
      <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.6;">
        ${
          isRegister
            ? "Enter the verification code below to activate your Knowvy builder profile."
            : "Use the verification code below to securely choose a new password."
        }
      </p>
    </div>

    <!-- 6-Digit OTP Box -->
    <div style="margin: 28px auto; text-align: center;">
      <div style="display: inline-block; padding: 18px 36px; background-color: #F8FAFC; border: 2px dashed #2563EB; border-radius: 16px; font-family: monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #2563EB;">
        ${otp}
      </div>
    </div>

    <div style="background-color: #FEF2F2; border: 1px solid #FECACA; border-radius: 12px; padding: 14px 18px; margin-top: 24px; font-size: 12px; color: #991B1B; line-height: 1.5;">
      <strong>⚠️ Security Notice:</strong> This code is valid for <strong>10 minutes</strong> and can only be used once. Never share this code with anyone. Knowvy mentors will never ask for your OTP.
    </div>
  `;

  const html = wrapEmailTemplate(content, { title: subject });
  const result = await sendEmail({ to: email, subject, html });

  await logEmailDelivery({
    recipient: email,
    emailType: "transactional",
    subject,
    status: result.success ? "sent" : "failed",
    error: result.error || null,
  });

  return result;
}

// -------------------------------------------------------------
// 2. Welcome Email for New Registered User
// -------------------------------------------------------------

export async function sendWelcomeEmail(user) {
  const subject = `Welcome to Knowvy, ${user.name}! 🚀`;
  const content = `
    <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 12px 0;">
      Welcome to the Builder Ecosystem, ${user.name}! 🚀
    </h2>
    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
      Your Knowvy account is officially active. You are now part of Central India's fastest-growing student developer network, connecting with 1,500+ builders across college campuses.
    </p>

    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-size: 15px; font-weight: 700; color: #0F172A; margin: 0 0 10px 0;">
        What you can do now:
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.8;">
        <li><strong>Discover & Register for Hackathons</strong>: Free access to 36-hour competitive hackathons and workshops.</li>
        <li><strong>Manage Your Digital Tickets</strong>: View all event passes and registration QR codes right in your personal dashboard.</li>
        <li><strong>Open Source & Cloud Sprints</strong>: Weekly study jams and mentor-led GitHub contribution pipelines.</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${BASE_URL}/dashboard" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF; font-weight: 700; font-size: 13px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);">
        Go to Your Personal Dashboard &rarr;
      </a>
    </div>
  `;

  const html = wrapEmailTemplate(content, { title: subject });
  const result = await sendEmail({ to: user.email, subject, html });

  await logEmailDelivery({
    recipient: user.email,
    emailType: "transactional",
    subject,
    status: result.success ? "sent" : "failed",
    error: result.error || null,
  });

  return result;
}

// -------------------------------------------------------------
// 3. Event Registration Confirmation Email
// -------------------------------------------------------------

export async function sendRegistrationConfirmationEmail(registration, event) {
  const subject = `Registration Confirmed: ${event.title} 🎟️`;
  const calTitle = encodeURIComponent(event.title);
  const calDetails = encodeURIComponent(event.shortDescription || "Knowvy Event");
  const calLocation = encodeURIComponent(event.location || "Bhopal, India");
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

  const content = `
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="display: inline-block; padding: 4px 12px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #059669; margin-bottom: 12px;">
        REGISTRATION CONFIRMED
      </span>
      <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0;">
        You're officially registered!
      </h2>
      <p style="font-size: 14px; color: #475569; margin: 0;">
        Hi <strong>${registration.userName}</strong>, we look forward to seeing you at <strong>${event.title}</strong>.
      </p>
    </div>

    <!-- Event Ticket Pass Card -->
    <div style="background: linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%); border: 1px solid #CBD5E1; border-radius: 16px; padding: 24px; margin: 24px 0; box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);">
      <div style="border-bottom: 1px dashed #CBD5E1; padding-bottom: 16px; margin-bottom: 16px;">
        <span style="font-size: 11px; font-family: monospace; color: #2563EB; font-weight: 700; text-transform: uppercase;">
          DIGITAL PARTICIPATION PASS
        </span>
        <h3 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 4px 0 0 0;">
          ${event.title}
        </h3>
      </div>

      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #334155; line-height: 2;">
        <tr>
          <td style="color: #64748B; width: 110px;">Ticket Code:</td>
          <td><strong style="font-family: monospace; color: #2563EB; font-size: 14px;">${registration.ticketCode}</strong></td>
        </tr>
        <tr>
          <td style="color: #64748B;">Date & Time:</td>
          <td><strong>${event.date}</strong> (${event.time || "10:00 AM IST"})</td>
        </tr>
        <tr>
          <td style="color: #64748B;">Location / Link:</td>
          <td>
            <strong>${event.location || "Bhopal, India"}</strong>
            ${event.meetingLink ? `<br><a href="${event.meetingLink}" style="color: #2563EB; text-decoration: underline;">${event.meetingLink}</a>` : ""}
          </td>
        </tr>
        <tr>
          <td style="color: #64748B;">Participant:</td>
          <td>${registration.userName} (${registration.userEmail})</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${gcalUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 12px; border-radius: 12px; text-decoration: none; margin-right: 8px;">
        📅 Add to Google Calendar
      </a>
      <a href="${BASE_URL}/dashboard?tab=events" style="display: inline-block; padding: 12px 24px; background-color: #F1F5F9; border: 1px solid #CBD5E1; color: #0F172A; font-weight: 700; font-size: 12px; border-radius: 12px; text-decoration: none;">
        View in Dashboard
      </a>
    </div>

    <p style="font-size: 12px; color: #64748B; line-height: 1.6; margin: 24px 0 0 0; text-align: center;">
      Need to make changes or withdraw? You can manage your RSVP directly from your <a href="${BASE_URL}/dashboard" style="color: #2563EB;">Knowvy Dashboard</a> anytime.
    </p>
  `;

  const html = wrapEmailTemplate(content, { title: subject });
  const result = await sendEmail({ to: registration.userEmail, subject, html });

  await logEmailDelivery({
    recipient: registration.userEmail,
    emailType: "transactional",
    subject,
    status: result.success ? "sent" : "failed",
    error: result.error || null,
  });

  return result;
}

// -------------------------------------------------------------
// 4. Promotional Email for Newly Published Event (Broadcast)
// -------------------------------------------------------------

export async function queueNewEventPromotionalBroadcast(event) {
  const db = await getDb();
  // Target: all users who haven't opted out of promotional emails
  const subscribedUsers = db.users.filter(
    (u) => u.emailPreferences?.promotional !== false && u.email
  );

  const subject = `🔥 New Flagship Initiative: ${event.title} is now open!`;

  for (const user of subscribedUsers) {
    const content = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="display: inline-block; padding: 4px 12px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #2563EB; margin-bottom: 12px;">
          NEW INITIATIVE ANNOUNCEMENT
        </span>
        <h2 style="font-size: 26px; font-weight: 800; color: #0F172A; margin: 0 0 10px 0; letter-spacing: -0.5px;">
          ${event.title}
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.6;">
          ${event.shortDescription || "Join student builders and industry mentors for our latest hands-on technology sprint."}
        </p>
      </div>

      ${
        event.banner
          ? `<div style="margin: 20px 0; border-radius: 14px; overflow: hidden; border: 1px solid #E2E8F0;">
              <img src="${event.banner}" alt="${event.title}" style="width: 100%; height: auto; display: block;" />
            </div>`
          : ""
      }

      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; margin: 24px 0;">
        <h3 style="font-size: 14px; font-weight: 700; color: #0F172A; margin: 0 0 12px 0;">
          Event Details:
        </h3>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #334155; line-height: 2;">
          <tr>
            <td style="color: #64748B; width: 90px;">Date:</td>
            <td><strong>${event.date}</strong> (${event.time || "10:00 AM IST"})</td>
          </tr>
          <tr>
            <td style="color: #64748B;">Location:</td>
            <td><strong>${event.location || "Bhopal, India"}</strong></td>
          </tr>
          <tr>
            <td style="color: #64748B;">Category:</td>
            <td>${event.category || "Hackathon"}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${BASE_URL}/events/${event.slug}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF; font-weight: 700; font-size: 13px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);">
          Register Now for Free &rarr;
        </a>
      </div>
    `;

    const html = wrapEmailTemplate(content, { title: subject, showUnsubscribe: true });

    await enqueueEmail({
      recipient: user.email,
      emailType: "promotional",
      subject,
      html,
      campaignId: `pub_event_${event.slug}`,
    });
  }

  // Trigger background processor non-blockingly
  processEmailQueue().catch((err) => console.error("[Queue] Processing error:", err));

  return { queuedCount: subscribedUsers.length };
}

// -------------------------------------------------------------
// 5. Event Updated Alert (Venue/Schedule changes to registrants)
// -------------------------------------------------------------

export async function sendEventUpdatedAlert(event, changeSummary = "") {
  const db = await getDb();
  const registrations = db.registrations.filter(
    (r) => r.eventSlug === event.slug && r.status !== "cancelled"
  );

  const subject = `⚠️ Important Update: ${event.title}`;

  for (const reg of registrations) {
    const content = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="display: inline-block; padding: 4px 12px; background-color: #FEF3C7; border: 1px solid #FDE68A; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #D97706; margin-bottom: 12px;">
          EVENT LOGISTICS UPDATE
        </span>
        <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0;">
          Schedule or Venue Change Notice
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0;">
          Hi <strong>${reg.userName}</strong>, please review the latest updates for <strong>${event.title}</strong>.
        </p>
      </div>

      ${
        changeSummary
          ? `<div style="background-color: #FFFBEB; border-left: 4px solid #D97706; border: 1px solid #FDE68A; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; color: #78350F; line-height: 1.6;">
              <strong>What changed:</strong><br>${changeSummary}
            </div>`
          : ""
      }

      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; margin: 20px 0;">
        <h3 style="font-size: 14px; font-weight: 700; color: #0F172A; margin: 0 0 10px 0;">
          Updated Event Information:
        </h3>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #334155; line-height: 2;">
          <tr>
            <td style="color: #64748B; width: 110px;">Date & Time:</td>
            <td><strong>${event.date}</strong> (${event.time || "10:00 AM IST"})</td>
          </tr>
          <tr>
            <td style="color: #64748B;">Location:</td>
            <td><strong>${event.location}</strong></td>
          </tr>
          ${
            event.meetingLink
              ? `<tr><td style="color: #64748B;">Virtual Link:</td><td><a href="${event.meetingLink}" style="color: #2563EB;">${event.meetingLink}</a></td></tr>`
              : ""
          }
        </table>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${BASE_URL}/events/${event.slug}" style="display: inline-block; padding: 12px 26px; background-color: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 12px; border-radius: 12px; text-decoration: none;">
          View Updated Event Portal
        </a>
      </div>
    `;

    const html = wrapEmailTemplate(content, { title: subject });

    await enqueueEmail({
      recipient: reg.userEmail,
      emailType: "transactional",
      subject,
      html,
    });
  }

  processEmailQueue().catch((err) => console.error("[Queue] Processing error:", err));
  return { notifiedCount: registrations.length };
}

// -------------------------------------------------------------
// 6. Automated Event Reminders (24h / 2h before event)
// -------------------------------------------------------------

export async function sendEventReminder(event, reminderType = "24h") {
  const db = await getDb();
  const registrations = db.registrations.filter(
    (r) => r.eventSlug === event.slug && r.status !== "cancelled"
  );

  const is24h = reminderType === "24h";
  const subject = is24h
    ? `⏰ Tomorrow: ${event.title} begins!`
    : `🚀 Starting Soon: ${event.title} in 2 hours!`;

  for (const reg of registrations) {
    const content = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="display: inline-block; padding: 4px 12px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #2563EB; margin-bottom: 12px;">
          ${is24h ? "24-HOUR EVENT REMINDER" : "FINAL CALL REMINDER"}
        </span>
        <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0;">
          ${is24h ? "Get ready to build tomorrow!" : "We're kicking off in 2 hours!"}
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0;">
          Hi ${reg.userName}, your participation pass is confirmed.
        </p>
      </div>

      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px; margin: 20px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #334155; line-height: 2;">
          <tr>
            <td style="color: #64748B; width: 110px;">Event:</td>
            <td><strong>${event.title}</strong></td>
          </tr>
          <tr>
            <td style="color: #64748B;">Ticket Code:</td>
            <td><strong style="font-family: monospace; color: #2563EB;">${reg.ticketCode}</strong></td>
          </tr>
          <tr>
            <td style="color: #64748B;">When:</td>
            <td><strong>${event.date}</strong> (${event.time || "10:00 AM IST"})</td>
          </tr>
          <tr>
            <td style="color: #64748B;">Where:</td>
            <td>
              ${event.location}
              ${event.meetingLink ? `<br><a href="${event.meetingLink}" style="color: #2563EB; text-decoration: underline;">Join Video Call</a>` : ""}
            </td>
          </tr>
        </table>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${BASE_URL}/dashboard?tab=events" style="display: inline-block; padding: 12px 28px; background-color: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 13px; border-radius: 12px; text-decoration: none;">
          Access Your Ticket & Details &rarr;
        </a>
      </div>
    `;

    const html = wrapEmailTemplate(content, { title: subject });

    await enqueueEmail({
      recipient: reg.userEmail,
      emailType: "transactional",
      subject,
      html,
    });
  }

  processEmailQueue().catch((err) => console.error("[Queue] Processing error:", err));
  return { remindedCount: registrations.length };
}

// -------------------------------------------------------------
// 7. Post-Event Follow-up (Feedback, Certificates & Resources)
// -------------------------------------------------------------

export async function sendEventFollowUp(event, { feedbackUrl = "", resourceUrl = "", message = "" } = {}) {
  const db = await getDb();
  const registrations = db.registrations.filter(
    (r) => r.eventSlug === event.slug && r.status !== "cancelled"
  );

  const subject = `🎉 Thank you for participating in ${event.title}!`;

  for (const reg of registrations) {
    const content = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display: inline-block; padding: 4px 12px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 12px; font-family: monospace; font-weight: 700; color: #059669; margin-bottom: 12px;">
          EVENT FOLLOW-UP & RESOURCES
        </span>
        <h2 style="font-size: 24px; font-weight: 800; color: #0F172A; margin: 0 0 8px 0;">
          Thank you for building with us!
        </h2>
        <p style="font-size: 14px; color: #475569; margin: 0; line-height: 1.6;">
          Hi ${reg.userName}, thank you for attending <strong>${event.title}</strong>. Your energy and projects make the Knowvy ecosystem special.
        </p>
      </div>

      ${
        message
          ? `<div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px; color: #334155; line-height: 1.6;">
              ${message}
            </div>`
          : ""
      }

      <div style="margin: 24px 0; text-align: center;">
        ${
          feedbackUrl
            ? `<a href="${feedbackUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2563EB; color: #FFFFFF; font-weight: 700; font-size: 12px; border-radius: 12px; text-decoration: none; margin: 4px;">
                📝 Share Event Feedback
              </a>`
            : ""
        }
        ${
          resourceUrl
            ? `<a href="${resourceUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #7C3AED; color: #FFFFFF; font-weight: 700; font-size: 12px; border-radius: 12px; text-decoration: none; margin: 4px;">
                📁 Access Slides & Recordings
              </a>`
            : ""
        }
      </div>

      <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 12px; color: #64748B; text-align: center;">
        Keep shipping! Stay connected with our WhatsApp developer community for upcoming hackathons and hack nights.
      </div>
    `;

    const html = wrapEmailTemplate(content, { title: subject, showUnsubscribe: true });

    await enqueueEmail({
      recipient: reg.userEmail,
      emailType: "promotional",
      subject,
      html,
    });
  }

  processEmailQueue().catch((err) => console.error("[Queue] Processing error:", err));
  return { recipientCount: registrations.length };
}

// -------------------------------------------------------------
// 8. Password Reset Success Confirmation
// -------------------------------------------------------------

export async function sendPasswordResetSuccessEmail(email) {
  const subject = "Your Knowvy password has been reset";
  const content = `
    <h2 style="font-size: 22px; font-weight: 800; color: #0F172A; margin: 0 0 12px 0;">
      Password Changed Successfully
    </h2>
    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
      The password for your Knowvy account (<strong>${email}</strong>) was just successfully changed.
    </p>
    <div style="background-color: #FEF2F2; border: 1px solid #FECACA; border-radius: 12px; padding: 14px 18px; font-size: 12px; color: #991B1B; line-height: 1.5;">
      <strong>Security Notice:</strong> If you did not make this change, please immediately contact our support team at <a href="mailto:${process.env.SMTP_USER}" style="color: #991B1B; font-weight: 700;">${process.env.SMTP_USER}</a>.
    </div>
  `;

  const html = wrapEmailTemplate(content, { title: subject });
  return await sendEmail({ to: email, subject, html });
}

// -------------------------------------------------------------
// 9. Reliable Background Queue Processor
// -------------------------------------------------------------

let isProcessingQueue = false;

export async function processEmailQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  try {
    const db = await getDb();
    const pendingItems = db.emailQueue.filter((q) => q.status === "pending").slice(0, 10);

    for (const item of pendingItems) {
      item.status = "processing";
      item.attempts += 1;

      try {
        const sendResult = await sendEmail({
          to: item.recipient,
          subject: item.subject,
          html: item.html,
          text: item.text,
        });

        if (sendResult.success) {
          item.status = "sent";
          item.sentAt = new Date().toISOString();
          await logEmailDelivery({
            recipient: item.recipient,
            emailType: item.emailType,
            subject: item.subject,
            status: "sent",
            campaignId: item.campaignId,
          });
        } else {
          item.error = sendResult.error;
          if (item.attempts >= item.maxAttempts) {
            item.status = "failed";
          } else {
            item.status = "pending"; // retry later
          }
          await logEmailDelivery({
            recipient: item.recipient,
            emailType: item.emailType,
            subject: item.subject,
            status: "failed",
            error: sendResult.error,
            campaignId: item.campaignId,
          });
        }
      } catch (err) {
        item.error = err.message;
        item.status = item.attempts >= item.maxAttempts ? "failed" : "pending";
      }

      await saveDb();

      // Gentle rate-limiting delay between sequential dispatches (300ms)
      await new Promise((r) => setTimeout(r, 300));
    }
  } catch (err) {
    console.error("[EmailQueue] Processor error:", err);
  } finally {
    isProcessingQueue = false;
  }
}
