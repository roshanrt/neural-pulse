import { ArticleJsonOutput, StoryEvidence, StorySeverity } from "@/types";

export type VerificationResult = {
  confidenceScore: number;
  confidenceLabel: "low" | "medium" | "high";
  confidenceText: string;
  severity: StorySeverity;
  status: "queued" | "verifying" | "approved";
  corroborationCount: number;
  verificationNotes: string[];
  patchStatus: string;
  exploitStatus: string;
  affectedProducts: string[];
  iocs: string[];
  evidence: StoryEvidence[];
};

const IOC_REGEX =
  /\b(?:\d{1,3}\.){3}\d{1,3}\b|\b[a-f0-9]{32,64}\b|\b[a-z0-9.-]+\.(?:ru|cn|su|top|xyz)\b/gi;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function inferSeverity(article: ArticleJsonOutput): StorySeverity {
  const text = `${article.title} ${article.excerpt} ${article.sections.technicalDetails}`.toLowerCase();
  if (/critical|actively exploited|rce|zero-day|wormable/.test(text)) return "critical";
  if (/high|cve-|ransomware|breach|privilege escalation/.test(text)) return "high";
  if (/medium|phishing|misconfiguration|exposure/.test(text)) return "medium";
  return "low";
}

function inferPatchStatus(text: string): string {
  if (/patched|fix released|security update available/.test(text)) return "patched";
  if (/mitigation|workaround/.test(text)) return "mitigation-available";
  if (/no patch|unpatched/.test(text)) return "unpatched";
  return "unknown";
}

function inferExploitStatus(text: string): string {
  if (/actively exploited|in the wild|weaponized/.test(text)) return "active";
  if (/proof of concept|poc available|exploit published/.test(text)) return "public-poc";
  return "no-public-exploit";
}

function inferAffectedProducts(text: string): string[] {
  const patterns = [
    /microsoft\s+[a-z0-9 .-]+/gi,
    /cisco\s+[a-z0-9 .-]+/gi,
    /apache\s+[a-z0-9 .-]+/gi,
    /linux kernel/gi,
    /windows\s+(?:10|11|server\s*\d*)/gi,
  ];
  const matches = new Set<string>();
  for (const pattern of patterns) {
    const result = text.match(pattern) || [];
    result.forEach((item) => matches.add(item.trim()));
  }
  return Array.from(matches).slice(0, 10);
}

function extractIocs(text: string): string[] {
  return Array.from(new Set(text.match(IOC_REGEX) ?? [])).slice(0, 20);
}

function buildNotes(params: {
  corroborationCount: number;
  confidenceScore: number;
  sourceUrl: string;
  severity: StorySeverity;
}): string[] {
  const notes: string[] = [];
  if (!params.sourceUrl || params.sourceUrl.includes("source-unavailable")) {
    notes.push("Primary source URL missing or placeholder.");
  }
  if (params.corroborationCount < 2) {
    notes.push("Fewer than two corroborating sources; send to analyst review.");
  } else {
    notes.push("At least two corroborating sources available.");
  }
  if (params.severity === "high" || params.severity === "critical") {
    notes.push("High-impact story; enforce strict fact-check before publish.");
  }
  if (params.confidenceScore < 70) {
    notes.push("Confidence below publish threshold; keep in verifying queue.");
  }
  return notes;
}

export function verifyStory(input: {
  article: ArticleJsonOutput;
  evidence?: StoryEvidence[];
  corroborationCount?: number;
}): VerificationResult {
  const article = input.article;
  const text = [
    article.title,
    article.excerpt,
    article.sections.technicalDetails,
    article.sections.impact,
    article.sections.exploitation,
    article.sections.detection,
    article.sections.mitigation,
  ]
    .join("\n")
    .toLowerCase();

  const severity = inferSeverity(article);
  const corroborationCount = Number(input.corroborationCount ?? 1);
  const patchStatus = inferPatchStatus(text);
  const exploitStatus = inferExploitStatus(text);
  const affectedProducts = inferAffectedProducts(text);
  const iocs = extractIocs(text);
  const hasCve = /cve-\d{4}-\d+/i.test(text);
  const scoreBase = severity === "critical" ? 70 : severity === "high" ? 60 : severity === "medium" ? 45 : 30;
  const confidenceScore = clamp(
    scoreBase + (hasCve ? 10 : 0) + corroborationCount * 8 + (patchStatus === "unknown" ? -8 : 5),
    0,
    100
  );
  const confidenceLabel = confidenceScore >= 80 ? "high" : confidenceScore >= 55 ? "medium" : "low";
  const status = confidenceScore >= 70 && corroborationCount >= 2 ? "approved" : "verifying";
  const verificationNotes = buildNotes({
    corroborationCount,
    confidenceScore,
    sourceUrl: article.sourceUrl,
    severity,
  });

  const confidenceText =
    confidenceLabel === "high"
      ? "Confirmed signal with strong supporting evidence."
      : confidenceLabel === "medium"
        ? "Likely accurate but needs editor confirmation."
        : "Emerging signal; additional verification required.";

  return {
    confidenceScore,
    confidenceLabel,
    confidenceText,
    severity,
    status,
    corroborationCount,
    verificationNotes,
    patchStatus,
    exploitStatus,
    affectedProducts,
    iocs,
    evidence: input.evidence ?? [],
  };
}
