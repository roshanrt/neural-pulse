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
