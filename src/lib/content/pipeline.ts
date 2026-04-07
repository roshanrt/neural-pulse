import { createHash } from "crypto";
import { categories } from "@/data/config";
import { CategorySlug, ArticleJsonOutput, ArticleBundleOutput } from "@/types";
import { createSlug } from "@/lib/content/slugify";
import { parseAiContentToSections } from "@/lib/content/parser";
import { formatSections, toArticleMarkdown } from "@/lib/content/formatter";

export interface DraftInput {
  title?: string;
  category?: string;
  source?: string;
  sourceUrl?: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  tags?: string[];
  rawText?: string;
  priorityScore?: number;
}

const ALLOWED_CATEGORIES = new Set(categories.map((c) => c.slug));

function safeCategory(input?: string): CategorySlug {
  const category = String(input || "tech-news").trim().toLowerCase();
  return (ALLOWED_CATEGORIES.has(category) ? category : "tech-news") as CategorySlug;
}

function ensureTitle(title?: string): string {
  const safe = String(title || "").trim();
  return safe || "Untitled Tech Update";
}

function ensureSource(source?: string): string {
  const safe = String(source || "").trim();
  return safe || "Techrupt Desk";
}

function ensureSourceUrl(sourceUrl?: string): string {
  const safe = String(sourceUrl || "").trim();
  return safe || "https://techrupt.example/source-unavailable";
}

function ensureExcerpt(excerpt: string, fallbackText: string): string {
  const safeExcerpt = excerpt.trim();
  if (safeExcerpt) {
    return safeExcerpt.slice(0, 240);
  }

  const fallback = fallbackText.replace(/\s+/g, " ").trim();
  if (!fallback) {
    return "No excerpt available.";
  }

  return (fallback.length > 240 ? `${fallback.slice(0, 237)}...` : fallback).trim();
}

function scorePriority(rawText: string, provided = 0): number {
  let score = Number.isFinite(provided) ? Number(provided) : 0;
  const text = rawText.toLowerCase();

  if (/cve-\d{4}-\d+/i.test(text)) score += 3;
  if (/zero-day|rce|remote code execution|actively exploited/.test(text)) score += 3;
  if (/ransomware|breach|supply chain|exploit/.test(text)) score += 2;
  if (/critical|urgent/.test(text)) score += 1;

  return score;
}

export function buildArticleBundle(input: DraftInput): ArticleBundleOutput {
  const title = ensureTitle(input.title);
  const category = safeCategory(input.category);
  const source = ensureSource(input.source);
  const sourceUrl = ensureSourceUrl(input.sourceUrl);
  const publishedAt = input.publishedAt || new Date().toISOString();
  const rawText = String(input.rawText || "").trim();
  const sections = formatSections(parseAiContentToSections(rawText));
  const excerpt = ensureExcerpt(String(input.excerpt || "").trim(), sections.summary);
  const slug = createSlug(title, 70);
  const hash = createHash("sha256")
    .update(`${slug}|${publishedAt}|${sourceUrl}|${source}`)
    .digest("hex");
  const priorityScore = scorePriority(rawText, input.priorityScore ?? 0);

  const json: ArticleJsonOutput = {
    slug,
    title,
    category,
    source,
    sourceUrl,
    excerpt,
    publishedAt,
    tags: Array.isArray(input.tags) ? input.tags.filter(Boolean) : [],
    hash,
    featured: Boolean(input.featured),
    priorityScore,
    sections,
  };

  return {
    json,
    markdown: toArticleMarkdown(json),
  };
}

export function dedupeByHash(items: ArticleBundleOutput[]): ArticleBundleOutput[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.json.hash)) return false;
    seen.add(item.json.hash);
    return true;
  });
}

export function balanceBySource(
  items: ArticleBundleOutput[],
  maxPerSource = 2
): ArticleBundleOutput[] {
  const counts = new Map<string, number>();
  const output: ArticleBundleOutput[] = [];

  for (const item of items) {
    const key = item.json.source;
    const current = counts.get(key) ?? 0;
    if (current >= maxPerSource) continue;
    counts.set(key, current + 1);
    output.push(item);
  }

  return output;
}

export function filterHighPriority(
  items: ArticleBundleOutput[],
  threshold = 3
): ArticleBundleOutput[] {
  return items.filter((item) => item.json.priorityScore >= threshold);
}

export function batchItems<T>(items: T[], size = 5): T[][] {
  if (size <= 0) return [items];
  const output: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    output.push(items.slice(i, i + size));
  }
  return output;
}
