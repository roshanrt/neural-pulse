import { ArticleJsonOutput, ArticleSections } from "@/types";

function toShortParagraphs(text: string): string {
  const compact = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!compact) {
    return "No verified details available yet.";
  }

  const blocks = compact
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const limited = blocks.flatMap((block) => {
    if (block.length <= 420) {
      return [block];
    }

    const sentences = block.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [block];
    const out: string[] = [];
    let current = "";

    for (const sentence of sentences) {
      const candidate = `${current} ${sentence}`.trim();
      if (candidate.length > 360 && current) {
        out.push(current);
        current = sentence.trim();
      } else {
        current = candidate;
      }
    }

    if (current) {
      out.push(current);
    }

    return out;
  });

  return limited.join("\n\n");
}

function sectionMarkdown(title: string, value: string): string {
  return `## ${title}\n\n${toShortParagraphs(value)}`;
}

export function formatSections(sections: ArticleSections): ArticleSections {
  return {
    summary: toShortParagraphs(sections.summary),
    technicalDetails: toShortParagraphs(sections.technicalDetails),
    impact: toShortParagraphs(sections.impact),
    exploitation: toShortParagraphs(sections.exploitation),
    detection: toShortParagraphs(sections.detection),
    mitigation: toShortParagraphs(sections.mitigation),
    whyItMatters: toShortParagraphs(sections.whyItMatters),
  };
}

export function toArticleMarkdown(article: ArticleJsonOutput): string {
  const sections = formatSections(article.sections);

  return [
    `---`,
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `excerpt: "${article.excerpt.replace(/"/g, '\\"')}"`,
    `category: ${article.category}`,
    `tags: [${article.tags.join(", ")}]`,
    `publishedAt: "${article.publishedAt}"`,
    `featured: ${article.featured}`,
    `source: "${article.source.replace(/"/g, '\\"')}"`,
    `sourceUrl: "${article.sourceUrl.replace(/"/g, '\\"')}"`,
    `hash: "${article.hash}"`,
    `priorityScore: ${article.priorityScore}`,
    `---`,
    "",
    sectionMarkdown("Summary", sections.summary),
    "",
    sectionMarkdown("Technical Details", sections.technicalDetails),
    "",
    sectionMarkdown("Impact", sections.impact),
    "",
    sectionMarkdown("Exploitation", sections.exploitation),
    "",
    sectionMarkdown("Detection", sections.detection),
    "",
    sectionMarkdown("Mitigation", sections.mitigation),
    "",
    sectionMarkdown("Why It Matters", sections.whyItMatters),
  ].join("\n");
}

export function toSafeJsonValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\"/g, '\\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
}
