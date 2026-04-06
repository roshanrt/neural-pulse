import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import HeroScene from "@/components/three/HeroSceneClient";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import { sampleArticles } from "@/data/articles";
import { categories } from "@/data/config";

export default function HomePage() {
  const featured = sampleArticles.filter((a) => a.featured);
  const latest = sampleArticles.filter((a) => !a.featured);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <HeroScene />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-brand-500 text-xs font-display font-medium tracking-wide">
                LIVE COVERAGE
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-4">
              Tech moves fast.
              <br />
              <span className="text-gradient">We move faster.</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              Breaking news and deep analysis on AI, cybersecurity, and the
              technologies reshaping our world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/category/ai"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-surface-0 font-display font-medium text-sm rounded-full hover:bg-brand-400 transition-colors"
              >
                Read Latest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white font-display font-medium text-sm rounded-full hover:bg-white/5 transition-colors"
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-500" />
            <h2 className="font-display font-bold text-xl text-white">
              Featured
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              variant="featured"
            />
          ))}
        </div>
      </section>

      {/* ── Latest + Sidebar ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-xl text-white mb-6">
              Latest Stories
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {latest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Categories */}
            <div className="rounded-xl bg-surface-200 border border-white/5 p-5">
              <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="category-badge hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                    }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending (placeholder) */}
            <div className="rounded-xl bg-surface-200 border border-white/5 p-5">
              <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-wider">
                Trending
              </h3>
              {sampleArticles.slice(0, 4).map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  variant="compact"
                />
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <NewsletterCTA />
      </section>
    </>
  );
}
