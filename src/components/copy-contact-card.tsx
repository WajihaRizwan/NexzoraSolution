"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "error";

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard fallback failed.");
}

export function CopyContactCard({
  label,
  value,
  kind,
}: {
  label: string;
  value: string;
  kind: "email" | "address";
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copyValue() {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        fallbackCopy(value);
      }
      setCopyState("copied");
    } catch {
      try {
        fallbackCopy(value);
        setCopyState("copied");
      } catch {
        setCopyState("error");
      }
    }

    window.setTimeout(() => setCopyState("idle"), 2400);
  }

  const statusText = copyState === "copied" ? "Copied!" : copyState === "error" ? "Could not copy" : "Copy";

  return (
    <div className="contact-copy-card">
      <span className={`contact-info-icon contact-info-icon-${kind}`} aria-hidden="true">
        {kind === "email" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
        )}
      </span>
      <span className="contact-copy-text"><span>{label}</span><strong>{value}</strong></span>
      <button className={`contact-copy-button${copyState === "copied" ? " contact-copy-button-copied" : ""}`} type="button" onClick={copyValue} aria-label={`${statusText}: ${label}`} title={statusText}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
        <span className="copy-tooltip" role="status">{statusText}</span>
      </button>
    </div>
  );
}
