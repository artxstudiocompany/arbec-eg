import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Button } from "@/components/ui/Button";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { CATEGORY_ACCENTS, ProjectVisual } from "@/components/radar/ProjectVisual";
import { getLocalizedProject, getProject, projects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { localePath } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = getProject(slug);
  const localized = project ? getLocalizedProject(slug, locale) : undefined;

  if (!localized || !project) {
    return buildMetadata({ locale, path: "/projects" });
  }

  const dict = getDictionary(locale);
  const description = `${localized.title} — ${localized.location}. ${dict.meta.siteName}.`;

  return buildMetadata({
    locale,
    path: `/projects/${localized.slug}`,
    title: `${localized.title} — ${dict.meta.siteName}`,
    description,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const project = getProject(slug);
  const localized = getLocalizedProject(slug, locale);
  if (!project || !localized) notFound();

  const category = dict.projects.categories[localized.category];
  const accent = CATEGORY_ACCENTS[localized.category];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: dict.nav.projects,
              item: `${siteUrl}${localePath(locale, "/projects")}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: localized.title,
            },
          ],
        }}
      />

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <Button
          href={localePath(locale, "/projects")}
          variant="ghost"
          size="sm"
          className="-ms-3 mb-8"
        >
          ← {dict.projects.back}
        </Button>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <TechnicalLabel tone="accent" className="text-[0.6875rem]">
              {dict.projects.project} {localized.number} / 08
            </TechnicalLabel>
            <h1 className="mt-5 max-w-2xl text-ar-display text-fg">
              {localized.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-ar-body-lg text-fg-muted">
              <span aria-hidden style={{ color: accent }}>
                ●
              </span>
              {dict.projects.category}: {category}
            </p>
          </div>

          <ProjectMeta
            className="min-w-[260px]"
            items={[
              { label: dict.projects.location, value: localized.location },
              { label: dict.projects.status, value: dict.projects.completed },
            ]}
          />
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-ink-900/60">
          <ProjectVisual
            category={localized.category}
            className="aspect-[16/9] h-auto w-full"
          />
        </div>

        {project.needsDetails && (
          <div className="mt-10 flex items-start gap-4 rounded-xl border border-line bg-white/[0.02] p-6">
            <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-warn/50 text-ar-caption text-warn">
              i
            </span>
            <p className="text-ar-body-sm leading-relaxed text-fg-muted">
              {dict.projects.recordNote}
            </p>
          </div>
        )}
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
            {locale === "ar"
              ? "هل لديك نطاق مشابه؟ تواصل مع أربك لمناقشة المتطلبات المتاحة.": "Planning work in a similar category? Contact ARBEC to discuss the requirements on file."}
          </p>
          <Button href={localePath(locale, "/contact")} size="md">
            {dict.actions.getInTouch}
          </Button>
        </div>
      </main>
    </>
  );
}
