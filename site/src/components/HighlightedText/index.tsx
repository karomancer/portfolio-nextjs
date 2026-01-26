import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

import styles from "./styles.module.scss";

interface HighlightedTextProps {
  children: React.ReactNode;
  scrollProgress?: MotionValue<number>;
  /** Start of highlight animation (0-1), default 0.3 */
  start?: number;
  /** End of highlight animation (0-1), default 0.8 */
  end?: number;
  /** Highlight color, default teal */
  color?: string;
  /** Use own scroll tracking instead of passed scrollProgress */
  selfTracking?: boolean;
}

const HighlightedText = ({
  children,
  scrollProgress,
  start = 0.3,
  end = 0.8,
  color = "#7dd4be",
  selfTracking = false,
}: HighlightedTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  // Use own scroll tracking if selfTracking is true or no scrollProgress provided
  const { scrollYProgress: ownProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const progress = selfTracking || !scrollProgress ? ownProgress : scrollProgress;

  // Animate background-size from 0% to 100%
  const highlightWidth = useTransform(
    progress,
    [start, end],
    ["0% 100%", "100% 100%"]
  );

  // Animate text color from dark to white as highlight fills
  const textColor = useTransform(
    progress,
    [start, end - 0.1],
    ["#231f20", "#ffffff"]
  );

  return (
    <motion.span
      ref={ref}
      className={styles.highlighted}
      style={{
        backgroundSize: highlightWidth,
        backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
        color: textColor,
      }}
    >
      {children}
    </motion.span>
  );
};

export default HighlightedText;
