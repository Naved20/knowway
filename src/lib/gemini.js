import { GoogleGenAI } from "@google/genai";

function getApiKey() {
  const key = process.env.GEMINI_API_KEY || "";
  return key.replace(/['"]/g, "").trim();
}

export function isGeminiReady() {
  const key = getApiKey();
  return Boolean(
    key &&
    key !== "your-gemini-api-key" &&
    key !== "your-gemini-api-key-from-google-ai-studio" &&
    !key.includes("placeholder")
  );
}

function getAIClient() {
  const key = getApiKey();
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
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
 * Generate a response using Google Gemini with multi-model resiliency
 */
export async function askGemini(prompt, history = []) {
  if (!isGeminiReady()) {
    return {
      success: false,
      error: "Gemini API Key is not set in .env. Please add GEMINI_API_KEY to enable AI features.",
    };
  }

  const ai = getAIClient();
  if (!ai) {
    return {
      success: false,
      error: "Could not initialize Google GenAI client.",
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

    // Try supported modern models in order of capability
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-flash-latest",
      "gemini-3-flash-preview",
      "gemini-2.5-flash-lite",
    ];
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: KNOWVY_SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          return {
            success: true,
            text: response.text,
            modelUsed: modelName,
          };
        }
      } catch (err) {
        lastError = err;
        // Continue to next model if model was not found
        console.warn(`Model ${modelName} failed, trying next candidate...`, err.message);
      }
    }

    throw lastError || new Error("All Gemini model candidates failed.");
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

/**
 * Generate high-converting daily builder promotional email copy using Gemini AI
 */
export async function generateDailyPromotionalCampaignCopy(event, daysRemaining = 5) {
  const urgencyLabel =
    daysRemaining <= 1
      ? "Happening tomorrow / Final hours to claim free passes"
      : daysRemaining <= 3
      ? `Only ${daysRemaining} days left until kickoff`
      : `${daysRemaining} days countdown`;

  const prompt = `You are Knowvy's Lead Developer Advocate and Community Director.
Write an energetic, inspiring, builder-first daily promotional email copy for our upcoming flagship student developer event.

EVENT METADATA:
- Title: ${event.title}
- Category: ${event.category || "Hackathon & Tech Sprint"}
- Date: ${event.date} (${event.time || "10:00 AM IST"})
- Location: ${event.location || "MANIT Bhopal & Online"}
- Short Description: ${event.shortDescription || ""}
- Key Tracks / Challenges: ${
    Array.isArray(event.challenges) ? event.challenges.join(", ") : "AI, Web3, Cloud, Open Source"
  }
- Timeline Context: ${urgencyLabel}

REQUIREMENTS:
1. Speak directly to college students, developers, and tech builders in Central India.
2. Highlight why attending will accelerate their developer journey, open doors to mentors, bounties, internships, and build proof-of-work.
3. Keep the tone vibrant, empowering, and concise.

Return STRICTLY a JSON object with this exact schema (no markdown fences, just pure JSON):
{
  "subject": "Punchy email subject line with 1 emoji and urgency (max 9 words)",
  "headline": "A bold, inspiring 1-sentence hook to capture attention immediately",
  "paragraphs": [
    "Engaging paragraph 1 on the problem statement / why this event matters",
    "Engaging paragraph 2 on tracks, mentors, prizes, or hands-on hacking",
    "Direct call to action urging them to secure their digital pass before capacity fills up"
  ],
  "highlightCallout": "One key reason not to miss out (e.g., Free Digital Pass, Cash Prizes, Direct Mentor Feedback)",
  "actionText": "Claim Your Builder Pass"
}`;

  try {
    const aiResult = await askGemini(prompt);
    if (aiResult && aiResult.success && aiResult.text) {
      // Clean up markdown fences if returned
      const cleanJson = aiResult.text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleanJson);
      return {
        success: true,
        data: {
          subject: parsed.subject || `🚀 Don't miss ${event.title} — ${urgencyLabel}!`,
          headline: parsed.headline || `Your next breakthrough begins at ${event.title}.`,
          paragraphs: Array.isArray(parsed.paragraphs) ? parsed.paragraphs : [parsed.paragraphs],
          highlightCallout: parsed.highlightCallout || "Free Passes • Industry Mentors • Ecosystem Certificate",
          actionText: parsed.actionText || "Claim Your Free Pass",
          aiGenerated: true,
        },
      };
    }
  } catch (err) {
    console.warn("[Gemini Promo Copy Generator] AI parse error, using resilient fallback:", err.message);
  }

  // Resilient High-Quality Builder Fallback Copy
  return {
    success: true,
    data: {
      subject: `⚡ ${daysRemaining <= 1 ? "Last Chance:" : "Join Central India Builders at"} ${event.title}!`,
      headline: `Build, collaborate, and ship proof-of-work at ${event.title}.`,
      paragraphs: [
        `Hey Builder, the countdown is on! ${event.title} is bringing together the brightest student developers and technologists across Central India.`,
        `Whether you are diving into ${
          Array.isArray(event.challenges) && event.challenges.length > 0
            ? event.challenges.slice(0, 2).join(" or ")
            : "AI, Web Architecture, and Open Source"
        }, this is your opportunity to build real solutions, connect with experienced mentors, and earn ecosystem credentials.`,
        `Digital ticket passes are completely free for all community members, but venue and capacity limits apply. Secure your pass today and lock in your spot!`,
      ],
      highlightCallout: "Free Digital Ticket • Hands-on Mentorship • Community Recognition",
      actionText: "Claim Free Builder Pass",
      aiGenerated: false,
    },
  };
}

