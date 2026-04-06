import { notFound } from "next/navigation";
import { categories } from "@/data/config";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <header className="mb-12">
        <div
          className="inline-block h-1 w-12 rounded-full mb-4"
          style={{ backgroundColor: category.color }}
        />
        <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-2">
          {category.name}
        </h1>
        <p className="text-neutral-400 text-lg">{category.description}</p>
      </header>

      {articles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-neutral-500 font-display">
            No articles in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
