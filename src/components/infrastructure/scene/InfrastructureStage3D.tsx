"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { SITE_BUILDING_X, SITE_BUILDING_Z, SITE_X, SITE_Z } from "@/data/infrastructure";
import type { InfraSceneDriver } from "./infra-utils";
import { rangeStep, smoothstep } from "./infra-utils";

/**
 * Above-ground stage — site plate, engineering grid, a simplified building
 * mass and minimal site context. As the scroll reveal opens the underground,
 * the plate becomes semi-transparent and the surface elements separate
 * upward slightly, like a digital twin being opened (never removed fully).
 */
export function InfrastructureStage3D({
  progressRef,
  reduced,
}: {
  progressRef: InfraSceneDriver;
  reduced: boolean;
}) {
  const slabRef = useRef<THREE.Mesh>(null);
  const surfaceRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const revealed = rangeStep(progressRef.current, 0.28, 0.6);
    const r = reduced ? 1 : smoothstep(revealed);

    if (slabRef.current) {
      const mat = slabRef.current.material as THREE.MeshStandardMaterial;
      mat.transparent = true;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, 1 - r * 0.86, 3, delta);
    }
    if (surfaceRef.current) {
      surfaceRef.current.position.y = THREE.MathUtils.damp(
        surfaceRef.current.position.y,
        r * 0.16,
        3,
        delta,
      );
    }
  });

  const bx = (SITE_BUILDING_X[0] + SITE_BUILDING_X[1]) / 2;
  const bz = (SITE_BUILDING_Z[0] + SITE_BUILDING_Z[1]) / 2;
  const bw = SITE_BUILDING_X[1] - SITE_BUILDING_X[0];
  const bd = SITE_BUILDING_Z[1] - SITE_BUILDING_Z[0];
  const bh = 1.5;

  return (
    <group>
      {/* Site plate — becomes a translucent sectional plane during reveal */}
      <mesh ref={slabRef} position={[0, -0.26, 0]} receiveShadow>
        <boxGeometry args={[SITE_X * 2, 0.52, SITE_Z * 2]} />
        <meshStandardMaterial
          color="#0c1622"
          metalness={0.35}
          roughness={0.55}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Engineering grid — stays visible like a utility map */}
      <Grid
        position={[0, 0.01, 0]}
        args={[SITE_X * 2, SITE_Z * 2]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#17424a"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#1e4a56"
        fadeDistance={22}
        fadeStrength={1.2}
        infiniteGrid={false}
      />

      {/* Surface layer — separates gently as the ground opens */}
      <group ref={surfaceRef}>
        <SiteBuilding cx={bx} cy={0} cz={bz} w={bw} d={bd} h={bh} />

        {/* Main site road along the near axis */}
        <mesh position={[0, 0.02, -2.0]}>
          <boxGeometry args={[SITE_X * 2, 0.05, 0.95]} />
          <meshStandardMaterial color="#1a222e" metalness={0.1} roughness={0.9} />
        </mesh>
        {/* Access road toward the building */}
        <mesh position={[0.2, 0.02, -1.2]} rotation={[0, 0, -0.18]}>
          <boxGeometry args={[0.72, 0.05, 1.15]} />
          <meshStandardMaterial color="#1a222e" metalness={0.1} roughness={0.9} />
        </mesh>

        {/* Minimal service area markers */}
        <mesh position={[3.2, 0.03, 2.1]}>
          <boxGeometry args={[0.7, 0.14, 0.5]} />
          <meshStandardMaterial color="#223042" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh position={[3.2, 0.11, 2.1]}>
          <boxGeometry args={[0.5, 0.12, 0.3]} />
          <meshStandardMaterial color="#31445c" metalness={0.3} roughness={0.5} />
        </mesh>

        {/* Minimal landscaping — abstract small trees */}
        <Tree x={-3.1} z={2.1} />
        <Tree x={3.3} z={-2.6} />

        {/* Boundary markers at the site edge */}
        <mesh position={[-SITE_X + 0.25, 0.1, SITE_Z - 0.25]}>
          <boxGeometry args={[0.16, 0.22, 0.16]} />
          <meshStandardMaterial color="#2a3b52" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[SITE_X - 0.25, 0.1, -SITE_Z + 0.25]}>
          <boxGeometry args={[0.16, 0.22, 0.16]} />
          <meshStandardMaterial color="#2a3b52" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function SiteBuilding({
  cx,
  cy,
  cz,
  w,
  d,
  h,
}: {
  cx: number;
  cy: number;
  cz: number;
  w: number;
  d: number;
  h: number;
}) {
  return (
    <group position={[cx, cy, cz]}>
      {/* Plinth */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[w + 0.4, 0.3, d + 0.4]} />
        <meshStandardMaterial color="#27405c" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Main mass */}
      <mesh position={[0, 0.3 + h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color="#7cc0ff"
          metalness={0.5}
          roughness={0.22}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Window grille bands */}
      {[0, 1, 2].map((i) => {
        const yy = 0.34 + ((0.9 + i * 0.42) % h);
        return (
          <mesh key={i} position={[0, yy, 0]}>
            <boxGeometry args={[w + 0.04, 0.05, d + 0.04]} />
            <meshStandardMaterial color="#a5d3ff" metalness={0.35} roughness={0.25} />
          </mesh>
        );
      })}
      {/* Roof slab */}
      <mesh position={[0, h + 0.34, 0]}>
        <boxGeometry args={[w + 0.24, 0.14, d + 0.24]} />
        <meshStandardMaterial color="#5f7fa0" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Entrance mark */}
      <mesh position={[0, 0.5, d / 2 + 0.02]}>
        <boxGeometry args={[0.5, 0.55, 0.02]} />
        <meshStandardMaterial color="#dbeafe" metalness={0.3} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Tree({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#2a3a45" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.28, 12, 10]} />
        <meshStandardMaterial color="#1e4a3d" metalness={0.1} roughness={0.85} />
      </mesh>
    </group>
  );
}