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
          <h2>Hello World, I'm Karina! 👋</h2>
          <br />
          I'm a creative technologist that loves exploring the intersection of
          art, psychology, and technology and creating meaningful and joyful
          experiences through games and products.
          <br />
          In the last couple of years I've been tinkering with mixed reality,
          e-textiles, algo/AI art, and projection mapping. In May, I received my
          Masters of Professional Studies in{" "}
          <a href="https://itp.nyu.edu/itp/" target="_blank">
            Interactive Telecommunications
          </a>{" "}
          at <strong>New York University</strong>.
          <br />
          Professionally, my work currently ranges from frontend engineering and
          mobile app development to graphic design and illustration, pitch deck
          preparation, and animation work. I typically work with small startups
          ranging from pre-seed to series B, utilizing all my skills to build
          prototypes and full fledged products. Today, I have a couple
          subcontractors to help me better serve my clients under my own
          company, <strong>KACHOW! LLC</strong>.
          <br />
          For over a decade, I worked as a software engineer in San Francisco:
          as a data engineer at <strong>Yammer</strong>, a frontend engineer at{" "}
          <strong>Honor</strong>, and a frontend infrastructure team leader at{" "}
          <strong>Patreon</strong>. I've spoken both at conferences about
          frontend infrastructure, design systems, as well as conferences about
          disabilities, accessibility, and mental health in tech.
          <br />
          Previously, I got my Bachelor of Science in Computer Science and{" "}
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
