import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "knowvy_default_fallback_secret_key_2026";
const SESSION_COOKIE_NAME = "knowvy_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

// -------------------------------------------------------------
// 1. Password Hashing & Verification (Scrypt + TimingSafe)
// -------------------------------------------------------------

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export function verifyPassword(password, storedHash) {
  return new Promise((resolve, reject) => {
    if (!storedHash || !storedHash.includes(":")) {
      return resolve(false);
    }
    const [salt, key] = storedHash.split(":");
    const keyBuffer = Buffer.from(key, "hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      try {
        const match = crypto.timingSafeEqual(keyBuffer, derivedKey);
        resolve(match);
      } catch {
        resolve(false);
      }
    });
  });
}

// -------------------------------------------------------------
// 2. Cryptographic OTP Generation & Validation
// -------------------------------------------------------------

export function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

export function hashOtp(otp) {
  return crypto.createHmac("sha256", JWT_SECRET).update(String(otp).trim()).digest("hex");
}

export function verifyOtpHash(otp, storedOtpHash) {
  const computed = hashOtp(otp);
  try {
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(storedOtpHash));
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// 3. HMAC-SHA256 JWT Session & Verification Tokens
// -------------------------------------------------------------

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString();
}

export function signToken(payload, expiresInSeconds = SESSION_DURATION_SECONDS) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  try {
    const validSig = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!validSig) return null;

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// 4. Session Cookies & Route Helpers
// -------------------------------------------------------------

export function buildSessionCookieHeader(token) {
  const isProd = process.env.NODE_ENV === "production";
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DURATION_SECONDS}${
    isProd ? "; Secure" : ""
  }`;
}

export function buildClearSessionCookieHeader() {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getSessionUser(request) {
  let cookieHeader = "";
  if (request?.headers?.get) {
    cookieHeader = request.headers.get("cookie") || "";
  } else if (typeof document !== "undefined") {
    cookieHeader = document.cookie || "";
  }

  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([k]) => Boolean(k))
  );

  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) return null;

  return verifyToken(token);
}

export function requireAdmin(request) {
  const user = getSessionUser(request);
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}
