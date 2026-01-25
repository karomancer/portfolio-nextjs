import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import styles from "./styles.module.scss";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  companyLogo: string;
  companyUrl?: string;
  linkedinUrl: string;
  quote: React.ReactNode;
  image?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Ben Bayard",
    title: "Former Staff Engineer at Patreon",
    companyLogo: "/images/testimonials/patreon-logo.png",
    companyUrl: "https://www.patreon.com/",
    image: "/images/testimonials/ben-bayard.jpg",
    linkedinUrl: "https://www.linkedin.com/in/benjamin-bayard-59147930/",
    quote: (
      <>
        Beyond her collaborative spirit, Karina is a highly skilled engineer who
        played a pivotal role in two separate redesigns at Patreon. These
        projects were immense in scope, affecting every aspect of the user
        experience. With a small team, Karina executed her responsibilities
        flawlessly, leading to a seamless go-live experience during the latter
        redesign. We launched in the evening to minimize user impact, and to our
        delight, the complete redesign went live without a single flaw. Karina's
        leadership, technical expertise, and creativity have been invaluable to
        our team. I wholeheartedly recommend her as a remarkable engineer and a
        wonderful teammate.
      </>
    ),
  },
  {
    id: 1,
    name: "Amit Duvedi",
    title: "Principal & Co-founder at Growth Accelerators",
    companyLogo: "/images/testimonials/growth-accelerators-logo.png",
    image: "/images/testimonials/amit-duvedi.jpg",
    linkedinUrl: "https://www.linkedin.com/in/amit-duvedi-31252b1/",
    quote:
      "I thoroughly enjoyed working with Karina. She delivered a high quality Adobe Animate animation design and a demo video for our product idea. She was creative, dedicated and brought a lot of energy and humor. I would love to work with her again!",
  },
  {
    id: 2,
    name: "Jeff Starr",
    title: "Cofounder of Broker2Broker",
    companyLogo: "/images/testimonials/broker2broker-logo.png",
    companyUrl: "https://broker2broker.app/",
    image: "/images/testimonials/jeff-starr.jpg",
    linkedinUrl: "https://www.linkedin.com/in/jeffhstarr",
    quote:
      "Karina can help you turn an app idea into a design that developers can start building. She has a talent for understanding both the user experience and the technical constraints, making her an excellent bridge between concept and implementation.",
  },
  {
    id: 3,
    name: "Chris Crabtree",
    title: "Cofounder of Broker2Broker",
    companyLogo: "/images/testimonials/broker2broker-logo.png",
    companyUrl: "https://broker2broker.app/",
    image: "/images/testimonials/chris-crabtree.jpg",
    linkedinUrl: "https://www.linkedin.com/in/ccrabtree",
    quote:
      "We worked with Karina and her team at Mutations to prototype an app for the commercial real estate industry. She quickly grasped our complex domain and delivered an intuitive, polished design that helped us communicate our vision to investors.",
  },
  {
    id: 4,
    name: "Michael Morris",
    title: "CEO and Cofounder at ONRAMP",
    companyLogo: "/images/testimonials/onramp-logo.svg",
    companyUrl: "https://onrampfleet.com",
    image: "/images/testimonials/michael-morris.jpg",
    linkedinUrl: "https://www.linkedin.com/in/mdbmorris",
    quote:
      "Karina joined our fintech startup as one of the first team members and helped shape the UX direction for our trucking payment platform. Her ability to translate complex payment flows into simple, driver-friendly interfaces was invaluable.",
  },
];

const ROTATION_INTERVAL = 12000; // 8 seconds per testimonial

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  // Track scroll progress for fade-in animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Title fades in first
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  // Subtitle fades in next
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Auto-rotate testimonials
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, ROTATION_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex]);

  const goToNext = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrev = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const goToIndex = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Bouncy cartoon animation variants
  const bubbleVariants = {
    enter: {
      opacity: 0,
      scale: 0.5,
      y: -30,
      rotate: -3,
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      rotate: 2,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };

  const avatarVariants = {
    enter: {
      y: 50,
      opacity: 0,
      scale: 0.3,
      rotate: 10,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      },
    },
    exit: {
      y: 30,
      opacity: 0,
      scale: 0.5,
      rotate: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      <motion.h2 style={{ opacity: titleOpacity }}>Easy to work with</motion.h2>
      <motion.p style={{ opacity: subtitleOpacity }}>
        Or so my old coworkers and clients say!
      </motion.p>
      <div className={styles.carousel}>
        <button
          className={styles.navButton}
          onClick={goToPrev}
          aria-label="Previous testimonial"
        >
          <span aria-hidden="true">&larr;</span>
        </button>

        <div className={styles.testimonialContainer}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={currentTestimonial.id}
              className={styles.testimonialContent}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Quote bubble */}
              <motion.div
                className={styles.quoteBubble}
                variants={bubbleVariants}
              >
                <blockquote>{currentTestimonial.quote}</blockquote>
                {/* Zigzag speech bubble tail */}
                <svg
                  className={styles.tail}
                  viewBox="0 0 70 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0
                       L 35 0
                       L 20 22
                       L 45 18
                       L 25 58
                       L 30 28
                       L 5 32
                       L 0 5
                       Z"
                    fill="white"
                    stroke="var(--teal)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  {/* White cover for top connection */}
                  <rect x="-1" y="-2" width="38" height="8" fill="white" />
                </svg>
              </motion.div>

              {/* Attribution + Avatar row */}
              <motion.div
                className={styles.speakerRow}
                variants={avatarVariants}
              >
                <div className={styles.attribution}>
                  <a
                    href={currentTestimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.name}
                  >
                    {currentTestimonial.name}
                  </a>
                  <span className={styles.title}>
                    {currentTestimonial.title}
                  </span>
                  {currentTestimonial.companyLogo && (
                    <Image
                      src={currentTestimonial.companyLogo}
                      alt={`${currentTestimonial.name}'s company logo`}
                      width={120}
                      height={40}
                      className={styles.companyLogo}
                      style={{ objectFit: "contain" }}
                      objectPosition="right center"
                    />
                  )}
                </div>

                <div className={styles.avatar}>
                  {currentTestimonial.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {currentTestimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className={styles.navButton}
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      {/* Dots indicator */}
      <div className={styles.dots}>
        {TESTIMONIALS.map((_, index) => (
          <button
            key={`dot-${index}`}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
