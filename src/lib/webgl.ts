let available: boolean | undefined;

/** Probe once and release the temporary GPU context, not once per render. */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  if (available !== undefined) return available;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    available = !!context;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    available = false;
  }
  return available;
}

export function getDeviceQuality(): "high" | "low" {
  if (typeof navigator === "undefined") return "high";
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return (navigator.hardwareConcurrency ?? 8) <= 4 || (memory !== undefined && memory <= 4) ? "low" : "high";
}
