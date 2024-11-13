// TODO: Mkae this less shityt

import fs from "fs";
import Link from "next/link";
import { compareDesc, format } from "date-fns";

import readMdx, { ReadMDX } from "@/utils/readMdx";
import Head from "@/components/Head";
import {
  unfurlLink,
  filterByExpandableLinks,
  extractLinkFromMDX,
} from "@/utils/unfurlLink";

import CircuitsHeader from "@/components/CircuitsHeader";

import Markdown, { HrefToEmbeds } from "@/components/Markdown";

import blogStyles from "./styles.module.scss";
import { TagsList } from "@/components/Tags";

const SUMMARY_LENGTH = 1400;

async function getEmbeds(content) {
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

  return embeds;
}

export async function getStaticProps() {
  const files = fs.readdirSync("src/content/portfolio");
  const pieces = [];
  const datesMap = {};

  const readMdxes = files
    .map((fileName) => {
      const readFile = fs.readFileSync(
        `src/content/portfolio/${fileName}`,
        "utf-8"
      );

      return readMdx(readFile);
    })
    .filter((mdx) => mdx.frontmatter.piece_type?.includes("journal"))
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );

  for (let i = 0; i < readMdxes.length; i++) {
    const creationDate = format(
      new Date(readMdxes[i].frontmatter.date),
      "yyyy"
    );

    datesMap[creationDate] = datesMap[creationDate]
      ? [...datesMap[creationDate], readMdxes[i]]
      : [readMdxes[i]];

    pieces.push({
      frontmatter: readMdxes[i].frontmatter,
      content: readMdxes[i].content.slice(0, SUMMARY_LENGTH),
      embeds: await getEmbeds(readMdxes[i].content),
    });
  }

  return {
    props: {
      pieces,
      datesMap,
    },
  };
}

export default function Blog({
  pieces,
  datesMap,
}: {
  pieces: (ReadMDX & { embeds: HrefToEmbeds })[];
  datesMap: { [monthYearString: string]: ReadMDX[] };
}) {
  return (
    <>
      <Head
        title="Karina Chow | Maker Blog"
        description="Want to see some of the weird stuff I've made?"
        ogUrl="/blog"
        ogImage="/images/og_image.png"
      />
      <CircuitsHeader>Check out the weird stuff I've made.</CircuitsHeader>
      <div className={blogStyles["blog-post-container"]}>
        <nav className={blogStyles["date-nav"]}>
          <ul>
            {Object.keys(datesMap)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((dateString) => (
                <li key={dateString}>
                  <h4>{dateString}</h4>
                  <ul>
                    {datesMap[dateString].map((piece) => (
                      <li key={`dates-list-${piece.frontmatter.title}`}>
                        <Link href={`/${piece.frontmatter.slug}`}>
                          {piece.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </nav>
        <main className={blogStyles["blog-post-content"]}>
          {pieces.map((piece) => (
            <div
              key={`post-${piece.frontmatter.title}`}
              className={`blog-post-${piece.frontmatter.title}`}
            >
              <article className={blogStyles["post"]}>
                <div className={blogStyles["post-header"]}>
                  <h4>
                    <strong>{piece.frontmatter.categories.join(" • ")}</strong>{" "}
                    |{" "}
                    {format(new Date(piece.frontmatter.date), "MMMM eo, yyyy")}
                  </h4>
                  <div>
                    <Link href={piece.frontmatter.slug}>
                      <h2>{piece.frontmatter.title}</h2>
                    </Link>
                    <TagsList tags={piece.frontmatter.tags} />
                  </div>
                  <p>{piece.frontmatter.description}</p>
                  <i>{piece.frontmatter.technologies.sort().join(", ")}</i>
                </div>
                <Markdown
                  className={blogStyles["post-content"]}
                  embeds={piece.embeds}
                >
                  {piece.content}
                </Markdown>
              </article>
              <div className={blogStyles["read-more"]}>
                <Link href={piece.frontmatter.slug}>Read more</Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
