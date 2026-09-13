"use client";

import { useState } from "react";
import { brandData } from "@/data/knowvy-data";
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, ArrowUpRight, Loader2, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";

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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[${formData.topic.toUpperCase()}] from ${formData.collegeOrOrg || "Student"}`,
          message: formData.message,
        }),
      });
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
            Connect with <span className="gradient-text-blue">Knowvy.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about ambassador registrations, partnerships, or upcoming hackathons? Drop us a line and our operations team will respond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Direct Channels
              </h3>

              <div className="space-y-3.5 text-sm text-slate-600">
                <a
                  href={brandData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-slate-900 transition-all group"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <div className="flex-1">
                    <span className="text-slate-900 font-bold block text-xs">WhatsApp Community</span>
                    <span className="text-[11px] font-mono text-emerald-600 font-medium">2,000+ builders online</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                </a>

                <a
                  href={`mailto:${brandData.links.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                >
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-900 font-bold block text-xs">Community Email</span>
                    <span className="text-xs font-mono text-blue-600 truncate block font-medium">
                      {brandData.links.email}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                </a>

                <a
                  href={`tel:${brandData.links.phone}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-500 hover:bg-violet-50/50 transition-all group"
                >
                  <Phone className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-900 font-bold block text-xs">Support Hotline</span>
                    <span className="text-xs font-mono text-slate-700 block">
                      {brandData.links.phone}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                </a>

                <a
                  href={brandData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-pink-500 hover:bg-pink-50/50 transition-all group"
                >
                  <InstagramIcon className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-900 font-bold block text-xs">Instagram</span>
                    <span className="text-xs font-mono text-slate-700 block">
                      @knowvy.technologies
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-900 font-bold block text-xs">Origin & Headquarters</span>
                    <span className="text-xs font-mono text-slate-600">
                      {brandData.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    Message Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out to Knowvy. A community lead will get back to you via email or WhatsApp within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-blue-600 hover:underline pt-2 font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                    Send a Message
                  </h3>

                  <div>
                    <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@college.edu"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                        College / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.collegeOrOrg}
                        onChange={(e) => setFormData({ ...formData, collegeOrOrg: e.target.value })}
                        placeholder="e.g. RGPV Bhopal"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="join">Join Knowvy Community</option>
                      <option value="host">Host a Workshop / Hackathon at My Campus</option>
                      <option value="partner">Sponsor / Partner with Knowvy</option>
                      <option value="mentor">Become a Mentor / Speaker</option>
                      <option value="other">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-700 block mb-1 font-medium">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what you'd like to build, collaborate on, or ask..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-display font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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
