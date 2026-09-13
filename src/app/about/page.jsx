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
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
            Origin Story
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-900">
            Built by students. <br />
            <span className="gradient-text-blue">Run by builders.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Knowvy began with a simple observation in Bhopal: engineering curricula often lag behind industry reality. Talented students were building in isolation without guidance on cloud architectures, open source, or national hackathons. Knowvy was created to fix that.
          </p>
        </div>

        {/* Founder & Admin Profile */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 flex-shrink-0 shadow-sm">
              <img
                src={founder.avatar}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-600 uppercase font-bold">
                Platform Founder & Community Lead
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900">
                {founder.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-violet-600" />
                  Bhopal, India
                </span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">Microsoft Learn Student Ambassador</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {founder.bio}
              </p>

              {/* Founder Verified Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>50+ Hackathons & Tech Events Organized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-600" />
                  <span>500+ Aspiring Developers Mentored</span>
                </div>
              </div>

              {/* Socials & Email */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-4">
                <a
                  href={founder.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={founder.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-colors shadow-sm"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={founder.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-sky-500 hover:border-slate-300 transition-colors shadow-sm"
                  title="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${brandData.links.email}`}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
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
          <div className="space-y-2">
            <span className="text-xs font-mono text-violet-600 uppercase tracking-wider font-semibold">
              Community Philosophy
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900">
              Our Core Tenets
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandData.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors space-y-3"
              >
                <span className="text-xs font-mono text-blue-600 font-bold block">
                  {pillar.number} //
                </span>
                <h3 className="text-lg font-display font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-violet-600 font-mono font-medium">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Leadership Team */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Bhopal Leadership
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900">
              The Team Running Knowvy
            </h2>
            <p className="text-sm text-slate-600">
              Managing schedules, designing learning materials, securing corporate sponsors, and hosting our meetups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-slate-900">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-blue-600 block font-medium">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-900 transition-colors"
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
                      className="text-slate-500 hover:text-blue-600 transition-colors"
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
                      className="text-slate-500 hover:text-sky-500 transition-colors"
                      title="Twitter / X"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot & Brand Emblem */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-28 h-28 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center flex-shrink-0 shadow-md">
            <img
              src="/images/knowvy-logo.png"
              alt="Knowvy Tiger Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
              Official Identity // Mascot
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              The Knowvy Tiger
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Rooted in Central India (the land of the white tiger), the Knowvy Tiger embodies the fearless curiosity, tenacity, and relentless ambition of our student builder community. We don&apos;t wait for opportunities—we hunt them down and build what&apos;s next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
