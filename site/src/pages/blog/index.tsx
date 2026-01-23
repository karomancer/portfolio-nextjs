import fs from "fs";
import Link from "next/link";
import { useState, useRef, useCallback, memo, useEffect } from "react";
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

// Helper to generate a slug from title for scroll targeting
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Wrapper to prevent React from re-rendering Markdown content
// This is needed because the Markdown component manipulates the DOM directly
// via resizePictures(), which conflicts with React's reconciliation
const StableMarkdown = memo(
  ({
    className,
    embeds,
    children,
  }: {
    className: string;
    embeds: HrefToEmbeds;
    children: string;
  }) => (
    <Markdown className={className} embeds={embeds}>
      {children}
    </Markdown>
  ),
  () => true // Always return true = never re-render
);
StableMarkdown.displayName = "StableMarkdown";

export default function Blog({
  pieces,
  datesMap,
}: {
  pieces: (ReadMDX & { embeds: HrefToEmbeds })[];
  datesMap: { [monthYearString: string]: ReadMDX[] };
}) {
  const sortedYears = Object.keys(datesMap).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  // Initialize with all years expanded
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    () => new Set(sortedYears)
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const articleRefs = useRef<{ [slug: string]: HTMLElement | null }>({});
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const POSTS_PER_PAGE = 12;
  const displayedPieces = pieces.slice(0, displayCount);
  const hasMore = displayCount < pieces.length;

  // Infinite scroll - load more when sentinel becomes visible
  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + POSTS_PER_PAGE, pieces.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, pieces.length]);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const scrollToPost = useCallback(
    (slug: string, postIndex: number) => {
      const element = articleRefs.current[slug];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileNavOpen(false);
      } else if (postIndex >= displayCount) {
        // Post not yet rendered - load up to that post and then scroll
        setDisplayCount(Math.min(postIndex + POSTS_PER_PAGE, pieces.length));
        // Use setTimeout to allow render before scrolling
        setTimeout(() => {
          const el = articleRefs.current[slug];
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        setMobileNavOpen(false);
      }
    },
    [displayCount, pieces.length]
  );

  return (
    <>
      <Head
        title="Maker Blog"
        description="Want to see some of the weird stuff I've made?"
        ogUrl="/blog"
        ogImage="/images/og_image.png"
      />
      <CircuitsHeader>Check out the weird stuff I've made.</CircuitsHeader>

      {/* Mobile nav toggle */}
      <button
        className={blogStyles["mobile-nav-toggle"]}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        aria-label="Toggle navigation"
      >
        <span className={blogStyles["hamburger"]} data-open={mobileNavOpen} />
        <span>Posts</span>
      </button>

      <div className={blogStyles["blog-post-container"]}>
        <nav
          className={`${blogStyles["date-nav"]} ${mobileNavOpen ? blogStyles["mobile-open"] : ""}`}
        >
          <ul>
            {sortedYears.map((dateString) => {
              const isExpanded = expandedYears.has(dateString);
              return (
                <li key={dateString} className={blogStyles["year-section"]}>
                  <button
                    className={blogStyles["year-toggle"]}
                    onClick={() => toggleYear(dateString)}
                    aria-expanded={isExpanded}
                  >
                    <span
                      className={blogStyles["chevron"]}
                      data-expanded={isExpanded}
                    />
                    <h4>{dateString}</h4>
                    <span className={blogStyles["post-count"]}>
                      {datesMap[dateString].length}
                    </span>
                  </button>
                  <ul
                    className={blogStyles["posts-list"]}
                    data-expanded={isExpanded}
                  >
                    {datesMap[dateString].map((piece) => {
                      const postSlug = slugify(piece.frontmatter.title);
                      const postIndex = pieces.findIndex(
                        (p) => p.frontmatter.title === piece.frontmatter.title
                      );
                      return (
                        <li key={`dates-list-${piece.frontmatter.title}`}>
                          <button
                            onClick={() => scrollToPost(postSlug, postIndex)}
                          >
                            {piece.frontmatter.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
        <main className={blogStyles["blog-post-content"]}>
          {displayedPieces.map((piece) => {
            const postSlug = slugify(piece.frontmatter.title);
            return (
              <div
                key={`post-${piece.frontmatter.title}`}
                className={blogStyles["blog-post-wrapper"]}
                ref={(el) => {
                  articleRefs.current[postSlug] = el;
                }}
                data-slug={postSlug}
              >
                <article className={blogStyles["post"]}>
                  <div className={blogStyles["post-header"]}>
                    <h4>
                      <strong>
                        {piece.frontmatter.categories.join(" • ")}
                      </strong>{" "}
                      |{" "}
                      {format(
                        new Date(piece.frontmatter.date),
                        "MMMM eo, yyyy"
                      )}
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
                  <StableMarkdown
                    className={blogStyles["post-content"]}
                    embeds={piece.embeds}
                  >
                    {piece.content}
                  </StableMarkdown>
                </article>
                <div className={blogStyles["read-more"]}>
                  <Link href={piece.frontmatter.slug}>Read more</Link>
                </div>
              </div>
            );
          })}

          {/* Sentinel for infinite scroll */}
          {hasMore ? (
            <div ref={sentinelRef} className={blogStyles["load-more-sentinel"]}>
              <div className={blogStyles["loading-spinner"]} />
              <span>Loading more posts...</span>
            </div>
          ) : (
            <div className={blogStyles["end-of-posts"]}>
              You've reached the end! 🎉
            </div>
          )}
        </main>
      </div>
    </>
  );
}
