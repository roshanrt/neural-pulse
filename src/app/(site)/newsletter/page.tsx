import type { Metadata } from "next";
import { BellRing, ShieldCheck, Zap } from "lucide-react";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to Techrupt for weekly AI, cybersecurity, and tech briefings.",
};

const highlights = [
  {
    icon: Zap,
    title: "Fast signal, no noise",
    description: "A short weekly briefing with only the stories that matter.",
  },
  {
    icon: ShieldCheck,
    title: "Security-first coverage",
    description: "Critical vulnerabilities, breach analysis, and defensive takeaways.",
  },
  {
    icon: BellRing,
    title: "Product and AI updates",
    description: "Important launches, model releases, and workflow shifts worth tracking.",
  },
];

export default function NewsletterPage() {
  return (
    <StaticPageShell
      eyebrow="Weekly Briefing"
      title="Get the essential tech signal, once a week."
      description="Subscribe for concise analysis on AI, cybersecurity, and policy. The newsletter is built for founders, engineers, and security teams who want the takeaway, not the feed."
    >
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        <div className="space-y-4 rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white">What you’ll get</h2>
          <div className="space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-xl bg-surface-300/60 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white mb-3">Subscribe now</h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            This page is wired to the local newsletter component. Connect your mailing provider when you are ready to send real campaigns.
          </p>
          <NewsletterCTA />
        </div>
      </div>
    </StaticPageShell>
  );
}