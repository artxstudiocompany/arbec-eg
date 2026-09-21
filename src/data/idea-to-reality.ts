export type EvolutionStageId =
  | "idea"
  | "engineering"
  | "technicalOffice"
  | "procurement"
  | "construction"
  | "mep"
  | "finishing"
  | "delivery";

export type EvolutionVisualStage =
  | "blueprint"
  | "engineeringModel"
  | "technicalDrawings"
  | "materials"
  | "structure"
  | "mep"
  | "finishes"
  | "completed";

export type EvolutionStage = {
  id: EvolutionStageId;
  number: string;
  accentColor: string;
  visualStage: EvolutionVisualStage;
};

export const EVOLUTION_STAGES: readonly EvolutionStage[] = [
  { id: "idea", number: "01", accentColor: "#7cc0ff", visualStage: "blueprint" },
  { id: "engineering", number: "02", accentColor: "#8fb8ff", visualStage: "engineeringModel" },
  { id: "technicalOffice", number: "03", accentColor: "#9fb4d8", visualStage: "technicalDrawings" },
  { id: "procurement", number: "04", accentColor: "#f0b24a", visualStage: "materials" },
  { id: "construction", number: "05", accentColor: "#94a3b8", visualStage: "structure" },
  { id: "mep", number: "06", accentColor: "#6ee7d8", visualStage: "mep" },
  { id: "finishing", number: "07", accentColor: "#dbb98a", visualStage: "finishes" },
  { id: "delivery", number: "08", accentColor: "#e2e8f0", visualStage: "completed" },
];

export const EVOLUTION_STAGE_COUNT = EVOLUTION_STAGES.length;

export function getEvolutionStageIndex(id: EvolutionStageId): number {
  return EVOLUTION_STAGES.findIndex((s) => s.id === id);
}