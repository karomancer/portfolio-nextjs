import Parser from "rss-parser";

// Returns MediumPost[]
export default async function getMediumPosts() {
  const feed = await new Parser({
    customFields: {
      item: [["media:content", "coverImage"]],
    },
  }).parseURL("https://flipboard.com/@karomancer/kachow-13mq42ccy.rss");

  const mediumPosts = feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    categories: item.categories,
    coverImage: { ...item.coverImage["$"] }.url,
  }));

  return mediumPosts;
}
