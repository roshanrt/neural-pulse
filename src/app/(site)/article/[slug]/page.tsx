import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { sampleArticles } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = sampleArticles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}

function buildJsonLd(article: (typeof sampleArticles)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Techrupt",
    },
    keywords: article.tags.join(", "),
    articleSection: article.category.name,
  };
}

export function generateStaticParams() {
  return sampleArticles.map((article) => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = sampleArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = sampleArticles
    .filter((a) => a.slug !== article.slug && a.category.slug === article.category.slug)
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(article)) }}
      />
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Header */}
      <header className="mb-10">
        <span
          className="category-badge mb-4"
          style={{
            backgroundColor: `${article.category.color}15`,
            color: article.category.color,
          }}
        >
          {article.category.name}
        </span>

        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed mb-6">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-300" />
            <div>
              <p className="text-sm font-display font-medium text-white">
                {article.author.name}
              </p>
              <p className="text-xs text-neutral-500">
                {formatDate(article.publishedAt)} &middot;{" "}
                <Clock className="inline h-3 w-3" /> {article.readingTime} min read
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-300 text-neutral-400 hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg bg-surface-300 text-neutral-400 hover:text-white transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Cover image placeholder */}
      <div className="aspect-[16/9] rounded-2xl bg-surface-200 mb-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${article.category.color}44, transparent 60%)`,
          }}
        />
      </div>

      {/* Article body placeholder */}
      <div className="prose prose-invert max-w-none mb-16">
        <p className="text-neutral-300 leading-relaxed text-lg">
          This is a placeholder for the full article content. When you connect
          your MDX pipeline or CMS, the article body will render here with full
          rich text support, code blocks, images, and embedded media.
        </p>
        <h2 className="font-display">Section heading example</h2>
        <p className="text-neutral-300 leading-relaxed">
          Your content pipeline will pull articles from local MDX files, a
          headless CMS, or the AI-assisted drafting workflow. Each article
          supports syntax-highlighted code blocks, embedded tweets, YouTube
          embeds, and custom callout components.
        </p>
        <pre className="bg-surface-300 rounded-lg p-4 overflow-x-auto">
          <code className="text-brand-500 text-sm font-mono">
            {`// Example: fetching article from MDX
import { getArticleBySlug } from '@/lib/articles';

const article = await getArticleBySlug('${article.slug}');`}
          </code>
        </pre>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/5">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/search?q=${tag}`}
            className="px-3 py-1 rounded-full bg-surface-300 text-neutral-400 text-xs font-display hover:text-brand-500 hover:bg-surface-400 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-xl text-white mb-6">
            Related Stories
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterCTA />
    </article>
  );
}
