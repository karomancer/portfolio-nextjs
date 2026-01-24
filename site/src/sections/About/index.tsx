import React, { useRef } from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  getDaysInMonth,
} from "date-fns";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./styles.module.scss";
import Link from "next/link";
import AnimatedText from "../../components/AnimatedText";

const MONTHS_INTERN = 10;
const FULLTIME_START_DATE = subMonths(new Date(2013, 8, 5, 9), MONTHS_INTERN);

const AboutMe = ({ id = "one" }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Title animates first (0% - 40%)
  const titleProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  // Paragraphs fade in with gradient effect (staggered from top to bottom)
  const para1Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const para2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const para3Opacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const para4Opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const para5Opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section className={styles["about-me"]} id={id} ref={sectionRef}>
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
          <h2>
            <AnimatedText
              text="Hello World, I'm Karina! 👋"
              animationProgress={titleProgress}
            />
          </h2>
          <motion.p style={{ opacity: para1Opacity }}>
            I'm a creative technologist exploring the intersection of art,
            psychology, and technology—through products, museum exhibits, games,
            interactive clothing, or whatever else might make someone smile.
          </motion.p>
          <motion.p style={{ opacity: para2Opacity }}>
            Professionally, I help early-stage startups ship products—whatever
            that takes. Sometimes it's frontend code, sometimes it's a pitch
            deck, sometimes it's UX research or animation. I've run my own small
            software contracting agency, <strong>KACHOW! LLC</strong>, since
            2020 and occasionally rope in some old colleagues to work with me on
            larger projects.
          </motion.p>
          <motion.p style={{ opacity: para3Opacity }}>
            I also work part time as a New Media Exhibit Technician at the{" "}
            <a href="https://www.exploratorium.edu/" target="_blank" rel="noopener noreferrer">
              Exploratorium
            </a>
            , an interactive science museum in San Francisco.
          </motion.p>
          <motion.p style={{ opacity: para4Opacity }}>
            Prior to that, I worked as a software engineer for over a decade in
            San Francisco: as a data engineer at <strong>Yammer</strong>, a
            frontend engineer at <strong>Honor</strong>, and a frontend
            infrastructure team leader at <strong>Patreon</strong>. I've spoken
            at conferences on frontend infrastructure and design systems, as
            well as on disability, accessibility, and mental health in tech.
          </motion.p>
          <motion.p style={{ opacity: para5Opacity }}>
            I hold a Bachelor of Science in Computer Science and{" "}
            <a href="https://hcii.cmu.edu/" target="_blank" rel="noopener noreferrer">
              Human-Computer Interaction
            </a>{" "}
            from <strong>Carnegie Mellon University</strong> and a Masters of
            Professional Studies in{" "}
            <a href="https://itp.nyu.edu/itp/" target="_blank" rel="noopener noreferrer">
              Interactive Telecommunications
            </a>{" "}
            at <strong>New York University</strong>.
          </motion.p>
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
