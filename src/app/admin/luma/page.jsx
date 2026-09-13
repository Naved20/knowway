"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Wand2, CheckCircle2, UploadCloud, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminLumaStudioPage() {
  const [eventName, setEventName] = useState("Hack-Knowvy 2026");
  const [theme, setTheme] = useState("Futuristic Bhopal Cybernetic Campus");
  const [visualDirection, setVisualDirection] = useState("Night atmosphere, dark metallic glass, glowing blue and violet circuits, cinematic slow drone pan");
  const [prompt, setPrompt] = useState(
    "Cinematic camera tracking across an ultra-modern Indian technology campus at night, illuminated by electric blue fiber optics and violet neon highlights, student builders collaborating, 8k, realistic."
  );
  const [aspectRatio, setAspectRatio] = useState("16:9");

  // Workflow State: idle -> generating -> polling -> uploading -> completed
  const [generationState, setGenerationState] = useState("idle");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedResult, setGeneratedResult] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerationState("generating");
    setGenerationProgress(20);

    // Step 1: Simulated backend call to Luma API
    setTimeout(() => {
      setGenerationState("polling");
      setGenerationProgress(55);

      // Step 2: Status polling simulation
      setTimeout(() => {
        setGenerationState("uploading");
        setGenerationProgress(85);

        // Step 3: Cloudinary upload & asset save
        setTimeout(() => {
          setGenerationState("completed");
          setGenerationProgress(100);
          setGeneratedResult({
            id: `luma-gen-${Date.now()}`,
            mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
            prompt,
            aspectRatio,
            cloudinaryId: "knowvy/luma/bhopal_cyber_campus",
          });
        }, 1200);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8B95A5] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin Dashboard
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Sparkles className="w-3.5 h-3.5" />
            Luma Dream Machine Generation Pipeline
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Luma Creative Studio
          </h1>
          <p className="text-sm text-[#8B95A5] leading-relaxed max-w-2xl">
            Generate high-definition cinematic motion visuals for hackathon banners, hero atmospheres, and 3D web layers. Outputs are automatically compressed and synced with Cloudinary.
          </p>
        </div>

        {/* Security & Efficiency Notice */}
        <div className="p-4 rounded-xl bg-[#0D1118] border border-[#1C2430] flex items-start gap-3 text-xs text-[#8B95A5]">
          <AlertCircle className="w-4 h-4 text-[#4D8DFF] flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Architecture Rules: </strong>
            Luma API keys are strictly secured on the server. Public pages never trigger real-time generations on load; assets are permanently saved to Cloudinary and reused across the application.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Generation Configuration Form */}
          <div className="lg:col-span-6 p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430]">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                  Event / Initiative Name
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                  Atmospheric Theme
                </label>
                <input
                  type="text"
                  required
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                  Visual Direction & Palette
                </label>
                <input
                  type="text"
                  value={visualDirection}
                  onChange={(e) => setVisualDirection(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                  Luma Dream Machine Prompt
                </label>
                <textarea
                  rows={4}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {["16:9", "9:16", "1:1", "4:3"].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all ${
                        aspectRatio === ratio
                          ? "bg-[#8B5CF6] text-white font-bold"
                          : "bg-[#111722] text-[#8B95A5] border border-[#1C2430]"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={generationState !== "idle" && generationState !== "completed"}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white font-display font-bold text-xs shadow-lg shadow-[#8B5CF6]/25 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {generationState === "idle" || generationState === "completed" ? (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate & Upload to Cloudinary
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing ({generationProgress}%)
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Real-Time Status & Asset Preview */}
          <div className="lg:col-span-6 p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-white">
                Pipeline Status & Preview
              </h3>

              {/* Progress Steps */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#8B95A5]">
                  <span>1. Luma API Submission</span>
                  {generationProgress >= 20 ? (
                    <span className="text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sent
                    </span>
                  ) : (
                    <span>Pending</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[#8B95A5]">
                  <span>2. Dream Machine Neural Generation</span>
                  {generationProgress >= 55 ? (
                    <span className="text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synthesized
                    </span>
                  ) : (
                    <span>Waiting</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[#8B95A5]">
                  <span>3. Cloudinary CDN Sync (agdaiyhe)</span>
                  {generationProgress >= 85 ? (
                    <span className="text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                    </span>
                  ) : (
                    <span>Waiting</span>
                  )}
                </div>
              </div>

              {/* Visual Preview Box */}
              <div className="relative h-64 rounded-xl overflow-hidden bg-[#07090D] border border-[#1C2430] flex items-center justify-center">
                {generatedResult ? (
                  <img
                    src={generatedResult.mediaUrl}
                    alt="Generated Luma Asset"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-[#5A6475]">
                    <UploadCloud className="w-8 h-8 mx-auto text-[#4D8DFF]/40" />
                    <span className="text-xs font-mono block">
                      Asset preview will render here after generation completes.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {generatedResult && (
              <div className="p-4 rounded-xl bg-[#111722] border border-[#1C2430] text-xs font-mono text-[#8B95A5] space-y-1">
                <span className="text-[#10B981] font-bold block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Asset Stored in Cloudinary:
                </span>
                <span className="text-white">{generatedResult.cloudinaryId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
