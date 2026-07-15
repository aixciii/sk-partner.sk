"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_COOKIE = "sk_cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 rok

function getConsent(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )sk_cookie_consent=([^;]*)/);
  return match ? match[1] : null;
}

function setConsent(value: "all" | "necessary") {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE}; path=/; SameSite=Lax`;
  // Budúca analytika (GA4/GTM) si vie prečítať cookie alebo počúvať tento event
  window.dispatchEvent(new CustomEvent("sk-cookie-consent", { detail: value }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: "all" | "necessary") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Nastavenia cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-2xl sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-muted-foreground">
          Táto stránka používa cookies. Nevyhnutné cookies zabezpečujú základnú
          funkčnosť stránky. So súhlasom môžeme používať aj analytické cookies na
          zlepšovanie našich služieb. Viac v{" "}
          <Link href="/gdpr" className="underline transition-colors hover:text-foreground">
            Zásadách ochrany osobných údajov
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Len nevyhnutné
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            Prijať všetky
          </button>
        </div>
      </div>
    </div>
  );
}
