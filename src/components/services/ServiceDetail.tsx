"use client";

import Link from "next/link";
import type { LocalizedService } from "@/data/services";
import { company } from "@/data/company";
import { cn, localePath } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { ServiceHubDict } from "./types";

/**
 * Active service detail — number, title, short description, capabilities and
 * contextual CTAs. Renders inside the desktop hub and (in a full-bleed layout)
 * on the services detail pages.
 */
export function ServiceDetail({
  service,
  dict,
  locale,
  titleTag: Tag = "h3",
}: {
  service: LocalizedService;
  dict: ServiceHubDict;
  locale: Locale;
  titleTag?: "h2" | "h3";
}) {
  const email =
    service.group === "supplies"
      ? company.email.supplies
      : company.email.contracting;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-ar-overline text-accent-400">
          {dict.serviceLabel} / {String(service.number).padStart(2, "0")}
        </p>
        <Tag className="mt-2 text-ar-h2 text-fg">{service.title}</Tag>
        <p className="mt-2 text-ar-body-sm leading-relaxed text-fg-muted">
          {service.shortDescription}
        </p>
      </div>

      {service.points && service.points.length > 0 && (
        <div>
          <p className="text-ar-overline text-fg-subtle">{dict.capabilities}</p>
          <ul className="mt-2 flex flex-col gap-2">
            {service.points.map((point) => (
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
        service={service}
        dict={dict}
        locale={locale}
        email={email}
      />
    </div>
  );
}

/** Contextual CTA pair — DISCUSS (mailto) + VIEW PROJECTS. */
export function ServiceCta({
  service,
  dict,
  locale,
  email,
  className,
}: {
  service: LocalizedService;
  dict: ServiceHubDict;
  locale: Locale;
  email: string;
  className?: string;
}) {
  const subject =
    locale === "ar"
      ? `مناقشة مشروع — ${service.title}`
      : `Project discussion — ${service.title}`;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
        className="inline-flex h-11 items-center justify-center rounded-full bg-accent-500 px-6 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
      >
        {dict.discussProject}
      </a>
      <Link
        href={localePath(locale, "/projects")}
        className="inline-flex h-11 items-center justify-center rounded-full border border-line px-6 text-sm font-medium text-fg transition-colors hover:border-accent-500/60 hover:text-accent-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
      >
        {dict.viewProjects}
      </Link>
      {service.slug === "infrastructure-networks" && (
        <Link
          href={`${localePath(locale, "/")}#infrastructure-experience`}
          className="inline-flex h-11 items-center justify-center rounded-full border border-dashed border-accent-500/40 px-6 text-sm font-medium text-accent-300 transition-colors hover:border-accent-500/70 hover:bg-accent-500/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
        >
          {dict.seeSystems}
        </Link>
      )}
    </div>
  );
}
