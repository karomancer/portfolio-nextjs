import { useEffect, useState, type ReactNode } from "react";

import { SG_BORDER, sgShadow } from "./tokens";
import { RevealContext, useInView } from "./useInView";

import styles from "./CascadingDeck.module.scss";

const ROTATE_INTERVAL = 8000;
const OFFSET_Y = 22;
// Every pane is the same fixed height: three windows of visibly different sizes
// read as a layout bug rather than a stack. Measuring them instead turns into a
// feedback loop, because the graphics size themselves to the box they are given.
const PANE_HEIGHT = 320;

export type DeckCard = {
  eyebrow: string;
  eyebrowClass: string;
  shadow: string;
  title: string;
  description: string;
  graphic: ReactNode;
};

/**
 * Supergood's own treatment for a set of three product graphics: compact cards
 * across the top, and the graphics themselves cascading behind one another
 * below, so the one being described gets the full width. Clicking a card brings
 * its graphic to the front and pauses the rotation.
 */
export default function CascadingDeck({ cards }: { cards: DeckCard[] }) {
  const [active, setActive] = useState(0);
  const [zStack, setZStack] = useState(() =>
    cards
      .map((_, i) => i)
      .filter((i) => i !== 0)
      .concat(0)
  );
  const [paused, setPaused] = useState(false);
  const { ref, reveal } = useInView<HTMLDivElement>();
  const deckHeight = PANE_HEIGHT + (cards.length - 1) * OFFSET_Y + 8;

  const activate = (idx: number) => {
    setActive(idx);
    setZStack((prev) => [...prev.filter((j) => j !== idx), idx]);
  };

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => activate((active + 1) % cards.length),
      ROTATE_INTERVAL
    );
    return () => clearTimeout(t);
  }, [active, paused, cards.length]);

  return (
    <RevealContext.Provider value={reveal}>
      <div ref={ref} className={styles["cascading-deck"]}>
        <div className={styles["cards"]}>
          {cards.map((card, i) => {
            const isActive = i === active;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => {
                  setPaused(true);
                  activate(i);
                }}
                className={`${styles["card"]} ${
                  isActive ? styles["active"] : ""
                }`}
                style={{
                  borderColor: SG_BORDER,
                  boxShadow: isActive ? sgShadow(card.shadow) : "none",
                }}
              >
                <span
                  className={`${styles["card-eyebrow"]} ${
                    styles[card.eyebrowClass] ?? ""
                  }`}
                >
                  {card.eyebrow}
                </span>
                <span className={styles["card-title"]}>{card.title}</span>
                <span className={styles["card-description"]}>
                  {card.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles["deck"]} style={{ height: deckHeight }}>
          {cards.map((card, i) => {
            const isActive = i === active;
            return (
              <div
                key={card.title}
                onClick={() => {
                  setPaused(true);
                  activate(i);
                }}
                className={styles["pane"]}
                style={{
                  left: `${i * 17}%`,
                  top: i * OFFSET_Y,
                  zIndex: zStack.indexOf(i) + 1,
                  height: PANE_HEIGHT,
                  borderColor: SG_BORDER,
                  transform: isActive ? "scale(1.02)" : "scale(0.98)",
                  filter: isActive ? "brightness(1)" : "brightness(0.94)",
                  boxShadow: isActive ? sgShadow(card.shadow) : "none",
                }}
              >
                {card.graphic}
              </div>
            );
          })}
        </div>

        <div className={styles["single"]} style={{ borderColor: SG_BORDER }}>
          {cards[active].graphic}
        </div>
      </div>
    </RevealContext.Provider>
  );
}
