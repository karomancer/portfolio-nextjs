import React from 'react';

import styles from './styles.module.scss';

type Images = {
  "hidpi": string;
  "normal": string;
  "teaser": string;
}

export type ShotType = {
  title: string;
  description: string;
  updatedAt: string;
  images: Images;
  url: string;
};

interface Props {
  shot: ShotType;
}

const Shot = ({ shot }: Props) => {
  return (
    <li className={styles["dribbble-shot"]}>
      <a href={shot.url} target="_blank">
        <div className={styles["shot-frame"]}>
          <div className={styles["dribbble-light"]}></div>
          <img src={shot.images.normal} />
        </div>
        <h4 className={styles["title"]}>{shot.title}</h4>
      </a>
    </li>
  );
};

export default Shot;
