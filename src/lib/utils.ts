import type { Locale } from "@/i18n/config";

/** Tiny class-name joiner (avoids a runtime dependency). */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

/** Build a locale-prefixed path. `localePath("ar", "/services")` → `/ar/services`. */
export function localePath(locale: Locale, path = ""): string {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

/** Strip a leading locale segment from a pathname. */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && ["en", "ar"].includes(parts[0])) {
    return `/${parts.slice(1).join("/")}`;
  }
  return pathname || "/";
}
