import { Client } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";
let hasLoggedNotionAccessWarning = false;

export type NotionArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  sourceUrl: string;
  status: string;
  type: string;
  publishedAt: string;
  body: string;
};

function extractText(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const typedProp = prop as {
    type?: string;
    rich_text?: Array<{ plain_text?: string }>;
    title?: Array<{ plain_text?: string }>;
    select?: { name?: string };
    url?: string;
    date?: { start?: string };
  };

  if (typedProp.type === "rich_text") return typedProp.rich_text?.[0]?.plain_text || "";
  if (typedProp.type === "title") return typedProp.title?.[0]?.plain_text || "";
  if (typedProp.type === "select") return typedProp.select?.name || "";
  if (typedProp.type === "url") return typedProp.url || "";
  if (typedProp.type === "date") return typedProp.date?.start || "";
  return "";
}

function extractBodyFromBlocks(blocks: BlockObjectResponse[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return block.paragraph.rich_text?.map((t) => t.plain_text).join("") || "";
      }
      if (block.type === "heading_2") {
        return `## ${block.heading_2.rich_text?.map((t) => t.plain_text).join("") || ""}`;
      }
      if (block.type === "heading_3") {
        return `### ${block.heading_3.rich_text?.map((t) => t.plain_text).join("") || ""}`;
      }
      if (block.type === "bulleted_list_item") {
        return `- ${block.bulleted_list_item.rich_text?.map((t) => t.plain_text).join("") || ""}`;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function pageToArticle(page: PageObjectResponse, body = ""): NotionArticle {
  const props = page.properties as Record<string, unknown>;
  const tagsRaw = extractText(props.Tags);
  const slug = extractText(props.Slug) || extractText(props.slug) || page.id.replace(/-/g, "");

  return {
    id: page.id,
    title: extractText(props.Title) || extractText(props.Name) || "Untitled",
    slug,
    excerpt: extractText(props.Excerpt) || body.substring(0, 160),
    category: extractText(props.Category) || "tech-news",
    tags: tagsRaw
      ? tagsRaw
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    sourceUrl: extractText(props.Source),
    status: extractText(props.Status),
    type: extractText(props.Type) || "article",
    publishedAt: extractText(props.PublishedAt) || page.created_time,
    body,
  };
}

export async function getArticles(limit = 20): Promise<NotionArticle[]> {
  if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) return [];

  const notionClient = notion as Client & {
    dataSources: {
      query: (args: {
        data_source_id: string;
        filter: Record<string, unknown>;
        sorts: Array<Record<string, unknown>>;
        page_size: number;
      }) => Promise<{ results: unknown[] }>;
    };
  };
  try {
    const response = await notionClient.dataSources.query({
      data_source_id: NOTION_DATABASE_ID,
      filter: {
        property: "Status",
        select: { equals: "Draft" },
      },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: limit,
    });

    return response.results
      .filter(
        (page: unknown): page is PageObjectResponse =>
          Boolean(page && typeof page === "object" && "properties" in page)
      )
      .map((page: PageObjectResponse) => pageToArticle(page));
  } catch (error) {
    if (!hasLoggedNotionAccessWarning) {
      const err = error as { code?: string; message?: string };
      const details = err?.code ? `${err.code}: ${err.message || ""}` : "Unknown Notion error";
      console.warn(
        `[notion] Query failed, falling back to local content. Check NOTION_DATABASE_ID and ensure the database is shared with this integration. ${details}`
      );
      hasLoggedNotionAccessWarning = true;
    }
    return [];
  }
}

export async function getArticleById(id: string): Promise<NotionArticle | null> {
  if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) return null;

  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as PageObjectResponse;
    const blocks = await notion.blocks.children.list({ block_id: id });
    const body = extractBodyFromBlocks(blocks.results as BlockObjectResponse[]);

    return pageToArticle(page, body);
  } catch {
    return null;
  }
}

export async function getArticleBySlug(slug: string): Promise<NotionArticle | null> {
  if (!process.env.NOTION_API_KEY || !NOTION_DATABASE_ID) return null;

  const articles = await getArticles(100);
  return articles.find((article) => article.slug === slug) ?? null;
}
