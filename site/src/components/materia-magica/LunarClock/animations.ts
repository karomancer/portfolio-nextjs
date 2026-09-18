import { Assets, Container, Sprite } from "pixi.js";
import { ClockElements } from "./types";
import {
  APERTURE_SIZE,
  BLADE_STAGGER_FACTOR,
  MS_PER_MINUTE,
  SHUTTER_CLOSE_END,
  SHUTTER_OPEN_START,
  TICK,
  TRANSITION_DURATION_MS,
} from "./constants";
import { getMinuteHandRadians, getBladeEndAngle } from "./utils/clock-geometry";
import {
  easeInOutCubic,
  easeOutCubic,
  getPortalIndexByVnum,
  lerp,
} from "./utils/animation-utils";
import {
  updateAlyrianDateTimeData,
  updateGameTime,
  AnimationState,
} from "./utils/time-utils";

// Re-export for backwards compatibility
export { updateAlyrianDateTimeData, updateGameTime };
export type { AnimationState };
import { getPortalCounterY, getSpellRegenCounterY } from "./rendering";
import { getSpellRegenFromMoonphase } from "./utils/spell-regen-utils";
import {
  MoonphaseDataWithDateTime,
  MoonPhaseIndex,
  MoonPhaseRadians,
} from "./types";
import { getDiffInMsBetweenAlyrianDates } from "./game-time";
import { worldgateTileTextures } from "./textures/worldgate-tiles";

// State for synchronized slider transitions
// Start and end is needed to know how to lerp
export interface TransitionState {
  isTransitioning: boolean;
  startTime: number;
  // Hand positions
  startMinuteRotation: number;
  endMinuteRotation: number;
  startHourRotation: number;
  endHourRotation: number;
  // Total rotation distance (for motion blur scaling)
  // Total Claude invention
  totalRotationDistance: number;
  // Moon positions
  startTrigaelRotation: number;
  endTrigaelRotation: number;
  startMarabahRotation: number;
  endMarabahRotation: number;
  // Spell regen counter positions (3 digits)
  startSpellRegenY: number[];
  endSpellRegenY: number[];
  // Portal counter positions (2 drums)
  startPortalY: number[];
  endPortalY: number[];
  // Portal tiles
  startPortalTilesVnums: [number, number];
  endPortalTilesVnums: [number, number];
  // Track if tiles have been swapped mid-transition
  portalTilesSwapped: [boolean, boolean];
}

export const createTransitionState = (): TransitionState => ({
  isTransitioning: false,
  startTime: 0,
  startMinuteRotation: 0,
  endMinuteRotation: 0,
  startHourRotation: 0,
  endHourRotation: 0,
  totalRotationDistance: 0,
  startTrigaelRotation: 0,
  endTrigaelRotation: 0,
  startMarabahRotation: 0,
  endMarabahRotation: 0,
  startSpellRegenY: [0, 0, 0],
  endSpellRegenY: [0, 0, 0],
  startPortalY: [0, 0],
  endPortalY: [0, 0],
  startPortalTilesVnums: [0, 0],
  endPortalTilesVnums: [0, 0],
  portalTilesSwapped: [false, false],
});

const calculateMoonRotationEnd = (
  startRotation: number,
  targetPhaseIndex: MoonPhaseIndex,
  direction: number,
): number => {
  const targetRotation = MoonPhaseRadians[targetPhaseIndex];

  // For moon phases, rotation is between 0 and PI
  // We need to handle the wrap-around case
  // Use targetRotation value instead of index to correctly handle phase 0 (at exactly π/2)
  if (direction === 1) {
    // Moving forward in time
    // Wrap through PI when going from upper half (> π/2) to lower half (< π/2)
    if (targetRotation < Math.PI / 2 && startRotation > Math.PI / 2) {
      return targetRotation + Math.PI;
    }
    return targetRotation;
  } else {
    // Moving backward in time
    // Wrap through 0 when going from lower half (< π/2) to upper half (> π/2)
    if (targetRotation > Math.PI / 2 && startRotation < Math.PI / 2) {
      return targetRotation - Math.PI;
    }
    return targetRotation;
  }
};

