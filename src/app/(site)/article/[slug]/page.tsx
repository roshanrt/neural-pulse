import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { siteConfig } from "@/data/config";
import { formatDate } from "@/lib/utils";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import ArticleCard from "@/components/articles/ArticleCard";
import type { Article } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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

function buildJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${article.coverImage}`,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/og-default.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/article/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category.name,
  };
}

export function generateStaticParams() {
  return [];
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = (await getAllArticles())
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

      {/* Author & Meta Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-display font-bold text-brand-400">{article.author.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-white">
                {article.author.name}
              </p>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <Clock className="inline h-3 w-3" />
                <span>{article.readingTime} min read</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none btn-secondary !py-2 !px-3" title="Share article">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex-1 sm:flex-none btn-secondary !py-2 !px-3" title="Save article">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
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

      {/* Article body */}
      <div className="prose prose-invert max-w-none mb-12">
        <style>{`
          .prose h1 { @apply font-display font-bold text-3xl md:text-4xl text-white mt-8 mb-4; }
          .prose h2 { @apply font-display font-bold text-2xl md:text-3xl text-white mt-8 mb-3; }
          .prose h3 { @apply font-display font-bold text-xl text-white mt-6 mb-3; }
          .prose p { @apply text-neutral-300 leading-relaxed mb-4; }
          .prose a { @apply text-brand-500 hover:text-brand-400 underline transition-colors; }
          .prose code { @apply bg-surface-300 rounded px-1.5 py-0.5 text-sm font-mono text-brand-400; }
          .prose pre { @apply bg-surface-300 rounded-lg p-4 overflow-x-auto my-6; }
          .prose pre code { @apply bg-transparent p-0 text-neutral-300; }
          .prose blockquote { @apply border-l-4 border-brand-500 pl-4 py-2 my-6 text-neutral-400 italic; }
          .prose ul, .prose ol { @apply ml-6 mb-4; }
          .prose li { @apply text-neutral-300 mb-2; }
          .prose img { @apply rounded-lg my-6 max-w-full; }
        `}</style>
        <MDXRemote
          source={article.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </div>

      {/* Tags */}
      <div className="space-y-4 mb-12 pb-8 border-b border-white/5">
        <h3 className="font-display font-semibold text-neutral-300 text-sm uppercase tracking-wide">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-display font-medium hover:bg-brand-500/20 hover:border-brand-500/50 transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display font-bold text-xl text-white mb-6">
            Related in {article.category.name}
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
