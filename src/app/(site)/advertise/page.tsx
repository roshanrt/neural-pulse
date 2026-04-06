import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise",
  description: "Advertising and sponsorship opportunities with Techrupt.",
};

export default function AdvertisePage() {
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
          <Megaphone className="h-4 w-4 text-brand-500" />
          <span className="text-brand-500 text-xs font-display font-medium tracking-wide uppercase">
            Advertise
          </span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight mb-4">
          Reach builders, operators, and security teams.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Techrupt partners with brands that offer real value to technical
          audiences. We support newsletter sponsorships, native placements, and
          campaign bundles.
        </p>
      </div>

      <div className="rounded-2xl bg-surface-200 border border-white/5 p-6 md:p-8 space-y-4">
        <h2 className="font-display font-bold text-xl text-white">
          Media inquiries
        </h2>
        <p className="text-neutral-400 leading-relaxed">
          For pricing, audience details, and campaign planning, email us at
          advertising@techrupt.me.
        </p>
        <p className="text-sm text-neutral-500">
          We review all requests manually to keep sponsorship quality high.
        </p>
      </div>
    </section>
  );
}
