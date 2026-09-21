import type { Metadata } from "next";
import { company } from "@/data/company";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arbec-eg.com"
).replace(/\/$/, "");

/** Canonical alternates for a given locale-independent path. */
export function alternatesFor(path = "", canonicalLocale: Locale = defaultLocale) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteUrl}${localePath(locale, path)}`;
  }
  languages["x-default"] = `${siteUrl}${localePath(defaultLocale, path)}`;
  return { canonical: languages[canonicalLocale], languages };
}

type BuildMetadataArgs = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
};

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
}: BuildMetadataArgs): Metadata {
  const dict = getDictionary(locale);
  const resolvedTitle = title ?? dict.meta.defaultTitle;
  const resolvedDescription = description ?? dict.meta.defaultDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: dict.meta.keywords,
    alternates: alternatesFor(path, locale),
    openGraph: {
      type: "website",
      siteName: company.name,
      title: resolvedTitle,
      description: resolvedDescription,
      url: `${siteUrl}${localePath(locale, path)}`,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}
