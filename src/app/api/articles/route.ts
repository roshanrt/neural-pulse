import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/articles";
import { getArticles as getNotionArticles } from "@/lib/notion/articles";
import {
  batchItems,
  balanceBySource,
  buildArticleBundle,
  dedupeByHash,
  filterHighPriority,
  DraftInput,
} from "@/lib/content/pipeline";
import { toArticleMarkdown } from "@/lib/content/formatter";
import { Article, ArticleJsonOutput, CategorySlug } from "@/types";
import { NotionArticle } from "@/lib/notion/articles";

export const dynamic = "force-dynamic";

function toArticleJson(article: Article | NotionArticle): ArticleJsonOutput {
  const categorySlug =
    typeof article.category === "string"
      ? (article.category as CategorySlug)
      : (article.category.slug as CategorySlug);

  const excerpt =
    "excerpt" in article && article.excerpt
      ? article.excerpt
      : "body" in article
        ? article.body.slice(0, 160)
        : "";

  const sections =
    "sections" in article && article.sections
      ? article.sections
      : {
          summary: excerpt || "No verified details available yet.",
          technicalDetails:
            "content" in article && article.content
              ? article.content
              : "No verified details available yet.",
          impact: "No verified details available yet.",
          exploitation: "No verified details available yet.",
          detection: "No verified details available yet.",
          mitigation: "No verified details available yet.",
          whyItMatters: "No verified details available yet.",
        };

  return {
    slug: article.slug,
    title: article.title,
    category: categorySlug,
    source:
      "source" in article && article.source
        ? article.source
        : "Techrupt Desk",
    sourceUrl: article.sourceUrl || "https://techrupt.in/source-unavailable",
    excerpt,
    publishedAt: article.publishedAt,
    tags: article.tags,
    hash: "hash" in article && article.hash ? article.hash : "",
    featured: "featured" in article ? Boolean(article.featured) : false,
    priorityScore:
      "priorityScore" in article && Number.isFinite(article.priorityScore)
        ? Number(article.priorityScore)
        : 0,
    sections,
  };
}

export async function GET() {
  const notionArticles = await getNotionArticles();
  const sourceArticles = notionArticles.length ? notionArticles : await getAllArticles();

  const items = sourceArticles.map((article) => {
    const json = toArticleJson(article);

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
      source: notionArticles.length ? "notion" : "filesystem",
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
