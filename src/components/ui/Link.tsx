import type { ReactNode } from "react";
import type { ComponentProps } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

/**
 * Styled text link. Direction-agnostic (logical text flow inherits RTL/LTR
 * automatically). Distinct hover + focus states for accessibility.
 */
export function Link({
  className,
  children,
  ...props
}: { className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof NextLink>,
  "className" | "children"
>) {
  return (
    <NextLink
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium text-accent-400 underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-300 hover:decoration-accent-400",
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}