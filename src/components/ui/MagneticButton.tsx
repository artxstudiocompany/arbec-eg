"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import NextLink from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/motion";
import { buttonClasses } from "./Button";

/**
 * Cursor-following button. The element tracks the pointer within a small
 * radius for a tactile, "magnetic" feel. Skipped under reduced motion.
 */
export function MagneticButton({
  href,
  children,
  strength = 0.25,
  maxDistance = 16,
  className,
  onClick,
  ...props
}: {
  href?: string;
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
  className?: string;
  onClick?: () => void;
} & Omit<ComponentProps<"button">, "className" | "children" | "onClick" | "type">) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const moveX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const moveY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      if (!ref.current || isReducedMotion()) return;
      moveX.current = gsap.quickTo(ref.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(ref.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: ref },
  );

  function handlePointerMove(event: React.PointerEvent) {
    const el = ref.current;
    if (!el || !moveX.current || !moveY.current) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    const clamp = (v: number) =>
      Math.max(-maxDistance, Math.min(maxDistance, v));
    moveX.current(clamp(relX * strength));
    moveY.current(clamp(relY * strength));
  }

  function handlePointerLeave() {
    moveX.current?.(0);
    moveY.current?.(0);
  }

  const base = buttonClasses("primary", "md", className);

  if (href) {
    const linkRest = props as Omit<
      ComponentProps<typeof NextLink>,
      "href" | "className" | "children" | "onClick"
    >;
    return (
      <NextLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={base}
        {...linkRest}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={base}
      {...props}
    >
      {children}
    </button>
  );
}