import { NextResponse } from "next/server";
import { submitContactMessage } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const result = await submitContactMessage({ name, email, subject, message });
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Inquiry saved to Knowvy Supabase database", data: result.data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
