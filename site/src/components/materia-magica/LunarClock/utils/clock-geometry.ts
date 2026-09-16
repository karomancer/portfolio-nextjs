import { TICK } from "../constants";

/**
 * Calculate hour hand rotation from Alyrian time.
 *
 * Formula explanation:
 * - (hour + 6): Offset because Alyrian noon (12:00) should point up (0°),
 *   but our coordinate system has 0° at 6 o'clock position (because of the asset orientation)
 * - * 60 + minute: Convert to total minutes for smooth hour hand movement
 * - * (TICK / 12): Scale to rotation radians (hour hand moves 1/12th as
 *   fast as minute hand since it completes one rotation in 12 hours)
 *
 * @param hour - Alyrian hour (0-23)
 * @param minute - Alyrian minute (0-59)
 * @returns Rotation in radians
 */
export const getHourHandRadians = (hour: number, minute: number) =>
  ((hour + 6) * 60 + minute) * (TICK / 12);

/**
 * Calculate minute hand rotation from Alyrian time.
 *
 * Calculation pretty similar to the above for hours, but for minutes. Asset rotation is still a factor.
 *
 * @param minute - Alyrian minute (0-59), can exceed 59 for time calculations
 * @param hour - Optional hour offset for future time calculations
 * @returns Rotation in radians
 */
export const getMinuteHandRadians = (minute: number, hour?: number) =>
  (minute + 30 + (hour ? hour * 60 : 0)) * TICK;

/**
 * Calculate the ending rotation angle for a shutter blade.
 *
 * The iris shutter has multiple blades that rotate to close. Each blade
 * rotates to a staggered position to create the iris effect.
 *
 * @param bladeIndex - Index of the blade (0 to numBlades-1)
 * @returns Rotation in radians for the closed position
 */
export const getBladeEndAngle = (bladeIndex: number) =>
  (Math.PI * (bladeIndex + 1)) / 5 + Math.PI / 10;
