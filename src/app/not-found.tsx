import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
          <Radio className="h-8 w-8 text-brand-500" />
        </div>
        <h1 className="font-display font-black text-6xl text-white mb-2">404</h1>
        <h2 className="font-display font-bold text-xl text-white mb-3">
          Signal lost
        </h2>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Head back to the homepage to find the latest stories.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-surface-0 font-display font-medium text-sm rounded-full hover:bg-brand-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Neural Vibes
        </Link>
      </div>
    </div>
  );
}
