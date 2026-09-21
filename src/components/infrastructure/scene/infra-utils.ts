"use client";

import * as THREE from "three";

/** Clamped 0..1 range interpolation. */
export function rangeStep(value: number, a: number, b: number): number {
  return THREE.MathUtils.clamp((value - a) / (b - a), 0, 1);
}

/** Smoothstep easing on a 0..1 input. */
export function smoothstep(t: number): number {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

export const SITE_CAMERA_POS = new THREE.Vector3(3.8, 5.2, 6.2);
export const SITE_CAMERA_TARGET = new THREE.Vector3(0.5, 0.0, 0.2);
export const OPEN_CAMERA_POS = new THREE.Vector3(-3.0, 1.15, 5.2);
export const OPEN_CAMERA_TARGET = new THREE.Vector3(0.2, -1.15, 0.0);

export type InfraSceneDriver = { current: number };