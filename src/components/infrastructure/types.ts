import type { Dictionary } from "@/i18n/dictionaries";

export type InfrastructureDict = Dictionary["infrastructure"];

export type StoryStepId =
  | "site"
  | "reveal"
  | "networks"
  | "selector"
  | "connection"
  | "execution";

export const STORY_ORDER: StoryStepId[] = [
  "site",
  "reveal",
  "networks",
  "selector",
  "connection",
  "execution",
];