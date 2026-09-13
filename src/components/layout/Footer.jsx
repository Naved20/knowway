import Link from "next/link";
import Image from "next/image";
import { brandData } from "@/data/knowvy-data";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/BrandIcons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/90 pt-16 pb-12 relative overflow-hidden text-slate-700">
      {/* Subtle top ambient gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-blue-500/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black border border-slate-200 flex items-center justify-center p-0.5 shadow-sm group-hover:border-blue-500/50 transition-all">
                <Image
                  src="/images/knowvy-logo.png"
                  alt="Knowvy Tiger Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-display font-black tracking-tight text-slate-900">
                KNOWVY
              </span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              {brandData.tagline} Connecting student developers, designers, and creators with technology, hackathons, and verified industry pathways.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Headquartered in {brandData.location}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/events" className="hover:text-blue-600 transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/heygen" className="hover:text-blue-700 transition-colors text-blue-600 font-semibold">
                  HeyGen RoadShow (9 Cities)
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-blue-600 transition-colors">
                  Programs & Bootcamps
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-blue-600 transition-colors">
                  Opportunities Hub
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-blue-600 transition-colors">
                  Impact Story
                </Link>
              </li>
              <li>
                <Link href="/creative-lab" className="hover:text-blue-600 transition-colors">
                  Luma Creative Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* External Ecosystem Opportunities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/opportunities/unstop" className="hover:text-blue-600 transition-colors">
                  Unstop Challenges
                </Link>
              </li>
              <li>
                <Link href="/opportunities/devfolio" className="hover:text-blue-600 transition-colors">
                  Devfolio Builders
                </Link>
              </li>
              <li>
                <Link href="/opportunities/mlh" className="hover:text-blue-600 transition-colors">
                  Major League Hacking
                </Link>
              </li>
              <li>
                <Link href="/opportunities/devpost" className="hover:text-blue-600 transition-colors">
                  Devpost Hackathons
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Community */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href={brandData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1 transition-colors text-emerald-600 font-medium"
                >
                  WhatsApp (2,000+ Builders)
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={brandData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 flex items-center gap-1 transition-colors"
                >
                  Instagram (@knowvy.technologies)
                  <ArrowUpRight className="w-3 h-3 text-pink-500" />
                </a>
              </li>
              <li>
                <a
                  href={brandData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  LinkedIn Page
                  <ArrowUpRight className="w-3 h-3 text-blue-500" />
                </a>
              </li>
              <li>
                <a
                  href={brandData.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 flex items-center gap-1 transition-colors"
                >
                  Twitter / X (@knowvytech)
                  <ArrowUpRight className="w-3 h-3 text-sky-500" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Knowvy Technologies. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built by students for builders in</span>
            <span className="text-slate-800 font-semibold">Bhopal, India</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={brandData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Knowvy GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={brandData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              aria-label="Knowvy LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={brandData.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-500 transition-colors"
              aria-label="Knowvy Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={brandData.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-pink-600 transition-colors"
              aria-label="Knowvy Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
