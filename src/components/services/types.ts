import type { ServiceGroup } from "@/data/services";

export type ServiceHubDict = {
  intro: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
  };
  command: string;
  systemLabel: string;
  serviceLabel: string;
  capabilities: string;
  discussProject: string;
  viewProjects: string;
  prev: string;
  next: string;
  selectHint: string;
  indexLabel: string;
  count: string;
  hub: string;
  node: string;
  back: string;
  seeSystems: string;
  groups: Record<"all" | ServiceGroup, string>;
};