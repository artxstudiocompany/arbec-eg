/**
 * ARBEC infrastructure — centralized dataset for the Infrastructure Experience.
 *
 * Source of truth: https://arbec-eg.com/services/ (Infrastructure Systems Networks).
 * Only documented ARBEC infrastructure capabilities are represented. No pipe
 * diameters, depths/voltages as numbers, flow rates, quantities or project
 * statistics are invented — `depth` is a purely visual layering value used to
 * composite the scene, never displayed as a measurement.
 *
 * The site is described in a small shared space:
 *   x   — across the site (left→right)
 *   z   — along the site (front→back)
 *   depth — how far below the surface each route runs (negative = underground)
 * Both the WebGL scene and the 2D sectional diagram derive their geometry
 * from the same routes/nodes below, so scope stays consistent everywhere.
 */

export type InfraSystemId =
  | "water"
  | "fire"
  | "sewage"
  | "irrigation"
  | "electrical"
  | "light";

export type InfraNodeKind =
  | "manhole"
  | "inspection"
  | "transformer"
  | "rmu"
  | "panel"
  | "junction";

export type InfraFlow =
  | "stream"
  | "pulse"
  | "directional"
  | "branches"
  | "energy"
  | "signal";

export type InfraPoint = { x: number; z: number; depth: number };
export type InfraRoute = { points: InfraPoint[] };
export type InfraNode = { pos: InfraPoint; kind: InfraNodeKind };

export type InfrastructureSystem = {
  id: InfraSystemId;
  /** Number shown in UI (01–06), matching the selector order. */
  number: number;
  title: string;
  titleAr: string;
  nodeLabel: string;
  nodeLabelAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  /** Documented scope components — terminology only, no invented values. */
  scope: string[];
  scopeAr: string[];
  accent: string;
  dim: string;
  flow: InfraFlow;
  routes: InfraRoute[];
  nodes: InfraNode[];
};

/** Building footprint on the site surface (plan). */
export const SITE_BUILDING_X = [-0.6, 2.0];
export const SITE_BUILDING_Z = [-0.6, 1.8];

/** Site extents used for ground/slab size. */
export const SITE_X = 4.5;
export const SITE_Z = 3.5;
export const GROUND_DEPTH = -2.4;

