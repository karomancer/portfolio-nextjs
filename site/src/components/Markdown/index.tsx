import 'highlight.js/styles/github.css';
import hljs from "highlight.js"

import ReactMarkdown from "react-markdown";

import { MetascrapedInfo } from "@/utils/unfurlLink"

import Embed from "./Embed";

import styles from "./styles.module.scss";
import { Image, ListItem } from "./types";
import { useEffect } from 'react';

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

const VIDEO_PATTERN = /(.*)[.mp4|.mov]$/;

const CHECKED_CHECKBOX_PATTERN = /\[x\]/;
const UNCHECKED_CHECKBOX_PATTERN = /\[ \]/;

/**
 *
 * Markdown component
 */
export default function Markdown({ className, children, embeds }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, [])
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

const Asset = (props: Image) => {
  const isVideo = props?.src?.match(VIDEO_PATTERN);
  if (isVideo) {
    return (
      <video controls>
        <source src={props.src} type={`video/mp4`} />
        <source src={props.src} type={`video/${props.src?.slice(-3)}`} />
        {props.alt}
      </video>
    );
  }

  return <img {...props} />;
};

const Li = ({ children, ...props }: ListItem) => {
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

  return <li {...props}>{children}</li>;
};
