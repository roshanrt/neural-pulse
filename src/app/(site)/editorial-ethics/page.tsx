import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Ethics",
  description: "Editorial standards and ethics at Techrupt.",
};

export default function EditorialEthicsPage() {
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
          <FileCheck className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Editorial Ethics
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Accuracy, transparency, accountability.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Our editorial process prioritizes factual reporting, clear sourcing,
          and corrections when mistakes happen.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4 text-neutral-400 leading-relaxed">
        <p>We separate reporting from sponsorship and paid placements.</p>
        <p>
          Potential conflicts of interest are disclosed when relevant to an
          article or analysis.
        </p>
        <p>
          Corrections are published promptly and noted transparently in updated
          stories.
        </p>
      </div>
    </section>
  );
}
