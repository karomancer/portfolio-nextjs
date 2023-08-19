import { Tags } from "./types";

import styles from "./styles.module.scss"

const TagsList = ({
  slug = "tag",
  tags,
}: {
  slug?: string;
  tags: Tags;
}) => (
  <ul className={styles["tags-list"]} style={{overflow: "hidden"}}>
    {tags.map((t) => (
      <li key={`${slug}-${t}`}>{t}</li>
    ))}
  </ul>
);

export default TagsList