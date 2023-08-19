import { useEffect, useRef, useState } from "react";
import { compareDesc, format } from "date-fns";

import { ReadMDX } from "@/utils/readMdx";
import pageStyles from "@/pages/portfolio/styles.module.scss";

import styles from "./styles.module.scss";

export interface PortfolioProps {
  allTags: string[];
  pieces: ReadMDX[];
}

type Tags = string[];
// type Technologies = string[];

export const TagsList = ({
  slug = "tag",
  tags,
}: {
  slug?: string;
  tags: Tags;
}) => (
  <ul className={pageStyles["tags-list"]}>
    {tags
      .sort()
      .reverse()
      .map((t) => (
        <li key={`${slug}-${t}`}>{t}</li>
      ))}
  </ul>
);

const PortfolioSection = ({ allTags, pieces }: PortfolioProps) => {
  const gridRef = useRef(null);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [columns, setColumns] = useState([]);
  const filteredPieces = pieces
    .filter(({ frontmatter }) => {
      if (frontmatter.draft) {
        return false;
      }

      if (selectedTags.length == 0) {
        return true;
      }

      for (let i = 0; i < frontmatter.tags.length; i++) {
        if (selectedTags.includes(frontmatter.tags[i])) {
          return true;
        }
      }

      return false;
    })
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );

  const sortPieces = () => {
    let newColumns = filteredPieces.length >= 2 ? [[], []] : [[]];
    if (window.innerWidth > 1200 && filteredPieces.length > 3) {
      newColumns = [[], [], [], []];
    } else if (window.innerWidth > 737 && filteredPieces.length > 2) {
      newColumns = [[], [], []];
    } else if (window.innerWidth < 481) {
      newColumns = [[]];
    }

    filteredPieces.forEach((piece, i) => {
      newColumns[i % newColumns.length].push(piece);
    });

    setColumns(newColumns);
  };

  useEffect(() => {
    sortPieces();
    addEventListener("resize", sortPieces);
  }, []);

  useEffect(() => {
    console.log("useEffect");
    sortPieces();
  }, [selectedTags, selectedTechnologies]);

  const TagFilter = () => {
    console.log("tagFilter", selectedTags);

    const onChange = (tag, index) => () =>
      setSelectedTags(
        index > -1
          ? selectedTags.splice(index, index + 1) && selectedTags
          : [...selectedTags, tag]
      );

    return (
      <fieldset className={pageStyles["tags-list"]}>
        {allTags.map((tag) => (
          <label key={`filter-${tag}`}>
            <input
              name={`radio-${tag}`}
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={onChange(tag, selectedTags.indexOf(tag))}
            />{" "}
            {tag}
          </label>
        ))}
      </fieldset>
    );
  };

  return (
    <div className={styles["portfolio-section"]}>
      {/* <TagFilter /> */}
      <ul className={styles["portfolio-grid"]} ref={gridRef}>
        {columns.map((column, i) => (
          <ul key={`column-${i}`}>
            {column.map(
              ({
                frontmatter: {
                  title,
                  slug,
                  description,
                  categories,
                  date,
                  preview,
                  tags,
                },
              }) => (
                <li key={slug} className={styles["portfolio-piece"]}>
                  <a key={title} href={slug}>
                    <img src={preview} alt="" role="presentation" />
                    <div className={styles["header"]}>
                      <h6>
                        <strong>{categories.join(" • ").toUpperCase()}</strong>{" "}
                        | {format(new Date(date), "MMMM yyyy")}
                      </h6>
                      <h4>{title}</h4>
                    </div>
                    <div className={styles["description"]}>
                      <p>{description}</p>
                      <TagsList slug={slug} tags={tags} />
                    </div>
                  </a>
                </li>
              )
            )}
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default PortfolioSection;
