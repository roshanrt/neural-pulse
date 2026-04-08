import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { categories, siteConfig } from "@/data/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const base = siteConfig.url;

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/newsletter`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categories.map((cat) => ({
      url: `${base}/category/${cat.slug}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${base}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
