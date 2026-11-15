import { PortfolioCategoryCard } from "@/components/portfolio/portfolio-category-card";
import { portfolioCategories } from "@/data/portfolio-categories";

export function PortfolioGallery() {
  return (
    <div className="portfolio-category-grid" aria-label="Portfolio project categories">
      {portfolioCategories.map((category) => (
        <PortfolioCategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
