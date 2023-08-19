import { useState } from "react";

import { Tags } from "./types";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  allTags: Tags;
  selectedTags: Tags;
  setSelectedTags: (tags: Tags) => void;
}

const TagsFilter = ({
  title,
  allTags,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const onChange = (tag: string, index: number) => () =>
    setSelectedTags(
      index > -1
        ? [...(selectedTags.splice(index, 1) && selectedTags)]
        : [...selectedTags, tag]
    );

  return (
    <fieldset className={styles["tags-filter"]}>
      <legend>
        {title}{" "}
        {selectedTags.length > 0 && (
          <button
            className={styles["clear-btn"]}
            onClick={() => setSelectedTags([])}
          >
            Clear all ×
          </button>
        )}
      </legend>
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

export default TagsFilter;
