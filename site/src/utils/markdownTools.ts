import type { ReactNode } from "react";

/**
 * A registry of interactive components that markdown content can place inline.
 * Keys are the names used in the marker, so `<!-- tool:edge-cases -->` looks up
 * `edge-cases`.
 */
export type ToolRegistry = Record<string, ReactNode>;

export type MarkdownSegment =
  | { type: "prose"; content: string }
  | { type: "tool"; name: string }
  | { type: "collapse"; title: string; children: MarkdownSegment[] };

// One regex with alternation so a single split keeps every marker in document
// order. Group 1 is a tool name, group 2 a collapse title, group 3 the closer.
const MARKER =
  /<!--\s*(?:tool:([a-z0-9-]+)|collapse:(.+?)|(\/collapse))\s*-->/i;

/**
 * Parses markdown into prose, inline tools, and collapsible sections.
 *
 * Markers must sit on their own line with a blank line either side, so the
 * prose around them still parses as separate blocks:
 *
 *     <!-- tool:lunar-clock -->
 *     <!-- collapse:How it started (2023) -->
 *     ...any markdown, tools, or nested collapses...
 *     <!-- /collapse -->
 *
 * An unclosed collapse runs to the end of the document; a stray closer is
 * ignored.
 */
export const parseMarkdown = (content: string): MarkdownSegment[] => {
  const parts = content.split(MARKER);
  const root: MarkdownSegment[] = [];
  const stack: MarkdownSegment[][] = [root];
  const top = () => stack[stack.length - 1];

  // split() with capturing groups yields, per marker, the three groups in
  // order (two of them undefined), so every marker occupies four slots.
  for (let i = 0; i < parts.length; i += 4) {
    const prose = parts[i];
    if (prose && prose.trim()) top().push({ type: "prose", content: prose });

    const [tool, title, closer] = parts.slice(i + 1, i + 4);
    if (tool) {
      top().push({ type: "tool", name: tool.toLowerCase() });
    } else if (title) {
      const section: MarkdownSegment = {
        type: "collapse",
        title: title.trim(),
        children: [],
      };
      top().push(section);
      stack.push(section.children);
    } else if (closer && stack.length > 1) {
      stack.pop();
    }
  }
  return root;
};

export const hasMarkers = (segments: MarkdownSegment[]): boolean =>
  segments.length !== 1 || segments[0].type !== "prose";
