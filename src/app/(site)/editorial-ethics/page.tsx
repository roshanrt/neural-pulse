import type { Metadata } from "next";
import { FileCheck, BadgeCheck, TriangleAlert } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Editorial Ethics",
  description: "Editorial standards and ethics at Techrupt.",
};

export default function EditorialEthicsPage() {
  return (
    <StaticPageShell
      eyebrow="Editorial Ethics"
      title="Accuracy, transparency, accountability."
      description="Our editorial process prioritizes factual reporting, clear sourcing, and corrections when mistakes happen."
    >
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: BadgeCheck, title: "Independent reporting", description: "We separate editorial judgment from sponsorship and paid placements." },
            { icon: TriangleAlert, title: "Disclosure first", description: "Potential conflicts of interest are disclosed when relevant to a story." },
            { icon: FileCheck, title: "Corrections matter", description: "Corrections are published promptly and noted transparently in updated stories." },
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

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4 text-neutral-400 leading-relaxed">
          <p>We separate reporting from sponsorship and paid placements.</p>
          <p>Potential conflicts of interest are disclosed when relevant to an article or analysis.</p>
          <p>Corrections are published promptly and noted transparently in updated stories.</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
