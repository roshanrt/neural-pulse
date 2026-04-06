import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BellRing, ShieldCheck, Zap } from "lucide-react";
import NewsletterCTA from "@/components/ui/NewsletterCTA";

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
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Weekly Briefing
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Get the essential tech signal, once a week.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Subscribe for concise analysis on AI, cybersecurity, and policy. The
          newsletter is built for founders, engineers, and security teams who
          want the takeaway, not the feed.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-12">
        <div className="space-y-4 rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white">
            What you’ll get
          </h2>
          <div className="space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4 rounded-xl bg-surface-300/60 p-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white mb-3">
            Subscribe now
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed mb-6">
            This demo page uses the local newsletter form component. Connect it
            to your mailing provider when you are ready to send real campaigns.
          </p>
          <NewsletterCTA />
        </div>
      </div>
    </section>
  );
}