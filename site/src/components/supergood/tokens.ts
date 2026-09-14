/**
 * Supergood's own design tokens, lifted from their tailwind config so these
 * demos wear the client's style rather than this site's. KACHOW! and Supergood
 * are both blocky with offset shadows, which makes it easy to reach for the
 * wrong one by accident: Supergood's border is #1E1E1E rather than pure black,
 * its shadow is a 4px hard offset, and its cards are rounded.
 */
export const SG_BORDER = "#1E1E1E";
export const SG_SHADOW_OFFSET = 4;

export const sgShadow = (color: string, offset = SG_SHADOW_OFFSET) =>
  `${offset}px ${offset}px 0px 0px ${color}`;

/** shadow-box in their config is a hard black offset. */
export const SG_SHADOW_BLACK = sgShadow("#000000");
