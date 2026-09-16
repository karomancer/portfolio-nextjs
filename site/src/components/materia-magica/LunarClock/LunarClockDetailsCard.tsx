import { useState } from "react";
import { DateTime } from "luxon";
import { formatAlyrianDateTimeData, getOrdinalSuffix } from "./game-time";
import { MoonphaseDataWithDateTime, getMoonPhaseName } from "./types";
import { getSpellRegenFromMoonphase } from "./utils/spell-regen-utils";
import { SLIDER_TICK_MINUTES } from "./constants";
import styles from "./LunarClock.module.scss";

interface LunarClockDetailsCardProps {
  currentMoonphaseData: MoonphaseDataWithDateTime;
  viewMode: "live" | "future";
  futureIndex: number;
}

const formatIRLDateTime = (dt: DateTime) =>
  `${dt.toFormat("h:mm")} ${dt.hour < 12 ? "am" : "pm"} on ${dt.toFormat("EEEE, MMMM")} ${dt.day}${getOrdinalSuffix(dt.day)}, ${dt.year}.`;

/**
 * Component that displays the time information panel below the clock.
 * Shows both local (IRL) time and Alyrian game time, with expandable details
 * about moon phases, worldgates, and spell regeneration.
 */
export function LunarClockDetailsCard({
  currentMoonphaseData,
  viewMode,
  futureIndex,
}: LunarClockDetailsCardProps) {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const date = DateTime.now();
  const futureDate = date.plus({
    minutes: (futureIndex + 1) * SLIDER_TICK_MINUTES,
  });
  const willBe = viewMode !== "live" ? " will be " : null;

  const clockExtraDetails = (
    <div
      id="lunar-clock-extra-details"
      className={`${styles.details} ${
        isInfoExpanded ? styles.detailsOpen : styles.detailsClosed
      }`}
    >
      <ul>
        <li>
          Trigael {willBe || "is"}{" "}
          <strong>{getMoonPhaseName(currentMoonphaseData.trigael)}</strong>
        </li>
        <li>
          Marabah {willBe || "is"}{" "}
          <strong>{getMoonPhaseName(currentMoonphaseData.marabah)}</strong>
        </li>
        <li>
          Worldgates {willBe} in{" "}
          <strong>{currentMoonphaseData.worldgateAreaName1}</strong> and{" "}
          <strong>{currentMoonphaseData.worldgateAreaName2}</strong>
        </li>
        <li>
          Base spell regeneration {willBe || "is"} at{" "}
          <strong>
            {parseInt(
              getSpellRegenFromMoonphase(
                currentMoonphaseData.trigael,
                currentMoonphaseData.marabah,
              ).join(""),
            )}
            %
          </strong>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={styles.card}>
      <label
        htmlFor="time"
        className={styles.panel}
      >
        <strong className={styles.labelHead}>
          Local time
          <sup className={styles.badge}>
            {viewMode === "live" ? (
              <span className={styles.live}>
                LIVE
              </span>
            ) : (
              `+${Math.floor((futureIndex + 1) / 2) || ""}${(futureIndex + 1) % 2 ? "½" : ""}h`
            )}
          </sup>
        </strong>
        <p className={styles.value}>
          {formatIRLDateTime(viewMode === "live" ? date : futureDate)}
        </p>

        {/* Always visible: Alyrian time */}
        <strong className={`${styles.labelHead} ${styles.labelHeadSecond}`}>
          Alyrian time
        </strong>
        <div className={styles.value}>
          {formatAlyrianDateTimeData(currentMoonphaseData.alyrianDateTimeData!)}
          {!isInfoExpanded && (
            <button
              className={`${styles.toggle} ${styles.toggleInline}`}
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
            >
              [more…]
            </button>
          )}
          {clockExtraDetails}
          {isInfoExpanded && (
            <button
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              className={styles.toggle}
              aria-expanded={isInfoExpanded}
              aria-controls="lunar-clock-extra-details"
            >
              [hide details]
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
