/**
 * Pure utility functions for Alyrian time calculations.
 * Extracted for testability
 */

import { AlyrianDateTimeData } from "../game-types";
import { RL_MS_TO_GAME_MINUTE } from "../constants";

/**
 * Animation state for tracking time progression.
 */
export interface AnimationState {
  moonphaseIndex: number;
  direction: number;
  elapsedMs: number;
  lastMinuteUpdate: number;
  deltaMinutes: number;
  deltaHours: number;
}

/**
 * Update Alyrian date/time data by adding delta minutes and hours.
 * Handles minute overflow to hours correctly.
 *
 * @param dateTimeData - Current date/time data
 * @param deltaMinutes - Minutes to add
 * @param deltaHours - Hours to add
 * @returns Updated date/time data
 */
export const updateAlyrianDateTimeData = (
  dateTimeData: AlyrianDateTimeData,
  deltaMinutes: number,
  deltaHours: number,
): AlyrianDateTimeData => {
  const totalMinutes = dateTimeData.minutes + deltaMinutes;
  const totalHours = dateTimeData.hours + deltaHours;

  // Handle minute overflow
  const newMinutes = totalMinutes % 60;
  const extraHours = Math.floor(totalMinutes / 60);

  // Handle hour overflow (24-hour clock)
  const newHours = totalHours + extraHours;

  return {
    ...dateTimeData,
    minutes: newMinutes,
    hours: newHours,
  };
};

/**
 * Update game time based on real elapsed time.
 * Converts real-time milliseconds to in-game time progression.
 *
 * @param state - Current animation state
 * @param elapsedMS - Real-time milliseconds elapsed since last update
 * @returns Updated animation state
 */
export const updateGameTime = (
  state: AnimationState,
  elapsedMS: number,
): AnimationState => {
  const newElapsedMs = state.elapsedMs + elapsedMS;

  // Check if enough time has passed for a game minute
  if (newElapsedMs - state.lastMinuteUpdate >= RL_MS_TO_GAME_MINUTE) {
    let newDeltaMinutes = state.deltaMinutes + 1;
    let newDeltaHours = state.deltaHours;

    if (newDeltaMinutes === 60) {
      newDeltaMinutes = 0;
      newDeltaHours++;
    }

    return {
      ...state,
      elapsedMs: newElapsedMs,
      lastMinuteUpdate: newElapsedMs,
      deltaMinutes: newDeltaMinutes,
      deltaHours: newDeltaHours,
    };
  }

  return {
    ...state,
    elapsedMs: newElapsedMs,
  };
};

/**
 * Create initial animation state.
 */
export const createAnimationState = (): AnimationState => ({
  moonphaseIndex: -1,
  direction: 1,
  elapsedMs: 0,
  lastMinuteUpdate: 0,
  deltaMinutes: 0,
  deltaHours: 0,
});
