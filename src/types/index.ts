export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  source?: string;
  sourceUrl?: string;
  hash?: string;
  priorityScore?: number;
  sections?: ArticleSections;
}

export interface ArticleSections {
  summary: string;
  technicalDetails: string;
  impact: string;
  exploitation: string;
  detection: string;
  mitigation: string;
  whyItMatters: string;
}

export interface ArticleJsonOutput {
  slug: string;
  title: string;
  category: CategorySlug;
  source: string;
  sourceUrl: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  hash: string;
  featured: boolean;
  priorityScore: number;
  sections: ArticleSections;
}

export interface ArticleBundleOutput {
  markdown: string;
  json: ArticleJsonOutput;
}

export type StoryStatus =
  | "queued"
  | "verifying"
  | "approved"
  | "published"
  | "corrected";

export type StorySeverity = "low" | "medium" | "high" | "critical";

export interface StoryEvidence {
  url: string;
  source: string;
  label?: string;
}

export interface StoryRecord {
  id: string;
  status: StoryStatus;
  confidenceScore: number;
  confidenceLabel: "low" | "medium" | "high";
  verificationNotes: string[];
  corroborationCount: number;
  severity: StorySeverity;
  patchStatus: string;
  exploitStatus: string;
  affectedProducts: string[];
  iocs: string[];
  evidence: StoryEvidence[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  article: ArticleJsonOutput;
}

export interface Author {
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
}

export type CategorySlug =
  | "ai"
  | "cybersecurity"
  | "tech-news"
  | "reviews"
  | "analysis"
  | "privacy";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    youtube: string;
  };
}
