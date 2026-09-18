import dynamic from "next/dynamic";

import {
  currentMoonphaseData,
  futureMoonphaseData,
} from "@/data/materia-magica-gamestate";

import styles from "./LunarClockDemo.module.scss";

// The real clock from materiamagica.com, running on a captured snapshot of
// their game state. It draws itself with PixiJS against a canvas, so it is
// loaded on the client only and never during the static build.
const LunarClock = dynamic(() => import("./LunarClock"), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading the clock…</div>,
});

const LunarClockDemo = () => (
  <figure className={styles.figure}>
    <div className={styles.stage}>
      <LunarClock
        currentMoonphaseData={currentMoonphaseData}
        futureMoonphaseData={futureMoonphaseData}
      />
    </div>
    <figcaption className={styles.caption}>
      The real clock, on real game data. Drag the dial to read the next 24
      hours of gate openings.
    </figcaption>
  </figure>
);

export default LunarClockDemo;
