"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic email format check beyond HTML5 required
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-200 to-surface-300 border border-slate-200 p-8 md:p-12">
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(0,255,136,0.3), transparent 50%), radial-gradient(circle at 20% 80%, rgba(51,102,255,0.2), transparent 50%)",
        }}
      />
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">
            Stay ahead of the curve
          </h2>
          <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
            Weekly briefing on AI breakthroughs, critical vulnerabilities, and tech
            trends. No spam, unsubscribe anytime.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-lg bg-brand-500/10 border border-brand-500/30 p-4 text-center">
            <p className="text-brand-400 font-display font-medium text-sm">
              ✓ You&apos;re in! Check your inbox to confirm.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                aria-describedby={errorMessage ? "newsletter-error" : undefined}
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary !px-6"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Subscribing…</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
            {errorMessage && (
              <p
                id="newsletter-error"
                role="alert"
                className="text-red-400 text-xs text-center px-2"
              >
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
