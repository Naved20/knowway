import nodemailer from "nodemailer";

/**
 * Creates and returns a Nodemailer transporter instance
 * using credentials from environment variables.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials (SMTP_USER, SMTP_PASS) are not configured in environment variables.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    // Useful for local testing / self-signed certificates if needed
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Verify that the SMTP transporter is configured and can connect
 */
export async function verifySmtp() {
  try {
    const transporter = getMailTransporter();
    await transporter.verify();
    return { success: true, message: "SMTP connection verified successfully." };
  } catch (error) {
    console.error("SMTP Verification Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Send an email through the configured SMTP server
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text fallback
 * @param {string} [options.from] - Sender address (defaults to SMTP_USER)
 * @param {string} [options.replyTo] - Reply-To address
 */
export async function sendEmail({ to, subject, html, text, from, replyTo }) {
  try {
    const transporter = getMailTransporter();
    const sender = from || `"Knowvy Community" <${process.env.SMTP_USER}>`;

    const info = await transporter.sendMail({
      from: sender,
      to,
      replyTo: replyTo || process.env.SMTP_USER,
      subject,
      text: text || html.replace(/<[^>]*>?/gm, ""),
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error("SMTP sendMail Error:", error);
    return {
      success: false,
      error: error.message || "Failed to send email via SMTP.",
    };
  }
}

/**
 * Pre-formatted HTML templates for Knowvy
 */
export const EmailTemplates = {
  welcomeBuilder: ({ name = "Builder", email }) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF; color: #0F172A; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="padding: 32px 24px; background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%); border-bottom: 1px solid #E2E8F0; text-align: center;">
        <h1 style="margin: 0; color: #2563EB; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">KNOWVY</h1>
        <p style="margin: 6px 0 0 0; color: #64748B; font-size: 13px;">Central India's Leading Student Developer Community</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0F172A; font-size: 20px; margin-top: 0;">Welcome to the Ecosystem, ${name}! 🚀</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          You are now connected with 1,500+ student builders across Central India. Prepare to participate in 36-hour hackathons, open-source cohorts, and hands-on cloud tracks.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
          <h3 style="color: #7C3AED; font-size: 15px; margin: 0 0 8px 0;">Next Steps:</h3>
          <ul style="color: #334155; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Join our official WhatsApp developer community</li>
            <li>Explore active hackathons from Unstop, Devfolio, MLH & Devpost</li>
            <li>Connect with student mentors and Azure MLSA leads</li>
          </ul>
        </div>
      </div>
      <div style="padding: 20px 24px; background: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #64748B;">
        Sent with ❤️ by Knowvy Tech Community &bull; Bhopal, India
      </div>
    </div>
  `,

  contactInquiry: ({ name, email, subject, message }) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF; color: #0F172A; border-radius: 16px; border: 1px solid #E2E8F0; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <h2 style="color: #2563EB; margin-top: 0;">📬 New Inquiry via Knowvy</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #334155;">
        <tr><td style="padding: 8px 0; color: #64748B; width: 100px;">From:</td><td><strong>${name}</strong> (&lt;${email}&gt;)</td></tr>
        <tr><td style="padding: 8px 0; color: #64748B;">Subject:</td><td>${subject || "General Inquiry"}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; color: #0F172A; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${message}
      </div>
    </div>
  `,
};
