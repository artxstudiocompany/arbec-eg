import { company } from "@/data/company";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteUrl } from "@/lib/seo";

/** Organization + WebSite structured data (JSON-LD graph). */
export function organizationSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: company.name,
        legalName: company.legalName,
        url: siteUrl,
        foundingDate: String(company.foundedYear),
        founder: {
          "@type": "Person",
          name: company.founder,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: `${company.address.line1}, ${company.address.line2}`,
          addressLocality: company.address.city,
          addressCountry: company.address.countryCode,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: company.phone.main,
            email: company.email.info,
            contactType: "customer service",
            areaServed: "EG",
            availableLanguage: ["en", "ar"],
          },
        ],
        sameAs: [
          company.social.facebook,
          company.social.youtube,
          company.social.instagram,
          company.social.linkedin,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/${locale}/#website`,
        url: `${siteUrl}/${locale}`,
        name: company.name,
        description: dict.meta.defaultDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: locale === "ar" ? "ar" : "en",
      },
    ],
  };
}
