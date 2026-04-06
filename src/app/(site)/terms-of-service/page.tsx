import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of Techrupt content and services.",
};

export default function TermsOfServicePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 md:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <Scale className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Terms of Service
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Fair use, clear terms.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          By using Techrupt, you agree to follow these terms while accessing
          site content, newsletters, and any related services.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4 text-neutral-400 leading-relaxed">
        <p>Content is provided for informational purposes only.</p>
        <p>
          Reproduction or redistribution of substantial content requires prior
          permission from the editorial team.
        </p>
        <p>
          We may update these terms over time and will reflect material changes
          on this page.
        </p>
      </div>
    </section>
  );
}
