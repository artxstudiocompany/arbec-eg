"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

/**
 * Infrastructure layer — site networks extending outward from the
 * building: supply, power and drainage routes with traveling pulses.
 * The 3D lines stay physically logical regardless of language.
 */
export function InfrastructureLayer({ active, baseOpacity = 0 }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4);

  const supply = active ? "#4da3ff" : "#29486e";
  const power = active ? "#f0b24a" : "#54452a";
  const drain = active ? "#60a5fa" : "#34507a";

  const corners: [number, number][] = [
    [BUILDING_W / 2 - 0.2, BUILDING_D / 2 - 0.2],
    [-BUILDING_W / 2 + 0.2, BUILDING_D / 2 - 0.2],
    [BUILDING_W / 2 - 0.2, -BUILDING_D / 2 + 0.2],
    [-BUILDING_W / 2 + 0.2, -BUILDING_D / 2 + 0.2],
  ];
  const angle = [30, 120, 210, 300];

  return (
    <group ref={ref}>
      {corners.map(([x, z], i) => (
        <group key={i}>
          <NetworkLine
            from={[x, 0.02, z]}
            to={[
              Math.cos((angle[i] * Math.PI) / 180) * 2.6 + x,
              0.02,
              Math.sin((angle[i] * Math.PI) / 180) * 2.6 + z,
            ]}
            color={i % 2 === 0 ? supply : i === 1 ? power : drain}
            active={active}
          />
        </group>
      ))}

      {/* Underground/utility junction boxes near the boundary */}
      {corners.map(([x, z], i) => (
        <mesh
          key={`j${i}`}
          position={[
            Math.cos((angle[i] * Math.PI) / 180) * 2.0 + x,
            0.06,
            Math.sin((angle[i] * Math.PI) / 180) * 2.0 + z,
          ]}
        >
          <boxGeometry args={[0.22, 0.12, 0.22]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#5f83b8" : "#6b5a3a"}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function NetworkLine({
  from,
  to,
  color,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  active: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  // Stable geometry from the two endpoints. Buffers are created once per
  // (from, to) pair, so refs are never read during render.
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(from[0], from[1], from[2]),
      new THREE.Vector3(to[0], to[1], to[2]),
    ]);
    return g;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from[0], from[1], from[2], to[0], to[1], to[2]]);

  const lineObj = useMemo(
    () =>
      new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0,
        }),
      ),
    [geometry, color],
  );

  useFrame((_, delta) => {
    const line = lineRef.current;
    if (!line) return;

    if (!active) {
      if (pulse.current) pulse.current.visible = false;
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, 0, 5, delta);
      return;
    }

    const mat = line.material as THREE.LineBasicMaterial;
    mat.opacity = THREE.MathUtils.damp(mat.opacity, 0.9, 5, delta);
    if (pulse.current) {
      offset.current = (offset.current + delta * 0.4) % 1;
      pulse.current.position.lerpVectors(
        new THREE.Vector3(from[0], from[1], from[2]),
        new THREE.Vector3(to[0], to[1], to[2]),
        offset.current,
      );
      pulse.current.visible = true;
    }
  });

  return (
    <group>
      <primitive object={lineObj} ref={lineRef} />
      <mesh ref={pulse} visible={false}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}