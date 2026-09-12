import { MetascrapedInfo } from "@/utils/unfurlLink";

import styles from "./styles.module.scss";

const TweetEmbed = ({
  author,
  handle,
  avatar,
  description,
  date,
  replyTo,
  likes,
  link,
}: MetascrapedInfo) => {
  const posted = date ? new Date(date) : null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles["tweet-embed"]}
    >
      <span className={styles["tweet-author"]}>
        {avatar && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img alt="" role="presentation" src={avatar} />
        )}
        <span>
          <strong>{author || handle}</strong>
          <em>@{handle}</em>
        </span>
      </span>
      {replyTo && (
        <span className={styles["tweet-reply-to"]}>
          Replying to <b>@{replyTo}</b>
        </span>
      )}
      <span className={styles["tweet-text"]}>{description}</span>
      {posted && (
        <span className={styles["tweet-meta"]} suppressHydrationWarning>
          {posted.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
          {" · "}
          {posted.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {typeof likes === "number" && likes > 0 && (
            <>
              {" · "}
              <b>{likes.toLocaleString()}</b> {likes === 1 ? "Like" : "Likes"}
            </>
          )}
        </span>
      )}
    </a>
  );
};

export default TweetEmbed;
