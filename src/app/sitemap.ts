import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/seo";
import { localePath } from "@/lib/utils";

const staticPaths = ["", "/services", "/projects", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticUrls = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}${localePath(alt, path)}`,
          ]),
        ),
      },
    })),
  );

  const projectUrls = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${siteUrl}${localePath(locale, `/projects/${project.slug}`)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}${localePath(alt, `/projects/${project.slug}`)}`,
          ]),
        ),
      },
    })),
  );

  const serviceUrls = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${siteUrl}${localePath(locale, `/services/${service.slug}`)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${siteUrl}${localePath(alt, `/services/${service.slug}`)}`,
          ]),
        ),
      },
    })),
  );

  return [...staticUrls, ...serviceUrls, ...projectUrls];
}
