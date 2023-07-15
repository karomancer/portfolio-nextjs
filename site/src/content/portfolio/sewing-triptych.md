---
title: Sewing Triptych
description: A triptych illustrating the process of creating a garment using different CSS animation techniques.
slug: /portfolio/sewing-triptych
collaborators: []
class: ""
date: 2020-04-20T00:38:31.892Z
preview: /portfolio/sewing-triptych/sewing-no-boxshadow.gif
cover: /portfolio/sewing-triptych/cover.jpeg
og_preview: /portfolio/sewing-triptych/og_image.jpeg
draft: true
url: https://codepen.io/karomancer/pen/yLNdeXE
technologies:
  - CSS
  - HTML
  - Adobe Illustrator
tags:
  - animation
  - creative coding
  - CSS
  - illustration
  - web dev
categories:
  - Gray Area
type: portfolioPiece
---

[Glitch example](https://sewing-triptych.glitch.me/)

In spring 2020, I took Gray Area's Computer Science in Studio Art 12-Week Immersive. One of our first challenges was to make a triptych purely with CSS + HTML (no JavaScript!)

Because I am a frontend engineer professionally, I wanted to challenge myself. I made a checklist of things I wanted to accomplish:

Every pane has to use a different method of generating graphics and animation. I chose:

- **SVG.** SVG has its own markup and its (using the animateTransform and animate tags)
- **Sprite map.** Part of the reason this took me so long is that I drew my own sprite map from scratch. A is a large image file with a grid of images that each represent a keyframe in an animation. You can then use the CSS value in the animation property to flip between keyframes in one giant image.
- **CSS-only.** Make shapes and animate using only CSS, like our other assignments.

I also used this an opportunity to:

- **Utilize CSS variables.** I've actually never used plain CSS variables; I've usually used SASS or LESS ones, or JavaScript variables and something like emotion or styled-components.
-**Make it responsive.** My single div challenge looked ass awful on mobile, so wanted to ensure this one was mobile-friendly.

## Biggest issues and solutions
I couldn't get the sprite map to line up from frame-to-frame, even though I used software specifically intended to make sprite maps.

*Solution?* Some hackery including colored borders.

Also couldn't quite get the stitch and top-thread on the sewing machine pane to line up.

*Solution?* Speed up the animation so it's so fast you can't tell! :)

## Final Deliverable

Here's the project and its [code on CodePen](https://codepen.io/karomancer/pen/yLNdeXE).

