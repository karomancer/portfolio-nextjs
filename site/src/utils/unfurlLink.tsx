import axios from "axios";

// TODO: Where should this type live?
export type MetascrapedInfo = {
  title?: string;
  description?: string;
  image?: string;
  link: string;
  isIframe?: boolean;
};

const IFRAME_WEBSITES = ["glitch", "spotify", "youtube", "vimeo"];
const UNFURLING_WEBSITES = [
  "github",
  "medium",
  "cargo",
  "studio.patreon",
  "chriseminizer",
  // "etsy",
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
    const isIframe = isIFrame(link) || false;
    if (isLinkExpandable(link) || isIframe) {
      try {
        const resp = await axios.get(link);
        const scraped = await metascraper({
          url: link,
          html: resp.data,
        });
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
