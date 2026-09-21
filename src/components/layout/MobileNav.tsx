"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLink } from "./NavLink";

type NavLinkItem = { label: string; href: string; active: string };

export function MobileNav({
  locale,
  items,
  cta,
  labels,
}: {
  locale: Locale;
  items: NavLinkItem[];
  cta: NavLinkItem;
  labels: { open: string; close: string; menu: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;
    const focusable = () => Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.querySelectorAll<HTMLElement>("main, footer, body > a[href='#main']"));
    const previousInert = siblings.map((element) => (element as HTMLElement).inert);
    siblings.forEach((element) => { (element as HTMLElement).inert = true; });
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => focusable()[0]?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      siblings.forEach((element, index) => { (element as HTMLElement).inert = previousInert[index]; });
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="relative z-50 flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-line-strong"
      >
        <span className="sr-only">{open ? labels.close : labels.open}</span>
        <span aria-hidden className="relative block h-3 w-5">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
              open && "top-1/2 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
              open && "bottom-1/2 -rotate-45",
            )}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-ink-950/98 backdrop-blur-xl"
      >
        <nav
          aria-label={labels.menu}
          className="flex flex-1 flex-col justify-center px-6"
        >
          <ul className="flex flex-col gap-2">
            {items.map((item, index) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  active={item.active}
                  onNavigate={() => setOpen(false)}
                  baseClassName="block py-3 font-display text-3xl font-medium tracking-tight text-fg transition-colors hover:text-accent-400"
                  activeClassName="block py-3 font-display text-3xl font-medium tracking-tight text-accent-400"
                >
                  <span className="me-3 align-middle font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-6">
          <LocaleSwitcher
            locale={locale}
            label={labels.language}
            className="text-sm"
          />
          <NavLink
            href={cta.href}
            active={cta.active}
            onNavigate={() => setOpen(false)}
            baseClassName="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
            activeClassName="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
          >
            {cta.label}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
