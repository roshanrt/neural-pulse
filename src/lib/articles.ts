import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article } from "@/types";
import { categories } from "@/data/config";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function parseArticle(filename: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");
  const category =
    categories.find((c) => c.slug === data.category) ?? categories[0];

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    coverImage: data.coverImage ?? "/images/placeholder-ai.svg",
    category,
    tags: data.tags ?? [],
    author: data.author,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    readingTime: Math.ceil(readingTime(content).minutes) || 1,
    featured: data.featured ?? false,
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
  const mdx = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const md = path.join(ARTICLES_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!filePath) return null;
  return parseArticle(path.basename(filePath));
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.category.slug === categorySlug);
}
