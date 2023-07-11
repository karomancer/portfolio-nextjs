import { MetascrapedInfo } from "@/utils/unfurlLink";

import styles from "./styles.module.scss";
import Image from "next/image";

const Embed = ({ title, description, image, link }: MetascrapedInfo) => (
  <a href={link} target="_blank" className={styles["embed"]}>
    {image && <Image alt="" role="presentation" src={image} />}
    <span>
      <strong>{title}</strong>
      {description}
    </span>
  </a>
);

export default Embed;
