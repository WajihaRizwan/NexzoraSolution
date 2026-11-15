import Image from "next/image";
import Link from "next/link";
import { CopyContactCard } from "@/components/copy-contact-card";
import { siteContact } from "@/config/site-contact";
import { socialLinks } from "@/config/social-links";

const footerPages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  if (name === "Facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" /></svg>;
  if (name === "Instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (name === "LinkedIn") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4.8 10h3.4v9.2H4.8zm5.4 0h3.2v1.3h.1a3.5 3.5 0 0 1 3.2-1.7c3.4 0 4 2.2 4 5.1v4.5h-3.4v-4c0-1 0-2.4-1.5-2.4s-1.8 1.1-1.8 2.3v4.1h-3.4z" /></svg>;
  return null;
}

function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="footer-logo" href="/" aria-label="Nexzora Solution home">
            <Image src="/nexzora-logo.png" alt="Nexzora Solution" width={453} height={239} />
          </Link>
          <strong className="footer-company-name">Nexzora Solution</strong>
          <span className="footer-tagline">Your Vision, Our Innovation.</span>
        </div>

        <nav className="footer-navigation" aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>{footerPages.map((page) => <li key={page.href}><Link href={page.href}>{page.label}</Link></li>)}</ul>
        </nav>

        <section className="footer-contact" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Contact</h2>
          <CopyContactCard kind="email" label="Email" value={siteContact.email} />
          <CopyContactCard kind="address" label="Address" value={siteContact.address} />
          <div className="footer-phone"><span>Phone</span><span>{siteContact.phone}</span></div>
        </section>

        <section className="footer-social" aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">Follow Nexzora</h2>
          <div className="social-links">
            {socialLinks.map((social) => isWebUrl(social.href) ? (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Nexzora Solution on ${social.name}`} title={social.name}><SocialIcon name={social.name} /></a>
            ) : (
              <span key={social.name} className="social-link-unconfigured" aria-label={`${social.name} link not configured`} title={`${social.name} link not configured`}><SocialIcon name={social.name} /></span>
            ))}
          </div>
        </section>
      </div>
      <div className="footer-bottom"><span>© Nexzora Solution. All rights reserved.</span><span>Your Vision, Our Innovation.</span></div>
    </footer>
  );
}
