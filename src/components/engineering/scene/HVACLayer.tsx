"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

/**
 * HVAC layer — vertical duct riser + per-floor duct runs + a rooftop
 * AHU block. A subtle dash pulse travels along the supply duct while active.
 */
export function HVACLayer({ active, baseOpacity = 0, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4, drive);

  const color = active ? "#6ee7d8" : "#2a4a48";
  const ductColor = active ? "#8af0e3" : "#35595a";

  return (
    <group ref={ref}>
      {/* Vertical riser along the back-left corner */}
      <mesh position={[-BUILDING_W / 2 + 0.18, BUILDING_H / 2, -BUILDING_D / 2 + 0.18]}>
        <boxGeometry args={[0.12, BUILDING_H, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
      </mesh>

      {/* Per-floor branch ducts */}
      {[1.05, 1.75, 2.45, 3.15, 3.85].map((yy) => (
        <group key={yy}>
          <mesh position={[-BUILDING_W / 2 + 0.55, yy, 0]}>
            <boxGeometry args={[0.5, 0.1, BUILDING_D - 0.4]} />
            <meshStandardMaterial color={ductColor} metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[-BUILDING_W / 2 + 0.55, yy, BUILDING_D / 2 - 0.28]}>
            <boxGeometry args={[0.5, 0.1, 0.1]} />
            <meshStandardMaterial color={ductColor} metalness={0.4} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Rooftop AHU unit */}
      <mesh position={[-0.6, BUILDING_H + 0.55, -0.3]}>
        <boxGeometry args={[0.7, 0.5, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.6, BUILDING_H + 0.9, -0.3]}>
        <boxGeometry args={[0.5, 0.22, 0.32]} />
        <meshStandardMaterial color={active ? "#d3fff8" : "#4a6f6e"} metalness={0.3} roughness={0.4} />
      </mesh>

      <FlowPulse active={active} color="#8af0e3" />
    </group>
  );
}

function FlowPulse({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (!active || !pulse.current) {
      if (pulse.current) pulse.current.visible = active;
      return;
    }
    offset.current = (offset.current + delta * 0.35) % 1;
    const y = 0.7 + offset.current * (BUILDING_H - 0.9);
    pulse.current.position.set(-BUILDING_W / 2 + 0.18 + 0.35, y, 0);
    pulse.current.visible = true;
  });

  return (
    <mesh ref={pulse} visible={false}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}