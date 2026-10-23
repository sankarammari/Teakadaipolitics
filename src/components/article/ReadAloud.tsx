"use client";

import { Pause, Play, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "playing" | "paused" | "unsupported";

/**
 * Reads the article aloud with the browser's own speech engine, preferring a
 * Tamil voice, and highlights the paragraph being read. Nothing is sent to a
 * server. Paragraph by paragraph, because some browsers cut off long text.
 */
export function ReadAloud({ targetSelector = "[data-reading] .prose-body" }: { targetSelector?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [noTamilVoice, setNoTamilVoice] = useState(false);
  const queue = useRef<HTMLElement[]>([]);
  const index = useRef(0);

  useEffect(() => {
    if (!("speechSynthesis" in window)) setStatus("unsupported");
    return () => {
      window.speechSynthesis?.cancel();
      document.querySelectorAll(".reading-now").forEach((el) => el.classList.remove("reading-now"));
    };
  }, []);

  const clearHighlight = () => document.querySelectorAll(".reading-now").forEach((el) => el.classList.remove("reading-now"));

  const speakNext = () => {
    clearHighlight();
    const el = queue.current[index.current];
    if (!el) {
      setStatus("idle");
      return;
    }
    el.classList.add("reading-now");
    el.scrollIntoView({ block: "center", behavior: "smooth" });

    const utterance = new SpeechSynthesisUtterance(el.innerText);
    const voices = window.speechSynthesis.getVoices();
    const tamil = voices.find((v) => v.lang.toLowerCase().startsWith("ta"));
    utterance.lang = "ta-IN";
    if (tamil) utterance.voice = tamil;
    utterance.rate = 0.95;
    utterance.onend = () => {
      index.current += 1;
      speakNext();
    };
    utterance.onerror = (e) => {
      if (e.error !== "interrupted" && e.error !== "canceled") setStatus("idle");
    };
    window.speechSynthesis.speak(utterance);
  };

  const start = () => {
    const root = document.querySelector(targetSelector);
    if (!root) return;
    const candidates = Array.from(root.querySelectorAll<HTMLElement>("p, li, h2, h3, blockquote, figcaption"));
    // Skip empty elements and ones nested inside another candidate, so nothing is read twice
    queue.current = candidates.filter(
      (el) => el.innerText.trim().length > 0 && !candidates.some((other) => other !== el && other.contains(el)),
    );
    index.current = 0;
    setNoTamilVoice(!window.speechSynthesis.getVoices().some((v) => v.lang.toLowerCase().startsWith("ta")));
    window.speechSynthesis.cancel();
    setStatus("playing");
    speakNext();
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setStatus("paused");
  };
  const resume = () => {
    window.speechSynthesis.resume();
    setStatus("playing");
  };
  const stop = () => {
    window.speechSynthesis.cancel();
    clearHighlight();
    setStatus("idle");
  };

  if (status === "unsupported") return null;

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-rule bg-card px-3.5 py-1.5 text-sm font-semibold text-ink hover:border-ink";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "idle" && (
        <button type="button" onClick={start} className={btn}>
          <Volume2 className="size-4" aria-hidden /> கேளுங்கள்
        </button>
      )}
      {status === "playing" && (
        <button type="button" onClick={pause} className={btn}>
          <Pause className="size-4" aria-hidden /> இடைநிறுத்து
        </button>
      )}
      {status === "paused" && (
        <button type="button" onClick={resume} className={btn}>
          <Play className="size-4" aria-hidden /> தொடர்க
        </button>
      )}
      {status !== "idle" && (
        <button type="button" onClick={stop} className={btn}>
          <Square className="size-3.5" aria-hidden /> நிறுத்து
        </button>
      )}
      {status !== "idle" && noTamilVoice && (
        <p className="w-full text-xs text-ink-soft">
          இந்தச் சாதனத்தில் தமிழ்க் குரல் நிறுவப்படவில்லை; உலாவியின் இயல்புக் குரலில் படிக்கப்படும்.
        </p>
      )}
    </div>
  );
}
