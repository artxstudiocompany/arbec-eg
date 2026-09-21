/**
 * ARBEC — canonical company record.
 *
 * Source of truth: https://arbec-eg.com (About / Contact / Footer).
 *
 * NOTE (content integrity): the legacy site publishes several conflicting
 * phone numbers and e-mail addresses across pages. The values below are the
 * unified, corrected set. Anything uncertain is listed in `needsConfirmation`
 * so the client can sign off before launch. Do not invent facts here.
 */

export type ContactChannel = {
  labelKey: "supplies" | "contracting" | "general";
  phones: string[];
  emails: string[];
};

export const company = {
  name: "ARBEC",
  legalName: "ARBEC",
  foundedYear: 2019,
  founder: "Eng. Haytham M. Kotb",
  country: "Egypt",

  /** Public, canonical contact set. */
  address: {
    line1: "1st Floor, Apartment No. 4, Ard El-Mazad Street",
    line2: "5th District, 6 October City",
    city: "Giza",
    country: "Egypt",
    countryCode: "EG",
  },

  phone: {
    main: "+2 023 8340868",
    admin: "01016441110",
  },

  email: {
    info: "info@arbec-eg.com",
    supplies: "a.mamdouh@arbec-eg.com",
    contracting: "h.kotb@arbec-eg.com",
  },

  channels: [
    {
      labelKey: "supplies",
      phones: ["+20 106 917 7296"],
      emails: ["a.mamdouh@arbec-eg.com"],
    },
    {
      labelKey: "contracting",
      phones: ["+20 100 612 7653"],
      emails: ["h.kotb@arbec-eg.com", "info@arbec-eg.com"],
    },
  ] satisfies ContactChannel[],

  hours: {
    days: "Sat – Thu",
    open: "8:00",
    close: "17:00",
    closed: "Friday",
  },

  social: {
    facebook: "https://www.facebook.com/arbec.eg",
    youtube: "https://www.youtube.com/@Arbec-eg",
    instagram: "https://www.instagram.com/arbeccompany",
    linkedin: "https://www.linkedin.com/company/arbec-eg",
  },

  /** Verified, non-fabricated figures only. */
  stats: {
    projectsFinished: 40,
    yearsExperience: 6,
    foundedYear: 2019,
  },

  /**
   * Gaps that must be resolved by the client before launch.
   * Listed for transparency — never auto-resolved.
   */
  needsConfirmation: [
    "Which phone number is the single canonical public line (legacy site lists +2 023 8340868, 01016441110, +20 106 917 7296, +20 100 612 7653).",
    "Canonical e-mail set (legacy lists info@arbec-eg.com, a.mamdouh@arbec-eg.com, h.kotb@arbec-eg.com, arbeccompany12@gmail.com, arbeccompany1@gmail.com).",
    "Arabic-language copy for all public pages.",
    "High-resolution project photography to replace low-resolution stock imagery.",
  ],
} as const;

export type Company = typeof company;
