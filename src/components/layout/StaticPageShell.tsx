import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StaticPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export default function StaticPageShell({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back to Home",
  children,
}: StaticPageShellProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-500 transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        {backLabel}
      </Link>

      <header className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse-brand" />
          <span className="text-brand-500 text-xs font-display font-semibold tracking-widest uppercase">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
          {title}
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">{description}</p>
      </header>

      {children}
    </section>
  );
}
