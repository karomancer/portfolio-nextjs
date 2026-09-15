import { SG_BORDER, sgShadow } from "./tokens";
import { useInView, type Reveal } from "./useInView";

import styles from "./TerminalPair.module.scss";

type Tone = "cmd" | "muted" | "line" | "warn" | "error" | "ok";

type TerminalLine = {
  text: string;
  tone: Tone;
  delay: number;
  gapAfter?: boolean;
};

/** Their TerminalCard maps a variant onto the title colour and the shadow. */
const VARIANT = {
  error: { title: styles["title-error"], shadow: "#db2777" },
  success: { title: styles["title-success"], shadow: "#22c55e" },
} as const;

const BROWSER_LINES: TerminalLine[] = [
  { text: "Launching headless browser...", tone: "line", delay: 200 },
  { text: "Navigating to login page...", tone: "line", delay: 2000 },
  { text: "Entering username...", tone: "line", delay: 3500 },
  { text: "Entering password...", tone: "line", delay: 5000 },
  { text: 'Clicking "Sign In"...', tone: "line", delay: 6500 },
  { text: "⚠ Cookie popup detected. Dismissing...", tone: "warn", delay: 8000 },
  { text: "Waiting for MFA prompt...", tone: "line", delay: 9000 },
  { text: "Submitting MFA token...", tone: "line", delay: 11000 },
  { text: "Waiting for dashboard to load...", tone: "line", delay: 13000 },
  { text: 'Locating "Units" table...', tone: "line", delay: 15000 },
  { text: "✘ Selector not found. DOM changed.", tone: "error", delay: 16500 },
  { text: "✘ FAILED — 47s", tone: "error", delay: 17000 },
];

const SUPERGOOD_LINES: TerminalLine[] = [
  { text: "POST /auth", tone: "cmd", delay: 200 },
  { text: '{"email":"alex@supergood.ai"}', tone: "muted", delay: 280 },
  { text: "✓ 200 OK — 4ms", tone: "ok", delay: 1000, gapAfter: true },
  { text: "GET /portal/units?limit=50", tone: "cmd", delay: 2000 },
  { text: "✓ 200 OK — 12ms", tone: "ok", delay: 3000 },
];

const Terminal = ({
  title,
  variant,
  lines,
  reveal,
}: {
  title: string;
  variant: keyof typeof VARIANT;
  lines: TerminalLine[];
  reveal: Reveal;
}) => {
  const v = VARIANT[variant];
  return (
    <div
      className={styles["terminal"]}
      style={{ borderColor: SG_BORDER, boxShadow: sgShadow(v.shadow) }}
    >
      <p className={`${styles["terminal-title"]} ${v.title}`}>{title}</p>
      <code className={styles["lines"]}>
        {lines.map((line, i) => (
          <span
            key={i}
            className={[
              styles["line"],
              styles[`tone-${line.tone}`],
              reveal === "playing" ? styles["line-playing"] : "",
              reveal === "settled" ? styles["line-settled"] : "",
              line.gapAfter ? styles["gap-after"] : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              reveal === "playing" ? { animationDelay: `${line.delay}ms` } : undefined
            }
          >
            {line.text}
          </span>
        ))}
      </code>
    </div>
  );
};

/**
 * The pair from the live page's "Enterprise portals were built for humans, not
 * software." section: browser automation grinding through a login for 47
 * seconds beside the same work done in two API calls.
 */
export default function TerminalPair() {
  const { ref, reveal } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={styles["terminal-pair"]}>
      <div className={styles["grid"]}>
        <Terminal
          title="Browser Automation"
          variant="error"
          lines={BROWSER_LINES}
          reveal={reveal}
        />
        <Terminal
          title="Supergood"
          variant="success"
          lines={SUPERGOOD_LINES}
          reveal={reveal}
        />
      </div>
    </div>
  );
}
