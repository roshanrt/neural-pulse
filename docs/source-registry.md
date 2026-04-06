# TechRupt Source Registry

Use this list for Step 1 source discovery. Prioritize primary sources, then reputable secondary analysis.

## Security Priority Sources

| Source | URL | Focus | Format |
|---|---|---|---|
| CISA Advisories | https://www.cisa.gov/cybersecurity-advisories/all.xml | Government alerts, active advisories | RSS/XML |
| NIST NVD | https://services.nvd.nist.gov/rest/json/cves/2.0 | CVE database and metadata | JSON API |
| BleepingComputer | https://www.bleepingcomputer.com/feed/ | Vulnerabilities, incidents, malware | RSS |
| The Hacker News | https://thehackernews.com/feeds/posts/default | Cyber news, threat activity | RSS |
| Krebs on Security | https://krebsonsecurity.com/feed/ | Breach analysis, investigations | RSS |
| Dark Reading | https://www.darkreading.com/rss.xml | Enterprise security, operations | RSS |
| SecurityWeek | https://securityweek.com/feed/ | Industry security news | RSS |
| CyberScoop | https://cyberscoop.com/feed/ | Policy and government cyber | RSS |
| Wired Security | https://www.wired.com/feed/category/security/latest/rss | Longform security coverage | RSS |
| Schneier on Security | https://www.schneier.com/feed/ | Policy, cryptography, risk | RSS |
| HackerOne Hacktivity | https://hackerone.com/hacktivity.json | Bug bounty disclosures | JSON |

## AI and Tech Priority Sources

| Source | URL | Focus | Format |
|---|---|---|---|
| OpenAI Blog | https://openai.com/blog/rss.xml | Model and platform updates | RSS |
| Anthropic Research | https://www.anthropic.com/research/rss.xml | AI research and safety | RSS |
| Google AI Blog | https://blog.google/technology/ai/rss | Product launches and AI updates | RSS |
| TechCrunch | https://techcrunch.com/feed/ | Startups, funding, AI business | RSS |
| Ars Technica | https://feeds.arstechnica.com/arstechnica/index | Technical deep dives | RSS |
| The Verge | https://www.theverge.com/rss/index.xml | Mainstream tech news | RSS |
| MIT Technology Review | https://www.technologyreview.com/feed | AI and emerging technology | RSS |
| 9to5Google | https://9to5google.com/feed/ | Google and Android ecosystem | RSS |
| Risky Business | https://risky.biz/feeds/risky-business | Security podcast summaries | RSS |

## Triage Order (Use in Step 1)

1. Confirm if a primary source exists (vendor advisory, CISA, NVD, official blog).
2. Cross-check at least one secondary source for context.
3. Reject stories with no canonical source or weak attribution.
4. Save the canonical URL in your article notes before drafting.

## Quick Intake Rules

- Prefer original disclosures over reposts.
- For vulnerabilities: include CVE ID and affected versions when available.
- For AI announcements: include model/version name and benchmark limitations.
- For breach stories: separate confirmed facts from speculative impact.
