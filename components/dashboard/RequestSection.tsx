"use client";

import { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

const QUICK_ACTIONS = [
  "Update my hours",
  "Add a new menu item",
  "Change my phone number",
  "Post a promotion",
  "Fix something on my site",
];

export default function RequestSection() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    setSubmitted(text.trim());
    setValue("");
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-5"
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
        }}
      >
        <div className="flex items-start gap-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-light)" }}
          >
            <Sparkles size={15} style={{ color: "var(--accent)" }} />
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Got it! We&apos;re on it.
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              &ldquo;{submitted}&rdquo;
            </p>
            <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
              You&apos;ll get a notification once it&apos;s ready to review — usually within a few minutes.
            </p>
          </div>
        </div>
        <button
          onClick={() => setSubmitted(null)}
          className="mt-4 text-sm font-medium"
          style={{ color: "var(--accent)" }}
        >
          Make another request →
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={15} style={{ color: "var(--accent)" }} />
        <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
          Need something done?
        </h2>
      </div>

      {/* Input */}
      <div
        className="flex items-end gap-2 rounded-xl px-3 py-2"
        style={{
          background: "var(--background)",
          border: "1px solid var(--card-border)",
        }}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(value);
            }
          }}
          placeholder="Tell us what you need — we'll handle the rest…"
          rows={2}
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:opacity-50 leading-relaxed"
          style={{ color: "var(--foreground)" }}
        />
        <button
          onClick={() => handleSubmit(value)}
          disabled={!value.trim()}
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-30"
          style={{ background: "var(--accent)" }}
          aria-label="Send request"
        >
          <ArrowUp size={15} color="white" />
        </button>
      </div>

      {/* Quick action chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => handleSubmit(action)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors hover:opacity-80"
            style={{
              background: "var(--background)",
              border: "1px solid var(--card-border)",
              color: "var(--muted)",
            }}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
