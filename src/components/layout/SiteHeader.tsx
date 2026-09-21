import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const items = primaryNav.map((item) => ({
    label: dict.nav[item.key],
    href: localePath(locale, item.path),
    active: item.path,
  }));

  const cta = {
    label: dict.actions.requestQuote,
    href: localePath(locale, "/contact"),
    active: "/contact",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href={localePath(locale)} aria-label={dict.meta.siteName}>
          <Logo />
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  active={item.active}
                  baseClassName="relative text-sm font-medium text-fg-muted transition-colors hover:text-fg"
                  activeClassName="relative text-sm font-medium text-accent-400 after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-accent-500"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher
            locale={locale}
            label={dict.nav.language}
            className="hidden sm:grid"
          />
          <Link
            href={cta.href}
            className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400 lg:inline-flex"
          >
            {cta.label}
          </Link>
          <MobileNav
            locale={locale}
            items={items}
            cta={cta}
            labels={{
              open: dict.nav.openMenu,
              close: dict.nav.closeMenu,
              menu: dict.nav.menu,
              language: dict.nav.language,
            }}
          />
        </div>
      </Container>
    </header>
  );
}