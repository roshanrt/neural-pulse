import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/data/config";

// Google News sitemap: only articles published in the last 48 hours, max 1,000
export default async function newsSitemap(): Promise<MetadataRoute.Sitemap> {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const base = siteConfig.url;

  const recentArticles = (await getAllArticles())
    .filter((a) => new Date(a.publishedAt).getTime() > cutoff)
    .slice(0, 1000);

  return recentArticles.map((article) => ({
    url: `${base}/article/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "never" as const,
    priority: 0.9,
  }));
}
