---
title: Supergood Landing Page
description: A from-scratch redesign and front-end rebuild of the marketing site for Supergood, a platform that turns enterprise portals into managed APIs and agent tools.
slug: /portfolio/supergood
collaborators:
  - "[Alex Klarfeld](https://www.linkedin.com/in/alexklarfeld/)"
  - "[Calvin Zheng](https://www.linkedin.com/in/zhengcalvin/)"
class: ""
date: 2026-03-31T00:00:00.000Z
preview: /optimized/portfolio/supergood/preview.mp4
thumbnail_width: 1
thumbnail_height: 1
cover: /optimized/portfolio/supergood/cover.jpg
og_preview: /optimized/portfolio/supergood/og.webp
draft: false
url: https://supergood.ai/
technologies:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
tags:
  - frontend development
  - ui design
  - animation
  - marketing site
categories:
  - Client Work
  - Supergood
type: portfolioPiece
piece_type:
  - work
---

![Walkthrough of the Supergood landing page](/optimized/portfolio/supergood/hero.mp4)

## About Supergood

Most of the software a big company runs on lives behind a portal that was never meant to be automated. There's a login, usually an MFA prompt, and a web form built for a person to click through. No API, no SDK, no real way for software (or an AI agent) to do that same work at scale.

[Supergood](https://supergood.ai/) closes that gap. You walk through a portal once while it records the network traffic happening underneath, and from that recording it generates a fully managed API and a set of tools an agent can call. When the portal changes later and the integration breaks, Supergood notices, explains what happened, and patches it.

Supergood's founder, [Alex Klarfeld](https://www.linkedin.com/in/alexklarfeld/), brought me on to redesign and rebuild the marketing landing page from scratch. The tricky part was that it had to talk to two pretty different audiences at once, people building agents who want managed tools to call at scale, and developers who just need a reliable API for a portal that doesn't have one, all without splitting the page down the middle.

All of this was part of a bigger repositioning: Supergood was shifting its whole pitch to lead with agents, and the tagline was moving away from the old "Unofficial APIs, officially maintained." toward what's live now, "Agent tools for enterprise portals." And it wasn't a soft, whenever-it's-ready project, Alex needed the page out by April 1st to line up with an investor update, so there was a real, externally-fixed deadline on it.

## The Project

Alex came to me with a real head start. He'd spent a couple of days going through the new page section by section with Claude, nailing down the copy and the structure, then handed it over as a rough wireframe with the styling deliberately left blank. It mirrored the bones of their current site but none of the look, and the ask was basically to take the existing page's style and flavor and make this new one feel like it. He'd even baked a "notes" mode into the HTML, little annotations you could toggle on where he talked through the parts he wasn't sure about, and he walked me through the whole thing over a Loom. So the copy and the section order came in strong, and my job was to give it a real design, build it for real, and fill in the parts he'd left open.

||
|--|
| ![The existing Supergood homepage, the style and flavor I was asked to carry into the redesign](/optimized/portfolio/supergood/old-homepage.webp "The existing Supergood homepage — the style and flavor I was asked to carry into the redesign") |

||
|--|
| ![The annotated wireframe Alex built with Claude, with his notes toggled on](/optimized/portfolio/supergood/wireframe.mp4 "The annotated wireframe Alex built with Claude, with his notes toggled on") |

The biggest of those open parts was the product itself, which is basically invisible. Everything valuable about Supergood happens in network recordings, generated code, and integrations that quietly fix themselves, and none of that screenshots well. Alex wasn't sure what the main graphic should be either (he'd had another AI tool render something and it came out a little weird) and floated pulling real screenshots or GIFs from the app. Since there wasn't a polished product UI to grab from yet, I decided the page should just show the product working, and that I'd build those "screenshots" myself. To keep it from turning into a pile of disconnected mockups, I tied every graphic to one made-up but consistent scenario: a property management company called Acme Corp automating a vendor portal called VendorCo that has no API. Same company, same portal, even the same work order fields the whole way down, so a dense flow reads like one story instead of a feature dump. To keep it that way, I wrote the scenario down as a `STORY.md` in the graphics directory, a little canonical script for the whole VendorCo narrative, and pointed every graphic (and the AI I was building them with) back at it, so the details stayed in sync as the page evolved and Alex could swap the whole scenario later by editing one file.

