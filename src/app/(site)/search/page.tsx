import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Fuse from "fuse.js";
import ArticleCard from "@/components/articles/ArticleCard";
import { sampleArticles } from "@/data/articles";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search the latest articles on Neural Vibes.",
};

const fuse = new Fuse(sampleArticles, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "excerpt", weight: 0.25 },
    { name: "tags", weight: 0.2 },
    { name: "category.name", weight: 0.1 },
    { name: "author.name", weight: 0.05 },
  ],
  threshold: 0.4,
  includeScore: false,
});

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const results = query
    ? fuse.search(query).map((r) => r.item)
    : sampleArticles;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <Search className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Search
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Find articles fast.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed mb-6">
          Search by title, excerpt, category, author, or tag.
        </p>

        <form action="/search" method="get" className="flex gap-2 max-w-xl">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search for AI, cybersecurity, privacy..."
            className="flex-1 px-4 py-3 rounded-full bg-surface-200 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-3 bg-brand-500 text-surface-0 font-display font-medium text-sm rounded-full hover:bg-brand-400 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {query ? (
        <div className="mb-6 text-sm text-neutral-500">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-surface-200 p-8 text-neutral-400">
          No articles matched your search. Try a broader keyword or browse a
          category from the navigation.
        </div>
      )}
    </section>
  );
}