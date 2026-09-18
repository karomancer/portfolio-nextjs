import { MoonPhaseIndex } from "../types";

// Logic from get_moon_affect_multiplier method in stellar.c in src/src
export const getSpellRegenFromMoonphase = (
  trigael: number,
  marabah: number,
) => {
  let multiplier = 0;

  switch (trigael) {
    case MoonPhaseIndex["full"]:
      multiplier += 1.15;
      break;
    case MoonPhaseIndex["gibbous waning"]:
      multiplier += 1;
      break;
    case MoonPhaseIndex["half waning"]:
      multiplier += 1;
      break;
    case MoonPhaseIndex["crescent waning"]:
      multiplier += 0.9;
      break;
    case MoonPhaseIndex["new"]:
      multiplier += 0.8;
      break;
    case MoonPhaseIndex["crescent waxing"]:
      multiplier += 0.9;
      break;
    case MoonPhaseIndex["half waxing"]:
      multiplier += 1;
      break;
    case MoonPhaseIndex["gibbous waxing"]:
      multiplier += 1;
      break;
  }

  switch (marabah) {
    case MoonPhaseIndex["full"]:
      multiplier += 0.15;
      break;
    case MoonPhaseIndex["gibbous waning"]:
      multiplier += 0.08;
      break;
    case MoonPhaseIndex["half waning"]:
      multiplier += 0.05;
      break;
    case MoonPhaseIndex["crescent waning"]:
      multiplier -= 0.05;
      break;
    case MoonPhaseIndex["new"]:
      multiplier -= 0.2;
      break;
    case MoonPhaseIndex["crescent waxing"]:
      multiplier -= 0.05;
      break;
    case MoonPhaseIndex["half waxing"]:
      multiplier += 0.05;
      break;
    case MoonPhaseIndex["gibbous waxing"]:
      multiplier += 0.08;
      break;
  }

  // Skipping extra logic for race and location since it cannot be determined here

  // Equivalent of URANGE macro in C
  // Clamp the multiplier between 0.5 and 1.5
  const clamped = Math.round(Math.min(1.5, Math.max(0.5, multiplier)) * 100);
  return String(clamped).padStart(3, "0").split("").map(Number);
};
