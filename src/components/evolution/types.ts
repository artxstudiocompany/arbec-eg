import type { EvolutionStageId } from "@/data/idea-to-reality";

export type IdeaToRealityDict = {
  intro: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
  };
  command: string;
  stage: string;
  of: string;
  analyzing: string;
  stageActive: string;
  selectHint: string;
  stages: Record<
    EvolutionStageId,
    { title: string; description: string }
  >;
};