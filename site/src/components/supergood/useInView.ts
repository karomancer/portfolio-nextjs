
import { createContext, useContext, useEffect, useRef, useState } from "react";

/**
 * "hidden" until the element arrives, "playing" once it should animate, and
 * "settled" when it should skip straight to the finished state.
 */
export type Reveal = "hidden" | "playing" | "settled";

/**
 * Lets a container that owns the scroll check hand its reveal state down to
 * graphics it received as ready-made elements. Outside any provider a graphic
 * simply plays at mount.
 */
export const RevealContext = createContext<Reveal>("playing");

export function useReveal() {
  return useContext(RevealContext);
}

/**
 * Fires once when the element reaches the middle band of the viewport, so an
 * animation plays where the reader can actually see it rather than finishing
 * above the fold. Anyone asking for reduced motion is settled up front, so
 * components render their finished state instead of playing the reveal.
 *
 * This measures on scroll rather than using IntersectionObserver: the observer
 * depends on the compositor producing frames, and quietly never fires in
 * environments that are not painting normally, which leaves the animation stuck
 * at nothing rendered. Reading the rect is cheap enough at this scale and
 * always runs.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [reveal, setReveal] = useState<Reveal>("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el || reveal !== "hidden") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const check = () => {
      if (reducedMotion) {
        setReveal("settled");
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Anywhere in the middle 70% of the viewport counts as arrived.
      if (rect.top < vh * 0.85 && rect.bottom > vh * 0.15) setReveal("playing");
    };

    check();
    if (reducedMotion) return;
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });

    // Last resort: if nothing ever tells us the element arrived (an embedded
    // view that does not emit scroll, a browser that throttles it), play anyway
    // rather than leaving the reader looking at an empty card forever.
    const fallback = setTimeout(() => setReveal("playing"), 4000);

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [reveal]);

  return { ref, reveal };
}
