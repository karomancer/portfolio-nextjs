---
title: Supergood Landing Page
description: A from-scratch redesign and front-end rebuild of the marketing site for Supergood, a platform that turns enterprise portals into managed APIs and agent tools.
slug: /portfolio/supergood
collaborators:
  - "[Alex Klarfeld](https://www.linkedin.com/in/alexsupergood/)"
  - "[Calvin Zheng](https://www.linkedin.com/in/zhengcalvin/)"
class: ""
date: 2026-03-31T00:00:00.000Z
preview: /optimized/portfolio/supergood/preview.mp4
thumbnail_width: 2
thumbnail_height: 1
cover: /optimized/portfolio/supergood/cover.jpg
og_preview: /optimized/portfolio/supergood/thumb.webp
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

![Walkthrough of the redesigned Supergood landing page](/optimized/portfolio/supergood/hero.mp4 "The redesigned landing page, top to bottom")

## The Client

Most of the software a big company runs on lives behind a portal that was never meant to be automated. There's a login, usually an MFA prompt, and a web form built for a person to click through. No API, no SDK, no real way for software, or an AI agent, to do that same work at scale.

[Supergood](https://supergood.ai/) closes that gap. You walk through a portal once while it records the network traffic happening underneath, and from that recording it generates a fully managed API and a set of tools an agent can call. When the portal changes later and the integration breaks, Supergood notices, explains what happened, and patches it.

## The Ask

Founder [Alex Klarfeld](https://www.linkedin.com/in/alexsupergood/) brought me in to redesign and rebuild the Supergood landing page from scratch.

The page had to carry a repositioning. Supergood was moving its whole pitch to lead with agents, and the tagline was shifting away from "Unofficial APIs, officially maintained", which felt a little yucky even to LLMs, toward what's live now: "Agent tools for enterprise portals." It also had to talk to two quite different audiences at once: people building agents who want managed tools to call at scale, and people who have a use case and a portal but wouldn't necessarily call themselves developers. All without splitting the page down the middle.

And it wasn't a whenever-it's-ready project. Alex needed the page out by April 1st to line up with an investor update, so there was a real, externally fixed deadline.

## The Process

Alex came to me with a head start. He'd spent a couple of days going through the new page section by section with Claude, nailing down the copy and structure, then handed it over as a rough wireframe with the styling deliberately left blank. It mirrored the bones of their current site but none of the look; the look itself came from [Calvin Zheng](https://www.linkedin.com/in/zhengcalvin/)'s designs for the existing site, which I was asked to carry forward. Alex had even baked a "notes" mode into the HTML, annotations you could toggle on where he talked through the parts he wasn't sure about, and walked me through the whole thing over a Loom.

![Figma canvas of the existing Supergood site designs](/optimized/portfolio/supergood/figma.webp "Calvin's designs for the existing site, old tagline and all")

![Alex's wireframe with notes mode toggled on](/optimized/portfolio/supergood/wireframe.mp4 "Alex's wireframe with notes mode toggled on. Styling deliberately absent.")

So the copy and section order came in strong. My job was to give it a real design, build it for real, and fill in the parts he'd left open.

The biggest of those was the product itself, which is essentially invisible. Everything valuable about Supergood happens in network recordings, generated code, and integrations that quietly fix themselves, none of which screenshots well. Alex wasn't sure what the main graphic should be either, and floated pulling real screenshots or GIFs from the app. Since there wasn't a polished product UI to grab from yet, I decided the page should just show the product working, and that I'd build those "screenshots" myself.

To keep it from turning into a pile of disconnected mockups, I tied every graphic to one invented but consistent scenario: a property management company automating a vendor portal that has no API. Same company, same portal, even the same work order fields the whole way down, so a dense flow reads like one story instead of a feature dump. I wrote the scenario down as a `STORY.md` in the graphics directory, a canonical script for the whole narrative, and pointed every graphic (and the AI I was building them with) back at it, so details stayed in sync as the page evolved and Alex could swap the entire scenario later by editing one file.

On the engineering side, the page lives in Supergood's existing [Next.js](https://nextjs.org/) codebase. Early on I migrated it from JavaScript to TypeScript and typed up the section, card, and use-case content, so the page became structured data the layout maps over instead of a wall of hand-placed markup. On top of Tailwind I built a small kit of reusable components (a Card with composable Eyebrow and Title pieces, a Button, a TerminalCard, a CodeBlock wrapper, a TabContainer, and an animated FAQ accordion), using [class-variance-authority](https://cva.style/) for the variants so styling stayed consistent. Alex mentioned he wasn't married to any of the portal logos and wanted them easy to swap, so I made that section data-driven, which paid off later when sourcing and cleaning up the real ones.

### Animated in CSS, not Lottie

The product graphics could have been Lottie exports or screen recordings, but I built every one as a live React component animated with CSS (and a little react-spring) instead. That way they stay crisp at any size, restyle instantly from the Tailwind tokens, reflow on mobile, and replay on hover, none of which you really get from a baked animation file or a video.

Each step of the core flow is its own animated UI:

- **Auth and MFA**: spinning up a managed service account with an auto-generated email, password, and phone number for the MFA codes.
- **Record**: a split screen walking through the portal (login, work orders, new request, confirmation) while Supergood captures the network logs alongside it.
- **Generate**: Supergood writing the integration code and deploying the endpoints.

### The self-maintaining incident

The hardest idea to sell was that the integration fixes itself. Said plainly it just sounds like a marketing claim, so I built it as a little incident you watch play out instead.

The portal quietly adds a new required "Priority" field to its work order form. The old integration doesn't know about it, so requests start failing with a 422. A Supergood bot posts the diagnosis (likely cause: schema validation, suggested fix: include the new field), a run detail view shows the failed request and its stack trace, and the API docs update themselves with the new field flagged as changed. Watching it break and heal on its own lands harder than a sentence promising it does.

### Terminal cards that type on scroll

The curl and JSON examples live in a TerminalCard whose lines type themselves out one at a time. Each line takes its own delay, and at first the whole thing animated on page load, so by the time you scrolled down to it the payoff was already over. I gated the animation on scroll position so it doesn't start until the card hits the center of the viewport. I also wrote custom syntax highlighting so the curl commands and JSON keys use the brand palette instead of an off-the-shelf theme.

### Manila-folder tabs

The use cases are grouped into a tabbed section, and instead of clean modern tabs I styled them to look like an archaic manila folder, colored tabs sticking out the top of a paper file. It fits the blocky brand, but it's also a quiet little jab: these are exactly the kinds of crusty, login-and-a-web-form enterprise systems that never bothered to ship an API, so representing them with the most analog office object I could think of felt right. The section had also started out busy and over-nested, cards inside cards inside cards; pulling it out of its outer card and leaning into the folder metaphor gave it structure without the clutter.

## The Outcome

The redesigned page shipped on deadline and is live at [supergood.ai](https://supergood.ai/). I also designed the social preview image that shows up whenever someone shares the link.

The full transformation, side by side:

| Before | After |
| -- | -- |
| ![The old Supergood homepage, top to bottom](/optimized/portfolio/supergood/old-homepage.webp) | ![The redesigned Supergood homepage, top to bottom](/optimized/portfolio/supergood/new-homepage.webp) |

Supergood also sits in the middle of something I've been digging into on my podcast, [Edge Cases](https://edgecasespodcast.substack.com/): the whole unofficial API economy that springs up around portals never meant to be automated. Two pieces that pair well with this project:

<!-- tool:edge-cases -->
