import { NextResponse } from "next/server";
import { askGemini, generateProjectIdea, isGeminiReady } from "@/lib/gemini";

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, history, action, track, skills } = body;

    if (!isGeminiReady()) {
      return NextResponse.json(
        {
          error: "Gemini API key not configured. Please add GEMINI_API_KEY in your .env file.",
          isConfigured: false,
        },
        { status: 400 }
      );
    }

    if (action === "hackathon-idea") {
      const result = await generateProjectIdea(track || "Full-Stack", skills || ["React", "Cloud"]);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json({ response: result.text });
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt string is required" }, { status: 400 });
    }

    const result = await askGemini(prompt, history);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ response: result.text });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