// Initialize a new transition with start and end positions
export const initializeTransition = (
  elements: ClockElements,
  targetMoonphaseData: MoonphaseDataWithDateTime,
  initialMoonphaseData: MoonphaseDataWithDateTime,
  direction: number,
): TransitionState => {
  const {
    minuteHand,
    hourHand,
    trigael,
    marabah,
    spellRegenCounter,
    portalCounter,
  } = elements;
  const minutesDiff =
    getDiffInMsBetweenAlyrianDates(
      initialMoonphaseData.alyrianDateTimeData!,
      targetMoonphaseData.alyrianDateTimeData!,
    ) / MS_PER_MINUTE;

  const endMinuteRotation = getMinuteHandRadians(
    initialMoonphaseData.alyrianDateTimeData!.minutes + minutesDiff,
    initialMoonphaseData.alyrianDateTimeData!.hours,
  );

  // Hour hand moves 1/12th as fast as minute hand
  const minuteRotationDiff = endMinuteRotation - minuteHand.rotation;
  const endHourRotation = hourHand.rotation + minuteRotationDiff / 12;

  // Calculate target moon rotations
  const trigaelIndex = targetMoonphaseData.trigael as MoonPhaseIndex;
  const marabahIndex = targetMoonphaseData.marabah as MoonPhaseIndex;

  const endTrigaelRotation = calculateMoonRotationEnd(
    trigael.rotation,
    trigaelIndex,
    direction,
  );
  const endMarabahRotation = calculateMoonRotationEnd(
    marabah.rotation,
    marabahIndex,
    direction,
  );

  // Calculate target spell regen positions
  const spellRegenValue = getSpellRegenFromMoonphase(
    targetMoonphaseData.trigael,
    targetMoonphaseData.marabah,
  );
  const endSpellRegenY = spellRegenValue.map((value) =>
    getSpellRegenCounterY(value),
  );

  // Calculate target portal positions
  const portalIndex1 = getPortalIndexByVnum(targetMoonphaseData.worldgateVnum1);
  const portalIndex2 = getPortalIndexByVnum(targetMoonphaseData.worldgateVnum2);

  // Calculate total rotation distance for motion blur scaling
  const totalRotationDistance = Math.abs(
    endMinuteRotation - minuteHand.rotation,
  );

  return {
    isTransitioning: true,
    startTime: performance.now(),
    startMinuteRotation: minuteHand.rotation,
    endMinuteRotation,
    startHourRotation: hourHand.rotation,
    endHourRotation,
    totalRotationDistance,
    startTrigaelRotation: trigael.rotation,
    endTrigaelRotation,
    startMarabahRotation: marabah.rotation,
    endMarabahRotation,
    startSpellRegenY: spellRegenCounter.map((c) => c.y),
    endSpellRegenY,
    startPortalY: portalCounter.map((c) => c.y),
    endPortalY: [
      getPortalCounterY(portalIndex1),
      getPortalCounterY(portalIndex2),
    ],
    // Use what's actually displayed on screen, not the React state
    startPortalTilesVnums: getCurrentDisplayedVnums(),
    endPortalTilesVnums: [
      targetMoonphaseData.worldgateVnum1,
      targetMoonphaseData.worldgateVnum2,
    ],
    portalTilesSwapped: [false, false],
  };
};

