import { randomUUID } from "crypto";
import {
  ArticleJsonOutput,
  StoryEvidence,
  StoryRecord,
  StorySeverity,
  StoryStatus,
} from "@/types";

type NewStoryInput = {
  article: ArticleJsonOutput;
  status?: StoryStatus;
  confidenceScore?: number;
  confidenceLabel?: "low" | "medium" | "high";
  verificationNotes?: string[];
  corroborationCount?: number;
  severity?: StorySeverity;
  patchStatus?: string;
  exploitStatus?: string;
  affectedProducts?: string[];
  iocs?: string[];
  evidence?: StoryEvidence[];
};

const storyStore = new Map<string, StoryRecord>();

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeTextList(items: string[] = []): string[] {
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 50);
}

function normalizeEvidence(evidence: StoryEvidence[] = []): StoryEvidence[] {
  return evidence
    .map((item) => ({
      url: String(item.url || "").trim(),
      source: String(item.source || "").trim() || "Unknown source",
      label: item.label ? String(item.label).trim() : undefined,
    }))
    .filter((item) => item.url.length > 0)
    .slice(0, 20);
}

export function createStoryRecord(input: NewStoryInput): StoryRecord {
  const timestamp = nowIso();
  const story: StoryRecord = {
    id: randomUUID(),
    status: input.status ?? "queued",
    confidenceScore: Number(input.confidenceScore ?? 0),
    confidenceLabel: input.confidenceLabel ?? "low",
    verificationNotes: normalizeTextList(input.verificationNotes),
    corroborationCount: Number(input.corroborationCount ?? 0),
    severity: input.severity ?? "low",
    patchStatus: String(input.patchStatus ?? "unknown"),
    exploitStatus: String(input.exploitStatus ?? "unknown"),
    affectedProducts: normalizeTextList(input.affectedProducts),
    iocs: normalizeTextList(input.iocs),
    evidence: normalizeEvidence(input.evidence),
    createdAt: timestamp,
    updatedAt: timestamp,
    article: input.article,
  };

  storyStore.set(story.id, story);
  return story;
}

export function listStories(status?: StoryStatus): StoryRecord[] {
  const stories = Array.from(storyStore.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  if (!status) {
    return stories;
  }
  return stories.filter((story) => story.status === status);
}

export function getStoryById(id: string): StoryRecord | null {
  return storyStore.get(id) ?? null;
}

export function getStoryBySlug(slug: string): StoryRecord | null {
  const safeSlug = slug.trim().toLowerCase();
  for (const story of storyStore.values()) {
    if (story.article.slug.toLowerCase() === safeSlug) {
      return story;
    }
  }
  return null;
}

export function updateStoryStatus(id: string, status: StoryStatus): StoryRecord | null {
  const existing = storyStore.get(id);
  if (!existing) {
    return null;
  }
  const updated: StoryRecord = {
    ...existing,
    status,
    updatedAt: nowIso(),
    publishedAt: status === "published" ? nowIso() : existing.publishedAt,
  };
  storyStore.set(id, updated);
  return updated;
}
