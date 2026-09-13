/**
 * Direct SMTP connection test for Knowvy
 * Run: node test-smtp.mjs
 */
import nodemailer from "nodemailer";
import { readFileSync } from "fs";

// Load .env manually
const envContent = readFileSync(".env", "utf-8");
for (const line of envContent.split("\n")) {
  const eqIdx = line.indexOf("=");
  if (eqIdx > 0 && !line.trimStart().startsWith("#")) {
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    process.env[key] = val;
  }
}

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();

console.log("=== SMTP Config ===");
console.log("Host:", host);
console.log("Port:", port);
console.log("User:", user);
console.log("Pass length:", pass?.length, "(expected 16 chars for Gmail App Password)");
console.log("Pass (masked):", pass ? `${pass.slice(0,4)}****${pass.slice(-4)}` : "MISSING");
console.log("");

// Test 1: PORT 465 SSL
console.log("--- Test 1: Port 465 (SSL/SMTPS) ---");
try {
  const t1 = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });
  await t1.verify();
  console.log("✅ Port 465 SSL: SUCCESS");
} catch (e) {
  console.log("❌ Port 465 SSL FAILED:", e.message);
  console.log("   Full error code:", e.code, "| Response:", e.response);
}

// Test 2: PORT 587 STARTTLS
console.log("\n--- Test 2: Port 587 (STARTTLS) ---");
try {
  const t2 = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });
  await t2.verify();
  console.log("✅ Port 587 STARTTLS: SUCCESS");
} catch (e) {
  console.log("❌ Port 587 STARTTLS FAILED:", e.message);
  console.log("   Full error code:", e.code, "| Response:", e.response);
}

// Test 3: PORT 465 with Gmail service shorthand
console.log("\n--- Test 3: Gmail service (auto config) ---");
try {
  const t3 = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 10000,
  });
  await t3.verify();
  console.log("✅ Gmail service: SUCCESS");
  
  // Try sending a test email to the same address
  console.log("\nSending test email to self...");
  const info = await t3.sendMail({
    from: `"Knowvy Test" <${user}>`,
    to: user,
    subject: "✅ Knowvy SMTP Test - Working!",
    text: "SMTP is configured correctly and working. This is a test from Knowvy.",
    html: `<div style="font-family:sans-serif;padding:20px;"><h2 style="color:#2563EB;">✅ SMTP Test Successful!</h2><p>Your Knowvy SMTP is working correctly.</p><p>Sent at: ${new Date().toISOString()}</p></div>`,
  });
  console.log("✅ Test email sent! Message ID:", info.messageId);
  console.log("   Response:", info.response);
} catch (e) {
  console.log("❌ Gmail service FAILED:", e.message);
  console.log("   Full error code:", e.code, "| Response:", e.response);
}
