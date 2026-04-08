import type { Metadata } from "next";
import { Mail, PencilLine, ShieldAlert } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Techrupt editorial team.",
};

export default function ContactPage() {
  return (
    <StaticPageShell
      eyebrow="Contact"
      title="Get in touch with the editorial team."
      description="Tips, corrections, partnerships, and general feedback are welcome. We prioritize reporting accuracy and respond to meaningful inquiries."
    >
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Mail, title: "General", description: "hello@techrupt.me" },
            { icon: PencilLine, title: "Editorial tips", description: "tips@techrupt.me" },
            { icon: ShieldAlert, title: "Security disclosures", description: "security@techrupt.me" },
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

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-3">
          <h2 className="font-display font-bold text-xl text-white">What to include</h2>
          <p className="text-neutral-400 leading-relaxed">Share the relevant links, context, and deadlines so the editorial team can verify and act quickly.</p>
          <p className="text-sm text-neutral-500">For urgent security issues, include impact, affected versions, and a secure contact method.</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
