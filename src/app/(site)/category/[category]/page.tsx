import { notFound } from "next/navigation";
import { categories } from "@/data/config";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-12 md:mb-16">
        {/* Category indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="h-3 w-12 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <span className="text-sm font-display font-semibold uppercase tracking-wider" style={{ color: category.color }}>
            {category.name}
          </span>
        </div>
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            {category.name}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Stats */}
        {articles.length > 0 && (
          <div className="inline-flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-sm font-display font-medium text-white">
              {articles.length} article{articles.length === 1 ? '' : 's'}
            </span>
          </div>
        )}
      </div>

      {/* Articles grid */}
      {articles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-surface-200 p-12 text-center">
          <p className="text-neutral-400 font-display text-lg mb-2">
            No articles yet in {category.name}
          </p>
          <p className="text-neutral-500 text-sm">
            Check back soon for coverage on this topic.
          </p>
        </div>
      )}
    </div>
  );
}
