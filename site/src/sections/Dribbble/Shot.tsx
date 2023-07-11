import React from 'react';

import styles from './styles.module.scss';

type Images = {
  "hidpi": string;
  "normal": string;
  "teaser": string;
}

export type DribbbleShot = {
  title: string;
  description: string;
  published_at: string;
  images: Images;
  html_url: string;
};

interface Props {
  shot: DribbbleShot;
}

const Shot = ({ shot }: Props) => {
  return (
    <li className={styles["dribbble-shot"]}>
      <a href={shot.html_url} target="_blank">
        <div className={styles["shot-frame"]}>
          <div className={styles["dribbble-light"]}></div>
          <img alt="" role="presentation" src={shot.images.normal} />
        </div>
        <h4 className={styles["title"]}>{shot.title}</h4>
      </a>
    </li>
  );
};

export default Shot;
