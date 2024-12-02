import React from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  getDaysInMonth,
} from "date-fns";
import Image from "next/image";

import styles from "./styles.module.scss";
import Link from "next/link";

const MONTHS_INTERN = 10;
const FULLTIME_START_DATE = subMonths(new Date(2013, 8, 5, 9), MONTHS_INTERN);

const AboutMe = ({ id = "one" }) => {
  return (
    <section className={styles["about-me"]} id={id}>
      <div className={styles["about-me-content"]}>
        <div>
          <div className={styles["profile-picture"]}>
            <Image
              src="/images/me.jpeg"
              alt="A profile picture depicting a girl with asymmetrical green hair"
              width={339}
              height={406}
              objectFit="contain"
            />
          </div>
        </div>
        <div>
          <h2>Who am I?</h2>
          👋 Hello World, I'm <b>Karina Chow</b>
          <br />
          I'm a San Francisco-based creative technologist, software developer,
          artist, and designer that sits at the intersection of art and
          technology.
          <br />
          My work ranges from frontend engineering and mobile app development to
          graphic design and illustration, pitch deck preparation, and animation
          work. I typically work with small startups ranging from pre-seed to
          series B, utilizing all my skills to build prototypes and full fledged
          products. Today, I have a couple subcontractors to help me better
          serve my clients under my own company, <strong>KACHOW! LLC</strong>
          <br />
          In the last couple of years, I've also been exploring mixed reality,
          e-textiles, algo/AI art, and projection mapping. In May, I received my
          masters degree in{" "}
          <a href="https://itp.nyu.edu/itp/" target="_blank">
            Interactive Telecommunications
          </a>{" "}
          at <strong>New York University</strong>. You can see these
          explorations in my <Link href="/portfolio">portfolio</Link> and{" "}
          <Link href="/blog">blog</Link>.
          <br />
          Prior to grad school and starting my own business, I spent a decade as
          a software engineer in San Francisco. I worked as a data engineer at{" "}
          <strong>Yammer</strong>, a frontend engineer at <strong>Honor</strong>
          , and a frontend infrastructure team leader at{" "}
          <strong>Patreon</strong>. I've spoken both at conferences about
          frontend infrastructure, design systems, as well as disabilities,
          accessibility, and mental health in tech.
          <br />I received my <strong>Bachelor of Science</strong> in{" "}
          <a
            href="https://www.csd.cs.cmu.edu/academics/bachelors/overview"
            target="_blank"
          >
            Computer Science
          </a>{" "}
          and{" "}
          <a href="https://hcii.cmu.edu/" target="_blank">
            Human-Computer Interaction
          </a>{" "}
          from <strong>Carnegie Mellon University</strong>.
          <br />
        </div>
      </div>
    </section>
  );
};

export const Countdown = () => {
  const today = new Date();

  const numYears = differenceInYears(today, FULLTIME_START_DATE);
  const numMonths = differenceInMonths(today, FULLTIME_START_DATE) % 12;
  const numDays =
    ((differenceInDays(today, FULLTIME_START_DATE) % 365) - numMonths * 30) %
    getDaysInMonth(today);
  return (
    <div>
      <h4>Days working in tech</h4>
      {`${numYears} years, ${
        numMonths > 0 &&
        `${numDays > 30 ? numMonths + 1 : numMonths} month${
          numMonths !== 1 ? "s" : ""
        },`
      } and ${numDays} day${numDays !== 1 ? "s" : ""}`}{" "}
    </div>
  );
};

export default AboutMe;
