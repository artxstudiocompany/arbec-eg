/**
 * ARBEC projects.
 *
 * Source of truth: https://arbec-eg.com/projects/ — each entry carries only
 * the title, location and service it maps to on file. Scope, client, year,
 * budget and imagery were NOT published and are therefore never invented.
 * `featured` is a local editorial preference only (radar focus + index
 * ordering), never a claimed source fact.
 */

export type ProjectCategory =
  | "caravan"
  | "civil"
  | "finishing"
  | "infrastructure"
  | "solar";

export type Project = {
  slug: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  /** Category key — localized labels live in `dictionary.projects.categories`. */
  category: ProjectCategory;
  /** Related service slug, where the published title clearly maps to one. */
  serviceSlug?: string;
  needsDetails: boolean;
  /** Local editorial emphasis for the radar (NOT source data). */
  featured?: boolean;
};

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  "caravan",
  "civil",
  "finishing",
  "infrastructure",
  "solar",
];

export const projects: Project[] = [
  {
    slug: "caravan-construction-sodic-vye",
    title: "Caravan Construction Project",
    titleAr: "مشروع إنشاء الكرفانات",
    location: "SODIC Main Caravan, Vye",
    locationAr: "كرفان سوديك الرئيسي، فاي",
    category: "caravan",
    serviceSlug: "prefabricated-buildings-and-caravans",
    needsDetails: true,
    featured: true,
  },
  {
    slug: "decoration-works-villa-garden-city",
    title: "Decoration Works",
    titleAr: "أعمال الديكورات",
    location: "Villa, Garden City",
    locationAr: "فيلا، جاردن سيتي",
    category: "finishing",
    serviceSlug: "finishing-works",
    needsDetails: true,
  },
  {
    slug: "aluminum-maintenance-fifth-settlement",
    title: "Aluminum Maintenance Works",
    titleAr: "أعمال صيانة الألوميتال",
    location: "Fifth Settlement",
    locationAr: "التجمع الخامس",
    category: "civil",
    serviceSlug: "arch-and-civil-works",
    needsDetails: true,
  },
  {
    slug: "drainage-network-works-the-estates",
    title: "Drainage Network Works",
    titleAr: "أعمال شبكات الصرف",
    location: "The Estates",
    locationAr: "ذا إستيتس",
    category: "infrastructure",
    serviceSlug: "infrastructure-networks",
    needsDetails: true,
    featured: true,
  },
  {
    slug: "forty-weast-project-westown",
    title: "Forty Weast Project",
    titleAr: "مشروع فورتي ويست",
    location: "WESTOWN",
    locationAr: "ويستاون",
    category: "civil",
    serviceSlug: "arch-and-civil-works",
    needsDetails: true,
  },
  {
    slug: "solar-panel-foundation-sodic-east",
    title: "Concrete Foundation for Solar Panel Installation",
    titleAr: "الأساسات الخرسانية لتركيب الألواح الشمسية",
    location: "SODIC East",
    locationAr: "سوديك إيست",
    category: "solar",
    serviceSlug: "solar-panels-works",
    needsDetails: true,
  },
  {
    slug: "temporary-entrance-gate-vye",
    title: "Temporary Entrance Gate Works",
    titleAr: "أعمال بوابة الدخول المؤقتة",
    location: "Vye",
    locationAr: "فاي",
    category: "civil",
    serviceSlug: "arch-and-civil-works",
    needsDetails: true,
  },
  {
    slug: "pumping-station-sewage-tank-the-estates",
    title: "Pumping Station and Sewage Tank Works",
    titleAr: "أعمال محطة الطلمبات وخزان الصرف الصحي",
    location: "The Estates",
    locationAr: "ذا إستيتس",
    category: "infrastructure",
    serviceSlug: "infrastructure-networks",
    needsDetails: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Locale-resolved project record (title/location localized, number padded). */
export type LocalizedProject = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  number: string;
  featured: boolean;
  needsDetails: boolean;
};

export function getLocalizedProjects(locale: "en" | "ar"): LocalizedProject[] {
  return projects.map((project, index) => ({
    slug: project.slug,
    title: locale === "ar" ? project.titleAr : project.title,
    location: locale === "ar" ? project.locationAr : project.location,
    category: project.category,
    number: String(index + 1).padStart(2, "0"),
    featured: project.featured ?? false,
    needsDetails: project.needsDetails,
  }));
}

export function getLocalizedProject(
  slug: string,
  locale: "en" | "ar",
): LocalizedProject | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return getLocalizedProjects(locale)[index];
}