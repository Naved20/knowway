"use client";

import { useState } from "react";
import { teamData } from "@/data/knowvy-data";
import { Users, Award, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";

const CATEGORIES = ["All", "Leadership", "Engineering"];

export default function CommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMembers =
    selectedCategory === "All"
      ? teamData
      : teamData.filter((m) => m.category === selectedCategory);

  return (
    <section className="py-24 bg-[#07090D] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
              <Users className="w-3.5 h-3.5" />
              Community & Leadership
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              People make <span className="gradient-text-blue">Knowvy.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8B95A5] max-w-xl">
              Built by students. Run by builders. Founded in Bhopal and led by passionate engineers, organizers, and tech leads.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#4D8DFF] text-white font-bold shadow-md shadow-[#4D8DFF]/20"
                    : "bg-[#111722] text-[#8B95A5] hover:text-white border border-[#1C2430]"
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
              className="p-7 rounded-2xl bg-[#0D1118] border border-[#1C2430] hover:border-[#4D8DFF]/40 hover:bg-[#111722] transition-all duration-300 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1C2430] group-hover:border-[#4D8DFF] transition-colors flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#8B5CF6] uppercase block">
                      {member.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#8B95A5] font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#5A6475]">
                  <MapPin className="w-3.5 h-3.5 text-[#4D8DFF]" />
                  <span>{member.college}</span>
                </div>

                <p className="text-xs text-[#8B95A5] leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-[#07090D] border border-[#1C2430] text-[10px] font-mono text-[#8B95A5]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contribution highlight & socials */}
              <div className="pt-4 border-t border-[#1C2430] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#5A6475] truncate max-w-[180px]">
                  {member.contribution}
                </span>

                <div className="flex items-center gap-3">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B95A5] hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B95A5] hover:text-[#4D8DFF] transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B95A5] hover:text-[#38BDF8] transition-colors"
                      title="Twitter / X"
                    >
                      <TwitterIcon className="w-4 h-4" />
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
