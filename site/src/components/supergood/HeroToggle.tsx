import { useState } from "react";

import { SG_BORDER } from "./tokens";
import { useInView } from "./useInView";

import styles from "./HeroToggle.module.scss";

const VIEWS = {
  agents: {
    label: "Building agents",
    tail: "that agents can't reach.",
    body: "Generate fully managed tools your agents can call at scale. Ultra fast, reliable and observable. Skip the browser entirely.",
  },
  api: {
    label: "Just need an API",
    tail: "that don't have one.",
    body: "Generate and manage production-grade APIs for any enterprise software. Ultra fast, reliable and observable. No scraping.",
  },
} as const;

type ViewKey = keyof typeof VIEWS;

const sweepClass = (reveal: string) => {
  if (reveal === "playing") return styles["sweep-playing"];
  if (reveal === "settled") return styles["sweep-settled"];
  return "";
};

export default function HeroToggle() {
  const [view, setView] = useState<ViewKey>("agents");
  const { ref, reveal } = useInView<HTMLDivElement>();
  const active = VIEWS[view];

  return (
    <div
      ref={ref}
      className={styles["hero-toggle"]}
      style={{ borderColor: SG_BORDER }}
    >
      <div className={styles["toggle-row"]}>
        <div className={styles["toggle-group"]}>
          {(Object.keys(VIEWS) as ViewKey[]).map((key) => {
            const selected = view === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={selected}
                style={{ borderColor: SG_BORDER }}
                className={`${styles["toggle-button"]} ${
                  selected ? styles["selected"] : ""
                }`}
              >
                {VIEWS[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles["headline-grid"]}>
        <h3 className={styles["headline"]}>
          APIs for enterprise portals{" "}
          <span
            key={view}
            className={`${styles["sweep"]} ${sweepClass(reveal)}`}
          >
            {active.tail}
          </span>
        </h3>
        <p className={styles["body"]}>{active.body}</p>
      </div>
    </div>
  );
}
