import type { Metadata } from "next";
import { Shield, Lock, EyeOff } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Techrupt handles personal data and privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageShell
      eyebrow="Privacy Policy"
      title="Privacy by default."
      description="We collect the minimum required information to operate Techrupt, deliver newsletters, and improve the reader experience."
    >
      <div className="grid gap-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Lock, title: "Minimum collection", description: "We only collect the data needed to run the site and newsletter." },
            { icon: Shield, title: "No data sales", description: "We do not sell personal data to advertisers or brokers." },
            { icon: EyeOff, title: "Controlled usage", description: "Newsletter and analytics data are used for delivery and aggregate measurement." },
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
          <p>We do not sell personal data.</p>
          <p>If you subscribe to the newsletter, your email is processed only for delivery, analytics, and unsubscribe management.</p>
          <p>You can request access or deletion of your data by emailing privacy@techrupt.me.</p>
        </div>
      </div>
    </StaticPageShell>
  );
}
