import { Feed } from "feed";
import { getAllArticles } from "@/lib/articles";
import { siteConfig } from "@/data/config";

export const dynamic = "force-static";
export const revalidate = 3600; // regenerate at most once per hour

export async function GET() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: {
      rss2: `${siteConfig.url}/api/rss`,
    },
    author: {
      name: "Techrupt",
      link: siteConfig.url,
    },
  });

  for (const article of getAllArticles()) {
    feed.addItem({
      title: article.title,
      id: `${siteConfig.url}/article/${article.slug}`,
      link: `${siteConfig.url}/article/${article.slug}`,
      description: article.excerpt,
      content: article.excerpt,
      author: [{ name: article.author.name }],
      date: new Date(article.publishedAt),
      category: [{ name: article.category.name }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
