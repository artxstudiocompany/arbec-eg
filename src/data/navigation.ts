import type { Dictionary } from "@/i18n/dictionaries";

export type NavItem = {
  /** Key into `dictionary.nav` */
  key: keyof Dictionary["nav"];
  /** Locale-independent path (no locale prefix). */
  path: string;
};

export const primaryNav: NavItem[] = [
  { key: "home", path: "" },
  { key: "projects", path: "/projects" },
  { key: "services", path: "/services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];
