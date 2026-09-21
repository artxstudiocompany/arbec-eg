"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronDownIcon } from "@/components/ui/icons";

type HeroDict = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  scrollHint: string;
  hud: { system: string; coordinates: string; scale: string; sheet: string; revision: string; approved: string; loading: string };
};

type HomeHeroProps = {
  locale: string;
  hero: HeroDict;
  exploreWork: string;
  startProject: string;
  projectsHref: string;
  contactHref: string;
};

/** The hero is progressive enhancement: no timeline may hide its links or text. */
export function HomeHero({ locale, hero, exploreWork, startProject, projectsHref, contactHref }: HomeHeroProps) {
  const ar = locale === "ar";
  return (
    <section className="hero-shell relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <Container className="relative grid items-center gap-8 py-12 sm:py-16 lg:min-h-[620px] lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-16">
        <div className="relative z-10 min-w-0">
          <p className="flex items-center gap-3 text-ar-overline text-accent-400">
            <span aria-hidden="true" className="h-px w-9 bg-accent-500" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-ar-display text-fg">
            <span className="hero-copy-line block">{hero.titleLine1}</span>
            <span className="hero-copy-line block text-gradient-accent [animation-delay:80ms]">{hero.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-fg-muted sm:text-lg">{hero.lead}</p>
          <div className="relative z-20 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button data-hero-cta href={projectsHref} size="lg">{exploreWork}</Button>
            <Button data-hero-cta href={contactHref} size="lg" variant="secondary">{startProject}</Button>
          </div>
          <div aria-hidden="true" className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-fg-subtle">
            <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-signal-400" />{ar ? "هندسة · تنفيذ · توريدات" : "ENGINEERING · EXECUTION · SUPPLIES"}</span>
            <span>{ar ? "مصر" : "EGYPT"} / 2019</span>
          </div>
        </div>

        <div aria-hidden="true" className="pointer-events-none relative mx-auto hidden w-full max-w-[560px] lg:block" dir="ltr">
          <div className="hero-orb absolute inset-4 rounded-full" />
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900/60 shadow-[0_24px_90px_rgba(0,0,0,.22)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[10px] tracking-[.16em] text-fg-muted">
              <span>ARBEC / ENGINEERING MODEL</span><span className="text-signal-400">01—08</span>
            </div>
            <svg viewBox="0 0 560 420" fill="none" className="relative block w-full" focusable="false">
              <defs>
                <linearGradient id="hero-structure" x1="120" y1="60" x2="400" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#a5d3ff" /><stop offset="1" stopColor="#4da3ff" stopOpacity=".24" /></linearGradient>
                <linearGradient id="hero-floor" x1="280" y1="88" x2="280" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#4da3ff" stopOpacity=".13" /><stop offset="1" stopColor="#4da3ff" stopOpacity=".02" /></linearGradient>
              </defs>
              <g stroke="#9aa6b8" strokeOpacity=".13" strokeWidth=".8">
                {[0,1,2,3,4,5].map(i=><path key={i} d={`M${40+i*44} ${270+i*17} L${290+i*44} ${170+i*17} M${270-i*44} ${170+i*17} L${520-i*44} ${270+i*17}`} />)}
              </g>
              <ellipse cx="280" cy="295" rx="224" ry="85" stroke="#4da3ff" strokeOpacity=".25" strokeDasharray="3 7" />
              <g className="blueprint-structure" stroke="url(#hero-structure)" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M150 150 278 96 412 150 284 207Z" fill="url(#hero-floor)" />
                <path d="M150 195 278 141 412 195 284 252Z M150 240 278 186 412 240 284 297Z M150 285 278 231 412 285 284 342Z" fill="url(#hero-floor)" />
                <path d="M150 150V285 M194 132V267 M236 114V249 M278 96V231 M324 115V250 M368 133V268 M412 150V285 M369 169V304 M327 188V323 M284 207V342 M238 188V323 M194 170V305" />
                <path d="M150 150 284 207 412 150 M150 195 284 252 412 195 M150 240 284 297 412 240 M150 285 284 342 412 285" />
              </g>
              <g className="blueprint-route" stroke="#6ee7d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M92 298 151 275 194 293 194 202 278 166 348 195 348 314 431 279" />
                <circle cx="92" cy="298" r="4" fill="#6ee7d8" stroke="none" /><circle cx="431" cy="279" r="4" fill="#6ee7d8" stroke="none" />
              </g>
              <g stroke="#7cc0ff" strokeOpacity=".45" strokeWidth=".8"><path d="M135 145 113 136V286L135 295 M107 136H119 M107 286H119 M290 352V366L418 310 M284 366H296 M415 306L421 314 M278 83V54H380" /></g>
              <g fill="#9aa6b8" fontFamily="monospace" fontSize="9" letterSpacing="1.5"><text x="387" y="57">STRUCTURAL GRID</text><text x="70" y="215" transform="rotate(-90 70 215)">SYSTEM / SECTION 01</text><text x="215" y="390">COORDINATED BY DESIGN</text></g>
            </svg>
            <div className="grid grid-cols-3 border-t border-line text-center font-mono text-[9px] tracking-[.14em] text-fg-muted">
              <span className="py-3">STRUCTURE</span><span className="border-x border-line py-3 text-signal-400">MEP SYSTEMS</span><span className="py-3">INFRASTRUCTURE</span>
            </div>
          </div>
        </div>
      </Container>
      <a href="#engineering-core" className="relative z-10 mx-auto mb-5 flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs text-fg-muted transition-colors hover:text-accent-400">
        {hero.scrollHint}<ChevronDownIcon className="size-4" />
      </a>
    </section>
  );
}
