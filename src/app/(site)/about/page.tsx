import type { Metadata } from "next";
import { Shield, Zap, Eye, Users, Target, Sparkles } from "lucide-react";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import { siteConfig } from "@/data/config";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Techrupt covers AI, cybersecurity, and tech news with a focus on depth, accuracy, and signal over noise.",
};

const values = [
  {
    icon: Zap,
    title: "Signal over noise",
    description:
      "We cover what matters. Every story goes through a relevance filter — if it doesn't affect how you work, build, or stay secure, we skip it.",
  },
  {
    icon: Shield,
    title: "Security-first perspective",
    description:
      "Cybersecurity isn't a beat — it's a lens. We apply it to every story: AI model risks, data practices, supply chain integrity, and privacy implications.",
  },
  {
    icon: Eye,
    title: "Independent & transparent",
    description:
      "No sponsored content disguised as editorial. Affiliate links are clearly disclosed. Our opinions are our own.",
  },
];

export default function AboutPage() {
  return (
    <StaticPageShell
      eyebrow="About"
      title="Tech coverage for builders, operators, and security teams."
      description="Techrupt is an independent publication covering AI, cybersecurity, and the infrastructure decisions shaping modern products. We write for people who need context, consequences, and practical takeaways."
    >
      <div className="grid gap-10">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Users, title: "Built for practitioners", description: "Engineers, founders, security teams, and operators use Techrupt to separate signal from noise." },
            { icon: Target, title: "Editorial precision", description: "We favor specific, source-backed coverage over trend-chasing or generic summaries." },
            { icon: Sparkles, title: "Independent by design", description: "Editorial judgment stays separate from sponsorship, affiliate placements, and vendor pressure." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl bg-surface-200 border border-white/5 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display font-semibold text-white mb-2">{item.title}</h2>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white mb-6">Our editorial rules</h2>
          <div className="grid gap-4">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 rounded-xl bg-surface-300/50 p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-white mb-4">About the editor</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Roshan writes on the intersection of AI capabilities and security implications, with hands-on offensive and defensive security experience.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href={siteConfig.links.twitter} className="px-4 py-2 rounded-full bg-white/5 text-sm text-neutral-300 hover:text-brand-500 transition-colors" target="_blank" rel="noopener noreferrer">
              Twitter / X
            </a>
            <a href={siteConfig.links.github} className="px-4 py-2 rounded-full bg-white/5 text-sm text-neutral-300 hover:text-brand-500 transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <NewsletterCTA />
      </div>
    </StaticPageShell>
  );
}
