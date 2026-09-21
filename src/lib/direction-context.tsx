"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Direction = "ltr" | "rtl";

const DirectionContext = createContext<Direction>("ltr");

export function DirectionProvider({
  value,
  children,
}: {
  value: Direction;
  children: ReactNode;
}) {
  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection(): Direction {
  return useContext(DirectionContext);
}

export function directionSign(dir: Direction): number {
  return dir === "rtl" ? -1 : 1;
}
