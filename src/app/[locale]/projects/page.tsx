import type { Metadata } from "next";
import { ProjectRadar } from "@/components/radar/ProjectRadar";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/projects",
    title: `${dict.nav.projects} — ${dict.meta.siteName}`,
    description: dict.projects.intro.lead,
  });
}

export default async function ProjectsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return <ProjectRadar locale={locale} dict={dict.projects} asH1 />;
}
