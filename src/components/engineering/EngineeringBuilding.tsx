"use client";

import { BuildingShell } from "./scene/BuildingShell";
import { StructuralLayer } from "./scene/StructuralLayer";
import { HVACLayer } from "./scene/HVACLayer";
import { ElectricalLayer } from "./scene/ElectricalLayer";
import { PlumbingLayer } from "./scene/PlumbingLayer";
import { FireFightingLayer } from "./scene/FireFightingLayer";
import { InfrastructureLayer } from "./scene/InfrastructureLayer";
import { SolarLayer } from "./scene/SolarLayer";
import type { EngineeringLayerId } from "@/data/engineering-core";

/**
 * Full building with all 8 discipline layers rendered simultaneously.
 * Each layer decides its own opacity target based on whether it is
 * the active selection (useGroupFade dampens in useFrame).
 */
export function EngineeringBuilding({
  activeLayer,
}: {
  activeLayer: EngineeringLayerId;
}) {
  return (
    <group>
      {/* Shell is always the outermost; visible at 14% when others active */}
      <BuildingShell active={activeLayer === "architecture"} baseOpacity={0.14} />
      <StructuralLayer active={activeLayer === "civil"} />
      <HVACLayer active={activeLayer === "hvac"} />
      <ElectricalLayer active={activeLayer === "electrical"} />
      <PlumbingLayer active={activeLayer === "plumbing"} />
      <FireFightingLayer active={activeLayer === "fire"} />
      <InfrastructureLayer active={activeLayer === "infrastructure"} />
      <SolarLayer active={activeLayer === "solar"} />
    </group>
  );
}