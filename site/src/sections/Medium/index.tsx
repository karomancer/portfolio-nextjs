import React, { useRef } from "react";
import format from "date-fns/format";
import { motion, useScroll, useTransform } from "framer-motion";

import WoodGrain from "./WoodGrain";
import getMediumPosts from "./getMediumPosts";
import styles from "./styles.module.scss";

// End positions for each article (matching CSS nth-child rules)
// Values are in vw/vh, representing offset from center of section
const ARTICLE_END_POSITIONS = [
  { x: 20, y: 35, rotate: -15 },    // nth-child(1): right: 20%, bottom: -10%
  { x: -35, y: 30, rotate: 40 },    // nth-child(2): left: 0, bottom: -20%
  { x: 35, y: -30, rotate: 240 },   // nth-child(3): right: 0, top: 10%
  { x: 5, y: -45, rotate: 182 },    // nth-child(4): left: 60%, top (bottom: 75%)
  { x: -20, y: 35, rotate: -10 },   // nth-child(5): left: 20%, bottom: -10%
  { x: 0, y: 40, rotate: 10 },      // nth-child(6): left: 45%, bottom: -20%
  { x: 35, y: 30, rotate: 20 },     // nth-child(7): right: 0, bottom: -5%
  { x: -35, y: -35, rotate: -30 },  // nth-child(8): left: 0, top: 0
  { x: -5, y: -45, rotate: 30 },    // nth-child(9): left: 40%, top: -20%
  { x: -20, y: -40, rotate: -5 },   // nth-child(10): left: 20%, top: -10%
];

// Pile positions - slight variations so they look stacked
const PILE_POSITIONS = [
  { x: 0, y: 0, rotate: -5 },
  { x: 2, y: 3, rotate: 8 },
  { x: -3, y: 1, rotate: -12 },
  { x: 1, y: -2, rotate: 15 },
  { x: -1, y: 2, rotate: -3 },
  { x: 3, y: -1, rotate: 10 },
  { x: -2, y: 0, rotate: -8 },
  { x: 0, y: 3, rotate: 5 },
  { x: 2, y: -3, rotate: -10 },
  { x: -1, y: 1, rotate: 12 },
];

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

interface ArticleProps {
  article: MediumPost;
  index: number;
  total: number;
  scrollYProgress: any;
}

const AnimatedArticle = ({ article, index, total, scrollYProgress }: ArticleProps) => {
  const pilePos = PILE_POSITIONS[index] || PILE_POSITIONS[0];
  const endPos = ARTICLE_END_POSITIONS[index] || ARTICLE_END_POSITIONS[0];

  // Stagger the animation - each article starts and ends at slightly different times
  const staggerStart = index * 0.03;
  const staggerEnd = 0.7 + index * 0.03;

  const x = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [`${pilePos.x}vw`, `${endPos.x}vw`]
  );
  const y = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [`${pilePos.y}vh`, `${endPos.y}vh`]
  );
  const rotate = useTransform(
    scrollYProgress,
    [staggerStart, staggerEnd],
    [pilePos.rotate, endPos.rotate]
  );

  return (
    <motion.li
      className={styles["medium-article"]}
      style={{
        x,
        y,
        rotate,
        // Override CSS positioning - use center as origin
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: "-7.5rem", // Half of width (15rem / 2)
        marginTop: "-10rem",   // Half of height (20rem / 2)
        // Clear CSS nth-child positioning
        right: "auto",
        bottom: "auto",
      }}
    >
      <a
        href={article.link}
        target="_blank"
        style={{
          backgroundImage: `url(${article.coverImage})`,
          backgroundColor: "var(--teal)",
        }}
      >
        <span className={styles["date-issue"]}>
          {format(new Date(article.pubDate), "MMM do yyy")} |{" "}
          <b>Issue #{total - index}</b>
        </span>
        <span className={styles["magazine-title"]}>KACHOW!</span>
        <h4>{article.title}</h4>
      </a>
    </motion.li>
  );
};

const Medium = ({ mediumPosts }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  return (
  <section className={styles["medium-section"]} ref={sectionRef}>
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
          <AnimatedArticle
            key={`${article.title}`}
            article={article}
            index={i}
            total={mediumPosts.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </ul>
    </div>
  </section>
  );
};

export default Medium;
