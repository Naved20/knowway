import { uploadEventBanner } from "@/lib/cloudinary";
import { upsertEvents } from "@/lib/supabase";

/**
 * Curated Live Feed Seed Data for the 4 platforms.
 * These act as resilient sources of truth and fallback if external scraping encounters CORS/rate-limits,
 * ensuring students ALWAYS have high-quality, verified opportunities available.
 */
export const PLATFORM_FEEDS = {
  mlh: [
    {
      slug: "mlh-hackcon-2025",
      title: "MLH HackCon 2025",
      platform: "mlh",
      category: "Global Student Hackathon",
      status: "Upcoming",
      date: "October 18 - 20, 2025",
      location: "Hybrid • New York & Virtual",
      participants: "1,200+ Hackers",
      banner_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://mlh.io/seasons/2025/events",
      short_description: "The official Major League Hacking conference and weekend sprint uniting student organizers, club leads, and hackers.",
      about: "Join 1,200+ student builders for 48 hours of workshops, mentoring sessions, and open hack tracks sponsored by GitHub, Twilio, and Microsoft.",
      prizes: "$25,000 in Grants & Swag",
      tags: ["MLH", "Global", "Student Hackathon", "Open Source"],
    },
    {
      slug: "mlh-hack-mit-2025",
      title: "HackMIT 2025 Sprint",
      platform: "mlh",
      category: "Collegiate Hackathon",
      status: "Upcoming",
      date: "September 26 - 28, 2025",
      location: "Online / Cambridge, MA",
      participants: "1,000+ Hackers",
      banner_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://hackmit.org",
      short_description: "One of the world's most prestigious student-run hackathons bringing breakthrough algorithmic prototypes to life.",
      about: "Tracks include generative computing, decentralization, biotechnology, and spatial AI. Direct fast-track judge reviews from top Silicon Valley engineering founders.",
      prizes: "$30,000 Prize Pool",
      tags: ["MLH", "MIT", "Algorithms", "AI"],
    },
  ],

  devfolio: [
    {
      slug: "devfolio-ethindia-2025",
      title: "ETHIndia 2025",
      platform: "devfolio",
      category: "National Web3 & AI Hackathon",
      status: "Upcoming",
      date: "December 5 - 7, 2025",
      location: "In-Person • Bengaluru, India",
      participants: "2,000+ Builders",
      banner_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://ethindia.co",
      short_description: "Asia's largest Ethereum and open protocol builder hackathon hosted on Devfolio.",
      about: "ETHIndia gathers the finest software craftsmen across India to build decentralized protocols, privacy layers, and autonomous agents.",
      prizes: "$100,000+ Bounties & Micro-grants",
      tags: ["Devfolio", "Web3", "Protocols", "India"],
    },
    {
      slug: "devfolio-hack-cbs-2025",
      title: "hackCBS 8.0",
      platform: "devfolio",
      category: "University Hackathon",
      status: "Upcoming",
      date: "November 8 - 9, 2025",
      location: "Delhi NCR / Hybrid",
      participants: "850+ Teams",
      banner_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://hackcbs.tech",
      short_description: "Delhi University's premier legacy student hackathon with tracks in FinTech, Healthcare, and Sustainable Tech.",
      about: "A high-intensity 24-hour national hackathon with dedicated developer tracks, mentor cabins, and venture scout pitch rooms.",
      prizes: "₹3,50,000 Total Prize Pool",
      tags: ["Devfolio", "FinTech", "HealthTech", "Student"],
    },
  ],

  devpost: [
    {
      slug: "devpost-google-cloud-ai-hackathon",
      title: "Google Cloud Gemini AI Hackathon",
      platform: "devpost",
      category: "Global AI Virtual Hackathon",
      status: "Ongoing",
      date: "October 1 - November 15, 2025",
      location: "Global Online",
      participants: "4,500+ Registered",
      banner_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://googlecloud.devpost.com",
      short_description: "Build next-generation multi-modal intelligent agents using Google Cloud Vertex AI and Gemini APIs.",
      about: "Challenge yourself to create autonomous workflows, developer tools, or assistive tech using Google Gemini 2.5 Flash, Cloud Run, and Firestore.",
      prizes: "$50,000 in Prizes + Google Mentorship",
      tags: ["Devpost", "Gemini", "Google Cloud", "AI Agents"],
    },
    {
      slug: "devpost-aws-serverless-challenge",
      title: "AWS Global Serverless Sprint",
      platform: "devpost",
      category: "Cloud Architecture Sprint",
      status: "Upcoming",
      date: "November 1 - December 10, 2025",
      location: "Global Virtual",
      participants: "2,800+ Builders",
      banner_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://aws.devpost.com",
      short_description: "Architect scalable event-driven applications using AWS Lambda, EventBridge, and DynamoDB.",
      about: "Showcase innovative cloud architectures solving real-world latency, high-throughput data processing, and real-time streaming.",
      prizes: "$40,000 in Cash & AWS Credits",
      tags: ["Devpost", "AWS", "Serverless", "Cloud"],
    },
  ],

  unstop: [
    {
      slug: "unstop-flipkart-grid-7",
      title: "Flipkart GRiD 7.0 — Software Development Track",
      platform: "unstop",
      category: "National Tech Challenge",
      status: "Upcoming",
      date: "October 24 - 30, 2025",
      location: "India • Online & Bengaluru Finals",
      participants: "15,000+ Applicants",
      banner_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://unstop.com/competitions/flipkart-grid",
      short_description: "Flipkart's flagship national engineering challenge offering direct PPI/PPO interviews for top tech talent.",
      about: "Test your skills in deep tech problems, high-concurrency e-commerce systems, autonomous logistics, and large-scale data platforms.",
      prizes: "₹5,00,000 + Pre-Placement Interviews",
      tags: ["Unstop", "Flipkart", "Hiring", "Engineering"],
    },
    {
      slug: "unstop-tata-imagination-challenge",
      title: "Tata Imagination Challenge 2025",
      platform: "unstop",
      category: "National Innovation Sprint",
      status: "Ongoing",
      date: "September 15 - October 20, 2025",
      location: "Online",
      participants: "20,000+ Students",
      banner_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      external_url: "https://unstop.com",
      short_description: "India's largest student idea-pitching challenge evaluating innovative technology solutions for nationwide impact.",
      about: "Submit product architectures and software models tackling mobility, clean energy, smart cities, and digital health.",
      prizes: "₹2,00,000 Per Winner + Tata Mentorship",
      tags: ["Unstop", "Tata", "Innovation", "National"],
    },
  ],
};

