import axios from "axios";

// TODO: Where should this type live?
export type MetascrapedInfo = {
  title?: string;
  description?: string;
  image?: string;
  link: string;
  isIframe?: boolean;
  isTikTok?: boolean;
  isTweet?: boolean;
  author?: string;
  handle?: string;
  avatar?: string;
  date?: string;
  replyTo?: string;
  likes?: number;
  replies?: number;
};

const IFRAME_WEBSITES = [
  "glitch",
  "spotify",
  "tiktok",
  "youtube",
  "vimeo",
  "pinterest",
  "codepen",
];
const UNFURLING_WEBSITES = [
  "github",
  "medium",
  "substack",
  "cargo",
  "studio.patreon",
  "chriseminizer",
  // "etsy", // Removed: Etsy uses DataDome bot protection that blocks automated scraping
];
const MD_URL_PATTERN = /(?<=[^\!].*\]\()(.*)(?=\)$)/;

const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-title")(),
]);

export const extractLinkFromMDX = (str: string) => {
  const match = str.match(MD_URL_PATTERN);
  return match ? match[0] : null;
};

const TWEET_URL_PATTERN = /(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/;

const unfurlTweet = async (link: string) => {
  const id = link.match(TWEET_URL_PATTERN)?.[1];
  if (!id) return null;
  try {
    const { data } = await axios.get(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=a&lang=en`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const [start, end] = data.display_text_range ?? [0, data.text?.length];
    const text = data.text?.slice(start, end);
    const info = {
      title: data.user?.name,
      description: text?.replace(/\s*https:\/\/t\.co\/\w+\s*$/, "").trim(),
      image: data.mediaDetails?.[0]?.media_url_https,
      avatar: data.user?.profile_image_url_https?.replace("_normal", "_400x400"),
      author: data.user?.name,
      handle: data.user?.screen_name,
      date: data.created_at,
      replyTo: data.in_reply_to_screen_name,
      likes: data.favorite_count,
      replies: data.conversation_count,
      link,
      isIframe: false,
      isTweet: true,
    };
    return Object.fromEntries(
      Object.entries(info).filter(([, value]) => value !== undefined)
    ) as MetascrapedInfo;
  } catch (_) {
    return { link, isIframe: false, isTweet: true } as MetascrapedInfo;
  }
};

export const isLinkExpandable = (link: string) =>
  UNFURLING_WEBSITES.find((site) => link.match(site));

export const isIFrame = (link: string) =>
  IFRAME_WEBSITES.find((site) => link.match(site));

export const filterByExpandableLinks = (str: string) => {
  const link = extractLinkFromMDX(str) || "NaN";
  return !!(isLinkExpandable(link) || isIFrame);
};

export const unfurlLink = async (link: string) => {
  if (link) {
    if (TWEET_URL_PATTERN.test(link)) {
      return unfurlTweet(link);
    }
    const isIframe = !!isIFrame(link);
    if (isLinkExpandable(link) || isIframe) {
      try {
        const resp = await axios.get(link, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            DNT: "1",
            Connection: "keep-alive",
            "Upgrade-Insecure-Requests": "1",
          },
        });
        const scraped = await metascraper({
          url: link,
          html: resp.data,
        });
        return {
          ...scraped,
          link,
          isIframe,
          isTikTok: link.includes("tiktok"),
        } as MetascrapedInfo;
      } catch (_) {
        return {
          link,
          isIframe,
        };
      }
    }
  }
  return null;
};
