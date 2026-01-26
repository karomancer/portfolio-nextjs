import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import styles from "./styles.module.scss";
import Image from "next/image";

const CIRCLES = [
  {
    title: "Designer",
    items: [
      "creating wireframe UI designs",
      "making interactive prototype demos",
      "consulting with startups on their UX",
      "auditing products for UX improvements",
      "conducting UX research with potential users",
      "developing product design systems from scratch",
      "illustrating for physical merchandise",
    ],
    logos: ["figma", "sketch", "photoshop", "illustrator", "premiere"],
  },
  {
    title: "Developer",
    items: [
      "building webapps from scratch",
      "making delightful CSS animations",
      "leading frontend infrastructure teams",
      "communicating technical concepts to the layman",
      "mentoring budding junior engineers",
      "designing frontend interview processes",
      "advocating for web acessibility",
    ],
    logos: [
      "js",
      "ts",
      "p5js",
      "html5",
      "css3",
      "react",
      "graphql",
      "node",
      "python",
      "flask",
    ],
  },
];

const Circle = ({
  children,
  title,
  width,
  index,
  animatedX,
  animatedRotate,
}) => {
  const id = `curve-${index}`;
  const cx = index == 0 ? 400 : 500;
  const pathX = index == 0 ? 0 : 100;
  let offset = index == 0 ? 700 : 200;

  if (width < 1000) {
    offset =
      index == 0
        ? 2 * 400 * Math.sin(-45 / 2) - (width > 500 ? 0 : 100) // 2 × r × sin(θ/2)
        : 2 * 400 * Math.sin(90 / 2) - (width > 500 ? 200 : -50); // 2 × r × sin(θ/2)
  }

  return (
    <motion.div
      className={styles["circle"]}
      style={{ x: animatedX, rotate: animatedRotate }}
    >
      {children}
      <svg viewBox="0 0 900 900">
        <circle r={400} cx={cx} cy={500} />
        <path
          id={id}
          d={`M ${pathX}, 500 a 200,200 0 1,1 800,0 a 200,200 0 1,1 -800,0`}
        />
        <text width={cx}>
          <textPath href={`#${id}`} startOffset={offset}>
            {title}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
};

const VennDiagram = ({ id = "" }) => {
  const [siteWidth, setSiteWidth] = useState(0);
  const isLarge = siteWidth > 1000;
  const sliceLength = isLarge ? CIRCLES[0].items.length : 5;
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Title fades in first (0% - 40%)
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  // Description fades in next (20% - 60%)
  const descriptionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Circles roll in during middle phase (20% - 70%)
  const designerX = useTransform(scrollYProgress, [0.4, 0.8], ["100vw", "0vw"]);
  const designerRotate = useTransform(scrollYProgress, [0.4, 0.8], [360, 0]);
  const developerX = useTransform(
    scrollYProgress,
    [0.4, 0.8],
    ["-100vw", "0vw"],
  );
  const developerRotate = useTransform(scrollYProgress, [0.4, 0.8], [-360, 0]);

  // "Me" fades in after circles settle (70% - 100%)
  const meOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const calculateMovement = (j) => {
    const firstMargin = isLarge ? `3.2rem` : 0;
    return j == 0 ? firstMargin : `${Math.cos(315 - (j + 1) + 0.75)}rem`;
  };

  useEffect(() => {
    const handleResize = () => {
      setSiteWidth(window.innerWidth);
    };

    setSiteWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles["venn-section"]} id={id} ref={sectionRef}>
      <motion.h2 style={{ opacity: titleOpacity }}>
        Interdisciplinary in nature
      </motion.h2>
      <motion.p style={{ opacity: descriptionOpacity }}>
        Starting something? Chances are, I can help.
      </motion.p>
      <div className={styles["venn-diagram"]}>
        {CIRCLES.map((circle, i) => {
          const isFirst = i == 0;
          return (
            <Circle
              key={`circle-${circle.title}`}
              title={circle.title}
              index={i}
              width={siteWidth}
              animatedX={i === 0 ? designerX : developerX}
              animatedRotate={i === 0 ? designerRotate : developerRotate}
            >
              <div>
                <ul>
                  {circle.items.slice(0, sliceLength).map((item, j) => (
                    <li
                      key={`venn-${circle.title}`}
                      style={{
                        ...(isFirst &&
                          isLarge && { marginRight: calculateMovement(j) }),
                        ...(!isFirst &&
                          isLarge && { marginLeft: calculateMovement(j) }),
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <ul>
                  {circle.logos.map((logo) => (
                    <li key={`logo-${logo}`}>
                      <Image
                        alt={`${logo} logo`}
                        src={`/images/logos/${logo}.png`}
                        width={50}
                        height={50}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Circle>
          );
        })}
        {/* <Circle title="Entrepreneur" /> */}
        <motion.p
          className={styles["intersection"]}
          style={{ opacity: meOpacity }}
        >
          Me
        </motion.p>
      </div>
    </section>
  );
};

export default VennDiagram;
