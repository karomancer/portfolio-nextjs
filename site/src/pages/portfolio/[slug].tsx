import fs from "fs";
import { format } from "date-fns";

import readMdx, { ReadMDX } from "@/utils/readMdx";

import Markdown, { HrefToEmbeds } from "@/components/Markdown";
import {
  unfurlLink,
  filterByExpandableLinks,
  extractLinkFromMDX,
} from "@/utils/unfurlLink";

import styles from "./styles.module.scss";
import Head from "next/head";
import { TagsList } from "@/sections/Portfolio";

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
  if (!frontmatter || !content) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Karina Chow | {frontmatter.title} </title>
        <meta name="description" content={frontmatter.description} />
        <meta
          name="keywords"
          content={`karina chow, karina, chow, portfolio site, portfolio, personal site, personal website, resume, download, linkedin, links, contact, ${frontmatter.categories.join(
            ", "
          )}, ${frontmatter.tags.join(", ")}, ${frontmatter.title}`}
        />
        <meta
          property="og:title"
          content={`Karina Chow | ${frontmatter.title}`}
          key="title"
        />
        <meta property="og:url" content={frontmatter.cover} />
      </Head>
      <main className={styles["portfolio-piece"]}>
        <div
          className={styles["cover-image"]}
          style={{ backgroundImage: `url("${frontmatter.cover}")` }}
        >
          <div className={styles["portfolio-header"]}>
            <h4>
              <strong>{frontmatter.categories.join(" & ")}</strong> |{" "}
              {format(new Date(frontmatter.date), "MMMM eo, yyyy")}
            </h4>

            <h1>{frontmatter.title}</h1>
          </div>
        </div>

        <div className={styles["portfolio-metadata"]}>
          <div>
            {frontmatter.description}
            {frontmatter.class && <><i>Class: {frontmatter.class}</i></>}
            <TagsList tags={frontmatter.tags} />
          </div>
          <ul>
            {frontmatter.collaborators && (
              <li>
                <strong>Collaborators</strong>
                <br />
                {frontmatter.collaborators.join(", ")}
              </li>
            )}
            {frontmatter.technologies && (
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
        <Markdown embeds={embeds} className={styles["portfolio-piece-content"]}>
          {content}
        </Markdown>
      </main>
    </>
  );
};
PortfolioPiece.displayName = "PortfolioPiece";
PortfolioPiece.lightMode = true;

export default PortfolioPiece;
