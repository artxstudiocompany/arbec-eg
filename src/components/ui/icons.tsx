import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

function Svg({
  className,
  children,
  ...props
}: IconProps & { children?: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("inline-block size-[1em] shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Directional (flips in RTL via CSS) ──────────────────────── */

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg
      className={cn("rtl:-scale-x-100", props.className)}
      {...props}
    >
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg
      className={cn("rtl:-scale-x-100", props.className)}
      {...props}
    >
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg
      className={cn("rtl:-scale-x-100", props.className)}
      {...props}
    >
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m18 15-6-6-6 6" />
    </Svg>
  );
}

/* ── Navigation ──────────────────────────────────────────────── */

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Svg>
  );
}

/* ── Service icons (one per ServiceIcon type) ────────────────── */

export function SuppliesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" />
      <path d="M4 7.5l8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </Svg>
  );
}

export function TechnicalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 21 3.5-.7L20 6.8a1.9 1.9 0 0 0-2.8-2.8L3.7 17.5 3 21z" />
      <path d="m15.5 7.5 2 2" />
    </Svg>
  );
}

export function CivilIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h8v17" />
      <path d="M13 8h6a1 1 0 0 1 1 1v12h-7" />
      <path d="M7 8h2M7 12h2M7 16h2" />
    </Svg>
  );
}

export function CaravanIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 10h18" />
      <path d="m9 10 2 3 5-4" />
    </Svg>
  );
}

export function InfrastructureIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10M10 8v6M14 8v6M7 18h10" />
    </Svg>
  );
}

export function FinishingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 9.5 10.5 3 13l6.5 2.5L12 23l2.5-7.5L21 13l-6.5-2.5z" />
    </Svg>
  );
}

export function MechanicalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v4M12 17v4" />
      <path d="M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12z" />
    </Svg>
  );
}

export function SolarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Svg>
  );
}

const serviceIconMap: Record<string, FC<IconProps>> = {
  supplies: SuppliesIcon,
  technical: TechnicalIcon,
  civil: CivilIcon,
  caravan: CaravanIcon,
  infrastructure: InfrastructureIcon,
  finishing: FinishingIcon,
  mechanical: MechanicalIcon,
  electrical: ElectricalIcon,
  solar: SolarIcon,
};

export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  const Icon = serviceIconMap[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}

/* ── Process / hero ──────────────────────────────────────────── */

export function CompassIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </Svg>
  );
}

export function DraftingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 17l14-14 4 4L7 21H3v-4z" />
      <path d="M15 7l2 2" />
    </Svg>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m15 12-8.5 8.5a2.12 2.12 0 0 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9" />
      <path d="m2 22 1-1" />
    </Svg>
  );
}

export function BlueprintIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M9 3v18" />
      <path d="M13 13h4v4h-4z" />
    </Svg>
  );
}

/* ── Communication ───────────────────────────────────────────── */

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </Svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </Svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Svg className={cn("rtl:-scale-x-100", props.className)} {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Svg>
  );
}

/* ── Social ──────────────────────────────────────────────────── */

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

/* ── Decorative / accent ─────────────────────────────────────── */

export function DotIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function CrosshairIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </Svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </Svg>
  );
}
