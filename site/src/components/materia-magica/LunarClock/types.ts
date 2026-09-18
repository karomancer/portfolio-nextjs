import { MoonphaseData } from "./game-types";
import { Container, Sprite } from "pixi.js";
import { MotionBlurFilter } from "pixi-filters";

export enum MoonPhaseIndex {
  "full" = 0,
  "gibbous waning" = 1,
  "half waning" = 2,
  "crescent waning" = 3,
  "new" = 4,
  "crescent waxing" = 5,
  "half waxing" = 6,
  "gibbous waxing" = 7,
}

// Convert a moon phase number (0-7) to its display name
export const getMoonPhaseName = (phase: number): string => {
  const names: Record<number, string> = {
    0: "full",
    1: "gibbous waning",
    2: "half waning",
    3: "crescent waning",
    4: "new",
    5: "crescent waxing",
    6: "half waxing",
    7: "gibbous waxing",
  };
  return names[phase] ?? "unknown";
};

export const MoonPhaseRadians: Record<number, number> = {
  0: (1 / 2) * Math.PI, // 90 degrees
  1: (5 / 8) * Math.PI, // 112.5 degrees
  2: (3 / 4) * Math.PI, // 135 degrees
  3: (7 / 8) * Math.PI, // 157.5 degrees
  4: Math.PI, // 0 degrees/180 degrees
  5: (1 / 8) * Math.PI, // 22.5 degrees
  6: (1 / 4) * Math.PI, // 45 degrees
  7: (3 / 8) * Math.PI, // 67.5 degrees
};

// I know, I know...
// Elsewhere in the codebase, this type may not include the time but this one def requires it
export type MoonphaseDataWithDateTime = Required<
  Pick<MoonphaseData, "alyrianDateTimeData">
> &
  Omit<MoonphaseData, "alyrianDateTimeData">;

export interface ClockElements {
  marabah: Sprite;
  trigael: Sprite;
  hourHand: Sprite;
  minuteHand: Sprite;
  minuteHandBlur: MotionBlurFilter;
  spellRegenCounter: Container[];
  // Container of length 2 for left/right portals
  // Each Container has 3 children: tileSprite (0), filteredSprite (1), shutter (2)
  portalTiles: Container[];
  portalCounter: Container[];
}