On the engineering side, the page lives in Supergood's existing [Next.js](https://nextjs.org/) codebase. Early on I migrated it from JavaScript to TypeScript and typed up the section, card, and use-case content, so the page became structured data the layout maps over instead of a wall of hand-placed markup. On top of Tailwind I built a small kit of reusable components (a Card with composable Eyebrow and Title pieces, a Button, a TerminalCard, a CodeBlock wrapper, a TabContainer, and an animated FAQ accordion), using [class-variance-authority](https://cva.style/) for the variants so styling stayed consistent everywhere. Alex also mentioned he wasn't married to any of the portal logos and wanted them easy to swap later, so I made that whole section data-driven, which paid off later when I was sourcing and cleaning up the real ones.

### Animated in CSS, not Lottie

The product graphics could have been Lottie exports or screen recordings, but I built every one as a live React component animated with CSS (and a little react-spring) instead. That way they stay crisp at any size, restyle instantly from our Tailwind tokens, reflow on mobile, and replay on hover, none of which you really get from a baked animation file or a video.

Each step of the core flow is its own little animated UI:

- **Auth and MFA**: spinning up a managed service account with an auto-generated email, password, and phone number for the MFA codes.
- **Record**: a split screen walking through the portal (login, work orders, new request, confirmation) while Supergood captures the network logs alongside it.
- **Generate**: Supergood writing the integration code and deploying the endpoints.

| | |
| -- | -- |
| ![The Record split-screen graphic](/optimized/portfolio/supergood/record.mp4 "Record: walking the portal while Supergood captures the network logs alongside it") | ![The Generate graphic deploying endpoints](/optimized/portfolio/supergood/generate.mp4 "Generate: Supergood writing the integration code and deploying the endpoints") |

### The self-maintaining incident

The hardest idea to sell was that the integration fixes itself. Said plainly it just sounds like a marketing claim, so I built it as a little incident you watch play out instead.

VendorCo quietly adds a new required "Priority" field to their work order form. The old integration doesn't know about it, so requests start failing with a 422. A Supergood bot posts the diagnosis to Slack (likely cause: schema validation, suggested fix: include the new field), a run detail view shows the failed request and its stack trace, and the API docs update themselves with the new field flagged as changed. Watching it break and heal on its own lands a lot harder than a sentence promising it does.

| | |
| -- | -- |
| ![Supergood bot posting a failure diagnosis to Slack](/optimized/portfolio/supergood/slack-alert.mp4 "The Supergood bot posting its failure diagnosis to Slack") | ![The failed run detail and the auto-updated docs](/optimized/portfolio/supergood/run-detail.mp4 "The failed run detail and the docs updating themselves with the changed field") |

### Terminal cards that type on scroll

The curl and JSON examples live in a TerminalCard whose lines type themselves out one at a time. Each Line takes its own delay, and at first the whole thing animated on page load, so by the time you scrolled down to it the payoff was already over. I gated the animation on scroll position so it doesn't kick off until the card hits the center of the viewport. I also wrote custom syntax highlighting for these so the curl commands and JSON keys use our brand palette instead of some off-the-shelf theme.

| | |
| -- | -- |
| ![A terminal card typing out a curl request](/optimized/portfolio/supergood/terminal.mp4 "A terminal card typing out a curl request line by line on scroll") | ![Brand-colored JSON syntax highlighting](/optimized/portfolio/supergood/syntax.webp "Custom JSON syntax highlighting in the brand palette") |

### Manila-folder tabs

The use cases are grouped into a tabbed section, and instead of clean modern tabs I styled them to look like an archaic manila folder, colored tabs sticking out the top of a paper file. It fits the blocky brand, but it's also a quiet little jab: these are exactly the kinds of crusty, login-and-a-web-form enterprise systems that never bothered to ship an API, so representing them with the most analog office object I could think of felt right. This section had also started out feeling busy and over-nested, cards sitting inside cards inside cards, and pulling it out of its outer card and leaning into the folder metaphor gave it structure without the clutter.

---

You can see it live on [Supergood's site](https://supergood.ai/). I also designed their social preview image, the one that shows up whenever someone shares that link.

Supergood also lives smack in the middle of something I've been digging into on my podcast, [Edge Cases](https://edgecasespodcast.substack.com/): the whole "unofficial API economy" that springs up around portals that were never meant to be automated. I wrote a couple of pieces on it that pair nicely with this project:

[embed](https://edgecasespodcast.substack.com/p/the-unofficial-api-economy)

[embed](https://edgecasespodcast.substack.com/p/ep-01-reverse-engineering-the-rules)

> _Draft note: replace the placeholder media in `/optimized/portfolio/supergood/`, confirm the live URL, and double-check collaborator attribution before publishing._
