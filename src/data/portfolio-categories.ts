export type PortfolioProject = {
  title: string;
  imagePath?: string;
  imageAlt?: string;
  description?: string;
  href?: string;
};

export type PortfolioCategory = {
  name: string;
  slug: string;
  imagePath: string | null;
  projects: PortfolioProject[];
};

// Add each supplied category image at imagePath and approved projects in projects.
export const portfolioCategories: PortfolioCategory[] = [
  { name: "Social Media Marketing", slug: "social-media-marketing", imagePath: "/portfolio/categories/01_social_media_marketing.png", projects: [] },
  { name: "Web & Mobile App Development", slug: "web-development", imagePath: "/portfolio/categories/web_mobile_app_development.png", projects: [] },
  { name: "E-Commerce Website Development", slug: "ecommerce-website-development", imagePath: "/portfolio/categories/ecommerce_website_development.png", projects: [] },
  { name: "Video Editing", slug: "video-editing", imagePath: "/portfolio/categories/04_video_editing.png", projects: [] },
  { name: "Video Shooting", slug: "video-shooting", imagePath: "/portfolio/categories/05_video_shooting.png", projects: [] },
  { name: "UI/UX Design", slug: "ui-ux-design", imagePath: "/portfolio/categories/06_ui_ux_design.png", projects: [] },
];
