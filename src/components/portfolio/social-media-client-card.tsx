"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { ClientSocialLink, ClientSocialPlatform, SocialMediaClient } from "@/data/social-media-clients";

function PlatformIcon({ platform }: { platform: ClientSocialPlatform }) {
  if (platform === "Instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (platform === "Facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" /></svg>;
  if (platform === "TikTok") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.6 8.2a6.5 6.5 0 0 1-4.1-1.5v7.1a5.7 5.7 0 1 1-5.7-5.7c.4 0 .8 0 1.2.1v3.2a2.6 2.6 0 1 0 1.6 2.4V2.5h3.1c.3 2 1.8 3.6 3.9 3.8v1.9Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.2 7a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.5A3 3 0 0 0 .8 7 31 31 0 0 0 .3 12a31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>;
}

function SocialButton({ link, clientName, index }: { link: ClientSocialLink; clientName: string; index: number }) {
  return (
    <a
      className="social-client-link"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${clientName} on ${link.platform}${index ? ` link ${index + 1}` : ""}`}
      title={`View ${link.platform}`}
    >
      <PlatformIcon platform={link.platform} />
      <span>View {link.platform}</span>
    </a>
  );
}

export function SocialMediaClientCard({ client }: { client: SocialMediaClient }) {
  const reduceMotion = useReducedMotion();

  function tilt(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--social-client-tilt-x", `${-y * 2.5}deg`);
    event.currentTarget.style.setProperty("--social-client-tilt-y", `${x * 2.5}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--social-client-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--social-client-tilt-y", "0deg");
  }

  return (
    <article className={`social-client-card${client.imageFit === "contain" ? " social-client-card-logo" : ""}`} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <div className={`social-client-image${client.imageFit === "contain" ? " social-client-image-contain" : ""}`}>
        {client.image ? (
          <Image src={client.image} alt={client.imageAlt ?? `${client.name} project image`} fill sizes="(max-width: 700px) 92vw, (max-width: 1020px) 47vw, 31vw" />
        ) : (
          <div className="social-client-image-empty" aria-label="Client image not available"><span>Image not provided</span></div>
        )}
      </div>
      <div className="social-client-copy">
        <span className="social-client-category">Social Media Marketing</span>
        <h2>{client.name}</h2>
        {client.description && <p>{client.description}</p>}
        {client.socialLinks.length > 0 && (
          <div className="social-client-actions" aria-label={`${client.name} social media links`}>
            {client.socialLinks.map((link, index) => (
              <SocialButton key={`${link.platform}-${index}`} link={link} clientName={client.name} index={index} />
            ))}
          </div>
        )}
      </div>
      <span className="social-client-glow" aria-hidden="true" />
    </article>
  );
}
