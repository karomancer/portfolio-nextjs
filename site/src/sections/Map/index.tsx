import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const VisitedPlaces = () => {
  const [mapEmbed, setMapEmbed] = useState(null);
  useEffect(() => {
    setMapEmbed(
      <section className={styles["map-section"]}>
        <h2>Places I've visited</h2>
        <iframe
          className={styles["map-iframe"]}
          width={window.innerWidth}
          height={500}
          src={`https://beeneverywhere.net/usermap/4579?width=${
            window.innerWidth
          }&height=${500}`}
          title="Places Karina has been"
        ></iframe>
      </section>
    );
  }, []);

  return mapEmbed;
};

export default VisitedPlaces;
