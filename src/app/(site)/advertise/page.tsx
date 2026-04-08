import type { Metadata } from "next";
import { Target, ShieldCheck, BarChart3 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Advertise",
  description: "Advertising and sponsorship opportunities with Techrupt.",
};

export default function AdvertisePage() {
  return (
    <StaticPageShell
      eyebrow="Advertise"
      title="Reach builders, operators, and security teams."
      description="Techrupt partners with brands that offer real value to technical audiences. We support newsletter sponsorships, native placements, and campaign bundles."
    >
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Target, title: "Targeted reach", description: "Audience that cares about AI, security, privacy, and product decisions." },
            { icon: ShieldCheck, title: "Brand-safe placements", description: "Manual review keeps sponsorships aligned with editorial quality and trust." },
            { icon: BarChart3, title: "Flexible campaigns", description: "Newsletter, native article, and bundled placements for launch or awareness goals." },
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

        <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4">
          <h2 className="font-display font-bold text-xl text-white">Media inquiries</h2>
          <p className="text-neutral-400 leading-relaxed">
            For pricing, audience details, and campaign planning, email advertising@techrupt.me.
          </p>
          <p className="text-sm text-neutral-500">
            We review all requests manually and only accept partnerships that fit the publication.
          </p>
        </div>
      </div>
    </StaticPageShell>
  );
}
