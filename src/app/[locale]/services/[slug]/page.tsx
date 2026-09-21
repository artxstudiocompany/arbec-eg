import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ServiceCta } from "@/components/services/ServiceDetail";
import { ServiceVisual, SERVICE_ACCENTS } from "@/components/services/ServiceVisual";
import { getLocalizedService, getService, services } from "@/data/services";
import { company } from "@/data/company";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { localePath } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getService(slug);
  const localized = service ? getLocalizedService(slug, locale) : undefined;

  if (!service || !localized) {
    return buildMetadata({ locale, path: "/services" });
  }

  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: `/services/${localized.slug}`,
    title: `${localized.title} — ${dict.meta.siteName}`,
    description: `${localized.shortDescription} ${dict.meta.siteName}.`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const service = getService(slug);
  const localized = getLocalizedService(slug, locale);
  if (!service || !localized) notFound();

  const accent = SERVICE_ACCENTS[localized.visual];
  const email =
    localized.group === "supplies"
      ? company.email.supplies
      : company.email.contracting;

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
              name: dict.nav.services,
              item: `${siteUrl}${localePath(locale, "/services")}`,
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
          href={localePath(locale, "/services")}
          variant="ghost"
          size="sm"
          className="-ms-3 mb-8"
        >
          ← {dict.services.back}
        </Button>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div>
            <TechnicalLabel tone="accent" className="text-[0.6875rem]">
              {dict.services.serviceLabel} {String(localized.number).padStart(2, "0")} / {"0"}
              {services.length}
            </TechnicalLabel>
            <h1 className="mt-5 text-ar-display text-fg">{localized.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-ar-body-lg text-fg-muted">
              <span aria-hidden style={{ color: accent }}>
                ●
              </span>
              {dict.services.groups[localized.group]}
            </p>
            <p className="mt-5 text-ar-body-lg leading-relaxed text-fg-muted">
              {localized.shortDescription}
            </p>
            <p className="mt-4 max-w-xl text-ar-body-sm leading-relaxed text-fg-subtle">
              {localized.description}
            </p>

            {localized.points && localized.points.length > 0 && (
              <div className="mt-8">
                <p className="text-ar-overline text-fg-subtle">
                  {dict.services.capabilities}
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {localized.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-3 text-sm leading-snug text-fg-muted"
                    >
                      <span aria-hidden className="h-px w-3 shrink-0 self-center bg-accent-500/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ServiceCta
              service={localized}
              dict={dict.services}
              locale={locale}
              email={email}
              className="mt-10 sm:flex-row"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-ink-900/60">
            <ServiceVisual
              visual={localized.visual}
              className="aspect-[4/3] h-auto w-full"
            />
          </div>
        </div>
      </main>
    </>
  );
}
