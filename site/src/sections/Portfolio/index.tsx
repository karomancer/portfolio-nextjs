import { compareDesc, format } from "date-fns";

import { ReadMDX } from "@/utils/readMdx";
import pageStyles from "@/pages/portfolio/styles.module.scss";

import styles from "./styles.module.scss";

interface PortfolioProps {
  pieces: ReadMDX[];
}

export const TagsList = ({ tags }: { tags: string[] }) => (
  <ul className={pageStyles["tags-list"]}>
    {tags.map((t) => (
      <li key={t}>{t}</li>
    ))}
  </ul>
);

const PortfolioSection = ({ pieces }: PortfolioProps) => (
  <div className={styles["portfolio-section"]}>
    <ul>
      {pieces
        .sort((a, b) =>
          compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
        )
        .map(
          ({
            frontmatter: {
              title,
              slug,
              description,
              categories,
              date,
              preview,
              tags,
            },
          }) => (
            <li key={slug} className={styles["portfolio-piece"]}>
              <a key={title} href={slug}>
                <img src={preview} alt="" role="presentation" />
                <div className={styles["header"]}>
                  <h6>
                    <strong>{categories.join(" & ").toUpperCase()}</strong> |{" "}
                    {format(new Date(date), "MMMM yyyy")}
                  </h6>
                  <h4>{title}</h4>
                </div>
                <div className={styles["description"]}>
                  <p>{description}</p>
                  <TagsList tags={tags} />
                </div>
              </a>
            </li>
          )
        )}
    </ul>
  </div>
);

export default PortfolioSection;
