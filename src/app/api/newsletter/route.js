import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const result = await subscribeNewsletter(email);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Successfully subscribed to Knowvy newsletter", data: result.data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
