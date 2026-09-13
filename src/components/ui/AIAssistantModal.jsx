"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Loader2, Lightbulb, Code2 } from "lucide-react";

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey Builder! 👋 I'm Knowvy AI, powered by Google Gemini. Ask me about hackathons, open source, cloud tracks, architecture ideas, or how to get involved in the Knowvy ecosystem.",
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
      {/* Floating AI Button in Bottom-Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-[#4D8DFF] to-[#8B5CF6] text-white shadow-2xl shadow-[#4D8DFF]/40 hover:shadow-[#4D8DFF]/60 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer border border-white/20"
        title="Knowvy AI Companion"
        aria-label="Open Knowvy AI Assistant"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline text-xs font-display font-bold pr-1">
          Ask Gemini
        </span>
      </button>

      {/* Glassmorphic AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl h-[85vh] sm:h-[620px] rounded-t-3xl sm:rounded-3xl lusion-glass border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4D8DFF] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#4D8DFF]/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                    Knowvy AI Assistant
                    <span className="px-2 py-0.5 rounded-full bg-[#4D8DFF]/20 text-[#4D8DFF] text-[10px] font-mono border border-[#4D8DFF]/30">
                      Gemini 2.5
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-[#8B95A5]">
                    Builder Companion for Student Developers
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-[#8B95A5] hover:text-white transition-colors cursor-pointer"
                aria-label="Close AI Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-lg bg-[#4D8DFF]/20 border border-[#4D8DFF]/40 text-[#4D8DFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-[#4D8DFF] text-white font-medium"
                        : "bg-[#111722] border border-[#1C2430] text-[#CBD5E1]"
                    }`}
                  >
                    {m.content}
                  </div>

                  {m.role === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#4D8DFF] pt-1 pl-9">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Gemini is generating response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-2 overflow-x-auto bg-black/20 text-[11px] font-mono no-scrollbar">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.prompt)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#4D8DFF]/50 text-[#8B95A5] hover:text-white transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
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
              className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about hackathons, code, tracks, or career..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D1118] border border-[#1C2430] text-xs text-white placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white disabled:opacity-50 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-[#4D8DFF]/30"
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
