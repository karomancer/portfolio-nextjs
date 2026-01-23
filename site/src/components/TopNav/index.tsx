import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { usePageTransition } from "@/components/PageTransition";

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
  const router = useRouter();
  const { navigateWithTransition } = usePageTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolledFarEnough, setHasScrolledFarEnough] = useState(false);
  const isLight = lightMode && !hasScrolledFarEnough && styles["light"];
  const hasBackground = hasScrolledFarEnough && styles["with-background"];

  // Use router.pathname for current page detection
  const currentSlug = router.pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigateWithTransition(path);
  };

  useEffect(() => {
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
            <Link href={path} onClick={(e) => handleNavClick(e, path)}>{label}</Link>
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
