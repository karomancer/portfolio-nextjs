import EdgeCasesEmbeds from "@/components/EdgeCasesEmbeds";
import type { ToolRegistry } from "@/utils/markdownTools";

/**
 * Interactive tools a portfolio piece can place inline with
 * `<!-- tool:name -->`. Keyed by the piece's filename so a marker only resolves
 * inside the post that defines it.
 */
const PORTFOLIO_TOOLS: Record<string, ToolRegistry> = {
  supergood: {
    "edge-cases": (
      <EdgeCasesEmbeds
        posts={[
          {
            slug: "the-unofficial-api-economy",
            title: "The Unofficial API Economy",
          },
          {
            slug: "ep-01-reverse-engineering-the-rules",
            title: "Reverse Engineering the Rules",
          },
        ]}
      />
    ),
  },
};

export const toolsForPiece = (slug: string): ToolRegistry | undefined =>
  PORTFOLIO_TOOLS[slug];
