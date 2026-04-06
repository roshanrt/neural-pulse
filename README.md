# Neural Vibes

**Tech, AI & Cybersecurity News** — A Mashable-style media site built with Next.js 14, Three.js, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSR/SSG) |
| UI | Tailwind CSS, Framer Motion |
| 3D Effects | Three.js via @react-three/fiber |
| Content | Local MDX → future headless CMS |
| Search | Fuse.js (client-side fuzzy search) |
| Newsletter | beehiiv API (planned) |
| Deployment | Hostinger (production) |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start dev server
npm run dev

# Opens at http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── (site)/              # Public-facing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── article/[slug]/   # Article detail
│   │   ├── category/[slug]/  # Category listing
│   │   ├── search/           # Search page
│   │   ├── about/            # About page
│   │   └── newsletter/       # Newsletter signup
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout
├── components/
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Reusable UI (NewsletterCTA, etc.)
│   ├── three/                # Three.js scenes
│   ├── articles/             # Article cards, lists
│   └── home/                 # Homepage sections
├── data/                     # Config, sample articles
├── lib/                      # Utilities
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript types
└── content/                  # MDX articles (future)
```

## Roadmap

- [x] Project scaffold with Next.js 14 + TypeScript
- [x] Three.js particle hero scene
- [x] Article cards (featured, default, compact)
- [x] Category pages with dynamic routing
- [x] Newsletter signup component
- [x] SEO metadata (OpenGraph, Twitter Cards)
- [ ] MDX article pipeline with gray-matter
- [ ] RSS feed generation (/api/rss)
- [ ] Search page with Fuse.js
- [ ] Google AdSense integration
- [ ] NewsArticle JSON-LD schema
- [ ] Google News sitemap
- [ ] Dark/light theme toggle
- [ ] Comment system (Disqus or Hyvor Talk)
- [ ] n8n AI content pipeline
- [ ] beehiiv newsletter API integration
- [ ] Deploy to Hostinger

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint
npm run type-check # TypeScript check
```

## Newsroom Workflow

- Editorial SOP: `docs/newsroom-workflow.md`
- Source registry: `docs/source-registry.md`
- AI prompt template: `docs/claude-news-prompt.txt`
- Article scaffold: `content/articles/_article-template.mdx`

## License

Private — All rights reserved.
