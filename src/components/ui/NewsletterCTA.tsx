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
      // TODO: replace with your newsletter provider API call
      // e.g. await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) })
      await new Promise((res) => setTimeout(res, 800)); // simulate network
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-surface-200 border border-white/5 p-8 md:p-12">
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(0,255,136,0.3), transparent 50%), radial-gradient(circle at 20% 80%, rgba(51,102,255,0.2), transparent 50%)",
        }}
      />
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
          Stay ahead of the curve
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          Weekly briefing on AI breakthroughs, critical vulnerabilities, and tech
          trends. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <p className="text-brand-500 font-display font-medium">
            You&apos;re in! Check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-md mx-auto"
            noValidate
          >
            <div className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                aria-describedby={errorMessage ? "newsletter-error" : undefined}
                className="flex-1 px-4 py-2.5 rounded-full bg-surface-400 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-500 text-surface-0 font-display font-medium text-sm rounded-full hover:bg-brand-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            {errorMessage && (
              <p
                id="newsletter-error"
                role="alert"
                className="text-red-400 text-xs text-left px-2"
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
