import axios from "axios";

// TODO: Where should this type live?
export type MetascrapedInfo = {
  title?: string;
  description?: string;
  image?: string;
  link: string;
};

const UNFURLING_WEBSITES = ["github"];
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

export const filterByExpandableLinks = (str: string) =>
  !!isLinkExpandable(extractLinkFromMDX(str) || "NaN");

export const unfurlLink = async (link: string) => {
  if (link) {
    if (isLinkExpandable(link)) {
      const resp = await axios.get(link);
      const scraped = await metascraper({
        url: link,
        html: resp.data,
      });
      return {
        ...scraped,
        link,
      } as MetascrapedInfo;
    }
  }
  return null;
};