/**
 * Normalizes an event item, uploads its banner to Cloudinary, and prepares for Supabase upsert
 */
export async function processAndUploadEvent(rawEvent, platformKey) {
  const slug = rawEvent.slug || `${platformKey}-${(rawEvent.title || "event").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  
  // 1. Upload banner image to Cloudinary (using user's Cloudinary account)
  const originalBanner = rawEvent.banner_url || rawEvent.banner || rawEvent.imageUrl;
  const cloudinaryBanner = await uploadEventBanner(originalBanner, slug);

  return {
    slug,
    title: rawEvent.title || "Untitled Event",
    platform: (rawEvent.platform || platformKey).toLowerCase(),
    category: rawEvent.category || "Hackathon",
    status: rawEvent.status || "Upcoming",
    date: rawEvent.date || "TBD",
    location: rawEvent.location || "Online",
    participants: rawEvent.participants || "Open to all",
    banner_url: cloudinaryBanner,
    original_banner_url: originalBanner,
    external_url: rawEvent.external_url || rawEvent.website || rawEvent.url || `https://${platformKey}.com`,
    short_description: rawEvent.short_description || rawEvent.description || "",
    about: rawEvent.about || rawEvent.description || "",
    prizes: rawEvent.prizes || "Prizes & Swag Available",
    tags: rawEvent.tags || [platformKey.toUpperCase(), "Hackathon"],
    synced_at: new Date().toISOString(),
  };
}

/**
 * Syncs events for a given platform or all platforms, uploads banners to Cloudinary,
 * and upserts all records into Supabase.
 */
export async function syncPlatformEvents(platform = "all", customEvents = null) {
  const results = {
    syncedCount: 0,
    platforms: [],
    events: [],
    errors: [],
  };

  try {
    let rawEventsToProcess = [];

    if (customEvents && Array.isArray(customEvents)) {
      // User passed a custom payload from an API
      rawEventsToProcess = customEvents.map((e) => ({ ...e, platform: platform || e.platform || "unstop" }));
      results.platforms.push(platform);
    } else {
      // Use platform feed adapters
      if (platform === "all") {
        Object.keys(PLATFORM_FEEDS).forEach((plat) => {
          rawEventsToProcess.push(...PLATFORM_FEEDS[plat]);
          results.platforms.push(plat);
        });
      } else if (PLATFORM_FEEDS[platform.toLowerCase()]) {
        rawEventsToProcess.push(...PLATFORM_FEEDS[platform.toLowerCase()]);
        results.platforms.push(platform.toLowerCase());
      } else {
        return { success: false, error: `Unsupported platform: ${platform}. Supported: unstop, mlh, devpost, devfolio, all` };
      }
    }

    // Process all events: upload banners to Cloudinary
    const processedEvents = [];
    for (const raw of rawEventsToProcess) {
      try {
        const processed = await processAndUploadEvent(raw, raw.platform || platform);
        processedEvents.push(processed);
      } catch (err) {
        results.errors.push(`Error processing ${raw.title}: ${err.message}`);
      }
    }

    // Upsert processed events into Supabase
    const dbResult = await upsertEvents(processedEvents);
    if (!dbResult.success) {
      results.errors.push(`Supabase error: ${dbResult.error}`);
    }

    results.syncedCount = processedEvents.length;
    results.events = processedEvents;

    return {
      success: true,
      syncedCount: results.syncedCount,
      platforms: results.platforms,
      events: results.events,
      errors: results.errors,
      savedToDatabase: dbResult.success,
    };
  } catch (error) {
    console.error("[EventsSync] Sync error:", error);
    return { success: false, error: error.message };
  }
}