// Animate portal iris shutter blades during transitions
const animateShutterBlades = (
  portalTiles: Container[],
  transitionState: TransitionState,
  rawProgress: number,
): void => {
  for (let i = 0; i < portalTiles.length; i++) {
    const shutterContainer = portalTiles[i].children[2] as Container;
    const blades = shutterContainer.children;
    const numBlades = blades.length;
    const needsSwap =
      transitionState.startPortalTilesVnums[i] !==
      transitionState.endPortalTilesVnums[i];

    if (!needsSwap) continue;

    if (rawProgress < SHUTTER_CLOSE_END) {
      // Close phase: blades rotate in, all ending stacked at "closed" position
      const closeProgressRaw = rawProgress / SHUTTER_CLOSE_END;

      for (let b = 0; b < numBlades; b++) {
        // Stagger start times, but all finish together
        const bladeStartDelay =
          ((numBlades - 1 - b) / numBlades) * BLADE_STAGGER_FACTOR;
        const bladeProgress = Math.max(
          0,
          Math.min(
            1,
            (closeProgressRaw - bladeStartDelay) / (1 - bladeStartDelay),
          ),
        );
        const easedBladeProgress = easeInOutCubic(bladeProgress);
        const endBladeAngle = getBladeEndAngle(b);
        blades[b].rotation = lerp(0, endBladeAngle, easedBladeProgress);
      }
    } else if (rawProgress < SHUTTER_OPEN_START) {
      // Hold phase: all blades stay at closed position, tile swaps here behind the shutter
      if (!transitionState.portalTilesSwapped[i]) {
        loadAndDisplayTile(
          portalTiles[i],
          transitionState.endPortalTilesVnums[i],
          i,
        );
        transitionState.portalTilesSwapped[i] = true;
      }

      for (let b = 0; b < numBlades; b++) {
        blades[b].rotation = getBladeEndAngle(b);
      }
    } else {
      // Swap tiles if not done (in case we jumped past the hold phase)
      if (!transitionState.portalTilesSwapped[i]) {
        loadAndDisplayTile(
          portalTiles[i],
          transitionState.endPortalTilesVnums[i],
          i,
        );
        transitionState.portalTilesSwapped[i] = true;
      }

      // Open phase: blades rotate out, all ending stacked at "open" position
      const openProgressRaw =
        (rawProgress - SHUTTER_OPEN_START) / (1 - SHUTTER_OPEN_START);

      for (let b = 0; b < numBlades; b++) {
        // Stagger start times (reverse order), but all finish together
        const bladeStartDelay = (b / numBlades) * BLADE_STAGGER_FACTOR;
        const bladeProgress = Math.max(
          0,
          Math.min(
            1,
            (openProgressRaw - bladeStartDelay) / (1 - bladeStartDelay),
          ),
        );
        const easedBladeProgress = easeInOutCubic(bladeProgress);
        const endBladeAngle = getBladeEndAngle(b);
        blades[b].rotation = lerp(endBladeAngle, 0, easedBladeProgress);
      }
    }
  }
};

// Animate all elements based on transition progress
export const animateTransition = (
  elements: ClockElements,
  transitionState: TransitionState,
): boolean => {
  if (!transitionState.isTransitioning) {
    return false;
  }

  const {
    minuteHand,
    hourHand,
    trigael,
    marabah,
    spellRegenCounter,
    portalTiles,
    portalCounter,
  } = elements;
  const elapsed = performance.now() - transitionState.startTime;
  const rawProgress = Math.min(elapsed / TRANSITION_DURATION_MS, 1);
  const progress = easeOutCubic(rawProgress);

  minuteHand.rotation = lerp(
    transitionState.startMinuteRotation,
    transitionState.endMinuteRotation,
    progress,
  );
  hourHand.rotation = lerp(
    transitionState.startHourRotation,
    transitionState.endHourRotation,
    progress,
  );

  let trigaelRotation = lerp(
    transitionState.startTrigaelRotation,
    transitionState.endTrigaelRotation,
    progress,
  );
  let marabahRotation = lerp(
    transitionState.startMarabahRotation,
    transitionState.endMarabahRotation,
    progress,
  );

  // Normalize moon rotations to 0-PI range
  while (trigaelRotation > Math.PI) trigaelRotation -= Math.PI;
  while (trigaelRotation < 0) trigaelRotation += Math.PI;
  while (marabahRotation > Math.PI) marabahRotation -= Math.PI;
  while (marabahRotation < 0) marabahRotation += Math.PI;

  trigael.rotation = trigaelRotation;
  marabah.rotation = marabahRotation;

  for (let i = 0; i < spellRegenCounter.length; i++) {
    spellRegenCounter[i].y = lerp(
      transitionState.startSpellRegenY[i],
      transitionState.endSpellRegenY[i],
      progress,
    );
  }

  animateShutterBlades(portalTiles, transitionState, rawProgress);

  // Animate portal counters
  for (let i = 0; i < portalCounter.length; i++) {
    portalCounter[i].y = lerp(
      transitionState.startPortalY[i],
      transitionState.endPortalY[i],
      progress,
    );
  }

  // Return true if still animating
  return rawProgress < 1;
};

