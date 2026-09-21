import type { ComponentProps, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-ink-950 hover:bg-accent-400 active:bg-accent-600 shadow-[0_0_24px_rgba(77,163,255,0.25)] hover:shadow-[0_0_32px_rgba(77,163,255,0.4)]",
  secondary:
    "border border-line-strong text-fg hover:border-fg hover:bg-white/5",
  ghost: "text-fg-muted hover:text-fg",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-sm sm:px-8 sm:py-4",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children" | "type">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const base = buttonClasses(variant, size, className);

  if (href) {
    const linkRest = rest as Omit<
      ComponentProps<typeof NextLink>,
      "href" | "className" | "children"
    >;
    return (
      <NextLink href={href} className={base} {...linkRest}>
        {children}
      </NextLink>
    );
  }

  return (
    <button type="button" className={base} {...rest}>
      {children}
    </button>
  );
}
