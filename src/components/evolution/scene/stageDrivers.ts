import { clamp01, smooth, smoothDown } from "./progress";

export type EvolutionDrives = {
  shell: number;
  struct: number;
  blueprint: number;
  tech: number;
  proc: number;
  hvac: number;
  elec: number;
  plumb: number;
  fire: number;
  finish: number;
  grid: number;
  light: number;
};

/**
 * Turn global theater progress (0..1 mapped across the 8 stages) into the
 * opacity target of every layer of the evolving building. Each reads a
 * window with small overlaps so the transformation feels continuous.
 */
/**
 * Per-stage signature on the 0..8 theater scale. Clicking a stage jumps
 * the whole scene to that point instead of scrubbing it with the scroll.
 */
const STAGE_SIGNATURE = [0.25, 1.8, 2.5, 3.7, 4.9, 5.5, 6.7, 8] as const;

/**
 * Map a stage index (0 IDEA … 7 DELIVERY) to fixed layer drives so the
 * selection itself controls the 3D/animation state. Document scroll no
 * longer moves the building — it only moves the camera.
 */
export function computeStageDrives(stageIndex: number): EvolutionDrives {
  const i = Math.min(
    Math.max(0, Math.floor(stageIndex)),
    STAGE_SIGNATURE.length - 1,
  );
  return computeDrives(STAGE_SIGNATURE[i] / 8);
}

export function computeDrives(p: number): EvolutionDrives {
  const t = p * 8;

  // 0 IDEA · 1 ENGINEERING · 2 TECHNICAL OFFICE · 3 PROCUREMENT ·
  // 4 CONSTRUCTION · 5 MEP · 6 FINISHING · 7 DELIVERY

  const construction = smooth(4.1, 4.6, t); // 0..1
  const mepDip = smooth(5.0, 5.35, t); // 0..1 during MEP
  const finishRise = smooth(6.35, 6.85, t); // rebuild shell at finishing
  const shellBase = 0.18 + construction * 0.82; // ghost → solid
  const shellMep = shellBase * (1 - mepDip * 0.68);
  const shell = shellMep + finishRise * (1 - shellMep);

  const struct = clamp01(
    0.55 * smooth(1.1, 1.8, t) + 0.55 * smooth(4.2, 4.9, t),
  );

  const blueprint = smooth(0.05, 0.45, t) * smoothDown(1.45, 2.25, t);
  const tech = smooth(2.2, 2.75, t) * smoothDown(3.5, 4.05, t);
  const proc = smooth(3.3, 3.7, t) * smoothDown(4.7, 5.3, t);

  const mepBase = smooth(5.25, 5.85, t);
  const mepFall = 1 - 0.65 * smooth(6.65, 7.15, t);
  const hvac = mepBase * 0.95 * mepFall;
  const elec = mepBase * 1.0 * mepFall;
  const plumb = mepBase * 0.85 * mepFall;
  const fire = mepBase * 0.9 * mepFall;

  const finish = smooth(6.5, 7.1, t);
  const grid = smoothDown(7.3, 7.95, t);
  const light = smooth(5.5, 8.0, t);

  return {
    shell,
    struct,
    blueprint,
    tech,
    proc,
    hvac,
    elec,
    plumb,
    fire,
    finish,
    grid,
    light,
  };
}