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
  { path: "/blog", label: "maker blog" },
  { path: "/resume", label: "resume" },
];

const TopNav = ({ lightMode, isSubPage }: Props) => {
  const [currentSlug, setCurrentSlug] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolledFarEnough, setHasScrolledFarEnough] = useState(false);
  const isLight = lightMode && !hasScrolledFarEnough && styles["light"];
  const hasBackground = hasScrolledFarEnough && styles["with-background"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setCurrentSlug(window.location.pathname);
    const scrollThreshold = isSubPage
      ? window.innerHeight * 0.75
      : window.innerHeight;
    const handleScroll = () => {
      setHasScrolledFarEnough(window.scrollY > scrollThreshold);
    };
    document.addEventListener("scroll", handleScroll);
    setIsMenuOpen(false);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [isSubPage]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentSlug]);

  useEffect(() => {
    setCurrentSlug(window.location.pathname);
  }, []);

  return (
    <nav
      className={`${styles["top-nav"]} ${isLight || ""} ${hasBackground || ""}`}
    >
      <ul className={isMenuOpen ? "" : styles["is-closed"]}>
        {MENU_ITEMS.map(({ path, label }) => (
          <li
            key={`top-nav-${path}`}
            className={currentSlug === path ? styles["selected-item"] : ""}
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <button onClick={toggleMenu} className={styles["mobile-nav-button"]}>
        {isMenuOpen ? "×" : "≡"}
      </button>
    </nav>
  );
};

export default TopNav;
