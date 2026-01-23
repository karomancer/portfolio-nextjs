import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";

import styles from "./styles.module.scss";

// Context for triggering transitions before navigation
interface TransitionContextType {
  navigateWithTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition");
  }
  return context;
};

// Transition types - removed spiral, keeping reliable ones
type TransitionType = "wipe" | "circles" | "diamonds" | "blinds";

const TRANSITIONS: TransitionType[] = ["wipe", "circles", "diamonds", "blinds"];

// Get a random transition (but not the same as last time)
const getRandomTransition = (lastTransition: TransitionType | null): TransitionType => {
  const available = TRANSITIONS.filter((t) => t !== lastTransition);
  return available[Math.floor(Math.random() * available.length)];
};

// Wipe transition - simple horizontal wipe
const WipeTransition = ({ stage }: { stage: "enter" | "exit" }) => (
  <motion.div
    className={styles.wipe}
    initial={{ x: stage === "enter" ? "-100%" : "0%" }}
    animate={{ x: stage === "enter" ? "0%" : "100%" }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  />
);

// Circles transition - larger circles in a grid pattern
const CirclesTransition = ({ stage }: { stage: "enter" | "exit" }) => {
  // 3x3 grid of large circles that overlap to cover screen
  const circles = [
    { id: 0, x: 0, y: 0, delay: 0 },
    { id: 1, x: 50, y: 0, delay: 0.05 },
    { id: 2, x: 100, y: 0, delay: 0.1 },
    { id: 3, x: 0, y: 50, delay: 0.05 },
    { id: 4, x: 50, y: 50, delay: 0.1 },
    { id: 5, x: 100, y: 50, delay: 0.15 },
    { id: 6, x: 0, y: 100, delay: 0.1 },
    { id: 7, x: 50, y: 100, delay: 0.15 },
    { id: 8, x: 100, y: 100, delay: 0.2 },
  ];

  return (
    <div className={styles.circlesContainer}>
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className={styles.circle}
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}%`,
          }}
          initial={{ scale: stage === "enter" ? 0 : 1 }}
          animate={{ scale: stage === "enter" ? 1 : 0 }}
          transition={{
            duration: 0.4,
            delay: stage === "enter" ? circle.delay : (0.2 - circle.delay),
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
};

// Diamonds transition - grid of diamonds
const DiamondsTransition = ({ stage }: { stage: "enter" | "exit" }) => {
  const diamonds = [
    { id: 0, x: 0, y: 0, delay: 0 },
    { id: 1, x: 33, y: 0, delay: 0.03 },
    { id: 2, x: 66, y: 0, delay: 0.06 },
    { id: 3, x: 100, y: 0, delay: 0.09 },
    { id: 4, x: 0, y: 33, delay: 0.03 },
    { id: 5, x: 33, y: 33, delay: 0.06 },
    { id: 6, x: 66, y: 33, delay: 0.09 },
    { id: 7, x: 100, y: 33, delay: 0.12 },
    { id: 8, x: 0, y: 66, delay: 0.06 },
    { id: 9, x: 33, y: 66, delay: 0.09 },
    { id: 10, x: 66, y: 66, delay: 0.12 },
    { id: 11, x: 100, y: 66, delay: 0.15 },
    { id: 12, x: 0, y: 100, delay: 0.09 },
    { id: 13, x: 33, y: 100, delay: 0.12 },
    { id: 14, x: 66, y: 100, delay: 0.15 },
    { id: 15, x: 100, y: 100, delay: 0.18 },
  ];

  return (
    <div className={styles.diamondsContainer}>
      {diamonds.map((diamond) => (
        <motion.div
          key={diamond.id}
          className={styles.diamond}
          style={{
            left: `${diamond.x}%`,
            top: `${diamond.y}%`,
          }}
          initial={{ scale: stage === "enter" ? 0 : 1.5 }}
          animate={{ scale: stage === "enter" ? 1.5 : 0 }}
          transition={{
            duration: 0.3,
            delay: stage === "enter" ? diamond.delay : (0.18 - diamond.delay) * 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
};

// Blinds transition - vertical bars
const BlindsTransition = ({ stage }: { stage: "enter" | "exit" }) => {
  const blinds = [
    { id: 0, delay: 0 },
    { id: 1, delay: 0.03 },
    { id: 2, delay: 0.06 },
    { id: 3, delay: 0.09 },
    { id: 4, delay: 0.12 },
    { id: 5, delay: 0.15 },
    { id: 6, delay: 0.18 },
    { id: 7, delay: 0.21 },
  ];

  return (
    <div className={styles.blindsContainer}>
      {blinds.map((blind) => (
        <motion.div
          key={blind.id}
          className={styles.blind}
          initial={{ scaleY: stage === "enter" ? 0 : 1 }}
          animate={{ scaleY: stage === "enter" ? 1 : 0 }}
          transition={{
            duration: 0.25,
            delay: stage === "enter" ? blind.delay : (0.21 - blind.delay) * 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
};

const TransitionComponent = ({
  type,
  stage,
}: {
  type: TransitionType;
  stage: "enter" | "exit";
}) => {
  switch (type) {
    case "wipe":
      return <WipeTransition stage={stage} />;
    case "circles":
      return <CirclesTransition stage={stage} />;
    case "diamonds":
      return <DiamondsTransition stage={stage} />;
    case "blinds":
      return <BlindsTransition stage={stage} />;
    default:
      return <WipeTransition stage={stage} />;
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();
  const [stage, setStage] = useState<"idle" | "enter" | "exit">("idle");
  const [transitionType, setTransitionType] = useState<TransitionType>("wipe");
  // Track if content should be visible - hidden during enter, shown during exit/idle
  const [contentVisible, setContentVisible] = useState(true);
  const lastTransition = useRef<TransitionType | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Track when we started the enter animation
  const enterStartTimeRef = useRef<number>(0);
  // Minimum time for enter animation to fully cover screen
  const ENTER_DURATION = 650;

  const clearTimeouts = useCallback(() => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
  }, []);

  const triggerExit = useCallback(() => {
    setContentVisible(true);
    setStage("exit");
    exitTimeoutRef.current = setTimeout(() => {
      setStage("idle");
    }, 400);
  }, []);

  const startEnterAnimation = useCallback(() => {
    clearTimeouts();
    enterStartTimeRef.current = Date.now();

    const newTransition = getRandomTransition(lastTransition.current);
    lastTransition.current = newTransition;
    setTransitionType(newTransition);
    setStage("enter");
    setContentVisible(false);
  }, [clearTimeouts]);

  // Navigate with transition - starts animation first, then navigates
  const navigateWithTransition = useCallback((href: string) => {
    // Don't navigate if we're already on this page
    if (router.asPath === href) return;

    startEnterAnimation();

    // Wait for animation to cover screen, then navigate
    enterTimeoutRef.current = setTimeout(() => {
      router.push(href);
    }, 400);
  }, [router, startEnterAnimation]);

  useEffect(() => {
    const handleStart = () => {
      // If enter animation already started (manual navigation), skip
      if (stage === "enter") return;
      // For browser back/forward, start the animation now
      startEnterAnimation();
    };

    const handleComplete = () => {
      // Calculate how long we've been in enter phase
      const elapsed = Date.now() - enterStartTimeRef.current;
      const remaining = Math.max(0, ENTER_DURATION - elapsed);

      // Wait for enter animation to complete, then trigger exit
      enterTimeoutRef.current = setTimeout(() => {
        triggerExit();
      }, remaining);
    };

    const handleError = () => {
      clearTimeouts();
      setStage("idle");
      setContentVisible(true);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
      clearTimeouts();
    };
  }, [router, stage, startEnterAnimation, triggerExit, clearTimeouts]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      <div style={{ visibility: contentVisible ? "visible" : "hidden" }}>
        {children}
      </div>
      <AnimatePresence>
        {stage !== "idle" && (
          <motion.div
            key={`transition-${stage}`}
            className={styles.transitionOverlay}
          >
            <TransitionComponent type={transitionType} stage={stage === "exit" ? "exit" : "enter"} />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export default PageTransition;
