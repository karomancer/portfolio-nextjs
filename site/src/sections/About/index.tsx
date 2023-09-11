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

const MONTHS_INTERN = 10;
const FULLTIME_START_DATE = subMonths(new Date(2013, 8, 5, 9), MONTHS_INTERN);

const AboutMe = ({ id = "one" }) => {
  return (
    <section className={styles["about-me"]} id={id}>
      

      <div className={styles["about-me-content"]}>
        <div>
          <div className={styles["profile-picture"]}>
            <Image
              src="/images/self.png"
              alt="A profile picture depicting a girl with asymmetrical green hair"
              width={339}
              height={406}
              objectFit="contain"
            />
          </div>
        </div>
        <div>
          <h2>About me</h2>
          Hello World, I'm <b>Karina Chow</b>.
          <br />
          Currently, I am pursuing a{" "}
          <strong>Masters in Professional Studies</strong> in{" "}
          <a href="https://itp.nyu.edu/itp/" target="_blank">
            Interactive Telecommunications
          </a>{" "}
          at <strong>New York University</strong> to study the intersection of
          art and technology through examining and learning about emerging
          technologies like mixed reality, e-textiles, algo/AI art, projection
          mapping, and so on. My undergraduate degree was a{" "}
          <strong>Bachelor of Science</strong> in{" "}
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
          Prior to starting graduate school, I spent a decade as a software
          engineer in the San Francisco tech scene. I've worked in social
          networking at <strong>Yammer</strong>, non-medical home care at{" "}
          <strong>Honor</strong>, and the creator economy space at{" "}
          <strong>Patreon</strong>. I've spoken both at tech conferences about
          frontend infrastructure and design systems as well as at conferences
          about disabilities, accessibility, and mental health.
          <br />
          My work has ranged from <strong>software engineering</strong> to{" "}
          <strong>UX research</strong> to <strong>design</strong>, specifically
          graphic design and illustration, pitch deck preparation, and animation
          work. I've also worked as a consultant, contractor, and freelancer in
          these areas of expertise under my own business, KACHOW! LLC.
          <br />
          For the last few years, I've worked primarily with{" "}
          <strong>pre-seed round startups</strong>, utilizing all my skills to
          help them get off the ground. Today, I have a couple subcontractors to
          help me better serve my clients.
          <br />
          If you find me elsewhere online, you'll often see the tagline "Screw
          the rules, I have green hair", which is both a{" "}
          <a
            href="https://knowyourmeme.com/photos/178808-screw-the-rules-i-have-money"
            target="_blank"
          >
            meme
          </a>{" "}
          and a nod to{" "}
          <a
            href="https://abridgedseries.fandom.com/wiki/LittleKuriboh"
            target="_blank"
          >
            a certain content creator
          </a>
          . This has become my motto and life's philosophy:
          <br />
          <blockquote>
            As time marches on, rules are often meant to be broken to make
            way for new rules and realities.
          </blockquote>
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
