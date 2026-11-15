import Image from "next/image";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Nexzora Solution's portfolio categories and digital experiences across design, development, marketing, and video.",
};

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-banner" aria-labelledby="portfolio-title">
        <Image className="portfolio-banner-image" src="/portfolio-banner.png" alt="Camera, laptop, and creative production tools in a blue-lit studio" fill priority sizes="100vw" />
        <div className="portfolio-banner-shade" aria-hidden="true" />
        <div className="portfolio-banner-copy">
          <span className="portfolio-page-eyebrow"><i /> Ideas made visible</span>
          <h1 id="portfolio-title">OUR <span>PORTFOLIO</span></h1>
          <p>Explore Our Creativity, Projects &amp; Digital Experiences.</p>
        </div>
      </section>

      <section className="portfolio-showcase" aria-label="Project gallery">
        <div className="portfolio-showcase-inner">
          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}

