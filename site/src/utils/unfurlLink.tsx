import axios from "axios";

// TODO: Where should this type live?
export type MetascrapedInfo = {
  title?: string;
  description?: string;
  image?: string;
  link: string;
  isIframe?: boolean;
  isTikTok?: boolean;
};

const IFRAME_WEBSITES = [
  "glitch",
  "spotify",
  "youtube",
  "vimeo",
  "pinterest",
  "codepen",
];
const UNFURLING_WEBSITES = [
  "github",
  "medium",
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
        console.log("Link scraped", scraped);
        return {
          ...scraped,
          link,
          isIframe,
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
