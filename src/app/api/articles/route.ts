import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";
import {
  batchItems,
  balanceBySource,
  buildArticleBundle,
  dedupeByHash,
  filterHighPriority,
  DraftInput,
} from "@/lib/content/pipeline";
import { toArticleMarkdown } from "@/lib/content/formatter";
import { ArticleJsonOutput, CategorySlug } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = getAllArticles().map((article) => {
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

    return {
      json,
      markdown: toArticleMarkdown(json),
    };
  });

  const topStory = items.find((item) => item.json.featured) ?? items[0] ?? null;

  return NextResponse.json(
    {
      count: items.length,
      topStory,
      items,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const inputItems: DraftInput[] = Array.isArray(body?.items) ? body.items : [];
  const highPriorityOnly = Boolean(body?.highPriorityOnly);
  const maxPerSource = Number(body?.maxPerSource || 2);
  const threshold = Number(body?.priorityThreshold || 3);
  const batchSize = Number(body?.batchSize || 5);

  let output = inputItems.map((item) => buildArticleBundle(item));
  output = dedupeByHash(output);
  output.sort((a, b) => b.json.priorityScore - a.json.priorityScore);
  output = balanceBySource(output, maxPerSource);

  if (highPriorityOnly) {
    output = filterHighPriority(output, threshold);
  }

  const batches = batchItems(output, batchSize);

  return NextResponse.json(
    {
      count: output.length,
      batches: batches.length,
      batchItems: batches,
      items: output,
    },
    { status: 200 }
  );
}
