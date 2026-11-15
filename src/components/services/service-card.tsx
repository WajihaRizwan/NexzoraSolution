"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  index: number;
};

export function ServiceCard({ title, description, image, imageAlt, imageFit = "cover", index }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--service-tilt-x", `${-y * 4}deg`);
    event.currentTarget.style.setProperty("--service-tilt-y", `${x * 4}deg`);
  }

  function resetPointerTilt(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--service-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--service-tilt-y", "0deg");
  }

  return (
    <article
      className="service-feature-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerTilt}
    >
      <div className={`service-feature-image${imageFit === "contain" ? " service-feature-image-contain" : ""}`}>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 700px) 92vw, (max-width: 1020px) 47vw, 31vw" />
        <span className="service-image-shade" aria-hidden="true" />
      </div>
      <div className="service-feature-copy">
        <div className="service-feature-index"><span>{String(index).padStart(2, "0")}</span><i /></div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="service-feature-glow" aria-hidden="true" />
    </article>
  );
}
