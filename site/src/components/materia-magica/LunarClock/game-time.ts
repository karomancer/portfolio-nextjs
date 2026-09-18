/**
 * Helpers to parse Alyrian time format
 *
 * Expected format: "12:34 pm on Monday, January the 15th, year 1234."
 * Example: "3:45 am on Tuesday, March the 22nd, year 1456."
 */

import { RL_MS_TO_GAME_MINUTE } from "./constants";
import { AlyrianDateTimeData } from "./game-types";

// 250ms real time = 1 Alyrian second (since 15,000ms = 60 Alyrian seconds)
const MS_PER_ALYRIAN_SECOND = RL_MS_TO_GAME_MINUTE / 60; // 250

function formatHHMMSS(totalSeconds: number): string {
  if (totalSeconds <= 0) {
    return "00:00:00";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((n) => n.toString().padStart(2, "0"))
    .join(":");
}

export function formatAlyrianTimer(unixTimestamp: number): string {
  const remainingRealMs = unixTimestamp * 1000 - Date.now();
  const totalAlyrianSeconds = Math.floor(
    remainingRealMs / MS_PER_ALYRIAN_SECOND,
  );
  return formatHHMMSS(totalAlyrianSeconds);
}

export function formatRealTimer(unixTimestamp: number): string {
  const remainingRealMs = unixTimestamp * 1000 - Date.now();
  const totalSeconds = Math.floor(remainingRealMs / 1000);
  return formatHHMMSS(totalSeconds);
}

export function getOrdinalSuffix(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatAlyrianDateTimeData(
  alyrianDateTimeData: AlyrianDateTimeData,
) {
  const { dayOfWeek, month, day, year, hours, minutes } = alyrianDateTimeData;

  const hour12 = hours % 12 || 12;
  const minutesPadded = minutes.toString().padStart(2, "0");
  const period = hours < 12 ? "am" : "pm";

  // Turns out indexing works differently in the Date constructor, so be more manual with monthName
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];

  // Note: dayOfWeek is expected to be 0 (Sunday) through 6 (Saturday) based on the char* day_name[] in const.c in src
  const dayOfWeekName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][dayOfWeek];

  return `${hour12}:${minutesPadded} ${period} on ${dayOfWeekName}, ${monthName} the ${day + 1}${getOrdinalSuffix(day + 1)}, year ${year}.`;
}

export function getDiffInMsBetweenAlyrianDates(
  startDate: AlyrianDateTimeData,
  endDate: AlyrianDateTimeData,
): number {
  // Manual calculation to avoid JavaScript Date limitations with medieval dates
  const startTotalMinutes =
    startDate.year * 525600 + // minutes in a year (365 * 24 * 60)
    startDate.month * 43800 + // minutes in a month (30.5 * 24 * 60, average)
    startDate.day * 1440 + // minutes in a day (24 * 60)
    startDate.hours * 60 +
    startDate.minutes;

  const endTotalMinutes =
    endDate.year * 525600 +
    endDate.month * 43800 +
    endDate.day * 1440 +
    endDate.hours * 60 +
    endDate.minutes;

  return (endTotalMinutes - startTotalMinutes) * 60 * 1000; // Convert to milliseconds
}
