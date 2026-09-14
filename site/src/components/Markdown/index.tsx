import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import remarkGfm from "remark-gfm";
import IFrame from "react-iframe";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { MetascrapedInfo } from "@/utils/unfurlLink";
import { ToolRegistry, splitOnTools } from "@/utils/markdownTools";

import Asset from "./Asset";
import Embed from "./Embed";
import TweetEmbed from "./TweetEmbed";
import { ListItem, Td as TdType } from "./types";

import styles from "./styles.module.scss";
import Script from "next/script";

// Embed link data can be fetched in static props
// and mapped over here
export type HrefToEmbeds = {
  [href: string]: MetascrapedInfo;
};

interface Props {
  className?: string;
  children: string;
  embeds?: HrefToEmbeds;
  tools?: ToolRegistry;
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
export default function Markdown({
  className,
  children,
  embeds,
  tools,
}: Props) {
  useEffect(() => {
    hljs.highlightAll();
    resizePictures();
  }, []);

  const Anchor = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (embeds && embeds[props.href]) {
      if (embeds[props.href].isIframe) {
        if (embeds[props.href].isTikTok) {
          return (
            <>
              <blockquote
                className="tiktok-embed"
                cite={props.href}
                data-video-id={props.href?.split("/").pop()}
                data-embed-from="embed_page"
                style={{ maxWidth: 605, minWidth: 325 }}
              >
                <section />
              </blockquote>
              <Script async src="https://www.tiktok.com/embed.js"></Script>
            </>
          );
        }

        return (
          <IFrame
            url={props.href}
            width="100%"
            height="600px"
            display="block"
            position="relative"
          />
        );
      }
      if (embeds[props.href].isTweet) {
        return <TweetEmbed {...embeds[props.href]} />;
      }
      return <Embed {...embeds[props.href]} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  };

  const prose = (content: string, key?: number) => (
    <ReactMarkdown
      key={key}
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => <Anchor {...props} />,
        img: ({ node, ...props }) => <Asset {...props} />,
        li: ({ node, ...props }) => <Li {...props} />,
        td: ({ node, ...props }) => <Td {...props} values={node.children} />,
      }}
      className={`${className} ${styles["markdown"]}`}
    >
      {content}
    </ReactMarkdown>
  );

  if (!tools) {
    return <article>{prose(children)}</article>;
  }

  // Odd indices are tool names captured from the marker, even indices are prose.
  return (
    <article>
      {splitOnTools(children).map((segment, i) =>
        i % 2 === 1 ? (
          <div key={i} className={styles["markdown-tool"]}>
            {tools[segment.toLowerCase()] ?? null}
          </div>
        ) : (
          segment.trim() && prose(segment, i)
        )
      )}
    </article>
  );
}

const Td = ({ values, props }: TdType) => {
  const replacedText = values.map((c) => {
    if (c.type == "text") {
      const delimited = c.value.split("!!!");
      if (delimited.length > 1) {
        return delimited.map((v, i) =>
          i < delimited.length - 1 && /[\p{L}\p{N}]/u.test(v) ? (
            <span key={`${i}-${v}`} className={styles["spaced-span"]}>
              {v}
            </span>
          ) : (
            v
          )
        );
      }
      return c.value;
    }

    if (c.tagName == "img") {
      return <Asset key={c.properties.toString()} {...c.properties} />;
    }

    if (c.tagName == "a" && c.children[0].type == "text") {
      return (
        <a key={c.properties.toString()} {...c.properties}>
          {c.children[0].value}
        </a>
      );
    }

    return c.value;
  });

  return <td {...props}>{replacedText}</td>;
};

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
  const isCaption = (el: Element | null) =>
    !!el?.classList?.contains("p-figcaption");
  const isMedia = (el: Element | null) =>
    !!el && ["VIDEO", "IMG"].includes(el.tagName);

  const paragraphs = document.querySelectorAll("p");
  for (const paragraph of Array.from(paragraphs)) {
    const mediaToMove: Element[] = [];

    let mediaSeen = 0;
    for (const child of Array.from(paragraph.children)) {
      if (isCaption(child)) {
        continue;
      }
      if (!isMedia(child)) {
        break;
      }
      if (mediaSeen > 0) {
        mediaToMove.push(child);
      }
      mediaSeen++;
    }

    if (mediaToMove.length > 0) {
      const row = document.createElement("p");
      const gutter = mediaToMove.length * 0.2;
      row.className = styles["p-with-images"];

      for (const media of mediaToMove) {
        const column = document.createElement("span");
        column.className = styles["p-figure-col"];
        column.style.width = `${100 / mediaToMove.length - gutter}%`;

        const caption = media.nextElementSibling;
        column.appendChild(paragraph.removeChild(media));
        if (isCaption(caption)) {
          column.appendChild(paragraph.removeChild(caption as Element));
        }
        row.appendChild(column);
      }

      paragraph.appendChild(row);
    }
  }
};
