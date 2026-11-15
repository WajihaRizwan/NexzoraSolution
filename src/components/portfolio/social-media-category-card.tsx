"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

export function SocialMediaCategoryCard() {
  const reduceMotion = useReducedMotion();

  function tilt(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--category-tilt-x", `${-y * 2.5}deg`);
    event.currentTarget.style.setProperty("--category-tilt-y", `${x * 2.5}deg`);
  }

  function reset(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--category-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--category-tilt-y", "0deg");
  }

  return (
    <Link
      className="portfolio-category-feature"
      href="/portfolio/social-media-marketing"
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-label="Explore Social Media Marketing projects"
    >
      <Image
        className="portfolio-category-feature-image"
        src="/portfolio/social-media-marketing-category.png"
        alt="Blue 3D social media marketing artwork featuring a smartphone, megaphone and social platform icons"
        fill
        priority
        sizes="(max-width: 700px) 94vw, 930px"
      />
      <span className="portfolio-category-feature-shade" aria-hidden="true" />
      <span className="portfolio-category-feature-copy">
        <span className="portfolio-category-feature-label">Portfolio category</span>
        <span className="portfolio-category-feature-title">SOCIAL MEDIA MARKETING</span>
        <span className="portfolio-category-feature-action">Explore Projects <b aria-hidden="true">&#8599;</b></span>
      </span>
      <span className="portfolio-category-feature-shine" aria-hidden="true" />
    </Link>
  );
}
