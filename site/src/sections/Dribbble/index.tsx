import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import compareAsc from "date-fns/compareAsc";

import Shot, { DribbbleShot } from "./Shot";
import styles from "./styles.module.scss";

interface Props {
  shots: DribbbleShot[];
}

const Section = ({ shots }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sortedShots = shots
    .sort((a: DribbbleShot, b: DribbbleShot) =>
      compareAsc(new Date(b.published_at), new Date(a.published_at)),
    )
    .slice(0, 6);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Text fades in last (after all shots)
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <section
      className={styles["dribbble-section"]}
      id="dribbble"
      ref={sectionRef}
    >
      <div className="section-two-pane">
        <motion.div
          className="section-description"
          style={{ opacity: textOpacity }}
        >
          <h2 className={styles["MoMa"]}>MoMD</h2>
          <h3>
            <b>M</b>useum <b>o</b>f <b>M</b>odern <b>D</b>ribbbles
          </h3>
          <p>
            I'm almost always working on graphic design, animation, and/or
            illustration projects. If you'd like to see what I've done for my
            own projects or for clients in the past, this is the place to look.
          </p>
          View on{" "}
          <a
            href="http://karomancer.dribbble.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dribbble
          </a>{" "}
          or{" "}
          <a
            href="http://instagram.com/karomancer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </motion.div>
        <div className={styles["portfolio-sections"]}>
          <ul className={styles["shots-desktop"]}>
            {sortedShots.map((shot: DribbbleShot, index: number) => (
              <Shot
                key={`shot-${shot.title}`}
                shot={shot}
                index={index}
                total={sortedShots.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Section;
