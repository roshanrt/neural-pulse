import type { Metadata } from "next";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import ArticleCard from "@/components/articles/ArticleCard";
import { getAllArticles } from "@/lib/articles";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search the latest articles on Techrupt.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const allArticles = await getAllArticles();
  const fuse = new Fuse(allArticles, {
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

  const query = searchParams?.q?.trim() ?? "";
  const results = query
    ? fuse.search(query).map((r) => r.item)
    : allArticles;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">

      <div className="max-w-3xl mb-12">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
          <Search className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-semibold tracking-widest uppercase">
            Search
          </span>
        </div>

        <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
          Find articles across all topics
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
          Search by title, topic, author, or keyword to discover relevant articles.
        </p>

        {/* Search form */}
        <form action="/search" method="get" className="flex flex-col sm:flex-row gap-3">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search AI, cybersecurity, web3..."
            className="input-field flex-1"
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary !px-6"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {query ? (
        <div className="mb-8">
          <p className="text-sm text-neutral-400 font-display">
            {results.length} result{results.length === 1 ? '' : 's'} for <span className="text-white font-semibold">"{query}"</span>
          </p>
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-surface-200 p-12 text-center">
          <Search className="h-12 w-12 text-neutral-600 mx-auto mb-4 opacity-50" />
          <p className="text-neutral-300 font-display text-lg mb-2">
            {query ? 'No articles found' : 'Start searching to discover articles'}
          </p>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">
            {query 
              ? `Try a different search term or browse articles by category`
              : 'Use the search above to find articles by title, topic, author, or keyword'
            }
          </p>
        </div>
      )}
    </section>
  );
}