"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Zap } from "lucide-react";
import { navItems, siteConfig } from "@/data/config";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface-50/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-brand-500 group-hover:rotate-12 transition-transform" />
            <span className="font-display font-bold text-xl text-white tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/newsletter"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-500 text-surface-0 font-display font-medium text-sm rounded-full hover:bg-brand-400 transition-colors"
            >
              Subscribe
            </Link>
            <button
              className="md:hidden p-2 text-neutral-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-white/5 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg font-display text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="block px-3 py-2 text-brand-500 font-display text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Subscribe to Newsletter
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
