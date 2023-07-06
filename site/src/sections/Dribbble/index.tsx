import React from "react";

import compareAsc from "date-fns/compareAsc";

import Shot, { ShotType } from "./Shot";
import styles from "./styles.module.scss";

interface Props {
  shots: ShotType[];
}

const Section = ({ shots }: Props) => {
  const sortedShots =
    shots.sort((a: ShotType, b: ShotType) =>
      compareAsc(new Date(b.published_at), new Date(a.published_at))
    ).slice(0, 6);

  return (
    <section className={styles["dribbble-section"]} id="dribbble">
      <div className={styles["section-two-pane"]}>
        <div className={styles["section-description"]}>
          <span className={styles["MoMa"]}>MoMD</span>
          <h3>
            <b>M</b>useum <b>o</b>f <b>M</b>odern <b>D</b>ribbbles
          </h3>
          <p>
            Designs I'm currently working on or have finished recently. If you'd
            like to see the graphic design work I've done for clients in the
            past, this is the place to look.
          </p>
          View on{" "}
          <a href="http://karomancer.dribbble.com/" target="_blank">
            Dribbble
          </a>{" "}
          or{" "}
          <a href="http://instagram.com/karomancer" target="_blank">
            Instagram
          </a>
        </div>
        <div className={styles["portfolio-sections"]}>
          <ul className={styles["shots-desktop"]}>
            {sortedShots.map((shot: ShotType) => (
              <Shot key={`shot-${shot.title}`} shot={shot} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section;
