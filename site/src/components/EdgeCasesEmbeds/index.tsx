import styles from "./styles.module.scss";

export type EdgeCasesPost = {
  slug: string;
  title: string;
};

interface Props {
  posts: EdgeCasesPost[];
}

const SUBSTACK = "https://edgecasespodcast.substack.com";

const EdgeCasesEmbeds = ({ posts }: Props) => (
  <div className={styles["edge-cases"]}>
    {posts.map(({ slug, title }) => (
      <a
        key={slug}
        className={styles["edge-cases-card"]}
        href={`${SUBSTACK}/p/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${title} on Edge Cases`}
      >
        <iframe
          src={`${SUBSTACK}/embed/p/${slug}`}
          scrolling="no"
          sandbox="allow-scripts"
          title={`${title} on Edge Cases`}
          loading="lazy"
        />
      </a>
    ))}
  </div>
);

export default EdgeCasesEmbeds;
