import fs from "fs";
import { format } from "date-fns";

import readMdx, { ReadMDX } from "@/utils/readMdx";

import Markdown, { HrefToEmbeds } from "@/components/Markdown";
import {
  unfurlLink,
  filterByExpandableLinks,
  extractLinkFromMDX,
} from "@/utils/unfurlLink";
import Head from "@/components/Head";

import { TagsList } from "@/sections/Portfolio";

import styles from "./styles.module.scss";

export async function getStaticPaths() {
  const files = fs.readdirSync("src/content/portfolio");
  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.slice(0, -3),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

interface GetStaticPropsProps {
  params: Partial<ReadMDX> & { slug: string };
}

export async function getStaticProps({
  params: { slug },
}: GetStaticPropsProps) {
  // Well this is dumb af but I can't find a better way in next v12
  // You can't pass any data other than URL param data through params: {}
  // See: https://github.com/vercel/next.js/discussions/11272

  const readFile = fs.readFileSync(`src/content/portfolio/${slug}.md`, "utf-8");

  const { frontmatter, content } = readMdx(readFile);

  const embeds: HrefToEmbeds = {};
  const embedInfo = content
    .split("\n")
    .filter(filterByExpandableLinks)
    .map((line) => unfurlLink(extractLinkFromMDX(line) || ""));

  for await (const embeddable of embedInfo) {
    if (embeddable) {
      embeds[embeddable.link] = embeddable;
    }
  }

  return {
    props: {
      frontmatter,
      content,
      embeds,
    },
  };
}

type Props = ReadMDX & { embeds: HrefToEmbeds };

const PortfolioPiece = ({ frontmatter, content, embeds }: Props) => {
  const pattern = /(?<=[^\!].*\]\()(.*)(?=\)$)/
  if (!frontmatter || !content) {
    return null;
  }  

  const collaborators = frontmatter.collaborators.map((c, i) => {
    const matched = c.match(pattern);
    const newline = i < frontmatter.collaborators.length - 1 ? ",\n" : "";
    return matched ? (
      <><a href={matched[0]} target="_blank">
        {c.split(/[\[\]]/)[1]}{newline}
      </a></>
    ) : (
      c + newline
    );
  });

  return (
    <>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        ogImage={frontmatter.og_preview}
        ogUrl={frontmatter.slug}
        keywords={frontmatter.tags.concat(frontmatter.categories)}
      />
      <main className={styles["portfolio-piece"]}>
        <div
          className={styles["cover-image"]}
          style={{ backgroundImage: `url("${frontmatter.cover}")` }}
        >
          <div className={styles["portfolio-header"]}>
            <h4>
              <strong>{frontmatter.categories.join(" • ")}</strong> |{" "}
              {format(new Date(frontmatter.date), "MMMM eo, yyyy")}
            </h4>

            <h1>{frontmatter.title}</h1>
          </div>
        </div>
        <div className={styles["portfolio-body"]}>
          <div className={styles["portfolio-metadata"]}>
            <div>
              {frontmatter.description}
              {frontmatter.class && (
                <>
                  <i>Class: {frontmatter.class}</i>
                </>
              )}
              <TagsList tags={frontmatter.tags} />
            </div>
            <ul>
              {frontmatter.collaborators.length > 0 && (
                <li>
                  <strong>Collaborators</strong>
                  <br />
                  {collaborators}
                </li>
              )}
              {frontmatter?.technologies?.length > 0 && (
                <li>
                  <strong>Technologies</strong>
                  <br />
                  {frontmatter.technologies.join(", ")}
                </li>
              )}
              {frontmatter.url && (
                <li>
                  <strong>Project Link</strong>
                  <br />
                  <a href={frontmatter.url} target="_blank">
                    {frontmatter.url}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Markdown
            embeds={embeds}
            className={styles["portfolio-piece-content"]}
          >
            {content}
          </Markdown>
        </div>
      </main>
    </>
  );
};
PortfolioPiece.displayName = "PortfolioPiece";
PortfolioPiece.lightMode = true;

export default PortfolioPiece;
