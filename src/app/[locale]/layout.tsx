import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CinematicPreloader } from "@/components/ui/CinematicPreloader";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { dir, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { DirectionProvider } from "@/lib/direction-context";
import { organizationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const bodyLatin = Inter({
  subsets: ["latin"],
  variable: "--font-body-latin",
  display: "swap",
});

const displayLatin = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-latin",
  display: "swap",
  preload: false,
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-body-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({ locale, path: "" });
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const documentDir = dir(locale);

  return (
    <html
      lang={locale}
      dir={documentDir}
      data-scroll-behavior="smooth"
      className={cn(
        bodyLatin.variable,
        displayLatin.variable,
        arabic.variable,
        "h-full",
      )}
    >
      <body
        className={cn(
          "bg-ink-950 text-fg antialiased",
          locale === "ar" ? "font-arabic" : "font-sans",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-500 focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          {dict.a11y.skipToContent}
        </a>

        <DirectionProvider value={documentDir}>
          <CinematicPreloader
            initializing={dict.preloader.initializing}
            ready={dict.preloader.ready}
            loading={dict.preloader.loading}
          />
          <PageShell>
            <JsonLd data={organizationSchema(locale)} />
            <SiteHeader locale={locale} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter locale={locale} />
          </PageShell>
        </DirectionProvider>
      </body>
    </html>
  );
}
