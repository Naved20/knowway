"use client";

import { useState } from "react";
import { teamData } from "@/data/knowvy-data";
import { Users, MapPin, Linkedin, Github } from "lucide-react";

const CATEGORIES = ["All", "Leadership", "Technical", "Community", "Operations"];

export default function CommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMembers =
    selectedCategory === "All"
      ? teamData
      : teamData.filter((m) => m.category === selectedCategory);

  return (
    <section className="py-24 bg-transparent border-t border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
              <Users className="w-3.5 h-3.5" />
              Community & Leadership
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              People make <span className="gradient-text-blue">Knowvy.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Built by students. Run by builders. Founded in Bhopal and led by passionate engineers, organizers, and tech leads.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group space-y-6 shadow-xs"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-blue-500 transition-colors flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-purple-600 uppercase block font-semibold">
                      {member.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{member.college}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contribution highlight & socials */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 truncate max-w-[180px]">
                  {member.contribution}
                </span>

                <div className="flex items-center gap-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
