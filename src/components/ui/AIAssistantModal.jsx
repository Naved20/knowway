"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Lightbulb,
  Zap,
  CornerDownLeft,
  Volume2,
  Flame,
} from "lucide-react";

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey Builder! 👋 I'm Knowvy AI. Ask me about hackathons, technical tracks, open-source PRs, architecture blueprints, or how to get involved in our ecosystem.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const userText = textToSend || input;
    if (!userText.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          history: newMessages.slice(-6),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${data.error || "Could not reach Gemini AI. Please verify GEMINI_API_KEY in .env"}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response || "No response received.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Connection error. Please check your internet connection or server logs.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    { label: "💡 Hackathon Idea", prompt: "Brainstorm 2 winning hackathon project ideas using Next.js, Three.js, and Cloud." },
    { label: "🚀 First Open Source PR", prompt: "How do I make my first high-quality production Open Source PR?" },
    { label: "⚡ Knowvy Tracks", prompt: "What are the 7 builder tracks in the Knowvy ecosystem and how do I join?" },
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* MOTION-ANIMATED FLOATING TRIGGER BUTTON ("Ask")                           */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Pulsing Radar Aura Waves */}
        <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-25 blur-md animate-pulse pointer-events-none" />
        <span className="absolute -inset-4 rounded-full bg-blue-500/15 animate-ping [animation-duration:3s] pointer-events-none" />

        {/* Gyroscopic Animated Outer Cyber Ring */}
        <div className="absolute -inset-1.5 rounded-full border border-dashed border-blue-500/40 animate-[spin_10s_linear_infinite] pointer-events-none" />
        <div className="absolute -inset-2.5 rounded-full border border-dotted border-indigo-500/30 animate-[spin_16s_linear_infinite_reverse] pointer-events-none" />

        {/* Core Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer border border-blue-400/40"
          title="Open Knowvy AI Assistant"
          aria-label="Open Knowvy AI Assistant"
        >
          {/* Animated AI Mascot Orb Icon */}
          <div className="relative w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white shadow-sm">
            {/* Spinning micro particles */}
            <span className="absolute inset-0 rounded-full border border-white/50 animate-ping [animation-duration:2.5s] opacity-75" />
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-500" />
          </div>

          {/* User Requested Name: "Ask" */}
          <span className="text-xs font-display font-extrabold tracking-wider text-white uppercase pr-1 flex items-center gap-1.5">
            Ask
            {/* 3-Bar Audio Frequency Waveform Animation */}
            <span className="flex items-end gap-[2px] h-3.5 ml-0.5">
              <span className="w-[2.5px] bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-[2.5px] bg-amber-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3.5" />
              <span className="w-[2.5px] bg-emerald-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2.5" />
            </span>
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* GLASSMORPHIC AI CHAT MODAL                                                */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl h-[88vh] sm:h-[640px] rounded-t-3xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            {/* Ambient Top Laser Border Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />

            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 relative">
              <div className="flex items-center gap-3">
                {/* 3D Animated Gyroscopic Avatar */}
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 overflow-hidden">
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent)]" />
                  <Bot className="w-5 h-5 relative z-10 animate-[bounce_3s_ease-in-out_infinite]" />
                  {/* Scanning Laser Line */}
                  <span className="absolute inset-x-0 h-[2px] bg-white/80 top-0 animate-[scan_2s_linear_infinite]" />
                </div>

                <div>
                  <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
                    Knowvy AI Companion
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-mono border border-blue-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Gemini Online
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    Architecture, Hackathons & Code Mentor
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-200/70 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close AI Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs bg-slate-50/50">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20 rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-xs"
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Generating Motion State */}
              {loading && (
                <div className="flex items-center gap-3 text-xs font-mono text-blue-600 pt-2 pl-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Gemini is generating response</span>
                    <span className="flex gap-1 items-center">
                      <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2.5 border-t border-slate-200 flex gap-2 overflow-x-auto bg-slate-50 text-[11px] font-mono no-scrollbar">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.prompt)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all whitespace-nowrap cursor-pointer flex-shrink-0 shadow-xs"
                >
                  {qp.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about hackathons, code, architecture, or career..."
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white disabled:opacity-40 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-500/25 flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
