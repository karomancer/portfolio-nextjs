import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

interface Props {
  isSubPage: boolean;
  lightMode: boolean;
}

const TopNav = ({ lightMode, isSubPage }: Props) => {
  const [hasScrolledFarEnough, setHasScrolledFarEnough] = useState(false);
  const isLight = lightMode && !hasScrolledFarEnough && styles["light"];
  const hasBackground = hasScrolledFarEnough && styles["with-background"];

  useEffect(() => {
    const scrollThreshold = isSubPage
      ? window.innerHeight * 0.75
      : window.innerHeight;
    document.addEventListener("scroll", () => {
      if (window.scrollY > scrollThreshold && !hasScrolledFarEnough) {
        setHasScrolledFarEnough(true);
      } else if (window.scrollY < scrollThreshold) {
        setHasScrolledFarEnough(false);
      }
    });
  }, []);

  return (
    <nav className={`${styles["top-nav"]} ${isLight} ${hasBackground}`}>
      <ul>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/portfolio">portfolio</a>
        </li>
        <li>
          <a href="/resume">resume</a>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
