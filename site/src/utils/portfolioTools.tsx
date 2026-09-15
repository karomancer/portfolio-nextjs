import EdgeCasesEmbeds from "@/components/EdgeCasesEmbeds";
import CascadingDeck from "@/components/supergood/CascadingDeck";
import HeroToggle from "@/components/supergood/HeroToggle";
import TerminalPair from "@/components/supergood/TerminalPair";
import UseCaseTabs from "@/components/supergood/UseCaseTabs";
import DocsGraphic from "@/components/supergood/graphics/DocsGraphic";
import RunDetailGraphic from "@/components/supergood/graphics/RunDetailGraphic";
import SlackAlertGraphic from "@/components/supergood/graphics/SlackAlertGraphic";
import type { ToolRegistry } from "@/utils/markdownTools";

/**
 * Interactive tools a portfolio piece can place inline with
 * `<!-- tool:name -->`, keyed by the piece's filename. A piece with no entry
 * renders as plain markdown, so adding tools to one write-up cannot affect
 * any other.
 */
const PORTFOLIO_TOOLS: Record<string, ToolRegistry> = {
  supergood: {
    "hero-toggle": <HeroToggle />,
    observability: (
      <CascadingDeck
        cards={[
          {
            eyebrow: "Alert",
            eyebrowClass: "eyebrow-alert",
            shadow: "#f472b6",
            title: "Human and agent-readable errors",
            description:
              "Every error is structured for both people and agents, so an agent knows what broke and whether to retry.",
            graphic: <SlackAlertGraphic />,
          },
          {
            eyebrow: "Audit",
            eyebrowClass: "eyebrow-audit",
            shadow: "#a16207",
            title: "Full audit logs",
            description:
              "The complete history of every call: request, response, timing, status. Debug in seconds rather than hours.",
            graphic: <RunDetailGraphic />,
          },
          {
            eyebrow: "Docs",
            eyebrowClass: "eyebrow-docs",
            shadow: "#60a5fa",
            title: "Living knowledge base",
            description:
              "Edge cases and behavioural patterns are captured as they happen, so the docs grow with real usage.",
            graphic: <DocsGraphic />,
          },
        ]}
      />
    ),
    "terminal-pair": <TerminalPair />,
    "use-case-tabs": <UseCaseTabs />,
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
