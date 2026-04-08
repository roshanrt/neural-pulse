import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article } from "@/types";
import { categories } from "@/data/config";
import { buildArticleSections } from "@/lib/content/parser";
import { createSlug } from "@/lib/content/slugify";
import { getArticles as getNotionArticles, getArticleBySlug as getNotionArticleBySlug, type NotionArticle } from "@/lib/notion/articles";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function notionToArticle(article: NotionArticle): Article {
  const category =
    categories.find((item) => item.slug === article.category) ??
    categories.find((item) => item.slug === "tech-news") ??
    categories[0];
  const publishedAt = article.publishedAt || new Date().toISOString();

  return {
    slug: createSlug(article.slug),
    title: article.title,
    excerpt: article.excerpt || article.body.substring(0, 160) || "No excerpt available.",
    content: article.body || "",
    coverImage: "/images/placeholder-ai.svg",
    category,
    tags: article.tags || [],
    author: {
      name: "Techrupt Editorial",
      slug: "techrupt-editorial",
      avatar: "/images/author-roshan.svg",
      bio: "Editorial desk",
    },
    publishedAt,
    readingTime: Math.ceil(readingTime(article.body || article.excerpt || "").minutes) || 1,
    featured: article.type === "featured" || article.status === "Published",
    source: "Techrupt Desk",
    sourceUrl: article.sourceUrl || "",
    hash: createHash("sha256").update(`${article.slug}|${publishedAt}`).digest("hex"),
    priorityScore: 0,
    sections: buildArticleSections(article.body || article.excerpt || ""),
  };
}

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

export async function getAllArticles(): Promise<Article[]> {
  const notionArticles = await getNotionArticles();
  if (notionArticles.length > 0) {
    return notionArticles
      .map(notionToArticle)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter(
      (f) =>
        (f.endsWith(".mdx") || f.endsWith(".md")) &&
        !f.startsWith("_")
    );

  return files
    .map(parseArticle)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const notionArticle = await getNotionArticleBySlug(slug);
  if (notionArticle) {
    return notionToArticle(notionArticle);
  }

  const safeSlug = createSlug(slug);
  const mdx = path.join(ARTICLES_DIR, `${safeSlug}.mdx`);
  const md = path.join(ARTICLES_DIR, `${safeSlug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!filePath) return null;
  return parseArticle(path.basename(filePath));
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => a.category.slug === categorySlug);
}
