import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const DEFAULT_WIDTH = 1200;
const MAP_HEIGHT = 500;

const getViewportWidth = () => document.documentElement.clientWidth;

const VisitedPlaces = () => {
  const [width, setWidth] = useState(() =>
    typeof document === "undefined" ? DEFAULT_WIDTH : getViewportWidth(),
  );

  useEffect(() => {
    const updateWidth = () => setWidth(getViewportWidth());
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className={styles["map-section"]}>
      <h2>Places I've visited</h2>
      <iframe
        className={styles["map-iframe"]}
        width={width}
        height={MAP_HEIGHT}
        src={`https://beeneverywhere.net/usermap/4579?width=${width}&height=${MAP_HEIGHT}`}
        title="Places Karina has been"
      ></iframe>
    </section>
  );
};

export default VisitedPlaces;
