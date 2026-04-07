import { ArticleSections } from "@/types";

const EMPTY_SECTION = "No verified details available yet.";

const headingAliases: Record<keyof ArticleSections, string[]> = {
  summary: ["summary", "overview", "lead", "brief"],
  technicalDetails: ["technical details", "technical", "details", "how it works"],
  impact: ["impact", "affected", "who is affected", "blast radius"],
  exploitation: ["exploitation", "exploit", "attack", "active exploitation"],
  detection: ["detection", "detection guidance", "how to detect", "ioc"],
  mitigation: ["mitigation", "what to do", "remediation", "response"],
  whyItMatters: ["why it matters", "context", "takeaway", "so what"],
};

function normalizeSectionValue(value: string): string {
  const clean = value
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ ]{2,}/g, " ")
    .trim();

  return clean || EMPTY_SECTION;
}

function getKeyFromHeading(heading: string): keyof ArticleSections | null {
  const normalizedHeading = heading
    .toLowerCase()
    .replace(/^#+\s*/, "")
    .replace(/[:*]/g, "")
    .trim();

  const entry = Object.entries(headingAliases).find(([, aliases]) =>
    aliases.some((alias) => normalizedHeading.includes(alias))
  );

  return (entry?.[0] as keyof ArticleSections | undefined) ?? null;
}

export function parseAiContentToSections(input: string): ArticleSections {
  const base: ArticleSections = {
    summary: EMPTY_SECTION,
    technicalDetails: EMPTY_SECTION,
    impact: EMPTY_SECTION,
    exploitation: EMPTY_SECTION,
    detection: EMPTY_SECTION,
    mitigation: EMPTY_SECTION,
    whyItMatters: EMPTY_SECTION,
  };

  const lines = input.replace(/\r/g, "").split("\n");
  let current: keyof ArticleSections = "summary";

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      if (base[current] !== EMPTY_SECTION) {
        base[current] += "\n";
      }
      continue;
    }

    const sectionFromHeading = getKeyFromHeading(line);
    if (sectionFromHeading) {
      current = sectionFromHeading;
      if (base[current] === EMPTY_SECTION) {
        base[current] = "";
      }
      continue;
    }

    if (base[current] === EMPTY_SECTION) {
      base[current] = line.trim();
    } else {
      base[current] += `${base[current].endsWith("\n") ? "" : "\n"}${line.trim()}`;
    }
  }

  return {
    summary: normalizeSectionValue(base.summary),
    technicalDetails: normalizeSectionValue(base.technicalDetails),
    impact: normalizeSectionValue(base.impact),
    exploitation: normalizeSectionValue(base.exploitation),
    detection: normalizeSectionValue(base.detection),
    mitigation: normalizeSectionValue(base.mitigation),
    whyItMatters: normalizeSectionValue(base.whyItMatters),
  };
}

export function buildArticleSections(markdown: string): ArticleSections {
  return parseAiContentToSections(markdown);
}
