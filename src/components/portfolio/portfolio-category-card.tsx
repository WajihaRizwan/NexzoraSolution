"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { PortfolioCategory } from "@/data/portfolio-categories";

export function PortfolioCategoryCard({ category }: { category: PortfolioCategory }) {
  const reduceMotion = useReducedMotion();
  const usesStandardFooter = category.slug === "web-development" || category.slug === "mobile-app-development";

  function tilt(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--portfolio-category-tilt-x", `${-y * 2.5}deg`);
    event.currentTarget.style.setProperty("--portfolio-category-tilt-y", `${x * 2.5}deg`);
  }

  function reset(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--portfolio-category-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--portfolio-category-tilt-y", "0deg");
  }

  return (
    <Link
      className={`portfolio-category-card${usesStandardFooter ? " portfolio-category-card-custom-footer" : ""}`}
      href={`/portfolio/${category.slug}`}
      onPointerMove={tilt}
      onPointerLeave={reset}
      aria-label={`View ${category.name} projects`}
    >
      <span className="sr-only">{category.name} — Explore projects</span>
      <div className="portfolio-category-card-art">
        {category.imagePath ? (
          <Image
            src={category.imagePath}
            alt=""
            fill
            sizes="(max-width: 700px) 92vw, (max-width: 1020px) 45vw, 30vw"
          />
        ) : (
          <div className="portfolio-category-image-pending" aria-hidden="true">
            <span className="portfolio-category-pending-mark"><i /><b /><em /></span>
            <span>Category image pending</span>
          </div>
        )}
      </div>
      {usesStandardFooter && (
        <div className="portfolio-category-card-copy" aria-hidden="true">
          <h2>{category.name}</h2>
          <span>Explore projects <b>↗</b></span>
        </div>
      )}
      <span className="portfolio-category-card-glow" aria-hidden="true" />
    </Link>
  );
}
