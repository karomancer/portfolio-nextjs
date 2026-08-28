import fs from "fs";
import { format } from "date-fns";

import { Fragment } from "react";

import readMdx, { ReadMDX, Collaborator } from "@/utils/readMdx";

import Markdown, { HrefToEmbeds } from "@/components/Markdown";
import { TagsList } from "@/components/Tags";
import {
  unfurlLink,
  filterByExpandableLinks,
  extractLinkFromMDX,
} from "@/utils/unfurlLink";
import Head from "@/components/Head";

import styles from "./styles.module.scss";
import RedbubbleWidget from "@/components/RedBubbleWidget";

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

type NormalizedCollaborator = {
  name: string;
  role?: string;
  company?: string;
  url?: string;
  client?: boolean;
};

const PortfolioPiece = ({ frontmatter, content, embeds }: Props) => {
  const pattern = /(?<=[^\!].*\]\()(.*)(?=\)$)/;
  if (!frontmatter || !content) {
    return null;
  }

  const normalizeCollaborator = (c: Collaborator): NormalizedCollaborator => {
    if (typeof c === "string") {
      const matched = c.match(pattern);
      return {
        name: c.split(/[\[\]]/)[1] ?? c,
        url: matched ? matched[0] : undefined,
      };
    }
    return c;
  };

  const renderPeople = (
    people: NormalizedCollaborator[],
    showCompany: boolean
  ) => {
    const onePerLine = people.some(
      (p) => p.role || (showCompany && p.company)
    );
    return people.map((p, i) => {
      const company = showCompany ? p.company : undefined;
      const meta =
        p.role && company
          ? `${p.role} @ ${company}`
          : p.role || company || "";
      return (
        <Fragment key={`${p.name}-${i}`}>
          {i > 0 && (onePerLine ? <br /> : ", ")}
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer">
              {p.name}
            </a>
          ) : (
            p.name
          )}
          {meta ? ` — ${meta}` : ""}
        </Fragment>
      );
    });
  };

  const normalizedCollaborators = (frontmatter.collaborators ?? []).map(
    normalizeCollaborator
  );
  const externalCollaborators = normalizedCollaborators.filter((p) => !p.client);
  const clientCollaborators: Record<string, NormalizedCollaborator[]> = {};
  normalizedCollaborators
    .filter((p) => p.client)
    .forEach((p) => {
      const key = p.company || "Client";
      if (!clientCollaborators[key]) clientCollaborators[key] = [];
      clientCollaborators[key].push(p);
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
      <main id="main-content" className={styles["portfolio-piece"]}>
        <div
          className={styles["cover-image"]}
          style={{ backgroundImage: `url("${frontmatter.cover}")` }}
        >
          <div className={styles["portfolio-header"]}>
            <h4>
              <strong>{frontmatter.categories.join(" • ")}</strong> |{" "}
              {format(new Date(frontmatter.date), "MMMM do, yyyy")}
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
              {externalCollaborators.length > 0 && (
                <li>
                  <strong>Collaborators</strong>
                  <br />
                  {renderPeople(externalCollaborators, true)}
                </li>
              )}
              {Object.entries(clientCollaborators).map(([company, people]) => (
                <li key={company}>
                  <strong>{company} (client)</strong>
                  <br />
                  {renderPeople(people, false)}
                </li>
              ))}
              {frontmatter?.technologies?.length > 0 && (
                <li>
                  <strong>Technologies</strong>
                  <br />
                  {frontmatter.technologies.sort().join(", ")}
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
        <RedbubbleWidget title={<h3>Buy my designs on RedBubble!</h3>} />
      </main>
    </>
  );
};
PortfolioPiece.displayName = "PortfolioPiece";
PortfolioPiece.lightMode = true;

export default PortfolioPiece;
