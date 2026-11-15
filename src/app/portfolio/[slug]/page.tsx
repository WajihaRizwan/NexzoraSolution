import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioCategories } from "@/data/portfolio-categories";

export function generateStaticParams() {
  return portfolioCategories
    .filter((category) => category.slug !== "social-media-marketing")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const category = portfolioCategories.find((item) => item.slug === slug);

  if (!category) return { title: "Portfolio Category" };

  return {
    title: `${category.name} Portfolio`,
    description: `Explore Nexzora Solution's ${category.name.toLowerCase()} portfolio and project work.`,
  };
}

export default async function PortfolioCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = portfolioCategories.find((item) => item.slug === slug);
  if (!category || category.slug === "social-media-marketing") notFound();

  return (
    <main className="category-project-page">
      <header className="category-project-heading">
        <Link className="category-project-back" href="/portfolio">&#8592; Back to Portfolio</Link>
        <span className="category-project-eyebrow">Nexzora Solution Portfolio</span>
        <h1>{category.name}</h1>
        <p>Projects and work samples for {category.name}.</p>
      </header>
      {category.projects.length ? (
        <section className="category-project-grid" aria-label={`${category.name} projects`}>
          {category.projects.map((project) => (
            <article className="category-project-card" key={project.title}>
              <div className="category-project-image">
                {project.imagePath && <Image src={project.imagePath} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 700px) 92vw, (max-width: 1020px) 46vw, 32vw" />}
              </div>
              <div className="category-project-copy">
                <span>{category.name}</span>
                <h2>{project.title}</h2>
                {project.description && <p>{project.description}</p>}
                {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer">View project</a>}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className="category-project-empty">Project images and details will appear here when they are added.</p>
      )}
    </main>
  );
}