export const INFRASTRUCTURE_SYSTEMS: readonly InfrastructureSystem[] = [
  {
    id: "water",
    number: 1,
    title: "Water Supply Networks",
    titleAr: "شبكات تغذية المياه",
    nodeLabel: "WATER",
    nodeLabelAr: "المياه",
    shortDescription:
      "Water supply network systems engineered as part of ARBEC's infrastructure works.",
    shortDescriptionAr:
      "أنظمة شبكات تغذية المياه تُهندَس ضمن أعمال البنية التحتية لأربك.",
    scope: ["Network", "Distribution", "Site connections"],
    scopeAr: ["الشبكة", "التوزيع", "توصيلات الموقع"],
    accent: "#4da3ff",
    dim: "#16304f",
    flow: "stream",
    routes: [
      {
        points: [
          { x: -4.4, z: 0.8, depth: -0.85 },
          { x: -0.6, z: 0.8, depth: -0.85 },
          { x: 0.4, z: 0.2, depth: -0.85 },
          { x: 1.4, z: -0.7, depth: -0.8 },
        ],
      },
      {
        points: [
          { x: -0.6, z: 0.8, depth: -0.85 },
          { x: 0.6, z: 1.8, depth: -0.85 },
          { x: 2.6, z: 0.8, depth: -0.85 },
          { x: 2.6, z: -1.0, depth: -0.85 },
          { x: 0.6, z: -1.0, depth: -0.82 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -4.4, z: 0.8, depth: -0.85 }, kind: "junction" },
      { pos: { x: 0.4, z: 0.2, depth: -0.85 }, kind: "junction" },
      { pos: { x: 2.6, z: 0.8, depth: -0.85 }, kind: "junction" },
    ],
  },
  {
    id: "fire",
    number: 2,
    title: "Fire Fighting Networks",
    titleAr: "شبكات مكافحة الحريق",
    nodeLabel: "FIRE FIGHTING",
    nodeLabelAr: "مكافحة الحريق",
    shortDescription:
      "Fire fighting network systems engineered for reliable response around the project.",
    shortDescriptionAr:
      "شبكات مكافحة الحريق مصممة لتحقيق استجابة موثوقة حول المشروع.",
    scope: ["Fire fighting networks", "Perimeter distribution"],
    scopeAr: ["شبكات مكافحة الحريق", "توزيع محيطي"],
    accent: "#f87171",
    dim: "#3c1a1a",
    flow: "pulse",
    routes: [
      {
        points: [
          { x: -0.2, z: -0.9, depth: -0.7 },
          { x: 1.6, z: -0.9, depth: -0.7 },
          { x: 2.6, z: 0.2, depth: -0.7 },
          { x: 2.2, z: 1.2, depth: -0.7 },
          { x: 0.6, z: 1.6, depth: -0.7 },
          { x: -0.6, z: 0.8, depth: -0.7 },
          { x: -1.2, z: -0.2, depth: -0.7 },
          { x: -0.2, z: -0.9, depth: -0.7 },
        ],
      },
      {
        points: [
          { x: -0.2, z: -0.5, depth: -0.7 },
          { x: 0.6, z: 0.2, depth: -0.68 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -1.2, z: -0.2, depth: -0.7 }, kind: "junction" },
      { pos: { x: 0.6, z: 1.6, depth: -0.7 }, kind: "junction" },
      { pos: { x: 2.6, z: 0.2, depth: -0.7 }, kind: "junction" },
      { pos: { x: 0.6, z: 0.2, depth: -0.68 }, kind: "junction" },
    ],
  },
  {
    id: "sewage",
    number: 3,
    title: "Sewage Networks",
    titleAr: "شبكات الصرف الصحي",
    nodeLabel: "SEWAGE",
    nodeLabelAr: "الصرف",
    shortDescription:
      "Sewage networks with manholes, inspection chambers and sewer lines as part of ARBEC's infrastructure scope.",
    shortDescriptionAr:
      "شبكات صرف تضم بئر التفتيش والغرف التفتيشية وخطوط الصرف ضمن نطاق البنية التحتية لأربك.",
    scope: ["Sewer lines", "Manholes", "Inspection chambers"],
    scopeAr: ["خطوط الصرف", "بئر التفتيش", "الغرف التفتيشية"],
    accent: "#94a3b8",
    dim: "#232936",
    flow: "directional",
    routes: [
      {
        points: [
          { x: -3.8, z: -0.6, depth: -1.85 },
          { x: -2.2, z: -1.0, depth: -1.9 },
          { x: -0.6, z: -1.1, depth: -1.95 },
          { x: 1.2, z: -1.0, depth: -1.95 },
          { x: 2.8, z: -0.8, depth: -1.95 },
        ],
      },
      {
        points: [
          { x: -0.6, z: -1.1, depth: -1.9 },
          { x: 0.6, z: -1.9, depth: -1.9 },
          { x: 1.4, z: -2.5, depth: -1.9 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -2.2, z: -1.0, depth: -1.9 }, kind: "manhole" },
      { pos: { x: -0.6, z: -1.1, depth: -1.95 }, kind: "manhole" },
      { pos: { x: 1.2, z: -1.0, depth: -1.95 }, kind: "manhole" },
      { pos: { x: 2.8, z: -0.8, depth: -1.95 }, kind: "manhole" },
      { pos: { x: 0.6, z: -1.9, depth: -1.9 }, kind: "inspection" },
    ],
  },
  {
    id: "irrigation",
    number: 4,
    title: "Irrigation Networks",
    titleAr: "شبكات الري",
    nodeLabel: "IRRIGATION",
    nodeLabelAr: "الري",
    shortDescription:
      "Irrigation networks engineered to feed the site landscape as part of ARBEC's infrastructure works.",
    shortDescriptionAr:
      "شبكات ري تُهندَس لتغذية المسطحات بالموقع ضمن أعمال البنية التحتية لأربك.",
    scope: ["Irrigation networks", "Feeder & laterals"],
    scopeAr: ["شبكات الري", "المغذي والخطوط الفرعية"],
    accent: "#6ee7d8",
    dim: "#0f3d38",
    flow: "branches",
    routes: [
      {
        points: [
          { x: -4.2, z: 1.4, depth: -1.15 },
          { x: -1.4, z: 1.4, depth: -1.15 },
          { x: 1.0, z: 1.4, depth: -1.15 },
          { x: 3.4, z: 1.4, depth: -1.15 },
        ],
      },
      {
        points: [
          { x: -1.4, z: 1.4, depth: -1.15 },
          { x: -1.4, z: -2.6, depth: -1.18 },
        ],
      },
      {
        points: [
          { x: 1.0, z: 1.4, depth: -1.15 },
          { x: 1.0, z: -2.6, depth: -1.18 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -1.4, z: 1.4, depth: -1.15 }, kind: "junction" },
      { pos: { x: 1.0, z: 1.4, depth: -1.15 }, kind: "junction" },
      { pos: { x: -1.4, z: -2.6, depth: -1.18 }, kind: "junction" },
    ],
  },
  {
    id: "electrical",
    number: 5,
    title: "Electrical Networks — LV / MV",
    titleAr: "الشبكات الكهربائية — الجهد المنخفض والمتوسط",
    nodeLabel: "ELECTRICAL",
    nodeLabelAr: "الكهرباء",
    shortDescription:
      "LV / MV electricity distribution through transformers, RMUs and electrical panels within ARBEC's infrastructure scope.",
    shortDescriptionAr:
      "توزيع كهرباء الجهد المنخفض والمتوسط عبر المحولات وRMU واللوحات الكهربائية ضمن نطاق البنية التحتية لأربك.",
    scope: ["LV / MV networks", "Transformer", "RMU", "Electrical panels"],
    scopeAr: ["شبكات الجهد المنخفض والمتوسط", "المحول", "RMU", "اللوحات الكهربائية"],
    accent: "#f0b24a",
    dim: "#3d2e10",
    flow: "energy",
    routes: [
      {
        points: [
          { x: -4.4, z: -0.4, depth: -1.45 },
          { x: -2.2, z: 0.2, depth: -1.45 },
          { x: -0.8, z: 0.2, depth: -1.45 },
        ],
      },
      {
        points: [
          { x: -0.8, z: 0.2, depth: -1.45 },
          { x: -0.2, z: 0.2, depth: -1.45 },
        ],
      },
      {
        points: [
          { x: -0.2, z: 0.2, depth: -1.45 },
          { x: 0.6, z: 0.2, depth: -1.45 },
        ],
      },
      {
        points: [
          { x: 0.6, z: 0.2, depth: -1.45 },
          { x: 1.6, z: -0.4, depth: -1.45 },
          { x: 2.8, z: 0.8, depth: -1.45 },
          { x: 3.8, z: -0.8, depth: -1.45 },
        ],
      },
      {
        points: [
          { x: 0.6, z: 0.2, depth: -1.45 },
          { x: 0.6, z: -1.8, depth: -1.42 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -2.2, z: 0.2, depth: -1.45 }, kind: "junction" },
      { pos: { x: -0.8, z: 0.2, depth: -1.45 }, kind: "transformer" },
      { pos: { x: -0.2, z: 0.2, depth: -1.45 }, kind: "rmu" },
      { pos: { x: 0.6, z: 0.2, depth: -1.45 }, kind: "panel" },
      { pos: { x: 3.8, z: -0.8, depth: -1.45 }, kind: "junction" },
    ],
  },
  {
    id: "light",
    number: 6,
    title: "Light Current Systems",
    titleAr: "أنظمة التيار الخفيف",
    nodeLabel: "LIGHT CURRENT",
    nodeLabelAr: "التيار الخفيف",
    shortDescription:
      "Light-current networks engineered as part of ARBEC's integrated infrastructure works.",
    shortDescriptionAr:
      "شبكات التيار الخفيف تُهندَس ضمن أعمال البنية التحتية المتكاملة لأربك.",
    scope: ["Light-current networks", "Site distribution"],
    scopeAr: ["شبكات التيار الخفيف", "توزيع الموقع"],
    accent: "#a78bfa",
    dim: "#2d2150",
    flow: "signal",
    routes: [
      {
        points: [
          { x: -4.0, z: -2.2, depth: -0.55 },
          { x: -1.2, z: -1.6, depth: -0.55 },
          { x: 0.4, z: -1.4, depth: -0.55 },
          { x: 2.0, z: -1.0, depth: -0.55 },
          { x: 3.8, z: -1.6, depth: -0.55 },
        ],
      },
      {
        points: [
          { x: 0.4, z: -1.4, depth: -0.55 },
          { x: 0.6, z: -0.4, depth: -0.55 },
          { x: 0.8, z: 0.5, depth: -0.5 },
        ],
      },
    ],
    nodes: [
      { pos: { x: -4.0, z: -2.2, depth: -0.55 }, kind: "junction" },
      { pos: { x: 0.4, z: -1.4, depth: -0.55 }, kind: "junction" },
      { pos: { x: 2.0, z: -1.0, depth: -0.55 }, kind: "junction" },
      { pos: { x: 3.8, z: -1.6, depth: -0.55 }, kind: "junction" },
    ],
  },
];

export function getInfraSystem(id: InfraSystemId): InfrastructureSystem {
  return INFRASTRUCTURE_SYSTEMS.find((s) => s.id === id)!;
}

export function getInfraSystemByNumber(number: number): InfrastructureSystem {
  return INFRASTRUCTURE_SYSTEMS.find((s) => s.number === number)!;
}

/** Average underground position of a system — used for subtle camera dolly. */
export function infraCentroid(system: InfrastructureSystem): {
  x: number;
  y: number;
  z: number;
} {
  let x = 0;
  let z = 0;
  let y = 0;
  let count = 0;
  for (const route of system.routes) {
    for (const p of route.points) {
      x += p.x;
      z += p.z;
      y += p.depth;
      count += 1;
    }
  }
  return {
    x: x / count,
    y: y / count,
    z: z / count,
  };
}

export type LocalizedInfraSystem = {
  id: InfraSystemId;
  number: number;
  title: string;
  nodeLabel: string;
  shortDescription: string;
  scope: string[];
  accent: string;
  dim: string;
  flow: InfraFlow;
  routes: InfraRoute[];
  nodes: InfraNode[];
};

export function getLocalizedInfrastructureSystems(
  locale: "en" | "ar",
): LocalizedInfraSystem[] {
  return INFRASTRUCTURE_SYSTEMS.map((s) => ({
    id: s.id,
    number: s.number,
    title: locale === "ar" ? s.titleAr : s.title,
    nodeLabel: locale === "ar" ? s.nodeLabelAr : s.nodeLabel,
    shortDescription: locale === "ar" ? s.shortDescriptionAr : s.shortDescription,
    scope: locale === "ar" ? s.scopeAr : s.scope,
    accent: s.accent,
    dim: s.dim,
    flow: s.flow,
    routes: s.routes,
    nodes: s.nodes,
  }));
}