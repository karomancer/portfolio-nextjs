---
title: Patreon 404 Fox
description: A 404-page with an animated illustrated astronaut fox made for Patreon's rebrand in 2017.
slug: /portfolio/patreon-404-fox
collaborators:
  - Jason Byttow
class: ""
date: 2017-07-15T02:44:05.000Z
preview: /portfolio/patreon-404-fox/og_image.png
cover: /portfolio/patreon-404-fox/cover.gif
og_preview: /portfolio/patreon-404-fox/og_image.png
draft: true
url: https://www.patreon.com/404Page
technologies:
  - CSS
  - React
  - TypeScript
  - Adobe Illustrator
tags:
  - animation
  - creative coding
  - CSS
  - web dev
  - illustration
categories:
  - Patreon
type: portfolioPiece
---

![Video of the fox on the Patreon website](/portfolio/patreon-404-fox/video.mp4)

## Context
When I started at Patreon in March 2017, my first project was to help rebrand the whole product by June 2017. This included assisting in the tech migration from an Angular frontend stack to React, rebuilding the styling in the website to use styled-components instead of straight up CSS, and replacing colors, fonts, the logo, wordmark, and icons.

The project was a mess and a half and the rebrand got a lot of controversial takes. However, in the chaotic mess that was the rebrand project, Jason Byttow and I were able to slip in a fun new 404 page design.

## Patreon & Foxes
There was once a designer at Patreon named Kathy. She loved foxes and even had a tumblr in which she drew a fox a day. Since she was one of the first designers at Patreon, she brought her love of foxes to the platform and Patreon has a light fox mascot. 4xx and 5xx pages were fashioned with foxes, and the default avatar for patrons and creators are procedurally generated fox illustrations.

This was Kathy's original 404 page design:

![Patreon Maintenance Page with a fox illustration](/portfolio/patreon-404-fox/patreon_maintenance.jpg)
![Cute 404 fox illustration on a gray background](/portfolio/patreon-404-fox/original_404.jpeg)


## Techniques
The Fox was illustrated in Adobe Illustrator, with each body part as a group. CSS keyframe animations were applied to each body part, the most commonly used CSS property being transform: rotate(...). Each body part is on a regular schedule, but some are complicated with properties being defined at every 1-5% keyframe. That makes it appear more random than it is.

The only part that is truly randomized on the fox is the eyes, which uses a JavaScript randomizer function to apply and remove a class that changes the height.

The spaceship is also on clockwork keyframes, rotating around a single point, and additional rotations around its own center to appear rickety.

## Final deliverable
When Patreon was doing it's rebrand, the error pages were not part of the scope. Jason and I took advantage of that to go a little rogue and make a green field project out of it. We wanted to stay true to the fox theming of Patreon that Kathy laid out before us.