/**
 * Pure utility functions for animations.
 * Extracted for testability - these have no PixiJS dependencies.
 */

import WORLDGATE_DATA from "../generated-worldgate-data.json";

/**
 * Linear interpolation between two values.
 * @see https://en.wikipedia.org/wiki/Linear_interpolation
 *
 * @param start - Starting value
 * @param end - Ending value
 * @param progress - Progress between 0 and 1
 * @returns Interpolated value
 */
export const lerp = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

/**
 * Ease-out cubic easing function.
 * Starts fast, decelerates towards the end.
 *
 * @param t - Progress between 0 and 1
 * @returns Eased progress
 */
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Ease-in-out cubic easing function.
 * Starts slow, accelerates, then decelerates.
 *
 * @param t - Progress between 0 and 1
 * @returns Eased progress
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Find the index of a worldgate in the data array by its vnum.
 *
 * @param vnum - The unique identifier for the worldgate
 * @returns Index in WORLDGATE_DATA array, or -1 if not found
 */
export const getPortalIndexByVnum = (vnum: number) =>
  WORLDGATE_DATA.findIndex((portal) => portal.vnum === vnum);