// Original animation functions for live mode (frame-based ticking)
export const animateSpellRegenCounter = (
  spellRegenCounter: Container[],
  currentMoonphaseData: MoonphaseDataWithDateTime,
): void => {
  const spellRegenValue = getSpellRegenFromMoonphase(
    currentMoonphaseData.trigael,
    currentMoonphaseData.marabah,
  );

  for (let i = 0; i < spellRegenCounter.length; i++) {
    const spellRegenDigit = spellRegenCounter[i];
    const targetY = getSpellRegenCounterY(spellRegenValue[i]);

    if (Math.round(spellRegenDigit.y) < Math.round(targetY)) {
      spellRegenDigit.y += (1 + i) * 0.5;
    } else if (Math.round(spellRegenDigit.y) > Math.round(targetY)) {
      spellRegenDigit.y -= (1 + i) * 0.5;
    }
  }
};

// Track current vnums (what's actually displayed on screen)
// This is used by initializeTransition to compare against target vnums
const currentVnums: [number, number] = [0, 0];

// Getter for currentVnums (used by initializeTransition)
export const getCurrentDisplayedVnums = (): [number, number] => [
  currentVnums[0],
  currentVnums[1],
];

// Reset currentVnums - must be called when component remounts to ensure
// tiles are loaded fresh (otherwise stale values may prevent texture loading)
export const resetCurrentVnums = (): void => {
  currentVnums[0] = 0;
  currentVnums[1] = 0;
};

const loadAndDisplayTile = async (
  container: Container,
  vnum: number,
  index: number,
) => {
  const texturePath = worldgateTileTextures[vnum];
  if (!texturePath) return;

  // Update currentVnums to track what's actually displayed
  currentVnums[index] = vnum;

  const texture = await Assets.load(texturePath);

  // tileSprite at index 0, filteredSprite (overlay) at index 1, shutter at index 2
  const [tileSprite, filteredSprite, _] = container.children as Sprite[];

  if (tileSprite && filteredSprite) {
    tileSprite.texture = texture;
    filteredSprite.texture = texture;
    // Scale to fit within semicircle diameter (APERTURE_SIZE / 3)
    const targetSize = APERTURE_SIZE / 3;
    const scale = Math.min(
      targetSize / texture.width,
      targetSize / texture.height,
    );
    tileSprite.scale.set(scale);
    filteredSprite.scale.set(scale);
  }
};

export const animatePortalTiles = (
  portalTiles: Container[],
  currentMoonphaseData: MoonphaseDataWithDateTime,
): void => {
  const vnums: [number, number] = [
    currentMoonphaseData.worldgateVnum1,
    currentMoonphaseData.worldgateVnum2,
  ];

  // Only update if vnums changed
  for (let i = 0; i < 2; i++) {
    if (vnums[i] !== currentVnums[i]) {
      loadAndDisplayTile(portalTiles[i], vnums[i], i);
    }
  }
};

export const animatePortalCounters = (
  portalCounter: Container[], // length 2
  currentMoonphaseData: MoonphaseDataWithDateTime,
): void => {
  const portalIndex1 = getPortalIndexByVnum(
    currentMoonphaseData.worldgateVnum1,
  );
  const portalIndex2 = getPortalIndexByVnum(
    currentMoonphaseData.worldgateVnum2,
  );
  const targetY1 = getPortalCounterY(portalIndex1);
  const targetY2 = getPortalCounterY(portalIndex2);

  if (Math.floor(portalCounter[0].y) < Math.floor(targetY1)) {
    portalCounter[0].y += 1;
  } else if (Math.floor(portalCounter[0].y) > Math.floor(targetY1)) {
    portalCounter[0].y -= 1;
  }

  if (Math.floor(portalCounter[1].y) < Math.floor(targetY2)) {
    portalCounter[1].y += 1;
  } else if (Math.floor(portalCounter[1].y) > Math.floor(targetY2)) {
    portalCounter[1].y -= 1;
  }
};

