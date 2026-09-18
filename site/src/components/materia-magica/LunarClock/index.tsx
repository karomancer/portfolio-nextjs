// @TODO karina: Consider using the pixijs/react library to make this less terrible
import { useRef, useState, useMemo } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

import { MoonphaseDataWithDateTime } from "./types";
import {
  RL_MS_TO_GAME_MINUTE,
  SIZE,
  SLIDER_KNOB_SIZE,
  SLIDER_TRACK_SIZE,
  SLIDER_WIDTH,
  TRANSITION_DURATION_MS,
} from "./constants";
import {
  AnimationState,
  initializeTransition,
  updateAlyrianDateTimeData,
} from "./animations";

import styles from "./LunarClock.module.scss";
import SvgDefs from "./SvgDefs";
import { LunarClockDetailsCard } from "./LunarClockDetailsCard";
import { useMoonphasePolling } from "./hooks/useMoonphasePolling";
import { useLunarClockAnimation } from "./hooks/useLunarClockAnimation";
import { useLunarClockResponsive } from "./hooks/useLunarClockResponsive";
const backingTexture = "/optimized/portfolio/materia-magica/clock/backing.png";
const clockFaceTexture = "/optimized/portfolio/materia-magica/clock/clock-face.png";

const LunarClock = ({
  currentMoonphaseData: initialMoonphaseDataProp,
  futureMoonphaseData,
}: {
  currentMoonphaseData: MoonphaseDataWithDateTime;
  futureMoonphaseData?: MoonphaseDataWithDateTime[];
}) => {
  const astroContainerRef = useRef<HTMLDivElement>(null);
  const clockWrapperRef = useRef<HTMLDivElement>(null);

  // Base moonphase data from server - can be updated via polling
  const initialMoonphaseData = useRef<MoonphaseDataWithDateTime>(
    initialMoonphaseDataProp,
  );

  const currentMoonphaseData = useRef<MoonphaseDataWithDateTime>(
    initialMoonphaseDataProp,
  );

  const animationState = useRef<AnimationState>({
    moonphaseIndex: -1, // 0 - (n-1) for futureMoonphaseData, -1 for live
    direction: 1,
    elapsedMs: 0,
    lastMinuteUpdate: 0,
    deltaMinutes: 0,
    deltaHours: 0,
  });

  const sliderPositionRef = useRef<number>(-1);

  const [viewMode, setViewMode] = useState<"live" | "future">("live");
  const [futureIndex, setFutureIndex] = useState(0);

  // Future moonphase data - initialized from props but can be updated via polling
  const [futureMoonphaseDataState, setFutureMoonphaseDataState] =
    useState(futureMoonphaseData);

  // State to force re-render when time updates (for the time label)
  const [, forceUpdate] = useState<object>({});

  // Use custom hooks for animation, polling, and responsive behavior
  const { clockElementsRef, transitionStateRef, isLoaded } =
    useLunarClockAnimation({
      astroContainerRef,
      initialMoonphaseData,
      currentMoonphaseData,
      animationState,
      sliderPositionRef,
      forceUpdate,
    });

  const { clockScale } = useLunarClockResponsive(clockWrapperRef);

  useMoonphasePolling({
    initialMoonphaseData,
    currentMoonphaseData,
    animationState,
    sliderPositionRef,
    setFutureMoonphaseDataState,
  });

  // Create slider data array: ["live", "future-0", ..., "_max"]
  // Exclude the last future item (24h) so max is 23.5h
  // The "_max" dummy ensures the last real position renders at ~352° instead of 360°
  const sliderData = useMemo(() => {
    if (!futureMoonphaseDataState) return ["live", "_max"];
    // Slice off the last item (24h) - max selectable is now 23.5h
    const futureItems = futureMoonphaseDataState.slice(0, -1);
    return ["live", ...futureItems.map((_, i) => `future-${i}`), "_max"];
  }, [futureMoonphaseDataState]);

  // Calculate current slider index (0 = Live, 1+ = future indices)
  const currentDataIndex = useMemo(() => {
    return viewMode === "live" ? 0 : futureIndex + 1;
  }, [viewMode, futureIndex]);

  // Handle slider changes
  const handleSliderChange = (value: string | number) => {
    // Block the dummy max item
    if (value === "_max") {
      return;
    }

    // CircularSlider passes the data value (string), not the index
    // Parse it to determine the moonphase index
    let moonphaseIndex: number;
    if (value === "live") {
      moonphaseIndex = -1;
    } else if (typeof value === "string" && value.startsWith("future-")) {
      moonphaseIndex = parseInt(value.replace("future-", ""), 10);
    } else {
      // Fallback: try parsing as number (shouldn't happen)
      moonphaseIndex = typeof value === "number" ? value - 1 : -1;
    }

    if (moonphaseIndex === -1) {
      setViewMode("live");
    } else {
      setViewMode("future");
      setFutureIndex(moonphaseIndex);
    }

    sliderPositionRef.current = moonphaseIndex;
    nextPhase(moonphaseIndex);
  };

  // Handle keyboard slider changes (for hidden input accessibility)
  const handleKeyboardSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rangeValue = parseInt(e.target.value);
    // Convert range value (-1 to length-1) to slider data value
    const sliderValue = rangeValue === -1 ? "live" : `future-${rangeValue}`;
    handleSliderChange(sliderValue);
  };

  const goLive = () => {
    setViewMode("live");
    sliderPositionRef.current = -1;
    nextPhase(-1);
  };

  const nextPhase = (index?: number) => {
    if (futureMoonphaseDataState) {
      if (index !== undefined) {
        animationState.current.direction = Math.sign(
          index - animationState.current.moonphaseIndex,
        );
        animationState.current.moonphaseIndex = index;
      } else {
        animationState.current.direction = 1;
        animationState.current.moonphaseIndex++;
      }

      // When going to live mode, predict where time will be at end of animation
      const predictedExtraMinutes =
        index === -1
          ? Math.floor(TRANSITION_DURATION_MS / RL_MS_TO_GAME_MINUTE)
          : 0;

      const targetMoonphaseData =
        index == -1
          ? {
              ...initialMoonphaseData.current,
              alyrianDateTimeData: updateAlyrianDateTimeData(
                initialMoonphaseData.current.alyrianDateTimeData!,
                animationState.current.deltaMinutes + predictedExtraMinutes,
                animationState.current.deltaHours,
              ),
            }
          : {
              ...futureMoonphaseDataState[
                animationState.current.moonphaseIndex
              ],
              alyrianDateTimeData: updateAlyrianDateTimeData(
                futureMoonphaseDataState[animationState.current.moonphaseIndex]
                  .alyrianDateTimeData!,
                animationState.current.deltaMinutes,
                animationState.current.deltaHours,
              ),
            };

      // Initialize synchronized transition if clock elements are available
      if (clockElementsRef.current) {
        transitionStateRef.current = initializeTransition(
          clockElementsRef.current,
          targetMoonphaseData,
          initialMoonphaseData.current,
          animationState.current.direction,
        );
      }

      currentMoonphaseData.current = targetMoonphaseData;
    }
  };

  return (
    <div className={styles.root}>
      <SvgDefs
        currentDataIndex={currentDataIndex}
        sliderDataLength={sliderData.length}
      />

      {/* Hidden range input for keyboard accessibility */}
      {futureMoonphaseDataState && (
        <input
          type="range"
          id="time"
          name="time"
          min="-1"
          max={futureMoonphaseDataState.length - 1}
          step="1"
          value={viewMode === "live" ? -1 : futureIndex}
          onChange={handleKeyboardSliderChange}
          className={styles.srOnly}
          aria-label="Time slider"
        />
      )}

      {/* Responsive scaling wrapper for the clock */}
      <div
        ref={clockWrapperRef}
        className={styles.wrapper}
        style={{ maxWidth: SLIDER_WIDTH, height: SLIDER_WIDTH * clockScale }}
      >
        <div
          className={styles.stage}
          style={{
            width: SLIDER_WIDTH,
            height: SLIDER_WIDTH,
            transform: `scale(${clockScale})`,
          }}
        >
          {/* Stopwatch crown - Go Live button at 12 o'clock */}
          <button
            onClick={goLive}
            disabled={!isLoaded}
            className={`${styles.crownButton} ${viewMode !== "live" ? styles.notLive : ""} ${
              !isLoaded
                ? styles.crownDisabled
                : viewMode === "live"
                  ? styles.crownLive
                  : styles.crownFuture
            }`}
            aria-label="Go to live time"
            title={
              !isLoaded
                ? "Loading..."
                : viewMode === "live"
                  ? "Currently live"
                  : "Return to live time"
            }
          />
          {/* Circular slider wrapper */}
          {futureMoonphaseDataState && (
            <div
              className={`${styles.circularTrack} ${
                !isLoaded ? styles.trackLoading : ""
              }`}
            >
              <CircularSlider
                width={SLIDER_WIDTH}
                dataIndex={currentDataIndex}
                data={sliderData}
                onChange={handleSliderChange}
                knobColor="#9b8252"
                knobSize={SLIDER_KNOB_SIZE}
                progressColorFrom="#9b8252"
                progressColorTo="#e5d89b"
                progressSize={SLIDER_TRACK_SIZE}
                trackColor="#0f193d"
                trackSize={SLIDER_TRACK_SIZE}
                progressLineCap="butt"
                hideLabelValue
              />
            </div>
          )}
          <div
            className={styles.astro}
            style={{
              width: SIZE,
              height: SIZE,
              left: (SLIDER_WIDTH - SIZE) / 2,
              top: (SLIDER_WIDTH - SIZE) / 2,
            }}
            ref={astroContainerRef}
          >
            {/* Placeholder while PixiJS canvas loads */}
            {!isLoaded && (
              <div className={styles.loadingShimmer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={backingTexture}
                  alt=""
                  className={styles.placeholderImg}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={clockFaceTexture}
                  alt=""
                  className={styles.placeholderImgOverlay}
                />
                <div className={styles.placeholderText}>
                  <span className={styles.placeholderLabel}>
                    Loading current game state...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LunarClockDetailsCard
        currentMoonphaseData={currentMoonphaseData.current}
        viewMode={viewMode}
        futureIndex={futureIndex}
      />
    </div>
  );
};

export default LunarClock;
