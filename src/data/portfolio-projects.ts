export const portfolioCategories = [
  "All Projects",
  "Social Media Marketing",
  "Website Development",
  "Web Applications",
  "Mobile App Development",
  "UI/UX Design",
  "E-Commerce Websites",
  "Video Shooting",
  "Video Editing",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type ProjectCategory = Exclude<PortfolioCategory, "All Projects">;

export type PortfolioProject = {
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  href?: string;
};

// Add real, approved portfolio projects here when their images and links are ready.
export const portfolioProjects: PortfolioProject[] = [];
