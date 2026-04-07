import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article } from "@/types";
import { categories } from "@/data/config";
import { buildArticleSections } from "@/lib/content/parser";
import { createSlug } from "@/lib/content/slugify";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function parseArticle(filename: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = createSlug(
    String(data.slug || filename.replace(/\.mdx?$/, "") || "untitled")
  );
  const category =
    categories.find((c) => c.slug === data.category) ??
    categories.find((c) => c.slug === "tech-news") ??
    categories[0];
  const title = String(data.title || slug.replace(/-/g, " ")).trim();
  const excerpt = String(data.excerpt || "No excerpt available.").trim();
  const publishedAt = String(data.publishedAt || new Date().toISOString());
  const tags = Array.isArray(data.tags)
    ? data.tags.filter(Boolean).map((tag: unknown) => String(tag).trim())
    : [];
  const source = String(data.source || "Techrupt Desk").trim();
  const sourceUrl = String(data.sourceUrl || "").trim();
  const priorityScore = Number.isFinite(data.priorityScore)
    ? Number(data.priorityScore)
    : 0;
  const hash = createHash("sha256")
    .update(`${slug}|${title}|${publishedAt}|${sourceUrl}`)
    .digest("hex");
  const sections = buildArticleSections(content);

  return {
    slug,
    title,
    excerpt,
    content,
    coverImage: data.coverImage ?? "/images/placeholder-ai.svg",
    category,
    tags,
    author: data.author ?? {
      name: "Techrupt Editorial",
      slug: "techrupt-editorial",
      avatar: "/images/author-roshan.svg",
      bio: "Editorial desk",
    },
    publishedAt,
    updatedAt: data.updatedAt,
    readingTime: Math.ceil(readingTime(content).minutes) || 1,
    featured: data.featured ?? false,
    source,
    sourceUrl,
    hash,
    priorityScore,
    sections,
  };
}

export function getAllArticles(): Article[] {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map(parseArticle)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleBySlug(slug: string): Article | null {
  const safeSlug = createSlug(slug);
  const mdx = path.join(ARTICLES_DIR, `${safeSlug}.mdx`);
  const md = path.join(ARTICLES_DIR, `${safeSlug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!filePath) return null;
  return parseArticle(path.basename(filePath));
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.category.slug === categorySlug);
}
