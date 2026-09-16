import { useEffect, MutableRefObject, Dispatch, SetStateAction } from "react";
import { OGameStateInterval } from "../game-types";
import { MoonphaseDataWithDateTime } from "../types";
import { AnimationState } from "../animations";

const POLLING_ENABLED = false;

interface UseMoonphasePollingParams {
  initialMoonphaseData: MutableRefObject<MoonphaseDataWithDateTime>;
  currentMoonphaseData: MutableRefObject<MoonphaseDataWithDateTime>;
  animationState: MutableRefObject<AnimationState>;
  sliderPositionRef: MutableRefObject<number>;
  setFutureMoonphaseDataState: Dispatch<
    SetStateAction<MoonphaseDataWithDateTime[] | undefined>
  >;
}

/**
 * Hook that handles polling for updated moonphase data from the server.
 * Polls every POLL_INTERVAL_MS and updates the moonphase state when new data is received.
 */
export function useMoonphasePolling({
  initialMoonphaseData,
  currentMoonphaseData,
  animationState,
  sliderPositionRef,
  setFutureMoonphaseDataState,
}: UseMoonphasePollingParams): void {
  useEffect(() => {
    // Ported for the KACHOW! write-up: upstream this polls Materia Magica's own
    // API every five minutes. Here the clock runs on a frozen snapshot of that
    // response, so there is nothing to poll and the effect is a no-op. The rest
    // of the hook is left intact so the port stays diffable against the original.
    if (!POLLING_ENABLED) return;

    const pollMoonphase = async () => {
      try {
        const response = await fetch("/api/moonphase/current");
        if (!response.ok) return;

        const {
          currentMoonphaseData: newCurrent,
          futureMoonphaseData: newFuture,
        } = await response.json();

        // Update the base moonphase data
        initialMoonphaseData.current = newCurrent;

        // Reset animation state deltas since we have fresh server data
        animationState.current = {
          ...animationState.current,
          elapsedMs: 0,
          lastMinuteUpdate: 0,
          deltaMinutes: 0,
          deltaHours: 0,
        };

        // Update current display if in live mode
        if (sliderPositionRef.current === -1) {
          currentMoonphaseData.current = newCurrent;
        }

        // Update future moonphase data if phases changed
        if (newFuture !== null) {
          setFutureMoonphaseDataState(newFuture);
        }
      } catch (error) {
        console.error("Failed to fetch moonphase data:", error);
      }
    };

    const interval = setInterval(
      pollMoonphase,
      OGameStateInterval.POLL_INTERVAL_MS,
    );

    // Refetch immediately when tab becomes visible (intervals may be throttled when backgrounded)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        pollMoonphase();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    animationState,
    currentMoonphaseData,
    initialMoonphaseData,
    setFutureMoonphaseDataState,
    sliderPositionRef,
  ]);
}
