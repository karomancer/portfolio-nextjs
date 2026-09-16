import { FillGradient } from "pixi.js";
import { OGameStateInterval } from "./game-types";

export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = MS_PER_SECOND * 60;

export const SIZE = 600;
export const APERTURE_PROPORTION = 0.7;
export const APERTURE_SIZE = APERTURE_PROPORTION * SIZE;

// In game time is 4x real life time, so 15 real life seconds = 1 game minute
export const RL_MS_TO_GAME_MINUTE =
  OGameStateInterval.POLL_INTERVAL_MS /
  OGameStateInterval.ALYRIAN_MINUTES_PER_POLL;

export const TICK = (6 * Math.PI) / 180; // 6 degrees; amount of each minute tick

// Duration for all slider-triggered animations to complete in sync
export const TRANSITION_DURATION_MS = 3600;

// Shutter animation timing (as proportion of total transition)
export const SHUTTER_CLOSE_END = 0.35;
export const SHUTTER_OPEN_START = 0.65;
export const BLADE_STAGGER_FACTOR = 0.4;

// Slider tick interval in IRL minutes
export const SLIDER_TICK_MINUTES = 30;

export const MASK_GRADIENT = new FillGradient({
  type: "linear",
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  colorStops: [
    { offset: 0, color: "#A0522D" },
    { offset: 0.1, color: "#a38d37" },
    { offset: 0.5, color: "#ffffff" },
    { offset: 0.9, color: "#a38d37" },
    { offset: 1, color: "#A0522D" },
  ],
  textureSpace: "local",
});

export const DRUM_GRADIENT = new FillGradient({
  type: "linear",
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
  colorStops: [
    { offset: 0, color: "#2b1700" },
    { offset: 0.02, color: "#a38d37" },
    { offset: 0.5, color: "#FFFFFF" },
    { offset: 0.99, color: "#a38d37" },
    { offset: 1, color: "#A0522D" },
  ],
  textureSpace: "local",
});

// Circular slider constants
export const SLIDER_PADDING = 12;
export const SLIDER_WIDTH = SIZE + SLIDER_PADDING * 2; // 680px
export const SLIDER_TRACK_SIZE = 12;
export const SLIDER_KNOB_SIZE = 50;
export const GOLD_TEXTURE_SIZE = SIZE + 2 * SLIDER_TRACK_SIZE;
