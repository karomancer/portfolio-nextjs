import React from "react";
import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion";

import styles from "./styles.module.scss";

type Images = {
  hidpi: string;
  normal: string;
  teaser: string;
};

export type DribbbleShot = {
  title: string;
  description: string;
  published_at: string;
  images: Images;
  html_url: string;
};

interface Props {
  shot: DribbbleShot;
  index?: number;
  total?: number;
  scrollYProgress?: MotionValue<number>;
}

const Shot = ({ shot, index = 0, total = 6, scrollYProgress }: Props) => {
  // Each shot fades in sequentially (0% - 70% of scroll, leaving room for text)
  const startProgress = (index / total) * 0.6 + 0.3;
  const endProgress = startProgress + 0.15;

  // Create a default motion value for when scrollYProgress isn't provided
  const defaultProgress = useMotionValue(1);
  const progress = scrollYProgress || defaultProgress;

  const opacity = useTransform(progress, [startProgress, endProgress], [0, 1]);

  return (
    <motion.li className={styles["dribbble-shot"]} style={{ opacity }}>
      <a href={shot.html_url} target="_blank">
        <div className={styles["shot-frame"]}>
          <div className={styles["dribbble-light"]}></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" role="presentation" src={shot.images.normal} />
        </div>
        <h4 className={styles["title"]}>{shot.title}</h4>
      </a>
    </motion.li>
  );
};

export default Shot;
