"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_D,
  BUILDING_H,
} from "../../engineering/scene/LayerPrimitives";
import { useDrivenOpacity, type DriveRef } from "./opacityDrive";

const D = BUILDING_D;
const H = BUILDING_H;

type Vec3 = [number, number, number];

type ItemDraw =
  | "steelBundle"
  | "glazing"
  | "ahu"
  | "pipes"
  | "reel"
  | "slabs";

type ItemSpec = {
  draw: ItemDraw;
  delay: number;
  from: Vec3;
  to: Vec3;
  color: string;
};

const SPECS: ItemSpec[] = [
  {
    draw: "steelBundle",
    delay: 0,
    from: [6.8, 2.6, 1.3],
    to: [-0.5, 0.62, 1.7],
    color: "#8b9db8",
  },
  {
    draw: "glazing",
    delay: 0.06,
    from: [0.4, 1.4, 7.6],
    to: [0.2, 1.5, D / 2 + 0.12],
    color: "#bfe3ff",
  },
  {
    draw: "ahu",
    delay: 0.12,
    from: [-7, 6.4, -3],
    to: [-0.6, H + 0.28, -0.3],
    color: "#7d95b5",
  },
  {
    draw: "pipes",
    delay: 0.18,
    from: [7.8, 3.0, -1],
    to: [-1.3, 0.32, 0.5],
    color: "#c97a52",
  },
  {
    draw: "reel",
    delay: 0.24,
    from: [-7, 3.6, 4.6],
    to: [1.7, 0.32, 0.5],
    color: "#e0c37a",
  },
  {
    draw: "slabs",
    delay: 0.3,
    from: [7, 1.3, -2.6],
    to: [1.95, 0.42, -0.5],
    color: "#c9b18c",
  },
];

/**
 * Procurement stage — generic material packages (steel bundles, glazing,
 * rooftop units, pipes, cable reels, stone slabs) arrive from off-site
 * and settle around the building during PROCUREMENT, then fade as
 * construction absorbs them. Illustrative only, no brands or part numbers.
 */
export function ProcurementStage({
  drive,
  active,
  reduced = false,
}: {
  drive: DriveRef;
  active: boolean;
  reduced?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useDrivenOpacity(ref, drive, 4);

  return (
    <group ref={ref}>
      {SPECS.map((spec, i) => (
        <ArrivingItem key={i} spec={spec} active={active} reduced={reduced} />
      ))}
    </group>
  );
}

function ArrivingItem({
  spec,
  active,
  reduced,
}: {
  spec: ItemSpec;
  active: boolean;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const pos = new THREE.Vector3(...spec.from);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (reduced) {
      g.position.set(...spec.to);
      return;
    }
    if (!active) {
      start.current = null;
      return;
    }
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    const u = THREE.MathUtils.clamp((t - spec.delay) / 0.5, 0, 1);
    if (u <= 0) return;
    const s = 1 - Math.pow(1 - u, 2);
    pos.set(
      spec.from[0] + (spec.to[0] - spec.from[0]) * s,
      spec.from[1] + (spec.to[1] - spec.from[1]) * s,
      spec.from[2] + (spec.to[2] - spec.from[2]) * s,
    );
    const k = 1 - Math.exp(-4 * delta);
    g.position.lerp(pos, k);
    const targetScale = 0.85 + u * 0.15;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, targetScale, 6, delta));
  });

  return (
    <group ref={group} position={reduced ? spec.to : spec.from}>
      <ItemShape draw={spec.draw} color={spec.color} />
    </group>
  );
}

function ItemShape({ draw, color }: { draw: ItemDraw; color: string }) {
  switch (draw) {
    case "steelBundle":
      return (
        <group>
          {[-0.13, 0, 0.13].map((x) => (
            <mesh
              key={x}
              position={[0, 0, x]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.06, 0.06, 1.7, 12]} />
              <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
            </mesh>
          ))}
          {[-0.65, 0.65].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.015, 0.24, 0.015]} />
              <meshStandardMaterial color="#6a7290" metalness={0.4} roughness={0.4} />
            </mesh>
          ))}
        </group>
      );
    case "glazing":
      return (
        <mesh>
          <boxGeometry args={[1.9, 1.3, 0.06]} />
          <meshStandardMaterial
            color={color}
            metalness={0.15}
            roughness={0.1}
            transparent
            opacity={0.55}
          />
        </mesh>
      );
    case "ahu":
      return (
        <group>
          <mesh>
            <boxGeometry args={[0.8, 0.5, 0.55]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[0.6, 0.22, 0.4]} />
            <meshStandardMaterial color="#5f6f8c" metalness={0.4} roughness={0.4} />
          </mesh>
        </group>
      );
    case "pipes":
      return (
        <group>
          {[0, 0.16].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 2.2, 12]} />
              <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
            </mesh>
          ))}
        </group>
      );
    case "reel":
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.08, 10, 20]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
        </mesh>
      );
    case "slabs":
      return (
        <group>
          {[0, 0.05].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[1.1, 0.05, 1.35]} />
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.5} />
            </mesh>
          ))}
        </group>
      );
  }
}