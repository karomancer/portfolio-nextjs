import { useRef, useState } from "react";
import { compareDesc, format } from "date-fns";
import Image from "next/image";

import { ReadMDX } from "@/utils/readMdx";

import { TagsList, TagsFilter } from "@/components/Tags";
import { Tags } from "@/components/Tags/types";

import styles from "./styles.module.scss";

export interface PortfolioProps {
  allTags: Tags;
  allTechnologies: Tags;
  pieces: ReadMDX[];
}

// type Technologies = string[];

const PortfolioSection = ({
  allTags,
  allTechnologies,
  pieces,
}: PortfolioProps) => {
  const gridRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([...allTags]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([
    ...allTechnologies,
  ]);
  const [shouldShowFilters, showFilters] = useState(false);
  const filteredPieces = pieces
    .filter(({ frontmatter }) => {
      if (frontmatter.draft) {
        return false;
      }

      let passesTags = false;
      let passesTechnologies = false;

      for (let i = 0; i < frontmatter.tags.length; i++) {
        if (selectedTags.includes(frontmatter.tags[i])) {
          passesTags = true;
          break;
        }
      }

      for (let i = 0; i < frontmatter.technologies.length; i++) {
        if (selectedTechnologies.includes(frontmatter.technologies[i])) {
          passesTechnologies = true;
          break;
        }
      }

      return passesTags && passesTechnologies;
    })
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );

  return (
    <div className={styles["portfolio-section"]}>
      <button
        onClick={() => showFilters(!shouldShowFilters)}
        className={styles["tags-filter-button"]}
      >
        Filter Projects ᗊ
      </button>
      <div
        className={`${styles["tags-section"]}${
          shouldShowFilters ? ` ${styles["tags-section-show"]}` : ""
        }`}
      >
        <div>
          <TagsFilter
            title="Categories"
            allTags={allTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <div>
          <TagsFilter
            title="Skills"
            allTags={allTechnologies}
            selectedTags={selectedTechnologies}
            setSelectedTags={setSelectedTechnologies}
          />
        </div>
      </div>
      {selectedTags.length == 0 ? (
        <h2 className={styles["empty-portfolio-state"]}>
          Select some tags or technologies to see related projects!
        </h2>
      ) : (
        <ul className={styles["portfolio-grid"]} ref={gridRef}>
          {filteredPieces.map(
            (
              {
                frontmatter: {
                  title,
                  slug,
                  description,
                  categories,
                  date,
                  preview,
                  thumbnail_width = 1,
                  thumbnail_height = 1,
                  tags,
                },
              },
              i
            ) => (
              <li
                key={slug}
                className={styles["portfolio-piece"]}
                style={{
                  gridColumn: `span ${thumbnail_width}`,
                  gridRow: `span ${thumbnail_height}`,
                }}
              >
                <a key={title} href={slug}>
                  {preview.match(/mp4/) ? (
                    <video
                      width={thumbnail_width * 200}
                      height={thumbnail_height * 100}
                      autoPlay
                      muted
                      loop
                    >
                      <source src={preview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={preview}
                      alt={`Thumbnail for ${title}`}
                      role="presentation"
                      width={thumbnail_width * 200}
                      height={thumbnail_height * 100}
                      objectFit="cover"
                    />
                  )}

                  <cite className={styles["header"]}>
                    <h6>
                      <strong>{categories.join(" • ").toUpperCase()}</strong> |{" "}
                      {format(new Date(date), "MMMM yyyy")}
                    </h6>
                    <h4>{title}</h4>
                  </cite>
                  <div className={styles["description"]}>
                    <p>{description}</p>
                    <TagsList slug={slug} tags={tags} />
                  </div>
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default PortfolioSection;
