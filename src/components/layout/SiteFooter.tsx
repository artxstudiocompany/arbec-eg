import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { company } from "@/data/company";
import { getLocalizedServices } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const localizedServices = getLocalizedServices(locale);

  const socials = [
    { label: "Facebook", href: company.social.facebook },
    { label: "YouTube", href: company.social.youtube },
    { label: "Instagram", href: company.social.instagram },
    { label: "LinkedIn", href: company.social.linkedin },
  ];

  return (
    <footer className="border-t border-line bg-ink-900">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={localePath(locale)} aria-label={dict.meta.siteName}>
              <Logo />
            </Link>
            <h2 className="mt-6 font-display text-lg text-fg">
              {dict.footer.sloganTitle}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
              {dict.footer.slogan}
            </p>
            <dl className="mt-6 space-y-1 text-sm text-fg-muted">
              <div>
                <dt className="sr-only">{dict.footer.hours}</dt>
                <dd>{dict.footer.hours}</dd>
              </div>
              <div>
                <dt className="sr-only">{dict.footer.friday}</dt>
                <dd>{dict.footer.friday}</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-fg-subtle">
              {dict.footer.followUs}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={dict.footer.servicesTitle} className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              {dict.footer.servicesTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {localizedServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={localePath(locale, `/services/${service.slug}`)}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              {dict.footer.officeTitle}
            </h2>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-fg-muted">
              <span className="block">{company.address.line1}</span>
              <span className="block">{company.address.line2}</span>
              <span className="block">
                {company.address.city}, {company.address.country}
              </span>
            </address>

            <div className="mt-6 space-y-5 text-sm">
              {company.channels.map((channel) => (
                <div key={channel.labelKey}>
                  <p className="font-medium text-fg">
                    {channel.labelKey === "supplies"
                      ? dict.footer.suppliesTitle
                      : dict.footer.contractingTitle}
                  </p>
                  <ul className="mt-1 space-y-0.5 text-fg-muted">
                    {channel.phones.map((phone) => (
                      <li key={phone} dir="ltr">
                        <a
                          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                          className="transition-colors hover:text-fg"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                    {channel.emails.map((email) => (
                      <li key={email} dir="ltr">
                        <a
                          href={`mailto:${email}`}
                          className="transition-colors hover:text-fg"
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.footer.legal}
          </p>
          <p dir="ltr" className="tracking-wide">
            {company.phone.main}
          </p>
        </div>
      </Container>
    </footer>
  );
}
