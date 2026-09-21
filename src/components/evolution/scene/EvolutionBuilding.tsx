"use client";

import { useRef, useLayoutEffect } from "react";
import { BuildingShell } from "../../engineering/scene/BuildingShell";
import { StructuralLayer } from "../../engineering/scene/StructuralLayer";
import { HVACLayer } from "../../engineering/scene/HVACLayer";
import { ElectricalLayer } from "../../engineering/scene/ElectricalLayer";
import { PlumbingLayer } from "../../engineering/scene/PlumbingLayer";
import { FireFightingLayer } from "../../engineering/scene/FireFightingLayer";
import { BlueprintStage } from "./BlueprintStage";
import { TechnicalStage } from "./TechnicalStage";
import { ProcurementStage } from "./ProcurementStage";
import { FinishingStage } from "./FinishingStage";
import { computeStageDrives } from "./stageDrivers";

/**
 * The evolving building. Stage overlays (blueprint / technical /
 * procurement / finishing) are animated on top of the reused Phase-3
 * discipline layers. Every layer targets the selected stage's fixed
 * drive profile — the click, not the scroll, controls the 3D state.
 */
export function EvolutionBuilding({
  stageIndex,
  reduced = false,
}: {
  stageIndex: number;
  reduced?: boolean;
}) {
  const shell = useRef(0);
  const struct = useRef(0);
  const hvac = useRef(0);
  const elec = useRef(0);
  const plumb = useRef(0);
  const fire = useRef(0);
  const blueprint = useRef(0);
  const tech = useRef(0);
  const proc = useRef(0);
  const finish = useRef(0);

  useLayoutEffect(() => {
    const d = computeStageDrives(stageIndex);
    shell.current = d.shell;
    struct.current = d.struct;
    hvac.current = d.hvac;
    elec.current = d.elec;
    plumb.current = d.plumb;
    fire.current = d.fire;
    blueprint.current = d.blueprint;
    tech.current = d.tech;
    proc.current = d.proc;
    finish.current = d.finish;
  }, [stageIndex]);

  const constructed = stageIndex >= 4;
  const mepInstalled = stageIndex >= 5;

  return (
    <group>
      <BlueprintStage drive={blueprint} reduced={reduced} />
      <TechnicalStage drive={tech} />
      <ProcurementStage
        drive={proc}
        active={stageIndex === 3}
        reduced={reduced}
      />
      <FinishingStage drive={finish} />

      <BuildingShell active={constructed} baseOpacity={0.18} drive={shell} />
      <StructuralLayer active={constructed} drive={struct} />
      <HVACLayer active={mepInstalled} drive={hvac} />
      <ElectricalLayer active={mepInstalled} drive={elec} />
      <PlumbingLayer active={mepInstalled} drive={plumb} />
      <FireFightingLayer active={mepInstalled} drive={fire} />
    </group>
  );
}