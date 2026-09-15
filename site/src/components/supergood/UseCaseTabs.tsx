import { useCallback, useEffect, useState } from "react";

import { SG_BORDER, SG_SHADOW_BLACK } from "./tokens";

import styles from "./UseCaseTabs.module.scss";

const TAB_DURATION = 7000;

const VIEWS = [
  {
    id: "real-estate",
    label: "Real Estate",
    heading: "Sync units, manage leases, and automate maintenance",
    actions: [
      "Sync unit availability across platforms",
      "Pull rent rolls and financial reports",
      "Submit and track work orders",
    ],
    portals:
      "Property management systems, leasing portals, maintenance platforms",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    heading: "Move records and claims without a human in the browser",
    actions: [
      "Pull patient records on request",
      "Check eligibility and benefits",
      "File and follow up on claims",
    ],
    portals: "Payer portals, EHR systems, clearinghouses",
  },
  {
    id: "government",
    label: "Government",
    heading: "File, renew, and retrieve from systems built in another era",
    actions: [
      "Submit filings and permit applications",
      "Retrieve licenses and public records",
      "Track status changes as they post",
    ],
    portals: "State filing systems, licensing boards, records offices",
  },
];

export default function UseCaseTabs() {
  const [tab, setTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setTab((prev) => (prev + 1) % VIEWS.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / TAB_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) advance();
    }, 50);
    return () => clearInterval(interval);
  }, [tab, paused, advance]);

  const active = VIEWS[tab];

  return (
    <div
      className={styles["use-case-tabs"]}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles["tab-row"]}>
        {VIEWS.map((view, idx) => {
          const selected = tab === idx;
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => {
                setTab(idx);
                setProgress(0);
              }}
              style={{
                borderWidth: "2px 2px 0 2px",
                borderStyle: "solid",
                borderColor: SG_BORDER,
                zIndex: selected ? 20 : VIEWS.length - idx,
                marginLeft: idx === 0 ? 0 : 4,
              }}
              className={`${styles["tab"]} ${selected ? styles["selected"] : ""}`}
            >
              <span
                className={`${styles["tab-progress"]} ${
                  styles[`tab-color-${idx % 3}`]
                }`}
                style={{
                  width: selected
                    ? `${progress}%`
                    : idx < tab
                    ? "100%"
                    : "0%",
                }}
              />
              {view.label}
            </button>
          );
        })}
      </div>

      <div
        className={styles["panel"]}
        style={{ borderColor: SG_BORDER, boxShadow: SG_SHADOW_BLACK }}
      >
        <p className={styles["panel-heading"]}>{active.heading}</p>
        <ul className={styles["actions"]}>
          {active.actions.map((action) => (
            <li key={action} className={styles["action"]}>
              <span aria-hidden="true">&rarr;</span>
              {action}
            </li>
          ))}
        </ul>
        <p className={styles["portals"]}>{active.portals}</p>
      </div>
    </div>
  );
}
