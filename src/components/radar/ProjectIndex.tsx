"use client";

import { cn } from "@/lib/utils";
import type { LocalizedProject, ProjectCategory } from "@/data/projects";
import type { ProjectRadarDict } from "./types";

/**
 * Project index rail — engineering checklist: category filters on top, then a
 * numbered inventory of the tracked projects. Selecting a row drives the radar.
 */
export function ProjectIndex({
  filter,
  onFilter,
  projects,
  activeIndex,
  onSelect,
  dict,
}: {
  filter: ProjectCategory | "all";
  onFilter: (filter: ProjectCategory | "all") => void;
  projects: LocalizedProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
  dict: ProjectRadarDict;
}) {
  const categories = Object.keys(dict.categories) as ProjectCategory[];

  return (
    <div className="flex flex-col">
      {/* Filters */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={dict.category}
      >
        <FilterChip
          active={filter === "all"}
          label={dict.all}
          onClick={() => onFilter("all")}
        />
        {categories.map((category) => (
          <FilterChip
            key={category}
            active={filter === category}
            label={dict.categories[category]}
            onClick={() => onFilter(category)}
          />
        ))}
      </div>

      {/* Inventory */}
      <div className="relative mt-6">
        <span
          className="pointer-events-none absolute start-4 bottom-2 top-2 w-px bg-line-strong"
          aria-hidden
        />
        <ol className="relative flex flex-col" aria-label={dict.project}>
          {projects.map((project, index) => {
          const active = index === activeIndex;
          return (
            <li key={project.slug} className="relative">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`${project.number} · ${project.title}`}
                className={cn(
                  "group flex w-full items-center gap-4 py-3.5 text-start transition-colors duration-300",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center border font-mono text-[0.625rem] transition-colors duration-300",
                    active
                      ? "border-accent-400 bg-accent-400/10 text-accent-300"
                      : "border-line-strong text-fg-subtle group-hover:border-accent-500/60",
                  )}
                >
                  {project.number.replace(/^0/, "")}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-300",
                      active
                        ? "text-accent-300"
                        : "text-fg-muted group-hover:text-fg",
                    )}
                  >
                    {project.title}
                  </span>
                  <span className="block truncate text-ar-caption text-fg-subtle">
                    {project.location}
                  </span>
                </span>
                {active && (
                  <span
                    className="ms-auto h-px w-10 bg-accent-400"
                    aria-hidden
                  />
                )}
              </button>
            </li>
          );
          })}
        </ol>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] transition-colors duration-200",
        active
          ? "border-accent-400 bg-accent-400/10 text-accent-300"
          : "border-line text-fg-subtle hover:border-accent-500/60 hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
