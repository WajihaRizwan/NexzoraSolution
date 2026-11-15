"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

const icons: Record<string, React.ReactNode> = {
  mission: <><path d="M12 3v4m0 10v4M3 12h4m10 0h4" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  vision: <><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.7" /><path d="M12 2v2m8-1-1 2" /></>,
  innovation: <><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4" /><circle cx="12" cy="12" r="4" /><path d="m10.5 12 1 1 2-2" /></>,
  integrity: <><path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  creativity: <><path d="M12 3a9 9 0 1 0 0 18h1.2a2.1 2.1 0 0 0 1.5-3.6 1.8 1.8 0 0 1 1.3-3.1H18a3 3 0 0 0 3-3c0-4.6-4-8.3-9-8.3Z" /><path d="M7.5 11h.01M10 7.5h.01M15 8h.01" /></>,
  quality: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /><path d="m9.5 12.2 1.7 1.7 3.6-3.7" /></>,
  collaboration: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.2a5.5 5.5 0 0 1 11 0V20M16 5.5a3 3 0 0 1 0 5.8M17 14a4.6 4.6 0 0 1 3.5 4.5V20" /></>,
  growth: <><path d="M4 18V6m0 12h16M7 15l4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
};

export function InteractiveCard({
  variant,
  icon,
  index,
  title,
  description,
}: {
  variant: "value-card" | "story-card";
  icon: string;
  index: string;
  title: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: -vertical * 5, y: horizontal * 5 });
  }

  const style = {
    "--tilt-x": `${tilt.x}deg`,
    "--tilt-y": `${tilt.y}deg`,
  } as CSSProperties;

  return (
    <article
      className={`about-interactive-card ${variant}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="about-card-top">
        <span className="about-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg>
        </span>
        <span className="about-card-index">{index}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="about-card-glow" aria-hidden="true" />
    </article>
  );
}
