import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactComposer } from "@/components/contact/ContactComposer";
import { company } from "@/data/company";
import { getContactCopy } from "@/data/contact-copy";
import { getLocale } from "@/i18n/server";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { localePath } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({ locale, path: "/contact", title: locale === "ar" ? "تواصل معنا — أربك" : "Contact ARBEC", description: locale === "ar" ? "تواصل مباشرة مع أربك أو جهّز طلبًا عبر أداة البريد المحلية." : "Contact ARBEC directly or prepare a request with the local email composer." });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const copy = getContactCopy(locale);
  const phoneHref = `tel:${company.phone.main.replace(/[^+\d]/g, "")}`;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${siteUrl}${localePath(locale, "/contact")}`, name: copy.title, inLanguage: locale, mainEntity: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: company.name, telephone: company.phone.main, email: company.email.info, address: { "@type": "PostalAddress", streetAddress: `${company.address.line1}, ${company.address.line2}`, addressLocality: company.address.city, addressCountry: company.address.countryCode } } }} />
      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <header className="max-w-3xl"><p className="text-ar-overline text-accent-400">{copy.eyebrow}</p><h1 className="mt-4 text-ar-display text-fg">{copy.title}</h1><p className="mt-5 text-ar-body-lg leading-relaxed text-fg-muted">{copy.lead}</p></header>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <aside className="rounded-2xl border border-line bg-white/[0.02] p-6"><h2 className="font-display text-xl text-fg">{copy.directTitle}</h2><div className="mt-6 space-y-5 text-sm"><div><p className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{copy.general}</p><a href={`mailto:${company.email.info}`} className="mt-2 block text-fg-muted hover:text-accent-300" dir="ltr">{company.email.info}</a><a href={phoneHref} className="mt-1 block text-fg-muted hover:text-accent-300" dir="ltr">{company.phone.main}</a></div><div><p className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{copy.supplies}</p><a href={`mailto:${company.email.supplies}`} className="mt-2 block text-fg-muted hover:text-accent-300" dir="ltr">{company.email.supplies}</a></div><div><p className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{copy.contracting}</p><a href={`mailto:${company.email.contracting}`} className="mt-2 block text-fg-muted hover:text-accent-300" dir="ltr">{company.email.contracting}</a></div><div className="border-t border-line pt-5"><p className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{copy.hoursTitle}</p><p className="mt-2 text-fg-muted">{copy.hours}</p><p className="mt-1 text-fg-subtle">{copy.closed}</p></div><address className="border-t border-line pt-5 text-sm not-italic leading-relaxed text-fg-muted">{company.address.line1}<br />{company.address.line2}<br />{company.address.city}, {company.address.country}</address></div></aside>
          <ContactComposer copy={copy} email={company.email.info} />
        </div>
      </main>
    </>
  );
}
