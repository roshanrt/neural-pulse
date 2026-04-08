import type { Metadata } from "next";
import { Cookie, Fingerprint, Settings2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Techrupt uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <StaticPageShell
      eyebrow="Cookie Policy"
      title="Cookie usage explained."
      description="We use essential cookies and privacy-first analytics to keep the website functional and measure performance."
    >
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Cookie, title: "Essential only", description: "Required for core site behavior and basic functionality." },
            { icon: Fingerprint, title: "Privacy-first analytics", description: "Aggregate usage measurement with minimal tracking identifiers." },
            { icon: Settings2, title: "Browser controls", description: "You can manage or clear cookies in your browser settings at any time." },
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
          <p>Essential cookies are required for core site behavior.</p>
          <p>Analytics tools may set limited tracking identifiers to help us understand aggregate traffic patterns.</p>
          <p>You can manage or clear cookies from your browser settings at any time.</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
