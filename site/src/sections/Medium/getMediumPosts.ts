import Parser from "rss-parser";

// Returns MediumPost[]
export default async function getMediumPosts() {
  const feed = await new Parser().parseURL(
    "https://medium.com/feed/@karomancer"
  );
  const regex = new RegExp(/(?<=src=")(.*?)(?=")/);
  const mediumPosts = feed.items.map((item) => {
    const match = regex.exec(item["content:encoded"]);
    return {
      ...item,
      coverImage: match && match[0],
    };
  });

    console.log(mediumPosts)

  return mediumPosts;
}
