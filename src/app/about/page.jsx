import { brandData, teamData } from "@/data/knowvy-data";
import { Mail, MapPin, CheckCircle2, Sparkles, Award } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";

export const metadata = {
  title: "About Knowvy — Student Technology Ecosystem",
  description:
    "Founded in Bhopal by Mohneesh Gupta, Knowvy is central India's fastest-growing student developer ecosystem.",
};

export default function AboutPage() {
  const founder = teamData[0]; // Mohneesh Gupta

  return (
    <div className="min-h-screen bg-[#07090D] pt-32 pb-24 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF]">
            <Sparkles className="w-3.5 h-3.5" />
            Origin Story
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight">
            Built by students. <br />
            <span className="gradient-text-blue">Run by builders.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#8B95A5] leading-relaxed max-w-3xl">
            Knowvy began with a simple observation in Bhopal: engineering curricula often lag behind industry reality. Talented students were building in isolation without guidance on cloud architectures, open source, or national hackathons. Knowvy was created to fix that.
          </p>
        </div>

        {/* Founder & Admin Profile */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0D1118] border border-[#1C2430] space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#1C2430] flex-shrink-0">
              <img
                src={founder.avatar}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-[11px] font-mono text-[#4D8DFF] uppercase font-bold">
                Platform Founder & Community Lead
              </div>
              <h2 className="text-3xl font-display font-bold text-white">
                {founder.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-[#8B95A5]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  Bhopal, India
                </span>
                <span>•</span>
                <span className="text-[#10B981]">Microsoft Learn Student Ambassador</span>
              </div>
              <p className="text-sm text-[#8B95A5] leading-relaxed max-w-2xl">
                {founder.bio}
              </p>

              {/* Founder Verified Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono text-[#8B95A5]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#4D8DFF]" />
                  <span>50+ Hackathons & Tech Events Organized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#8B5CF6]" />
                  <span>500+ Aspiring Developers Mentored</span>
                </div>
              </div>

              {/* Socials & Email */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-4">
                <a
                  href={founder.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-white transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={founder.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-[#4D8DFF] transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={founder.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-[#38BDF8] transition-colors"
                  title="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${brandData.links.email}`}
                  className="p-2 rounded-xl bg-[#111722] border border-[#1C2430] text-[#8B95A5] hover:text-white transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">
            Our Core Tenets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandData.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl bg-[#0D1118] border border-[#1C2430] space-y-3"
              >
                <h3 className="text-xl font-display font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#8B5CF6] font-mono">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-[#8B95A5] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot & Brand Emblem */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1118] border border-[#1C2430] flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-28 h-28 rounded-2xl bg-black border border-white/20 p-2 flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#4D8DFF]/20">
            <img
              src="/images/knowvy-logo.png"
              alt="Knowvy Tiger Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(77,141,255,0.5)]"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono text-[#4D8DFF] uppercase tracking-wider">
              Official Identity // Mascot
            </span>
            <h3 className="text-2xl font-display font-bold text-white">
              The Knowvy Tiger
            </h3>
            <p className="text-sm text-[#8B95A5] leading-relaxed max-w-2xl">
              Rooted in Central India (the land of the white tiger), the Knowvy Tiger embodies the fearless curiosity, tenacity, and relentless ambition of our student builder community. We don&apos;t wait for opportunities—we hunt them down and build what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
