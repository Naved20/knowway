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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Admin Dashboard
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-mono text-violet-600">
            <Sparkles className="w-3.5 h-3.5" />
            Luma Dream Machine Generation Pipeline
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900">
            Luma Creative Studio
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            Generate high-definition cinematic motion visuals for hackathon banners, hero atmospheres, and 3D web layers. Outputs are automatically compressed and synced with Cloudinary.
          </p>
        </div>

        {/* Security & Efficiency Notice */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-900">Architecture Rules: </strong>
            Luma API keys are strictly secured on the server. Public pages never trigger real-time generations on load; assets are permanently saved to Cloudinary and reused across the application.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Generation Configuration Form */}
          <div className="lg:col-span-6 p-7 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                  Event / Initiative Name
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                  Atmospheric Theme
                </label>
                <input
                  type="text"
                  required
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                  Visual Direction & Palette
                </label>
                <input
                  type="text"
                  value={visualDirection}
                  onChange={(e) => setVisualDirection(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                  Luma Dream Machine Prompt
                </label>
                <textarea
                  rows={4}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {["16:9", "9:16", "1:1", "4:3"].map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        aspectRatio === ratio
                          ? "bg-violet-600 text-white font-bold shadow-sm"
                          : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
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
                className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-display font-bold text-xs shadow-md shadow-violet-500/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
          <div className="lg:col-span-6 p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Pipeline Status & Preview
              </h3>

              {/* Progress Steps */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-600">
                  <span>1. Luma API Submission</span>
                  {generationProgress >= 20 ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Sent
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>2. Dream Machine Neural Generation</span>
                  {generationProgress >= 55 ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synthesized
                    </span>
                  ) : (
                    <span className="text-slate-400">Waiting</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>3. Cloudinary CDN Sync (agdaiyhe)</span>
                  {generationProgress >= 85 ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Synced
                    </span>
                  ) : (
                    <span className="text-slate-400">Waiting</span>
                  )}
                </div>
              </div>

              {/* Visual Preview Box */}
              <div className="relative h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                {generatedResult ? (
                  <img
                    src={generatedResult.mediaUrl}
                    alt="Generated Luma Asset"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-slate-400">
                    <UploadCloud className="w-8 h-8 mx-auto text-blue-500/40" />
                    <span className="text-xs font-mono block">
                      Asset preview will render here after generation completes.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {generatedResult && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
                <span className="text-emerald-600 font-bold block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Asset Stored in Cloudinary:
                </span>
                <span className="text-slate-900 font-bold">{generatedResult.cloudinaryId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
