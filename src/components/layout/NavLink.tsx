"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { stripLocale } from "@/lib/utils";

/**
 * Direction-agnostic nav link with an active-state indicator.
 * `active` is the locale-independent path ("" for home, "/services", …).
 * Renders `aria-current="page"` for the active route and swaps in the
 * `activeClassName` styling when the current page matches.
 */
export function NavLink({
  href,
  active,
  children,
  baseClassName,
  activeClassName,
  onNavigate,
}: {
  href: string;
  active: string;
  children: React.ReactNode;
  baseClassName?: string;
  activeClassName?: string;
  onNavigate?: () => void;
} & Omit<ComponentProps<typeof NextLink>, "href" | "className" | "children">) {
  const pathname = usePathname();
  const current = stripLocale(pathname);

  const isActive =
    active === ""
      ? current === "/"
      : current === active || current.startsWith(`${active}/`);

  return (
    <NextLink
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={isActive ? activeClassName : baseClassName}
    >
      {children}
    </NextLink>
  );
}