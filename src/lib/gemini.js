import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

const isConfigured = Boolean(
  apiKey &&
  apiKey !== "your-gemini-api-key" &&
  !apiKey.includes("placeholder")
);

const ai = isConfigured ? new GoogleGenAI({ apiKey }) : null;

export function isGeminiReady() {
  return isConfigured;
}

const KNOWVY_SYSTEM_PROMPT = `
You are the Knowvy AI Assistant & Builder Companion for the Knowvy student technology ecosystem.
Knowvy is Central India's leading student developer community founded in Bhopal by Mohneesh Gupta (MLSA) with 1,500+ active members, 30+ workshops, and 3 national hackathons (Hack-Knowvy).
You help students with:
1. Technical queries (Web development, Three.js, React, Cloud, AI/ML, Open Source, Git).
2. Hackathon brainstorming, architecture suggestions, project roadmaps.
3. Career advice, open-source first PR pipelines, resume tips.
4. Information about Knowvy programs, events (Hack-Knowvy, Azure Cloud Sprint, MLSA bootcamps), and community tracks.

Tone: Technical, empowering, encouraging, concise, and builder-focused. Format responses with clean Markdown.
`;

/**
 * Generate a response using Google Gemini
 */
export async function askGemini(prompt, history = []) {
  if (!isConfigured || !ai) {
    return {
      success: false,
      error: "Gemini API Key is not set in .env. Please add GEMINI_API_KEY to enable AI features.",
    };
  }

  try {
    const formattedContents = [];

    // Include recent history if provided
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach((h) => {
        formattedContents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        });
      });
    }

    // Add current user prompt
    formattedContents.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: KNOWVY_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return {
      success: true,
      text: response.text || "No response generated.",
    };
  } catch (err) {
    console.error("Gemini API Error:", err);
    return {
      success: false,
      error: err.message || "Failed to communicate with Gemini AI.",
    };
  }
}

/**
 * Generate Hackathon Project Ideas with Gemini
 */
export async function generateProjectIdea(track = "Full-Stack", skills = ["React", "Node.js"]) {
  const prompt = `Generate 2 innovative, real-world hackathon project ideas for a student team focusing on track: "${track}".
Their current skills: ${skills.join(", ")}.
For each idea provide:
- Project Title
- One-line elevator pitch
- Technical Architecture & Stack
- Key Winning Factor for Judges`;

  return askGemini(prompt);
}
