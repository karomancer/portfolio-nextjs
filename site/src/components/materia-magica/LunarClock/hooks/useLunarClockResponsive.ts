import { useEffect, useState, RefObject } from "react";
import { SLIDER_WIDTH } from "../constants";

interface UseLunarClockResponsiveReturn {
  clockScale: number;
}

/**
 * Hook that handles responsive scaling of the LunarClock based on container width.
 * Uses a ResizeObserver to track container size changes and calculate the appropriate scale.
 */
export function useLunarClockResponsive(
  containerRef: RefObject<HTMLDivElement | null>,
): UseLunarClockResponsiveReturn {
  const [clockScale, setClockScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(1, containerWidth / SLIDER_WIDTH);
        setClockScale(newScale);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  return { clockScale };
}
