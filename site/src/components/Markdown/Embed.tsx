import { MetascrapedInfo } from "@/utils/unfurlLink";

import styles from "./styles.module.scss";

const Embed = ({ title, description, image, link }: MetascrapedInfo) => (
  <a href={link} target="_blank" className={styles["embed"]}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" role="presentation" src={image} />
    <span>
      <strong>{title}</strong>
      {description}
    </span>
  </a>
);

export default Embed;
