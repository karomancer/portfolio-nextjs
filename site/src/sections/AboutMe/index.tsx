import React from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  getDaysInMonth,
} from "date-fns";

import styles from "./styles.module.scss";

const MONTHS_INTERN = 10;
const FULLTIME_START_DATE = subMonths(new Date(2013, 8, 5, 9), MONTHS_INTERN);

const AboutMe = ({id = "one"}) => {
  const today = new Date();

  const numYears = differenceInYears(today, FULLTIME_START_DATE);
  const numMonths = differenceInMonths(today, FULLTIME_START_DATE) % 12;
  const numDays =
    ((differenceInDays(today, FULLTIME_START_DATE) % 365) - numMonths * 30) %
    getDaysInMonth(today);

  return (
    <section className={styles["about-me"]} id={id}>
      <div className={styles["about-me-content"]}>
        <blockquote>
          “Screw the rules, I have <b>green hair</b>”
        </blockquote>
        <div>
          Hello World! My name is Karina Chow and I'm a swiss army knife.
          <br />
          What does that mean? Well I'm glad you asked.
          <br />
          This is what I've been doing in my last{" "}
          {`${numYears} years, ${
            numMonths > 0 &&
            `${numDays > 30 ? numMonths + 1 : numMonths} month${
              numMonths !== 1 ? "s" : ""
            },`
          } and ${numDays} day${numDays !== 1 ? "s" : ""}`}{" "}
          of working in tech:
          <ul className={styles["about-me-lists"]}>
            <List
              title="Developer"
              items={[
                "building webapps",
                "creating data visualizations",
                "making delightful CSS animations",
                "leading frontend infrastructure teams",
                "translating technical concepts to non-technical folk",
                "mentoring budding junior engineers",
                "designing FE interview processes",
                "advocating for web acessibility",
              ]}
              logos={[
                "js",
                "ts",
                "p5js",
                "react",
                "graphql",
                "html5",
                "css3",
                "gatsby",
                "python",
                "flask",
              ]}
            />
            <List
              title="Designer"
              items={[
                "creating wireframe UI designs",
                "making interactive prototype demos and videos for pitch meetings",
                "consulting with startups on their user experiences",
                "playing ambassador between design and engineering",
                "selecting colors, typography, and style for client branding",
                "developing product design systems from scratch",
                "illustrating for physical merchandise",
              ]}
              logos={[
                "figma",
                "sketch",
                "photoshop",
                "illustrator",
                "premiere",
              ]}
            />
            <List
              title="Entrepreneur"
              items={[
                "operating my own LLC and working with clients",
                <>
                  running a{" "}
                  <a
                    href="https://www.redbubble.com/people/karinachowtime"
                    target="_blank"
                  >
                    RedBubble shop
                  </a>
                </>,
                "participating in venture competitions and startup hackathons",
                <>
                  writing tech and mental health{" "}
                  <a href="https://medium.com/@karomancer" target="_blank">
                    Medium articles
                  </a>
                  , some of which have reached the{" "}
                  <a
                    href="https://news.ycombinator.com/item?id=28173721"
                    target="_blank"
                  >
                    front page of Hacker News
                  </a>
                </>,
              ]}
            />
          </ul>
          {/* If you got here from social media, you probably have seen the phrase */}
          {/* above. */}
        </div>
      </div>
    </section>
  );
};

interface ListProps {
  title: string;
  items: (string | JSX.Element)[];
  logos?: string[];
}

const List = ({ title, items, logos = [] }: ListProps) => (
  <li>
    <div>
      <b>{title}</b>
      <ul className={styles["list-of-things"]}>
        {items.map((item, i) => (
          <li key={`${title}-${i}`}>{item}</li>
        ))}
      </ul>
      {logos && (
        <>
          <strong>Skills/Tools</strong>
          <ul className={styles["list-of-tech"]}>
            {logos.map((logo) => (
              <li key={`logo-${logo}`}>
                <img
                  src={`../images/logos/${logo}.png`}
                  alt={`Logo for ${logo}`}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </li>
);

export default AboutMe;
