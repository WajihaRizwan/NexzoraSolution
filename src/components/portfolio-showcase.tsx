"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

const categories = ["All work", "Websites", "Mobile Apps", "UI/UX Design", "Graphic Design", "AI & IoT", "Video & Creative"];
const projects = ["Websites", "Mobile Apps", "UI/UX Design", "Graphic Design", "AI & IoT", "Video & Creative"];

export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const visibleProjects = activeCategory === "All work" ? projects : projects.filter((category) => category === activeCategory);

  return (
    <>
      <div className="portfolio-filters" aria-label="Portfolio categories">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "portfolio-filter portfolio-filter-active" : "portfolio-filter"}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" aria-live="polite">
        {visibleProjects.map((category, index) => (
          <Reveal key={category} delay={(index % 3) * 0.06}>
            <article className={`portfolio-card portfolio-card-${String(index + 1).padStart(2, "0")}`}>
              <div className="portfolio-art" aria-hidden="true"><span className="portfolio-orbit" /><span className="portfolio-orbit portfolio-orbit-inner" /><span className="portfolio-art-mark">N<span>×</span></span><span className="portfolio-art-grain" /></div>
              <div className="portfolio-card-info"><span className="portfolio-card-category">{category}</span><h3>Project details coming soon</h3><p>This space is ready for Nexzora’s work.</p></div>
              <span className="portfolio-card-number">{String(index + 1).padStart(2, "0")}</span>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="portfolio-note">These cards are placeholders, not completed projects. Real work and links can be added here when supplied.</p>
    </>
  );
}
