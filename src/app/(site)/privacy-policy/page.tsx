import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Techrupt handles personal data and privacy.",
};

export default function PrivacyPolicyPage() {
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
          <Shield className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Privacy Policy
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Privacy by default.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          We collect the minimum required information to operate Techrupt,
          deliver newsletters, and improve the reader experience.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4 text-neutral-400 leading-relaxed">
        <p>We do not sell personal data.</p>
        <p>
          If you subscribe to the newsletter, your email is processed only for
          delivery, analytics, and unsubscribe management.
        </p>
        <p>
          You can request access or deletion of your data by emailing
          privacy@techrupt.me.
        </p>
      </div>
    </section>
  );
}
