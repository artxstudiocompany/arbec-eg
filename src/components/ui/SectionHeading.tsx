import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = "start",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-ar-overline text-accent-400",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden
            className="h-px w-10 bg-accent-500 [mask-image:linear-gradient(to_right,#000,transparent)]"
          />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-5 text-ar-h2 text-fg">{title}</h2>
      {lede ? (
        <p className="mt-4 text-ar-body-lg leading-relaxed text-fg-muted">
          {lede}
        </p>
      ) : null}
    </div>
  );
}