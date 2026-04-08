import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import HeroScene from "@/components/three/HeroSceneClient";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import { getAllArticles } from "@/lib/articles";
import { categories } from "@/data/config";

export default async function HomePage() {
  const articles = await getAllArticles();
  const featured = articles.filter((a) => a.featured);
  const topStory = featured[0] ?? articles[0] ?? null;
  const featuredGrid = featured.filter((a) => a.slug !== topStory?.slug).slice(0, 2);
  const latest = articles.filter((a) => a.slug !== topStory?.slug && !a.featured);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
        <HeroScene />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6 animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-brand" />
              <span className="text-brand-500 text-xs font-display font-semibold tracking-widest uppercase">
                LIVE COVERAGE
              </span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[0.95] mb-6">
              Tech moves fast.
              <br />
              <span className="text-gradient">We move faster.</span>
            </h1>
            <p className="text-neutral-700 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              Breaking news and deep analysis on AI, cybersecurity, and the
              technologies reshaping our world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/category/ai"
                className="btn-primary"
              >
                Read Latest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/newsletter"
                className="btn-secondary"
              >
                Subscribe Free
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 glow-line" />
      </section>

      {/* ── Featured Articles ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 mb-16 border-b border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-brand-500" />
            <h2 className="font-display font-bold text-2xl text-slate-900">
              Top Story
            </h2>
          </div>
        </div>
        {topStory && <ArticleCard article={topStory} variant="featured" />}
      </section>

      {featuredGrid.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 mb-16 border-b border-slate-200">
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-8">
            Featured Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
            {featuredGrid.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* ── Latest + Sidebar ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 mb-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-8">
              Latest Stories
            </h2>
            {latest.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6 auto-rows-fr">
                {latest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-12">No articles yet. Check back soon!</p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Categories */}
            <div className="rounded-xl bg-surface-200 border border-slate-200 p-6">
              <h3 className="font-display font-bold text-sm text-slate-800 mb-4 uppercase tracking-widest">
                Explore Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="category-badge hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending (placeholder) */}
            <div className="rounded-xl bg-surface-200 border border-slate-200 p-6 max-h-96 overflow-y-auto">
              <h3 className="font-display font-bold text-sm text-slate-800 mb-4 uppercase tracking-widest sticky top-0 bg-surface-200 pb-2">
                Trending Now
              </h3>
              <div className="space-y-0.5">
                {articles.slice(0, 4).map((article) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <NewsletterCTA />
      </section>
    </>
  );
}
