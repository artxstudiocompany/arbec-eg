import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/ServicesSection";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/services",
    title: dict.services.intro.eyebrow,
    description: dict.services.intro.lead,
  });
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <ServicesSection dict={dict.services} locale={locale} asH1 />
  );
}