import React from 'react';
import axios from "axios";
import compareAsc from "date-fns/compareAsc";

import Shot, {ShotType} from './Shot';
import styles from "./styles.module.scss"

interface Props {
  showHeader?: boolean;
}

async function getData() {
  const res = await axios(`https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`)

  if (res.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${res.status}`)
  }

  return res.data
}

const Section = async ({ showHeader }: Props) => {
  const dribbbleShots = (await getData()).sort((a: ShotType, b: ShotType) => compareAsc(new Date(b.published_at), new Date(a.published_at)));

  return (
    <section className={styles["dribbble-section"]} id="dribbble">
      <div className={styles["section-two-pane"]}>
        {showHeader && (
          <div className={styles["section-description"]}>
            <span className={styles["MoMa"]}>MoMD</span>
            <h3>
              <b>M</b>useum <b>o</b>f <b>M</b>odern <b>D</b>ribbbles
            </h3>
            <p>
              Designs I'm currently working on or have finished recently. If
              you'd like to see the graphic design work I've done for clients in
              the past, this is the place to look.
            </p>
            View on{' '}
            <a href="http://karomancer.dribbble.com/" target="_blank">
              Dribbble
            </a>{' '}
            or{' '}
            <a href="http://instagram.com/karomancer" target="_blank">
              Instagram
            </a>
          </div>
        )}
        <div className={styles["portfolio-sections"]}>
          <ul className={styles["shots-desktop"]}>
            {dribbbleShots.slice(0, 6).map((shot: ShotType) => (
              <Shot key={`shot-${shot.title}`} shot={shot} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section;
