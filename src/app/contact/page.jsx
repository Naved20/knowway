"use client";

import { useState } from "react";
import { brandData } from "@/data/knowvy-data";
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";
import { submitContactMessage } from "@/lib/supabase";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeOrOrg: "",
    topic: "join",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: `[${formData.topic.toUpperCase()}] from ${formData.collegeOrOrg || "Student"}`,
        message: formData.message,
      });
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Connect with <span className="gradient-text-blue">Knowvy.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed">
            Whether you want to partner for a hackathon, bring a workshop to your college, or join the core developer circle, our team is always accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] space-y-6">
              <h3 className="text-xl font-display font-bold text-white">
                Direct Channels
              </h3>

              <div className="space-y-4 text-sm text-[#8B95A5]">
                <a
                  href={brandData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#111722] border border-[#1C2430] hover:border-[#4D8DFF] hover:text-white transition-all group"
                >
                  <MessageCircle className="w-5 h-5 text-[#4D8DFF]" />
                  <div className="flex-1">
                    <span className="text-white font-bold block text-xs">WhatsApp Community</span>
                    <span className="text-[11px] font-mono text-[#5A6475]">Instant response from leads</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#5A6475] group-hover:text-white" />
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111722] border border-[#1C2430]">
                  <Mail className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block text-xs">Founder & Admin Email</span>
                    <a
                      href={`mailto:${brandData.links.email}`}
                      className="text-xs font-mono text-[#4D8DFF] hover:underline"
                    >
                      {brandData.links.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111722] border border-[#1C2430]">
                  <MapPin className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block text-xs">Origin Location</span>
                    <span className="text-xs font-mono text-[#8B95A5]">
                      {brandData.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#0D1118] border border-[#1C2430]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Message Received
                  </h3>
                  <p className="text-sm text-[#8B95A5] max-w-md mx-auto">
                    Thank you for reaching out to Knowvy. A community lead will get back to you via email or WhatsApp within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#4D8DFF] hover:underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Send a Message
                  </h3>

                  <div>
                    <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@college.edu"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                        College / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.collegeOrOrg}
                        onChange={(e) => setFormData({ ...formData, collegeOrOrg: e.target.value })}
                        placeholder="e.g. RGPV Bhopal"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#4D8DFF]"
                    >
                      <option value="join">Join Knowvy Community</option>
                      <option value="host">Host a Workshop / Hackathon at My Campus</option>
                      <option value="partner">Sponsor / Partner with Knowvy</option>
                      <option value="mentor">Become a Mentor / Speaker</option>
                      <option value="other">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what you'd like to build, collaborate on, or ask..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono placeholder:text-[#5A6475] focus:outline-none focus:border-[#4D8DFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4D8DFF] to-[#3B82F6] text-white font-display font-bold text-xs shadow-lg shadow-[#4D8DFF]/25 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Saving to Supabase...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
