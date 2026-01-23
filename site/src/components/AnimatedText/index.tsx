import { motion, useTransform, MotionValue } from "framer-motion";
import React, { Fragment, useMemo } from "react";

function AnimatedLetter({
  letter,
  letterProgress,
  animationProgress,
}: {
  letter: string;
  letterProgress: number;
  animationProgress: MotionValue<number>;
}) {
  const opacity = useTransform(
    animationProgress,
    [0, letterProgress * 0.5, letterProgress + 0.01, 1],
    [0, 0, 1, 1]
  );
  return (
    <motion.span
      initial={{ opacity: 0 }}
      style={{
        opacity,
      }}
    >
      {letter}
    </motion.span>
  );
}

function calculateStringLength(text: string): number {
  return text.length;
}

function calculateFragmentLength(fragmentChildren: React.ReactNode[]): number {
  return fragmentChildren.reduce<number>((sum, child) => {
    if (typeof child === "string") {
      return sum + calculateStringLength(child);
    }
    return sum;
  }, 0);
}

function createAnimatedLetters(
  text: string,
  prevLength: number,
  totalLength: number,
  animationProgress: MotionValue<number>
) {
  return text
    .split("")
    .map((letter, index) => (
      <AnimatedLetter
        key={`letter-${letter}-${index + prevLength * totalLength}`}
        letter={letter}
        letterProgress={(index + prevLength) / totalLength}
        animationProgress={animationProgress}
      />
    ));
}

export default function AnimatedText({
  text,
  animationProgress,
}: {
  text: React.ReactNode;
  animationProgress: MotionValue<number>;
}) {
  let prevLength = 0;

  const totalLength = useMemo((): number => {
    return React.Children.toArray(text).reduce<number>((prevValue, child) => {
      if (typeof child === "string") {
        return prevValue + calculateStringLength(child);
      }
      if (React.isValidElement(child) && child.type === Fragment) {
        const fragmentChildren = React.Children.toArray(
          (child as React.ReactElement<{ children: React.ReactNode }>).props
            .children
        );
        return prevValue + calculateFragmentLength(fragmentChildren);
      }
      return prevValue;
    }, 0);
  }, [text]);

  return (
    <>
      {React.Children.map(text, (child) => {
        if (typeof child === "string") {
          const animatedLetters = createAnimatedLetters(
            child,
            prevLength,
            totalLength,
            animationProgress
          );
          prevLength += child.length;
          return animatedLetters;
        }
        if (React.isValidElement(child) && child.type === Fragment) {
          return React.Children.map(
            (child as React.ReactElement<{ children: React.ReactNode }>).props
              .children,
            (fragmentChild) => {
              if (typeof fragmentChild === "string") {
                const animatedLetters = createAnimatedLetters(
                  fragmentChild,
                  prevLength,
                  totalLength,
                  animationProgress
                );
                prevLength += fragmentChild.length;
                return animatedLetters;
              }
              return fragmentChild;
            }
          );
        }
        return child;
      })}
    </>
  );
}
