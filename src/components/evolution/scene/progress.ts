import * as THREE from "three";

export const clamp01 = (v: number) => THREE.MathUtils.clamp(v, 0, 1);

/** Linear ramp from 0→1 across [a, b]. */
export function ramp(a: number, b: number, t: number): number {
  if (b <= a) return t >= b ? 1 : 0;
  return clamp01((t - a) / (b - a));
}

/** Involute ramp 1→0 across [a, b]. */
export function rampDown(a: number, b: number, t: number): number {
  return 1 - ramp(a, b, t);
}

/** Smoothstep (ease) ramp from 0→1 across [a, b]. */
export function smooth(a: number, b: number, t: number): number {
  const x = ramp(a, b, t);
  return x * x * (3 - 2 * x);
}

/** Smooth involute 1→0 across [a, b]. */
export function smoothDown(a: number, b: number, t: number): number {
  return 1 - smooth(a, b, t);
}

/** Bell window peaking at 1 between a and b, 0 outside. */
export function bell(a: number, b: number, t: number): number {
  const mid = (a + b) / 2;
  if (t < a || t > b) return 0;
  return t <= mid ? smooth(a, mid, t) : smooth(mid, b, t);
}