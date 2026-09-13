import { NextResponse } from "next/server";
import { buildClearSessionCookieHeader } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });
  response.headers.set("Set-Cookie", buildClearSessionCookieHeader());
  return response;
}
