import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/articles";
import { toArticleMarkdown } from "@/lib/content/formatter";
import { ArticleJsonOutput, CategorySlug } from "@/types";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const json: ArticleJsonOutput = {
    slug: article.slug,
    title: article.title,
    category: article.category.slug as CategorySlug,
    source: article.source || "Techrupt Desk",
    sourceUrl: article.sourceUrl || "https://techrupt.example/source-unavailable",
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    tags: article.tags,
    hash: article.hash || "",
    featured: article.featured,
    priorityScore: article.priorityScore || 0,
    sections: article.sections || {
      summary: article.excerpt,
      technicalDetails: article.content,
      impact: "No verified details available yet.",
      exploitation: "No verified details available yet.",
      detection: "No verified details available yet.",
      mitigation: "No verified details available yet.",
      whyItMatters: "No verified details available yet.",
    },
  };

  return NextResponse.json(
    {
      markdown: toArticleMarkdown(json),
      json,
    },
    { status: 200 }
  );
}
