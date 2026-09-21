"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales, localeShort, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function persistLocale(locale: Locale) {
  document.cookie = `ARBEC_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * Premium AR / EN segmented control. Reads as language tokens (AR|EN), so the
 * control itself stays LTR for a predictable animated indicator regardless of
 * document direction; all accompanying content follows the document direction.
 */
export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const activeIndex = locales.indexOf(locale);

  function switchTo(next: Locale) {
    if (next === locale) return;

    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as Locale)) segments.shift();
    const target = `/${next}${segments.length ? `/${segments.join("/")}` : ""}`;

    persistLocale(next);

    startTransition(() => router.push(target));
  }

  return (
    <div
      role="group"
      dir="ltr"
      aria-label={label}
      className={cn(
        "relative grid grid-cols-2 items-center rounded-full border border-line bg-ink-800/60 p-1",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 start-1 w-[calc(50%-0.25rem)] rounded-full bg-accent-500 shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-transform duration-500 ease-[var(--ease-out-expo)]",
          activeIndex === 1 && "translate-x-full",
        )}
      />
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            aria-label={locale === "ar" ? (code === "ar" ? "التبديل إلى العربية" : "التبديل إلى الإنجليزية") : (code === "ar" ? "Switch to Arabic" : "Switch to English")}
            className={cn(
              "relative z-10 rounded-full px-3 py-1.5 font-mono text-[0.6875rem] font-semibold tracking-[0.2em] transition-colors duration-300",
              active ? "text-ink-950" : "text-fg-muted hover:text-fg",
            )}
          >
            {localeShort[code]}
          </button>
        );
      })}
    </div>
  );
}
