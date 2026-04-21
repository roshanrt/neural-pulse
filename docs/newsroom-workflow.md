# TechRupt Newsroom Workflow (25 Minutes)

Use this workflow for fast, high-quality publishing while preserving editorial credibility.

## Step 1 (2 min): Source Discovery

- Start from RSS alerts, vendor advisories, CERT feeds, GitHub security advisories, and reputable outlets.
- Use `docs/source-registry.md` as your default intake list.
- Save the canonical source URL in your notes before drafting.
- Confirm source quality: primary source preferred over reposts.

## Step 2 (5 min): AI-Assisted First Draft

Paste source URL or source text into Claude with this prompt:

```text
Write a 500-word news article for TechRupt.me about [topic].
Include: what happened, who's affected, technical details, and
what readers should do. Tone: professional editorial, not hype.
```

Guidelines:
- Ask for clear sections and concise paragraphs.
- Avoid claims not present in the source.
- Keep security and operational impact concrete.

## Step 3 (10 min): Editorial Upgrade (Human Pass)

You must complete all checks:

- Add 2-3 sentences of your expert analysis.
- Verify all facts against original source(s).
- Remove AI filler phrasing.
  - Examples: "it's worth noting", "in today's landscape", "game changer"
- Add 2-3 internal links to related TechRupt articles.
- Ensure actionability: end with clear reader actions.

## Step 4 (5 min): Metadata and Packaging

Before publish, set:

- Title and excerpt
- Category and tags
- Cover image
- Author block and publication timestamp
- Featured flag (only if homepage-worthy)

Use the template in `content/articles/_article-template.mdx`.

## Step 5 (3 min): Publish and Distribution

- Publish article.
- Share to social channels with one-sentence hook.
- Log performance baseline: first-hour CTR and scroll depth.

## Editorial QA Checklist

- Facts verified from primary source(s)
- No hype framing
- Reader impact clearly explained
- Mitigation/next steps included
- Internal links added
- Frontmatter complete
- Spelling and grammar checked

## Suggested Internal Link Targets

- Related vulnerabilities in same ecosystem
- Previous coverage of same vendor/project
- Category hubs (`/category/cybersecurity`, `/category/ai`, etc.)

## Optional Enhancement: Two-Prompt Method

- Prompt A: Draft the article from source.
- Prompt B: "Find unsupported claims and weak transitions in this draft."
- Apply fixes manually after verification.

## API-Driven Editorial Desk (v2)

Use this flow when feeding external automation (Python/n8n) into Neural Pulse.

### 1) Ingest Stories

- Endpoint: `POST /api/articles/ingest`
- Purpose: Accept raw story items, normalize them, run verification scoring, and place them into the editor queue.

Request example:

```json
{
  "defaultCorroborationCount": 2,
  "items": [
    {
      "title": "CVE-2026-9999 actively exploited in the wild",
      "category": "cybersecurity",
      "source": "Vendor Advisory",
      "sourceUrl": "https://vendor.example/advisory",
      "rawText": "..."
    }
  ]
}
```

### 2) Review Queue

- UI: `/editor/queue`
- API: `GET /api/editor/queue` (optional `?status=verifying` etc.)
- Goal: Ensure high-impact stories have strong corroboration and acceptable confidence.

### 3) Publish Approved Stories

- Endpoint: `POST /api/articles/publish`
- Use either `storyIds` for explicit publishing or `publishApproved: true` to publish all approved items.

Request example:

```json
{
  "publishApproved": true
}
```

### 4) Verification Standard

- Require at least 2 corroborating sources for high/critical stories.
- Keep stories in `verifying` until confidence reaches your publish threshold.
- Always document verification notes for traceability and corrections.
