import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

export const LOCALE_COOKIE = "ARBEC_LOCALE";

/** Negotiator-free locale detection: cookie first, then Accept-Language. */
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    for (const entry of header.split(",")) {
      const base = entry.split(";")[0]?.trim().toLowerCase().split("-")[0];
      if (base && isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Run on everything except:
     * - api routes
     * - Next internals (_next)
     * - metadata files and any path containing a file extension
     */
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
