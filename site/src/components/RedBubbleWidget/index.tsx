import React from "react";

import styles from "./styles.module.scss";
import {
  DEFAULT_PRODUCTS,
  PRODUCTS_BY_SLUG,
  SHOP_URL,
  Product,
} from "./products";

const RedbubbleWidget = ({
  count,
  title,
  slug,
}: {
  count?: number;
  title: React.ReactNode;
  slug?: string;
}) => {
  const products: Product[] =
    (slug && PRODUCTS_BY_SLUG[slug]) || DEFAULT_PRODUCTS;
  const shown = count ? products.slice(0, count) : products;

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
        <ul className={styles["product-grid"]}>
          {shown.map((product) => (
            <li key={product.url}>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={`${product.title} ${product.type.toLowerCase()}`}
                  width={600}
                  height={600}
                  loading="lazy"
                />
                <span className={styles["product-title"]}>{product.title}</span>
                <span className={styles["product-type"]}>{product.type}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          className={styles["shop-link"]}
          href={SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my full Redbubble shop &rarr;
        </a>
      </div>
    </section>
  );
};

export default RedbubbleWidget;
