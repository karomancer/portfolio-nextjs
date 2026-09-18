import {
  useEffect,
  useRef,
  useState,
  RefObject,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { Application } from "pixi.js";
import { ClockElements, MoonphaseDataWithDateTime } from "../types";
import { SIZE, TRANSITION_DURATION_MS } from "../constants";
import {
  createMinuteHandBlurFilter,
  drawAperture,
  drawBackground,
  drawCenterButton,
  drawClockface,
  drawHourHand,
  drawMarabah,
  drawMinutehand,
  drawPortalCounters,
  drawPortalTiles,
  drawSpellRegenCounters,
  drawTrigael,
  initializeAssets,
  updateMinuteHandBlur,
} from "../rendering";
import {
  animateHands,
  animateMoons,
  animatePortalCounters,
  animatePortalTiles,
  animateSpellRegenCounter,
  animateTransition,
  AnimationState,
  createTransitionState,
  resetCurrentVnums,
  TransitionState,
  updateAlyrianDateTimeData,
  updateGameTime,
} from "../animations";
import { getMinuteHandRadians } from "../utils/clock-geometry";
import { teardownPixiApp } from "../pixi-app-teardown";

interface UseLunarClockAnimationParams {
  astroContainerRef: RefObject<HTMLDivElement | null>;
  initialMoonphaseData: MutableRefObject<MoonphaseDataWithDateTime>;
  currentMoonphaseData: MutableRefObject<MoonphaseDataWithDateTime>;
  animationState: MutableRefObject<AnimationState>;
  sliderPositionRef: MutableRefObject<number>;
  forceUpdate: Dispatch<SetStateAction<object>>;
}

interface UseLunarClockAnimationReturn {
  appRef: MutableRefObject<Application | null>;
  clockElementsRef: MutableRefObject<ClockElements | null>;
  transitionStateRef: MutableRefObject<TransitionState>;
  prevMinuteRotationRef: MutableRefObject<number>;
  isLoaded: boolean;
}

/**
 * Hook that handles PixiJS application setup, animation ticker, and cleanup.
 * Manages all the clock's visual animations including hands, moons, counters, and portal tiles.
 */
export function useLunarClockAnimation({
  astroContainerRef,
  initialMoonphaseData,
  currentMoonphaseData,
  animationState,
  sliderPositionRef,
  forceUpdate,
}: UseLunarClockAnimationParams): UseLunarClockAnimationReturn {
  const appRef = useRef<Application | null>(null);
  const clockElementsRef = useRef<ClockElements | null>(null);
  const transitionStateRef = useRef<TransitionState>(createTransitionState());
  const prevMinuteRotationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let initCompleted = false;

    const setup = async () => {
      if (!astroContainerRef.current) return;

      // Reset portal tile tracking state to ensure textures load on remount
      resetCurrentVnums();

      // Create a new Application instance
      const app = new Application();

      const assets = await initializeAssets();
      if (cancelled) return;

      const minuteHandBlur = createMinuteHandBlurFilter();

      clockElementsRef.current = {
        marabah: assets.marabah,
        trigael: assets.trigael,
        hourHand: assets.hourHand,
        minuteHand: assets.minuteHand,
        minuteHandBlur,
        spellRegenCounter: assets.spellRegenCounter,
        portalTiles: assets.portalTiles,
        portalCounter: assets.portalCounter,
      };

      const hours =
        currentMoonphaseData.current.alyrianDateTimeData?.hours || 0;
      const minutes =
        currentMoonphaseData.current.alyrianDateTimeData?.minutes || 0;

      await app.init({
        // Ported for the KACHOW! write-up: upstream this sits on the game's dark
        // hero art, so it paints its own grey. Here it sits on the article page,
        // so the canvas is transparent and takes whatever is behind it.
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        width: SIZE,
        height: SIZE,
        antialias: true,
      });

      if (cancelled) {
        try {
          teardownPixiApp(app);
        } catch {
          /* partial state */
        }
        return;
      }

      initCompleted = true;
      appRef.current = app;

      // Set up animation ticker
      app.ticker.add((time) => {
        if (!clockElementsRef.current) return;

        const prevDeltaMinutes = animationState.current.deltaMinutes;
        animationState.current = updateGameTime(
          animationState.current,
          time.elapsedMS,
        );

        // Check if we're in the middle of a synchronized transition
        if (transitionStateRef.current.isTransitioning) {
          const prevRotation = prevMinuteRotationRef.current;

          const stillTransitioning = animateTransition(
            clockElementsRef.current,
            transitionStateRef.current,
          );

          // Calculate animation progress for blur fade-out
          const elapsed =
            performance.now() - transitionStateRef.current.startTime;
          const animationProgress = Math.min(
            elapsed / TRANSITION_DURATION_MS,
            1,
          );

          // Update motion blur based on rotation velocity, total distance, and progress
          const currentRotation = clockElementsRef.current.minuteHand.rotation;
          updateMinuteHandBlur(
            clockElementsRef.current.minuteHand,
            clockElementsRef.current.minuteHandBlur,
            currentRotation,
            prevRotation,
            true,
            transitionStateRef.current.totalRotationDistance,
            animationProgress,
          );
          prevMinuteRotationRef.current = currentRotation;

          if (!stillTransitioning) {
            // Transition complete - disable blur
            transitionStateRef.current.isTransitioning = false;
            updateMinuteHandBlur(
              clockElementsRef.current.minuteHand,
              clockElementsRef.current.minuteHandBlur,
              currentRotation,
              currentRotation,
              false,
              0,
              1,
            );

            // Force re-render so React UI reflects the final transition state
            forceUpdate({});
          }
          return;
        }

        // Not transitioning - ensure blur is disabled
        updateMinuteHandBlur(
          clockElementsRef.current.minuteHand,
          clockElementsRef.current.minuteHandBlur,
          clockElementsRef.current.minuteHand.rotation,
          clockElementsRef.current.minuteHand.rotation,
          false,
        );

        // Not transitioning - use original frame-based animations for live mode
        animateSpellRegenCounter(
          clockElementsRef.current.spellRegenCounter,
          currentMoonphaseData.current,
        );

        animatePortalTiles(
          clockElementsRef.current.portalTiles,
          currentMoonphaseData.current,
        );

        animatePortalCounters(
          clockElementsRef.current.portalCounter,
          currentMoonphaseData.current,
        );

        animateMoons(
          clockElementsRef.current.marabah,
          clockElementsRef.current.trigael,
          currentMoonphaseData.current,
          animationState.current.direction,
        );

        // Only animate to current time if slider is at live position (-1)
        if (sliderPositionRef.current === -1) {
          // Check if hands need to catch up to current time
          const targetCurrentTime = {
            ...initialMoonphaseData.current,
            alyrianDateTimeData: updateAlyrianDateTimeData(
              initialMoonphaseData.current.alyrianDateTimeData!,
              animationState.current.deltaMinutes,
              animationState.current.deltaHours,
            ),
          };

          // Update currentMoonphaseData to show correct time in React UI
          currentMoonphaseData.current = targetCurrentTime;

          // Calculate the target minute hand rotation to determine correct direction
          const targetMinutes =
            initialMoonphaseData.current.alyrianDateTimeData!.minutes +
            animationState.current.deltaMinutes +
            animationState.current.deltaHours * 60;
          const targetRotation = getMinuteHandRadians(
            targetMinutes,
            initialMoonphaseData.current.alyrianDateTimeData!.hours,
          );
          const currentRotation = clockElementsRef.current.minuteHand.rotation;

          // Determine direction: if hands are ahead of target, go backward
          const liveDirection = currentRotation <= targetRotation ? 1 : -1;

          animateHands(
            clockElementsRef.current.minuteHand,
            clockElementsRef.current.hourHand,
            initialMoonphaseData.current,
            targetCurrentTime,
            liveDirection,
          );
        } else {
          // When not at current time, animate hands to the target position
          animateHands(
            clockElementsRef.current.minuteHand,
            clockElementsRef.current.hourHand,
            initialMoonphaseData.current,
            currentMoonphaseData.current,
            animationState.current.direction,
          );
        }

        // Only re-render React when the game minute ticks forward,
        // rather than every ticker frame (~60fps)
        if (animationState.current.deltaMinutes !== prevDeltaMinutes) {
          forceUpdate({});
        }
      });

      // Draw all elements
      drawBackground(app, assets.background);
      drawTrigael(app, assets.trigael);
      drawMarabah(app, assets.marabah);
      drawPortalCounters(app, assets.portalCounter);
      drawSpellRegenCounters(app, assets.spellRegenCounter);
      drawPortalTiles(app, assets.portalTiles, assets.bladeTexture);
      drawAperture(app, assets.aperture, assets.minuteHand, assets.hourHand);
      drawClockface(app, assets.clockface);
      drawHourHand(app, assets.hourHand, hours, minutes);
      drawMinutehand(app, assets.minuteHand, minutes, hours);
      drawCenterButton(app);

      if (!astroContainerRef.current) return;
      astroContainerRef.current.appendChild(app.canvas);
      setIsLoaded(true);
    };

    setup();

    return () => {
      // Cleanup: destroy the PixiJS app to prevent stale state on remount
      cancelled = true;
      setIsLoaded(false);
      if (appRef.current && initCompleted) {
        teardownPixiApp(appRef.current);
      }
      appRef.current = null;
      clockElementsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    appRef,
    clockElementsRef,
    transitionStateRef,
    prevMinuteRotationRef,
    isLoaded,
  };
}
