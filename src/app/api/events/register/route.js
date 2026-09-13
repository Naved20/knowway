import { NextResponse } from "next/server";
import { createRegistration, getEventBySlug } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { sendRegistrationConfirmationEmail } from "@/lib/email-service";
import { registerEvent as registerSupabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const session = getSessionUser(request);
    const body = await request.json();

    const eventSlug = body.eventSlug?.trim();
    if (!eventSlug) {
      return NextResponse.json({ error: "Event slug is required." }, { status: 400 });
    }

    const email = (body.email || session?.email || "").toLowerCase().trim();
    const name = (body.name || session?.name || "").trim();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required to register for an event." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const event = await getEventBySlug(eventSlug);
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const result = await createRegistration({
      eventSlug,
      userEmail: email,
      userName: name,
      userId: session?.userId || null,
      github: body.github || "",
      college: body.college || "",
      year: body.year || "",
      phone: body.phone || "",
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const registration = result.registration;

    // Send rich branded registration confirmation email with digital ticket pass
    sendRegistrationConfirmationEmail(registration, event).catch((e) =>
      console.error("[Registration Confirmation Email Error]:", e)
    );

    // Non-blocking sync to Supabase for historical redundancy if configured
    registerSupabase({
      eventSlug,
      name,
      email,
      github: body.github || "",
      college: body.college || "",
      year: body.year || "",
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: `Registration confirmed! A digital ticket pass has been sent to ${email}.`,
      registration,
      ticketCode: registration.ticketCode,
    });
  } catch (error) {
    console.error("[API Event Registration Error]:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
