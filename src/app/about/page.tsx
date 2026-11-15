import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { InteractiveCard } from "@/components/about/interactive-card";
import { DigitalGlobe } from "@/components/about/digital-globe";
import { InnovationSystem } from "@/components/about/innovation-system";

export const metadata: Metadata = {
  title: "About Nexzora Solution",
  description: "Meet Nexzora Solution, our founder Jiya, and the vision, mission, and values behind our digital solutions.",
};

const coreValues = [
  { icon: "innovation", title: "Innovation", description: "Always exploring smarter and better ways to solve problems." },
  { icon: "integrity", title: "Integrity", description: "Building trust through transparency and honesty." },
  { icon: "creativity", title: "Creativity", description: "Combining imagination with technology to create meaningful experiences." },
  { icon: "quality", title: "Quality", description: "Maintaining high standards in every solution we deliver." },
  { icon: "collaboration", title: "Collaboration", description: "Working together to achieve meaningful results." },
  { icon: "growth", title: "Continuous Growth", description: "Learning, improving, and adapting to new technologies." },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-grid" aria-hidden="true" />
        <div className="about-container about-hero-layout">
          <Reveal className="about-hero-copy">
            <span className="about-eyebrow"><i /> About Nexzora Solution</span>
            <h1 id="about-hero-title">We Turn Vision Into <span>Innovation.</span></h1>
            <p>At Nexzora Solution, we believe every great innovation begins with an idea. We combine technology, creativity, and expertise to transform ideas into intelligent digital solutions.</p>
            <a className="about-scroll-link" href="#who-we-are">Discover who we are <span aria-hidden="true">↓</span></a>
          </Reveal>
          <Reveal className="about-hero-visual" delay={0.14} ariaHidden>
            <DigitalGlobe />
          </Reveal>
        </div>
        <span className="about-hero-footnote">01 — AN INTRODUCTION</span>
      </section>

      <section className="about-intro" id="who-we-are" aria-labelledby="who-we-are-title">
        <div className="about-container about-intro-layout">
          <Reveal className="about-intro-copy">
            <span className="about-eyebrow"><i /> The company</span>
            <h2 id="who-we-are-title">Who We Are</h2>
            <p>Nexzora Solution is an innovative IT and digital solutions company dedicated to helping businesses and individuals turn their ideas into reality.</p>
            <p>We bring together technology, creativity, and modern digital expertise to develop meaningful solutions. Our focus is on delivering quality-driven, innovative, and future-ready digital experiences that help our clients grow and succeed in an evolving digital world.</p>
          </Reveal>
          <Reveal className="about-systems-visual" delay={0.12} ariaHidden>
            <div className="systems-grid" />
            <InnovationSystem />
          </Reveal>
        </div>
      </section>

      <section className="about-founder" aria-labelledby="founder-title">
        <div className="about-container founder-layout">
          <Reveal className="founder-photo-panel" ariaLabel="Jiya, founder of Nexzora Solution">
            <div className="founder-photo-frame">
              <Image className="founder-portrait" src="/jiya-founder.jfif" alt="Metallic blue J monogram representing Jiya, founder of Nexzora Solution" fill sizes="(max-width: 700px) 76vw, 34vw" priority={false} />
            </div>
            <div className="founder-photo-caption"><span>JIYA</span><span>FOUNDER / NEXZORA SOLUTION</span></div>
          </Reveal>
          <Reveal className="founder-copy" delay={0.1}>
            <span className="about-eyebrow"><i /> Founder & leadership</span>
            <h2 id="founder-title">Meet <span>Jiya.</span></h2>
            <p className="founder-role">Founder — Nexzora Solution</p>
            <p>Meet Jiya, the Founder of Nexzora Solution, driven by a vision to bring innovation, creativity, and technology together. With a passion for building meaningful digital solutions, Jiya leads the company&apos;s vision of transforming ideas into impactful technology experiences.</p>
            <div className="founder-signature"><span className="founder-signature-mark">J</span><span>Building what&apos;s next,<br />with purpose.</span></div>
          </Reveal>
        </div>
      </section>

      <section className="about-story about-foundation" id="our-story" aria-labelledby="foundation-title">
        <div className="about-container">
          <Reveal className="about-section-heading foundation-heading">
            <span className="about-eyebrow"><i /> The ideas that guide us</span>
            <h2 id="foundation-title">Our Story, Mission <span>&amp; Vision</span></h2>
          </Reveal>
          <div className="story-card-grid">
            <Reveal delay={0.03}>
              <InteractiveCard variant="story-card" icon="innovation" index="01 / OUR STORY" title="Our Story" description="Every great idea deserves the right technology to bring it to life. Nexvora Solutions was built on the belief that innovation, creativity, and technology can transform ideas into meaningful digital experiences." />
            </Reveal>
            <Reveal delay={0.1}>
              <InteractiveCard variant="story-card" icon="mission" index="02 / OUR MISSION" title="Our Mission" description="Our mission is to empower businesses through innovative digital solutions, creative strategies, and modern technology that simplify challenges and create real value." />
            </Reveal>
            <Reveal delay={0.17}>
              <InteractiveCard variant="story-card" icon="vision" index="03 / OUR VISION" title="Our Vision" description="Our vision is to become a trusted technology partner, shaping the future through intelligent innovation, creative thinking, and impactful digital experiences." />
            </Reveal>
          </div>
        </div>
      </section>
      <section className="about-values" aria-labelledby="values-title">
        <div className="about-container">
          <Reveal className="about-section-heading values-heading">
            <span className="about-eyebrow"><i /> Principles in practice</span>
            <h2 id="values-title">What Drives <span>Us</span></h2>
            <p>The principles that shape how we think, create, and work together.</p>
          </Reveal>
          <div className="values-grid">
            {coreValues.map((value, index) => (
              <Reveal key={value.title} delay={(index % 3) * 0.055}>
                <InteractiveCard variant="value-card" icon={value.icon} index={String(index + 1).padStart(2, "0")} title={value.title} description={value.description} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-commitment" aria-labelledby="commitment-title">
        <div className="commitment-light" aria-hidden="true" />
        <Reveal className="about-container commitment-inner">
          <span className="about-eyebrow"><i /> Our commitment</span>
          <h2 id="commitment-title">Our Commitment to <span>Excellence</span></h2>
          <p>We are committed to understanding our clients&apos; needs, delivering quality-focused solutions, and building lasting relationships through innovation, reliability, and dedication.</p>
          <p>At Nexzora Solution, every project is an opportunity to create something meaningful, valuable, and future-ready.</p>
          <span className="commitment-signoff">Your Vision, Our Innovation.</span>
        </Reveal>
      </section>
    </main>
  );
}
