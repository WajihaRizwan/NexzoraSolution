import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { siteContact } from "@/config/site-contact";

export const metadata: Metadata = {
  title: "Contact Nexzora Solution",
  description: "Tell Nexzora Solution about your project and explore how our technology team can help.",
};

function ContactVisual() {
  return (
    <div className="contact-hero-visual" aria-hidden="true">
      <div className="contact-visual-orbit contact-visual-orbit-one" />
      <div className="contact-visual-orbit contact-visual-orbit-two" />
      <div className="contact-visual-platform" />
      <div className="contact-visual-phone">
        <div className="contact-phone-speaker" />
        <div className="contact-phone-screen">
          <div className="contact-screen-top"><span>NEXZORA</span><i /></div>
          <div className="contact-screen-greeting">Let&apos;s talk<span>about your next idea.</span></div>
          <div className="contact-screen-message"><b>Project enquiry</b><span>We&apos;re ready to listen</span><i>↗</i></div>
          <div className="contact-screen-bars"><i /><i /><i /></div>
          <div className="contact-screen-send">Start a conversation <span>→</span></div>
        </div>
      </div>
      <div className="contact-float-card contact-float-email">
        <span className="contact-float-icon contact-float-icon-mail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg></span>
        <span><b>Email us</b><small>We&apos;re listening</small></span>
      </div>
      <div className="contact-float-card contact-float-secure">
        <span className="contact-float-icon contact-float-icon-secure"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 19 6v5c0 4.6-3 8-7 10-4-2-7-5.4-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg></span>
        <span><b>Ideas, meet action</b><small>Made for what&apos;s next</small></span>
      </div>
      <span className="contact-visual-signal contact-visual-signal-one" />
      <span className="contact-visual-signal contact-visual-signal-two" />
    </div>
  );
}

function ContactIcon({ name }: { name: "email" | "location" | "message" }) {
  if (name === "email") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === "location") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.4-4.2A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.4" strokeLinecap="round" /></svg>;
}

export default function ContactPage() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=DHA%20Phase%202%20(Extension)%2C%20Karachi%2C%20Pakistan";

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <div className="contact-page-grid" aria-hidden="true" />
        <div className="contact-container contact-hero-layout">
          <Reveal className="contact-hero-copy">
            <span className="contact-eyebrow"><i /> Your next chapter starts here</span>
            <h1 id="contact-hero-title">Let&apos;s Build Something <span>Great Together</span></h1>
            <p>Have an idea, a project, or a business goal in mind? We are here to help you turn your vision into innovative digital solutions. Let&apos;s start a conversation.</p>
            <a className="contact-primary-button" href="#contact-form">Start a conversation <span aria-hidden="true">↗</span></a>
            <div className="contact-hero-note"><span /> Ideas welcome. Let&apos;s make them real.</div>
          </Reveal>
          <Reveal className="contact-hero-visual-wrap" delay={0.14} ariaHidden>
            <ContactVisual />
          </Reveal>
        </div>
        <div className="contact-hero-footnote"><span>01</span><i /> A good conversation can change everything</div>
      </section>

      <section className="contact-details-section" aria-labelledby="contact-details-title">
        <div className="contact-container">
          <Reveal className="contact-section-heading">
            <span className="contact-eyebrow"><i /> Connect with our team</span>
            <h2 id="contact-details-title">Let&apos;s make the <span>first move.</span></h2>
          </Reveal>
          <div className="contact-detail-grid">
            <Reveal className="contact-detail-card" delay={0}>
              <span className="contact-detail-icon"><ContactIcon name="email" /></span>
              <div><span className="contact-card-label">Email address</span><h3>Email Us</h3><a href={`mailto:${siteContact.email}`}>{siteContact.email}<span aria-hidden="true">↗</span></a></div>
            </Reveal>
            <Reveal className="contact-detail-card" delay={0.08}>
              <span className="contact-detail-icon"><ContactIcon name="location" /></span>
              <div><span className="contact-card-label">Karachi, Pakistan</span><h3>Our Location</h3><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{siteContact.address}<span aria-hidden="true">↗</span></a></div>
            </Reveal>
            <Reveal className="contact-detail-card" delay={0.16}>
              <span className="contact-detail-icon"><ContactIcon name="message" /></span>
              <div><span className="contact-card-label">Project inquiries</span><h3>Let&apos;s Talk</h3><p>Have a project in mind? Send us your requirements and let&apos;s discuss your ideas.</p><a className="contact-card-cta" href="#contact-form">Tell us about it <span aria-hidden="true">↗</span></a></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="contact-form" aria-labelledby="contact-form-title">
        <div className="contact-container contact-form-layout">
          <Reveal className="contact-form-intro">
            <span className="contact-eyebrow"><i /> Project enquiry</span>
            <h2 id="contact-form-title">Send Us a <span>Message</span></h2>
            <p>Tell us a little about your project. Our team will review your inquiry and get back to you.</p>
            <div className="contact-form-note">
              <span className="contact-note-mark">N</span>
              <div><b>Every great project starts with a conversation.</b><small>Share the details that matter to you, and we&apos;ll take it from there.</small></div>
            </div>
            <div className="contact-secure-note"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3 19 6v5c0 4.6-3 8-7 10-4-2-7-5.4-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg></span>Your details are only used to respond to your inquiry.</div>
          </Reveal>
          <Reveal className="contact-form-panel" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="contact-location-section" aria-labelledby="contact-location-title">
        <div className="contact-container contact-location-layout">
          <Reveal className="contact-location-copy">
            <span className="contact-eyebrow"><i /> Our location</span>
            <h2 id="contact-location-title">Find <span>Us</span></h2>
            <p>{siteContact.address}</p>
            <a className="contact-text-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open Google Maps <span aria-hidden="true">↗</span></a>
          </Reveal>
          <Reveal className="contact-map-card">
            <span className="contact-location-orbit contact-location-orbit-one" aria-hidden="true" />
            <span className="contact-location-orbit contact-location-orbit-two" aria-hidden="true" />
            <span className="contact-map-pin"><ContactIcon name="location" /></span>
            <span className="contact-map-label"><i /> DHA Phase 2 (Extension)<small>Karachi, Pakistan</small></span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Search DHA Phase 2 Extension in Karachi on Google Maps">Open Google Maps <span aria-hidden="true">↗</span></a>
          </Reveal>
        </div>
      </section>

      <section className="contact-cta-section" aria-labelledby="contact-cta-title">
        <div className="contact-cta-glow contact-cta-glow-one" aria-hidden="true" />
        <div className="contact-cta-glow contact-cta-glow-two" aria-hidden="true" />
        <Reveal className="contact-cta-content">
          <span className="contact-eyebrow"><i /> Your vision, our innovation</span>
          <h2 id="contact-cta-title">Have an Idea? <span>Let&apos;s Make It Happen.</span></h2>
          <p>Your next big idea deserves the right technology and creative team. Let&apos;s work together to bring it to life.</p>
          <a className="contact-primary-button" href="#contact-form">Let&apos;s Discuss Your Project <span aria-hidden="true">↗</span></a>
        </Reveal>
      </section>
    </main>
  );
}
