"use client";

import { Check, Link2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { SocialIcon } from "./SocialIcon";

/** Share via WhatsApp, X, or copy link. No third-party scripts are loaded. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const btn =
    "inline-flex items-center gap-2 rounded-full border border-rule bg-white px-3.5 py-1.5 text-sm font-semibold text-ink hover:border-ink";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-ink-soft">Share</span>
      <a
        className={btn}
        href={`https://wa.me/?text=${text}%20${link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="size-4" aria-hidden /> WhatsApp
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <a
        className={btn}
        href={`https://x.com/intent/post?text=${text}&url=${link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon platform="x" className="size-3.5" /> Post on X
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <button type="button" className={btn} onClick={copy}>
        {copied ? <Check className="size-4" aria-hidden /> : <Link2 className="size-4" aria-hidden />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
