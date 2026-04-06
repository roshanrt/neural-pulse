import { SiteConfig, Category } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Techrupt",
  description: "Breaking news and deep analysis on Tech, AI & Cybersecurity",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-default.png",
  links: {
    twitter: "https://twitter.com/techrupt",
    github: "https://github.com/techrupt",
    youtube: "https://youtube.com/@techrupt",
  },
};

export const categories: Category[] = [
  {
    name: "AI & ML",
    slug: "ai",
    description: "Artificial intelligence, LLMs, generative AI, and robotics",
    color: "#00ff88",
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Threats, vulnerabilities, breaches, and defense strategies",
    color: "#ff3366",
  },
  {
    name: "Tech News",
    slug: "tech-news",
    description: "Industry news, product launches, and startup coverage",
    color: "#3366ff",
  },
  {
    name: "Reviews & Guides",
    slug: "reviews",
    description: "Product reviews, buying guides, and tutorials",
    color: "#ff9900",
  },
  {
    name: "Analysis",
    slug: "analysis",
    description: "Deep dives, editorials, and trend analysis",
    color: "#cc66ff",
  },
  {
    name: "Privacy & Policy",
    slug: "privacy",
    description: "Data privacy, regulation, and digital rights",
    color: "#00cccc",
  },
];

export const navItems = [
  { label: "AI & ML", href: "/category/ai" },
  { label: "Cybersecurity", href: "/category/cybersecurity" },
  { label: "Tech News", href: "/category/tech-news" },
  { label: "Reviews", href: "/category/reviews" },
  { label: "Analysis", href: "/category/analysis" },
];
