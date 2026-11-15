import Image from "next/image";
import Link from "next/link";
import { FeatureCard } from "@/components/feature-card";
import { Reveal } from "@/components/reveal";

const differences = [
  {
    icon: "innovation",
    title: "Innovation First",
    description: "We bring fresh ideas and innovative thinking to every project.",
  },
  {
    icon: "client",
    title: "Client-Centered Approach",
    description: "We understand client requirements and build solutions around their goals.",
  },
  {
    icon: "technology",
    title: "Modern Technology",
    description: "We use advanced and modern technologies to create intelligent digital solutions.",
  },
  {
    icon: "quality",
    title: "Quality & Reliability",
    description: "We focus on quality, performance, and reliable results.",
  },
  {
    icon: "creative",
    title: "Creative Excellence",
    description: "We combine creativity and technology to deliver meaningful digital experiences.",
  },
  {
    icon: "future",
    title: "Future-Ready Solutions",
    description: "We build scalable solutions designed for tomorrow’s challenges.",
  },
];

export default function HomePage() {
  return (
    <main id="home" className="homepage">
      <section className="home-hero" aria-labelledby="hero-title">
        <Image
          className="home-hero-photo"
          src="/nexzora-hero.webp"
          alt="A blue-lit creative technology workspace with a laptop and camera"
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-content">
          <Reveal className="home-hero-copy">
            <span className="home-eyebrow"><i /> Welcome to Nexzora Solution</span>
            <h1 id="hero-title">Turning Innovative Ideas Into <span>Powerful Digital Solutions.</span></h1>
            <p className="home-hero-description">We transform ideas into intelligent digital experiences through innovation, creativity, and advanced technology.</p>
            <p className="home-hero-tagline">Your Vision, Our Innovation.</p>
            <div className="home-hero-actions">
              <Link className="home-button home-button-primary" href="/services">Explore Our Services <span aria-hidden="true">↗</span></Link>
              <Link className="home-button home-button-outline" href="/contact">Let’s Discuss Your Project</Link>
            </div>
          </Reveal>
          <div className="hero-image-caption" aria-hidden="true"><span className="caption-line" /> DIGITAL EXPERIENCES · BUILT WITH INTENTION</div>
        </div>
      </section>

      <section className="home-vision" aria-labelledby="vision-title">
        <div className="vision-inner">
          <Reveal className="vision-label"><span className="home-section-index">01</span><span>Our Vision</span></Reveal>
          <Reveal className="vision-copy" delay={0.08}>
            <span className="vision-overline">Looking forward</span>
            <h2 id="vision-title">A trusted partner for <span>what comes next.</span></h2>
            <p>To become a trusted technology partner recognized for innovation, creativity, and excellence in delivering future-ready digital solutions.</p>
          </Reveal>
          <Reveal className="vision-aside" delay={0.16}>
            <div className="vision-orbit" aria-hidden="true"><span /><i /></div>
            <span>Ideas made<br />for tomorrow.</span>
          </Reveal>
        </div>
      </section>

      <section className="difference-section" aria-labelledby="difference-title">
        <div className="difference-inner">
          <Reveal className="difference-heading">
            <span className="home-eyebrow"><i /> The Nexzora difference</span>
            <h2 id="difference-title">What Makes Us <span>Different</span></h2>
            <p>At Nexzora Solution, we combine innovation, technology, and creativity to deliver solutions that make a real difference.</p>
          </Reveal>
          <div className="feature-grid">
            {differences.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 0.07}>
                <FeatureCard index={String(index + 1).padStart(2, "0")} {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
