import { ServiceCard } from "@/components/services/service-card";

const services = [
  {
    title: "Social Media Marketing & Management",
    description: "Grow your brand and build a strong online presence with strategic social media marketing and management.",
    image: "/services/social-media-marketing.jfif",
    imageAlt: "Digital analytics dashboard with campaign, traffic and engagement charts",
    imageFit: "contain" as const,
  },
  {
    title: "UI/UX Designing",
    description: "Create beautiful, intuitive, and user-friendly digital experiences.",
    image: "/services/ui-ux-design.jfif",
    imageAlt: "Digital product design workspace with interface mockups on desktop and mobile screens",
  },
  {
    title: "Web Development",
    description: "Build modern, responsive, and powerful websites tailored to your needs.",
    image: "/services/web-development.jfif",
    imageAlt: "Developer working at a computer with code on screen in a blue-lit workspace",
  },
  {
    title: "App Development",
    description: "Transform your ideas into smart and engaging mobile applications.",
    image: "/services/app-development.jfif",
    imageAlt: "Smartphone with a modern app interface surrounded by digital elements",
    imageFit: "contain" as const,
  },
  {
    title: "Video Shooting",
    description: "Capture your ideas through creative and professional video production.",
    image: "/services/video-shooting.jfif",
    imageAlt: "Camera operator filming on a professional production set",
    imageFit: "contain" as const,
  },
  {
    title: "Video Editing",
    description: "Turn raw footage into engaging videos with professional editing and finishing.",
    image: "/services/video-editing.jfif",
    imageAlt: "Video editing workstation showing multiple clips on a professional timeline",
  },
  {
    title: "AI Solutions",
    description: "Use intelligent AI-powered solutions to simplify tasks and unlock new possibilities.",
    image: "/services/ai-solutions.jfif",
    imageAlt: "Glowing artificial intelligence brain in a futuristic technology environment",
  },
];

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Nexzora Solution's digital services, including social media marketing, UI/UX design, web and app development, video production, and AI solutions.",
};

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-showcase" aria-labelledby="services-title">
        <div className="services-backdrop" aria-hidden="true"><span /><span /></div>
        <div className="services-container">
          <header className="services-page-heading">
            <span className="services-page-eyebrow"><i /> What we offer</span>
            <h1 id="services-title">Our <span>Services</span></h1>
            <p>Creative ideas, modern technology, and digital expertise to bring your vision to life.</p>
          </header>
          <div className="service-feature-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
