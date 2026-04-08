import type { Metadata } from "next";
import { Scale, FileText, Gavel } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of Techrupt content and services.",
};

export default function TermsOfServicePage() {
  return (
    <StaticPageShell
      eyebrow="Terms of Service"
      title="Fair use, clear terms."
      description="By using Techrupt, you agree to follow these terms while accessing site content, newsletters, and any related services."
    >
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: FileText, title: "Informational use", description: "Content is provided for informational purposes only." },
            { icon: Scale, title: "Respect the work", description: "Reproduction or redistribution of substantial content requires prior permission." },
            { icon: Gavel, title: "Updates may change", description: "We may update these terms over time and will reflect material changes here." },
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
          <p>Content is provided for informational purposes only.</p>
          <p>Reproduction or redistribution of substantial content requires prior permission from the editorial team.</p>
          <p>We may update these terms over time and will reflect material changes on this page.</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
