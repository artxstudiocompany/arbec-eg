export type EngineeringLayerId =
  | "architecture"
  | "civil"
  | "hvac"
  | "electrical"
  | "plumbing"
  | "fire"
  | "infrastructure"
  | "solar";

export type LayerVisual =
  | "shell"
  | "structure"
  | "hvac"
  | "electrical"
  | "plumbing"
  | "fire"
  | "infrastructure"
  | "solar";

export type EngineeringLayer = {
  id: EngineeringLayerId;
  visual: LayerVisual;
  accentColor: string;
  dimColor: string;
};

export const ENGINEERING_LAYERS: readonly EngineeringLayer[] = [
  { id: "architecture", visual: "shell", accentColor: "#7cc0ff", dimColor: "#1a2a40" },
  { id: "civil", visual: "structure", accentColor: "#94a3b8", dimColor: "#2a2f3a" },
  { id: "hvac", visual: "hvac", accentColor: "#6ee7d8", dimColor: "#12302e" },
  { id: "electrical", visual: "electrical", accentColor: "#f0b24a", dimColor: "#3d2e10" },
  { id: "plumbing", visual: "plumbing", accentColor: "#60a5fa", dimColor: "#102440" },
  { id: "fire", visual: "fire", accentColor: "#f87171", dimColor: "#3d1414" },
  { id: "infrastructure", visual: "infrastructure", accentColor: "#4da3ff", dimColor: "#0d1f3d" },
  { id: "solar", visual: "solar", accentColor: "#fbbf24", dimColor: "#3d2f10" },
];

export const LAYER_COUNT = ENGINEERING_LAYERS.length;

export function getLayerIndex(id: EngineeringLayerId): number {
  return ENGINEERING_LAYERS.findIndex((l) => l.id === id);
}
