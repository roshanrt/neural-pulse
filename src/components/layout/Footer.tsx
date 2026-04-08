import Link from "next/link";
import { Zap } from "lucide-react";
import { siteConfig, categories } from "@/data/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-brand-500" />
              <span className="font-display font-bold text-lg text-slate-900">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-display font-semibold text-sm text-slate-900 mb-4 uppercase tracking-widest">
              Topics
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-neutral-600 hover:text-brand-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-sm text-slate-900 mb-4 uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-2.5">
              {["About", "Newsletter", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-neutral-600 hover:text-brand-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-sm text-slate-900 mb-4 uppercase tracking-widest">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-neutral-600 hover:text-brand-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8" />

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(siteConfig.links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-brand-600 transition-colors capitalize font-display font-medium"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
