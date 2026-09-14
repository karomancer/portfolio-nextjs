import type { ReactNode } from "react";

/**
 * A registry of interactive components that markdown content can place inline.
 * Keys are the names used in the marker, so `<!-- tool:edge-cases -->` looks up
 * `edge-cases`.
 */
export type ToolRegistry = Record<string, ReactNode>;

// Capturing the name means split() returns it, so tool names land at odd indices.
const TOOL_MARKER = /<!--\s*tool:([a-z0-9-]+)\s*-->/i;

/**
 * Splits markdown into alternating prose and tool-name segments. Even indices
 * are prose, odd indices are the name captured from a marker.
 *
 * The marker must sit on its own line with a blank line either side, so that
 * the prose around it still parses as separate blocks.
 */
export const splitOnTools = (content: string): string[] =>
  content.split(TOOL_MARKER);
