import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import FeaturedEventsSection from "@/components/home/FeaturedEventsSection";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import ImpactStorySection from "@/components/home/ImpactStorySection";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import CommunitySection from "@/components/home/CommunitySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import CreativeLabSection from "@/components/home/CreativeLabSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export const metadata = {
  title: "Knowvy — Where Students Build What's Next",
  description:
    "Knowvy connects students, developers, creators and founders through technology, national hackathons, community workshops, and verified real-world opportunities.",
  openGraph: {
    title: "Knowvy — Student Technology Ecosystem",
    description:
      "Where students build what's next. Central India's premier student developer ecosystem founded in Bhopal.",
    siteName: "Knowvy Technologies",
  },
};

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#07090D] text-white">
      {/* 1. Hero Section with 3D Ecosystem Orb */}
      <HeroSection />

      {/* 2. Community Statistics */}
      <StatsSection />

      {/* 3. About Knowvy & Interactive Pillars */}
      <AboutSection />

      {/* 4. Signature 3D Ecosystem Graph */}
      <EcosystemSection />

      {/* 5. Featured Events */}
      <FeaturedEventsSection />

      {/* 7. External Opportunities Ecosystem */}
      <OpportunitiesSection />

      {/* 9. Asymmetric Programs & Tracks */}
      <ProgramsSection />

      {/* 10. Impact Progression Storytelling */}
      <ImpactStorySection />

      {/* 11. Verified Partners Marquee */}
      <PartnersMarquee />

      {/* 8 & 14. Community & Core Team */}
      <CommunitySection />

      {/* 12. Verified Testimonials */}
      <TestimonialsSection />

      {/* 13. Dynamic Masonry Event Gallery */}
      <GallerySection />

      {/* 15. Luma Creative Lab Showcase */}
      <CreativeLabSection />

      {/* 16. Final Cinematic CTA */}
      <FinalCTASection />
    </main>
  );
}
