import Link from "next/link";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight, MessageSquare, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  return (
    <footer className="border-t border-[#1C2430] bg-[#07090D] pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#4D8DFF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4D8DFF] to-[#8B5CF6] flex items-center justify-center text-white font-display font-extrabold text-sm">
                K
              </div>
              <span className="text-xl font-display font-black tracking-tight text-white">
                KNOWVY
              </span>
            </Link>
            <p className="text-[#8B95A5] text-sm leading-relaxed max-w-sm">
              {brandData.tagline} Connecting student developers, designers, and creators with technology, hackathons, and verified industry pathways.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5A6475]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              Headquartered in {brandData.location}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-[#8B95A5]">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Programs & Bootcamps
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition-colors">
                  Opportunities Hub
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  Impact Story
                </Link>
              </li>
              <li>
                <Link href="/creative-lab" className="hover:text-white transition-colors">
                  Luma Creative Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* External Ecosystem Opportunities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-sm text-[#8B95A5]">
              <li>
                <Link href="/opportunities/mlh" className="hover:text-white transition-colors">
                  Major League Hacking
                </Link>
              </li>
              <li>
                <Link href="/opportunities/unstop" className="hover:text-white transition-colors">
                  Unstop Challenges
                </Link>
              </li>
              <li>
                <Link href="/opportunities/devpost" className="hover:text-white transition-colors">
                  Devpost Hackathons
                </Link>
              </li>
              <li>
                <Link href="/opportunities/devfolio" className="hover:text-white transition-colors">
                  Devfolio Builders
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Community */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-[#8B95A5]">
              <li>
                <a
                  href={brandData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  WhatsApp Community
                  <ArrowUpRight className="w-3 h-3 text-[#4D8DFF]" />
                </a>
              </li>
              <li>
                <a
                  href={brandData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  LinkedIn Page
                  <ArrowUpRight className="w-3 h-3 text-[#4D8DFF]" />
                </a>
              </li>
              <li>
                <a
                  href={brandData.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  Twitter / X
                  <ArrowUpRight className="w-3 h-3 text-[#4D8DFF]" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C2430] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6475]">
          <p>© {new Date().getFullYear()} Knowvy Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built by students for builders in</span>
            <span className="text-[#8B95A5] font-medium">Bhopal, India</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={brandData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B95A5] hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={brandData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B95A5] hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={brandData.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B95A5] hover:text-white transition-colors"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
