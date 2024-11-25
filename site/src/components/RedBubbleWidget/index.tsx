import React from "react";
import Script from "next/script";
import Iframe from "react-iframe";

import styles from "./styles.module.scss";

const RedbubbleWidget = ({
  count = 8,
  title,
}: {
  count?: number;
  title: React.ReactNode;
}) => {
  return (
    <section className={styles["redbubble-widget"]}>
      <div>
        {title}
        <p>
          A lot of the illustrative work you see in my projects are available
          for purchase as merch on Redbubble.
          <br />
          If you like any of them or just want to support me, consider buying a
          sticker or a shirt!
        </p>
        <Script
          src="https://www.redbubble.com/assets/external_portfolio.js"
          strategy="beforeInteractive"
        />
        <div className="block mx-auto w-1/2">
          <Iframe
            overflow="hidden"
            scrolling="no"
            url={`https://www.redbubble.com/people/karinachowtime/external-portfolio?count=${count}`}
          />
        </div>
      </div>
    </section>
  );
};

export default RedbubbleWidget;
