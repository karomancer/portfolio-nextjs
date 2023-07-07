import React from "react";
import format from "date-fns/format";

import WoodGrain from "./WoodGrain"
import getMediumPosts from "./getMediumPosts";
import styles from "./styles.module.scss";

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  coverImage?: string;
  "content:encoded": string;
}

export { getMediumPosts };

interface Props {
  mediumPosts?: MediumPost[];
}

const Medium = ({ mediumPosts }: Props) => (
  <section className={styles["medium-section"]}>
    <WoodGrain className={styles["wood-grain-background"]} />
    <div className={styles["section-description"]}>
      <h2>
        <b>KACHOW!</b> Digest
      </h2>
      <p>
        Sometimes I write things, and no, I don't use AI (yet?). I write about{" "}
        <a
          href="https://karomancer.medium.com/list/mental-health-20c5e92e5d47"
          target="_blank"
        >
          mental health
        </a>
        ,{" "}
        {/* <a
          href="https://karomancer.medium.com/list/applying-psychology-581fc1b5fe4f"
          target="_blank"
        >
          psychology in gaming
        </a>
        ,{" "} */}
        <a
          href="https://karomancer.medium.com/list/web-accessibility-17511f440dd8"
          target="_blank"
        >
          web accessibility
        </a>
        ,{" "}
        <a
          href="https://karomancer.medium.com/list/tech-recruiting-05ca9a2c2a81"
          target="_blank"
        >
          technical recruiting
        </a>
        , and about{" "}
        <a
          href="https://karomancer.medium.com/list/tech-learnings-advice-4e01a4a0c75c"
          target="_blank"
        >
          the tech industry in general
        </a>
        . Sometimes I even write about{" "}
        <a
          href="https://karomancer.medium.com/list/screw-the-rules-4e26c788b467"
          target="_blank"
        >
          random topics
        </a>
        , too.
        <br />
        <br />
        <span className={styles["view-cta"]}>
          You can view all my articles and follow me on{" "}
          <a href="https://medium.com/@karomancer" target="_blank">
            Medium
          </a>
          .
        </span>
      </p>
    </div>
    <div>
      <ul className={styles["medium-articles"]}>
        {mediumPosts?.map((article, i) => (
          <li
            key={`${article.title}`}
            className={styles["medium-article"]}
          >
            <a href={article.link} target="_blank" style={{
              backgroundImage: `url(${article.coverImage})`,
            }}>
              <span className={styles["date-issue"]}>
                {format(new Date(article.pubDate), "MMM do yyy")} |{" "}
                <b>Issue #{mediumPosts.length - i}</b>
              </span>
              <span className={styles["magazine-title"]}>KACHOW!</span>
              <h4>{article.title}</h4>
              {/* <p>{article.virtuals.subtitle}</p> */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Medium;
