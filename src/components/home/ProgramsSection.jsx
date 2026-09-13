import Link from "next/link";
import { Terminal, Code, Cpu, Flame, Users, ArrowRight } from "lucide-react";

const PROGRAMS = [
  {
    id: "hack-knowvy-track",
    title: "Flagship Hackathons",
    tag: "36h Competitive Sprints",
    description: "Multi-day building battles offering real cash prizes, cloud credits, and direct developer recruitment opportunities.",
    icon: Flame,
    color: "from-[#4D8DFF] to-[#3B82F6]",
    actionText: "View Hackathons",
    href: "/events",
  },
  {
    id: "cloud-devops-bootcamp",
    title: "Cloud & DevOps Sprints",
    tag: "With Azure Tech Group Bhopal",
    description: "Hands-on containerization, Kubernetes orchestration, and cloud architecture certifications.",
    icon: Cpu,
    color: "from-[#8B5CF6] to-[#6366F1]",
    actionText: "Explore Sprints",
    href: "/programs",
  },
  {
    id: "open-source-initiatives",
    title: "Open Source Jumpstart",
    tag: "Real GitHub Contributions",
    description: "Guided mentor pipelines helping junior students triage issues, resolve merge conflicts, and merge production PRs.",
    icon: Code,
    color: "from-[#38BDF8] to-[#0284C7]",
    actionText: "Join Sprint",
    href: "/programs",
  },
  {
    id: "peer-mentorship",
    title: "1-on-1 Mentorship",
    tag: "Senior Builders & MLSAs",
    description: "Direct project reviews, mock technical interviews, and personalized career roadmaps.",
    icon: Users,
    color: "from-[#10B981] to-[#059669]",
    actionText: "Meet Mentors",
    href: "/community",
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-24 bg-[#0D1118] border-t border-[#1C2430] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
            <Terminal className="w-3.5 h-3.5" />
            Active Pathways
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Engineered for <span className="gradient-text-blue">real builders.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8B95A5] leading-relaxed">
            Every program is structured around hands-on output, not passive lectures. Choose your track and start shipping.
          </p>
        </div>

        {/* Asymmetric Dynamic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="p-7 rounded-2xl bg-[#111722] border border-[#1C2430] hover:border-[#4D8DFF]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#5A6475] uppercase block">
                      {prog.tag}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#4D8DFF] transition-colors mt-0.5">
                      {prog.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#8B95A5] leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4D8DFF] group-hover:text-white transition-colors"
                >
                  {prog.actionText}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
