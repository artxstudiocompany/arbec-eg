"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

const PANEL_ROWS = 4;
const PANEL_COLS = 5;
const PANEL_GAP = 0.48;
const PANEL_W = 0.38;
const PANEL_D = 0.28;

/**
 * Solar layer — photovoltaic panels on the rooftop arranged in a grid,
 * tilted toward the sun + an energy pulse travelling downward into the
 * building's electrical system. Purely visual, no numbers.
 */
export function SolarLayer({ active, baseOpacity = 0 }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4);

  return (
    <group ref={ref}>
      {/* Panel grid on the roof */}
      {Array.from({ length: PANEL_ROWS }, (_, row) =>
        Array.from({ length: PANEL_COLS }, (_, col) => {
          const x =
            -((PANEL_COLS - 1) * PANEL_GAP) / 2 + col * PANEL_GAP;
          const z =
            -((PANEL_ROWS - 1) * PANEL_GAP) / 2 + row * PANEL_GAP;
          return (
            <Panel
              key={`${row}-${col}`}
              position={[x, 4.44, z]}
              active={active}
            />
          );
        }),
      )}

      {/* Energy bus running from the roof down to the main cable bus */}
      <mesh position={[BUILDING_W / 2 - 0.06, 2.1, -BUILDING_D / 2 + 0.06]}>
        <boxGeometry args={[0.06, 4.3, 0.06]} />
        <meshStandardMaterial
          color={active ? "#fbbf24" : "#54431e"}
          emissive={active ? "#fbbf24" : "#000000"}
          emissiveIntensity={active ? 0.7 : 0}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      <SolarPulse active={active} />
    </group>
  );
}

function Panel({ position, active }: { position: [number, number, number]; active: boolean }) {
  return (
    <mesh position={position} rotation={[-0.42, 0, 0]}>
      <boxGeometry args={[PANEL_W, 0.02, PANEL_D]} />
      <meshStandardMaterial
        color={active ? "#fbbf24" : "#4a3f1e"}
        metalness={0.7}
        roughness={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SolarPulse({ active }: { active: boolean }) {
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (!active || !pulse.current) {
      if (pulse.current) pulse.current.visible = active;
      return;
    }
    offset.current = (offset.current + delta * 0.32) % 1;
    const y = 4.2 - offset.current * 3.8;
    pulse.current.position.set(BUILDING_W / 2 - 0.06, y, -BUILDING_D / 2 + 0.06);
    pulse.current.visible = true;
  });

  return (
    <mesh ref={pulse} visible={false}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#fcd34d" transparent opacity={0.95} />
    </mesh>
  );
}