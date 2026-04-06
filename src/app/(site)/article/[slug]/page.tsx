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
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
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

function buildJsonLd(article: NonNullable<ReturnType<typeof getArticleBySlug>>) {
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
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getAllArticles()
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

      {/* Article body */}
      <div className="prose prose-invert prose-headings:font-display prose-headings:text-white prose-p:text-neutral-300 prose-a:text-brand-500 prose-code:text-brand-400 prose-pre:bg-surface-300 prose-strong:text-white max-w-none mb-16">
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
