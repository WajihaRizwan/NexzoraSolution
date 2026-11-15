import Link from "next/link";
import { SocialMediaClientCard } from "@/components/portfolio/social-media-client-card";
import { socialMediaClients } from "@/data/social-media-clients";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Marketing Portfolio",
  description: "Explore Nexzora Solution's social media marketing clients, creative campaigns, and social channel links.",
};

export default function SocialMediaMarketingPortfolioPage() {
  return (
    <main className="social-media-portfolio-page">
      <header className="social-media-portfolio-heading">
        <Link className="social-media-back-link" href="/portfolio">← Back to Portfolio</Link>
        <span className="social-media-portfolio-eyebrow"><i /> Nexzora Solution</span>
        <h1>SOCIAL MEDIA <span>MARKETING</span></h1>
        <p>Explore our social media management, creative campaigns, and client projects.</p>
      </header>
      <section className="social-client-grid" aria-label="Social media marketing clients">
        {socialMediaClients.map((client) => <SocialMediaClientCard key={client.name} client={client} />)}
      </section>
    </main>
  );
}
