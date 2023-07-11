import React, { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  isSubPage: boolean;
  lightMode: boolean;
}

const MENU_ITEMS = [
  { path: "/", label: "home" },
  { path: "/portfolio", label: "portfolio" },
  { path: "/resume", label: "resume" },
];

const TopNav = ({ lightMode, isSubPage }: Props) => {
  const [currentSlug, setCurrentSlug] = useState("/");
  const [hasScrolledFarEnough, setHasScrolledFarEnough] = useState(false);
  const isLight = lightMode && !hasScrolledFarEnough && styles["light"];
  const hasBackground = hasScrolledFarEnough && styles["with-background"];

  useEffect(() => {
    setCurrentSlug(window.location.pathname);
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

  useEffect(() => {
    setCurrentSlug(window.location.pathname);
  });

  console.log(currentSlug)
  return (
    <nav className={`${styles["top-nav"]} ${isLight || ""} ${hasBackground || ""}`}>
      <ul>
        {MENU_ITEMS.map(({ path, label }) => (
          <li key={`top-nav-${path}`} className={currentSlug === path ? styles["selected-item"] : ""}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNav;
