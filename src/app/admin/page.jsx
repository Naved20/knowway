"use client";

import { useState } from "react";
import Link from "next/link";
import { eventsData, teamData, galleryData, brandData } from "@/data/knowvy-data";
import {
  Shield,
  Calendar,
  Users,
  Image as ImageIcon,
  Sparkles,
  Plus,
  ArrowUpRight,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("events");
  const [eventsList, setEventsList] = useState(eventsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("Technical Workshop");

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEv = {
      slug: newEventTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newEventTitle,
      category: newEventCategory,
      status: "Upcoming",
      date: "Upcoming 2026",
      location: "Bhopal, India",
      participants: "50+ Expected",
      banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
      shortDescription: `New technical initiative organized by Knowvy community members.`,
      about: "Structured hands-on developer session.",
      highlights: ["Interactive mentorship", "Certification support"],
      challenges: [],
      partners: ["Knowvy Community"],
      winningTeams: [],
    };

    setEventsList([newEv, ...eventsList]);
    setNewEventTitle("");
    setShowAddModal(false);
  };

  const handleDeleteEvent = (slug) => {
    setEventsList(eventsList.filter((e) => e.slug !== slug));
  };

  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2430]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF] mb-2">
              <Shield className="w-3.5 h-3.5" />
              Knowvy Admin Workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Platform Management
            </h1>
            <p className="text-xs font-mono text-[#8B95A5] mt-1">
              Logged in as Platform Admin (Mohneesh Gupta) • Bhopal, India
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/luma"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white text-xs font-display font-bold shadow-lg shadow-[#8B5CF6]/25 flex items-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              Luma Creative Studio
            </Link>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1C2430] pb-2 overflow-x-auto">
          {[
            { id: "events", label: "Events & Hackathons", icon: Calendar },
            { id: "team", label: "Team & Ambassadors", icon: Users },
            { id: "gallery", label: "Gallery & Cloudinary", icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-[#111722] text-[#4D8DFF] font-bold border border-[#4D8DFF]/40"
                    : "text-[#8B95A5] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Events Management */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Event Roster ({eventsList.length})
                </h3>
                <p className="text-xs text-[#8B95A5]">
                  Create, edit, or publish national hackathons and collegiate workshops.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-[#4D8DFF] text-white text-xs font-display font-bold flex items-center gap-1.5 hover:scale-[1.02] transition-transform"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>

            <div className="rounded-2xl bg-[#0D1118] border border-[#1C2430] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#111722] text-[#5A6475] uppercase border-b border-[#1C2430]">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C2430] text-[#8B95A5]">
                    {eventsList.map((ev) => (
                      <tr key={ev.slug} className="hover:bg-[#111722]/50 transition-colors">
                        <td className="p-4 font-bold text-white">
                          <Link href={`/events/${ev.slug}`} className="hover:underline text-[#4D8DFF]">
                            {ev.title}
                          </Link>
                        </td>
                        <td className="p-4">{ev.category}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ev.status === "Upcoming"
                                ? "bg-[#4D8DFF]/20 text-[#4D8DFF]"
                                : ev.status === "Ongoing"
                                ? "bg-[#10B981]/20 text-[#10B981]"
                                : "bg-[#1C2430] text-[#8B95A5]"
                            }`}
                          >
                            {ev.status}
                          </span>
                        </td>
                        <td className="p-4">{ev.location}</td>
                        <td className="p-4 flex items-center gap-3">
                          <button
                            onClick={() => handleDeleteEvent(ev.slug)}
                            className="text-red-400 hover:text-red-300 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Team Roster */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-white">
              Verified Team & Leads ({teamData.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamData.map((member, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0D1118] border border-[#1C2430] space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#1C2430]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{member.name}</h4>
                      <span className="text-[11px] font-mono text-[#8B5CF6]">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#8B95A5] leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Gallery & Cloudinary */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0D1118] border border-[#1C2430] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  Cloudinary Media Storage
                </h3>
                <p className="text-xs font-mono text-[#10B981] mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cloudinary integration connected: cloud "agdaiyhe"
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#5A6475]">
                <UploadCloud className="w-4 h-4 text-[#4D8DFF]" />
                Auto WebP/AVIF Transcoding Active
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryData.map((img) => (
                <div
                  key={img.id}
                  className="relative h-44 rounded-xl overflow-hidden border border-[#1C2430] bg-[#111722]"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-white truncate">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="p-8 rounded-2xl bg-[#0D1118] border border-[#1C2430] max-w-md w-full space-y-4">
              <h3 className="text-xl font-display font-bold text-white">
                Create New Event
              </h3>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. Hack-Knowvy Winter 2026"
                    className="w-full px-4 py-2 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#4D8DFF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8B95A5] block mb-1">
                    Category
                  </label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-[#111722] border border-[#1C2430] text-white text-xs font-mono focus:outline-none focus:border-[#4D8DFF]"
                  >
                    <option value="National Hackathon">National Hackathon</option>
                    <option value="Technical Workshop">Technical Workshop</option>
                    <option value="AI & Engineering">AI & Engineering</option>
                    <option value="Community Sprint">Community Sprint</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1C2430]">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#8B95A5] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#4D8DFF] text-white text-xs font-display font-bold"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