export const animateMoons = (
  marabah: Sprite,
  trigael: Sprite,
  currentMoonphaseData: MoonphaseDataWithDateTime,
  direction: number,
): boolean => {
  const quarterDegree = Math.PI / 180 / 4; // 0.25 degree in radians
  const trigaelIndex = currentMoonphaseData.trigael as MoonPhaseIndex;
  const marabahIndex = currentMoonphaseData.marabah as MoonPhaseIndex;

  const endingTrigaelRotation = MoonPhaseRadians[trigaelIndex];
  const endingMarabahRotation = MoonPhaseRadians[marabahIndex];

  const trigaelNeedsAnimation =
    (direction === 1 && trigael.rotation < endingTrigaelRotation) ||
    (direction === -1 && trigael.rotation > endingTrigaelRotation);

  const marabahNeedsAnimation =
    (direction === 1 && marabah.rotation < endingMarabahRotation) ||
    (direction === -1 && marabah.rotation > endingMarabahRotation);

  const trigaelWrappingForward =
    endingTrigaelRotation < Math.PI / 2 &&
    trigael.rotation > Math.PI / 2 &&
    direction === 1;

  const trigaelWrappingBackward =
    endingTrigaelRotation > Math.PI / 2 &&
    trigael.rotation < Math.PI / 2 &&
    direction === -1;

  const marabahWrappingForward =
    endingMarabahRotation < Math.PI / 2 &&
    marabah.rotation > Math.PI / 2 &&
    direction === 1;

  const marabahWrappingBackward =
    endingMarabahRotation > Math.PI / 2 &&
    marabah.rotation < Math.PI / 2 &&
    direction === -1;

  // Animate trigael
  if (
    trigaelNeedsAnimation ||
    trigaelWrappingForward ||
    trigaelWrappingBackward
  ) {
    trigael.rotation += quarterDegree * direction;

    // Check if we've overshot the target - snap to it instead of wrapping
    const trigaelOvershot =
      (direction === 1 &&
        trigael.rotation >= endingTrigaelRotation &&
        !trigaelWrappingForward) ||
      (direction === -1 &&
        trigael.rotation <= endingTrigaelRotation &&
        !trigaelWrappingBackward);

    if (trigaelOvershot) {
      trigael.rotation = endingTrigaelRotation;
    } else if (trigael.rotation > Math.PI) {
      trigael.rotation = 0;
    } else if (trigael.rotation < 0) {
      trigael.rotation = Math.PI;
    }
  } else {
    trigael.rotation = endingTrigaelRotation;
  }

  // Animate marabah
  if (
    marabahNeedsAnimation ||
    marabahWrappingForward ||
    marabahWrappingBackward
  ) {
    marabah.rotation += quarterDegree * direction;

    // Check if we've overshot the target - snap to it instead of wrapping
    const marabahOvershot =
      (direction === 1 &&
        marabah.rotation >= endingMarabahRotation &&
        !marabahWrappingForward) ||
      (direction === -1 &&
        marabah.rotation <= endingMarabahRotation &&
        !marabahWrappingBackward);

    if (marabahOvershot) {
      marabah.rotation = endingMarabahRotation;
    } else if (marabah.rotation > Math.PI) {
      marabah.rotation = 0;
    } else if (marabah.rotation < 0) {
      marabah.rotation = Math.PI;
    }
  } else {
    // Snap to exact target when animation is complete
    marabah.rotation = endingMarabahRotation;
  }

  const stillAnimating =
    trigaelNeedsAnimation ||
    marabahNeedsAnimation ||
    trigaelWrappingForward ||
    trigaelWrappingBackward ||
    marabahWrappingForward ||
    marabahWrappingBackward;

  return stillAnimating;
};

export const animateHands = (
  minuteHand: Sprite,
  hourHand: Sprite,
  initialMoonphaseData: MoonphaseDataWithDateTime,
  currentMoonphaseData: MoonphaseDataWithDateTime,
  direction: number,
): boolean => {
  const minutesDiff =
    getDiffInMsBetweenAlyrianDates(
      initialMoonphaseData.alyrianDateTimeData!,
      currentMoonphaseData.alyrianDateTimeData!,
    ) / MS_PER_MINUTE;

  const minuteHandRadians = getMinuteHandRadians(
    initialMoonphaseData.alyrianDateTimeData!.minutes + minutesDiff,
    initialMoonphaseData.alyrianDateTimeData!.hours,
  );

  // Check if we've reached the target based on direction
  const reachedTarget =
    (direction === 1 && minuteHand.rotation >= minuteHandRadians) ||
    (direction === -1 && minuteHand.rotation <= minuteHandRadians) ||
    minuteHand.rotation.toFixed(5) === minuteHandRadians.toFixed(5);

  if (!reachedTarget) {
    minuteHand.rotation += TICK * direction;
    hourHand.rotation += (TICK / 12) * direction;
    return true;
  }

  return false;
};
