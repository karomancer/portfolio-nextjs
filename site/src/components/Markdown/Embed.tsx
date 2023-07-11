import { MetascrapedInfo } from "@/utils/unfurlLink";

import styles from "./styles.module.scss";

const Embed = ({ title, description, image, link }: MetascrapedInfo) => (
  <a href={link} target="_blank" className={styles["embed"]}>
    <img alt="" role="presentation" src={image} />
    <span>
      <strong>{title}</strong>
      {description}
    </span>
  </a>
);

export default Embed;
