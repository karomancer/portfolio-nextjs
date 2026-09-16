/**
 * The slice of Materia Magica's generated backend types that the clock needs.
 * Upstream these are produced from the Laravel app's PHP data objects; here we
 * only carry the shapes the component actually reads, so the port has no
 * dependency on their codegen.
 */

export type AlyrianDateTimeData = {
  hours: number;
  minutes: number;
  dayOfWeek: number;
  year: number;
  month: number;
  day: number;
};

export const OMoonPhase = {
  FULL: 0,
  GIBBOUS_WANING: 1,
  HALF_WANING: 2,
  CRESCENT_WANING: 3,
  NEW: 4,
  CRESCENT_WAXING: 5,
  HALF_WAXING: 6,
  GIBBOUS_WAXING: 7,
} as const;

export type MoonPhase = (typeof OMoonPhase)[keyof typeof OMoonPhase];

export type MoonphaseData = {
  trigael: MoonPhase;
  marabah: MoonPhase;
  worldgateVnum1: number;
  worldgateVnum2: number;
  worldgateAreaName1: string;
  worldgateAreaName2: string;
  alyrianDateTimeData: AlyrianDateTimeData | null;
};

export const OGameStateInterval = {
  POLL_INTERVAL_MS: 300000,
  ALYRIAN_MINUTES_PER_POLL: 20,
} as const;
