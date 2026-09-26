import { ReactNode, useRef, useState } from "react";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  children: ReactNode;
}

/**
 * A collapsed chapter of a write-up, opened from `<!-- collapse:Title -->` in
 * the markdown. Closed, it shows the top of the chapter fading to white with a
 * "Read more" pill, the same treatment the blog index gives each post. The
 * content is always in the DOM, so search engines and find-in-page still see
 * it.
 */
export default function Collapse({ title, children }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = `collapse-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const toggle = () => {
    if (open) {
      // Collapsing from the bottom of a long chapter would leave the reader
      // stranded far below the heading, so bring it back into view.
      root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(!open);
  };

  return (
    <div
      ref={root}
      className={`${styles["collapse"]} ${open ? styles["collapse-open"] : ""}`}
    >
      <h2 className={styles["collapse-title"]}>{title}</h2>
      <div id={id} className={styles["collapse-body"]}>
        {children}
      </div>
      <div className={styles["collapse-toggle"]}>
        <button type="button" onClick={toggle} aria-expanded={open} aria-controls={id}>
          {open ? "Collapse" : "Read more"}
        </button>
      </div>
    </div>
  );
}
