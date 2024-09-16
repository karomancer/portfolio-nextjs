import Parser from "rss-parser";

// Returns MediumPost[]
export default async function getMediumPosts() {
  const feed = await new Parser().parseURL(
    "https://medium.com/feed/@karomancer"
  );
  const regex = new RegExp(/(?<=src=")(.*?)(?=")/);
  const mediumPosts = feed.items.map((item) => {
    const match = regex.exec(item["content:encoded"]);
    const coverImage = match ? match[0] : match;
    return {
      ...item,
      coverImage,
    };
  });

  return mediumPosts.reverse();
}
