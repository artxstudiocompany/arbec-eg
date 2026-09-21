"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Cinematic image reveal — a top-down clip/scale mask animation triggered on
 * scroll. Degrades instantly under `prefers-reduced-motion`.
 */
export function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  delay?: number;
  priority?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;

      if (isReducedMotion()) {
        gsap.set(inner, { clipPath: "inset(0% 0 0 0)", scale: 1, opacity: 1 });
        return;
      }

      gsap.fromTo(
        inner,
        { clipPath: "inset(100% 0 0 0)", scale: 1.12, opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="size-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn("size-full object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}