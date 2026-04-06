import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Zap, Eye } from "lucide-react";
import NewsletterCTA from "@/components/ui/NewsletterCTA";
import { siteConfig } from "@/data/config";

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
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Hero */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            About
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Tech coverage built for people who actually build things.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Techrupt is an independent publication covering AI, cybersecurity,
          and the technology decisions that shape how we work and live. We write
          for engineers, founders, and security professionals who need depth, not
          just headlines.
        </p>
      </div>

      {/* Values */}
      <div className="mb-14">
        <h2 className="font-display font-bold text-xl text-white mb-6">
          What we stand for
        </h2>
        <div className="grid gap-4">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl bg-surface-200 border border-white/5 p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">
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

      {/* Author */}
      <div className="mb-14 rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8">
        <h2 className="font-display font-bold text-xl text-white mb-6">
          The author
        </h2>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-surface-300 flex-shrink-0" />
          <div>
            <p className="font-display font-semibold text-white">Roshan</p>
            <p className="text-xs text-brand-500 mb-3">
              Cybersecurity professional &amp; AI enthusiast
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Roshan writes about the intersection of AI capabilities and
              security implications, with hands-on experience in offensive and
              defensive security. Techrupt is built to fill the gap between
              shallow tech news and overly academic research.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={siteConfig.links.twitter}
                className="text-xs text-neutral-500 hover:text-brand-500 transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                Twitter / X
              </a>
              <a
                href={siteConfig.links.github}
                className="text-xs text-neutral-500 hover:text-brand-500 transition-colors"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterCTA />
    </section>
  );
}
