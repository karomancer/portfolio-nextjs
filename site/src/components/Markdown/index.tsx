import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { MetascrapedInfo } from "@/utils/unfurlLink";

import Asset from "./Asset";
import Embed from "./Embed";
import { ListItem } from "./types";

import styles from "./styles.module.scss";

// Embed link data can be fetched in static props
// and mapped over here
export type HrefToEmbeds = {
  [href: string]: MetascrapedInfo;
};

interface Props {
  className?: string;
  children: string;
  embeds?: HrefToEmbeds;
}

/**
 * REGEX OUR FAVORITE
 */

const CHECKED_CHECKBOX_PATTERN = /\[x\]/;
const UNCHECKED_CHECKBOX_PATTERN = /\[ \]/;

/**
 *
 * Markdown component
 */
export default function Markdown({ className, children, embeds }: Props) {
  useEffect(() => {
    hljs.highlightAll();
    resizePictures();
  }, []);
  return (
    <article>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) =>
            props.href && embeds && embeds[props.href] ? (
              <Embed {...embeds[props.href]} />
            ) : (
              <a {...props} />
            ),
          img: ({ node, ...props }) => <Asset {...props} />,
          li: ({ node, ...props }) => <Li {...props} />,
        }}
        className={`${className} ${styles["markdown"]}`}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}

const Li = ({ children, ...props }: ListItem) => {
  if (typeof children[0] == "string") {
    const hasCheckedCheckbox = children[0].match(CHECKED_CHECKBOX_PATTERN);
    const hasUncheckedCheckbox = children[0].match(UNCHECKED_CHECKBOX_PATTERN);

    if (hasCheckedCheckbox) {
      const newChildren = children.map((c, i) => (i == 0 ? c.slice(3) : c));
      return (
        <li {...props} className={styles["checkbox-li"]}>
          <s>
            <input type="checkbox" checked disabled />
            {newChildren}
          </s>
        </li>
      );
    } else if (hasUncheckedCheckbox) {
      const newChildren = children.map((c, i) => (i == 0 ? c.slice(3) : c));
      return (
        <li {...props} className={styles["checkbox-li"]}>
          <input type="checkbox" disabled />
          {newChildren}
        </li>
      );
    }
  }

  return <li {...props}>{children}</li>;
};

const resizePictures = () => {
  const paragraphs = document.querySelectorAll("p");
  for (const i in paragraphs) {
    const children = paragraphs[i].children;
    const childrenToRemove = [];

    for (const j in children) {
      if (!["VIDEO", "IMG"].includes(children[j].tagName)) {
        break;
      }

      if (j !== "0") {
        childrenToRemove.push(children[j]);
      }
    }

    if (childrenToRemove.length > 0) {
      const parentNode = document.createElement("p");
      const gutter = childrenToRemove.length * 0.2;
      parentNode.className = styles["p-with-images"];

      const height =
        childrenToRemove.length < 2
          ? 380
          : 380 - (childrenToRemove.length - 1) * 40;
      for (const k in childrenToRemove) {
        const child = childrenToRemove[k];
        const naturalWidth = child.naturalWidth;
        const naturalHeight = child.naturalHeight;
        // child.style.height = height;

        if (naturalHeight / naturalWidth > 1.5) {
          child.style.width = `${
            height * (naturalWidth / naturalHeight) + gutter
          }px`; // is portrait
        } else {
          child.style.width = `${100 / childrenToRemove.length - gutter}%`; // is landscape
        }
        parentNode.appendChild(paragraphs[i].removeChild(child));
      }
      if (parentNode.children.length > 0) {
        paragraphs[i].appendChild(parentNode);
      }
    }
  }
};
