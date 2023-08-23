---
title: Patreon 404 Fox
description: A 404-page with an animated illustrated astronaut fox made for Patreon's rebrand in 2017.
slug: /portfolio/patreon-404-fox
collaborators:
  - "[Jason Byttow](https://twitter.com/jbyttow)"
class: ""
date: 2017-07-15T02:44:05.000Z
preview: /portfolio/patreon-404-fox/404.gif
cover: /portfolio/patreon-404-fox/cover.gif
og_preview: /portfolio/patreon-404-fox/og_image.png
draft: false
url: https://www.patreon.com/404Page
technologies:
  - CSS
  - React
  - TypeScript
  - Adobe Illustrator
tags:
  - animation
  - illustration
  - web dev
categories:
  - Full-time
  - Patreon
type: portfolioPiece
thumbnail_width: 2
thumbnail_height: 2
---

![Video of the fox on the Patreon website](/portfolio/patreon-404-fox/video.mp4)

## Context
When I started at Patreon in March 2017, my first project was to help rebrand the whole product by June 2017. This included assisting in the tech migration from an Angular frontend stack to React, rebuilding the styling in the website to use styled-components instead of straight up CSS, and replacing colors, fonts, the logo, wordmark, and icons.

I actually tech led the creation of our design system in React, aptly named Studio.

[embed](https://studio.patreon.com/)

The project was a mess and a half with a lot of late nights. However, in the chaotic mess that was the rebrand project, [Jason Byttow](https://www.linkedin.com/in/jason-byttow-84a3974/) and I were able to slip in a fun new 404 page design.

## Patreon & Foxes
There was once a designer at Patreon named Kathy. She loved foxes and even had a tumblr in which she drew a fox a day. Since she was one of the first designers at Patreon, she brought her love of foxes to the platform and Patreon has a light fox mascot. 4xx and 5xx pages were fashioned with foxes, and the default avatar for patrons and creators are procedurally generated fox illustrations.

This was Kathy's original 404 page design:

| | |
| -- | -- |
| ![Cute 404 fox illustration on a gray background](/portfolio/patreon-404-fox/original_404.jpeg) | ![Patreon Maintenance Page with a fox illustration](/portfolio/patreon-404-fox/patreon_maintenance.jpg) |


## Techniques
The rebranded Fox was illustrated in Adobe Illustrator, with each body part as a group. CSS keyframe animations were applied to each body part, the most commonly used CSS property being transform: rotate(...). Each body part is on a regular schedule, but some are complicated with properties being defined at every 1-5% keyframe. That makes it appear more random than it is.

The only part that is truly randomized on the fox is the eyes, which uses a JavaScript randomizer function to apply and remove a class that changes the height.

The spaceship is also on clockwork keyframes, rotating around a single point, and additional rotations around its own center to appear rickety.

## A Rogue Merge Becomes a Fan Favorite
When Patreon was [doing it's rebrand](https://www.behance.net/gallery/53952451/Rebrand-with-Patreon?locale=en_US), the error pages were not part of the scope. Jason and I took advantage of that to go a little rogue and make a green field project out of it. We wanted to stay true to the fox theming of Patreon that Kathy laid out before us.

You can see the page live on the [Patreon website](https://www.patreon.com/404Page).

While the rebrand itself was [highly controversial](https://medium.com/@cooperthinks/why-the-new-patreon-brand-sucks-ee513b09dfcb), at lease the reception of the 404 page upon release was pretty positive! You know you did a good job when your random project is tweeted by the company account!


| | |
| -- | -- |
| ![Tweet by Patreon unveiling the new 404 page](/portfolio/patreon-404-fox/tweet_patreon.png) | ![Tweet by Jason Byttow, the co-collaborator of the 404 page](/portfolio/patreon-404-fox/tweet_jason.png) |
| ![Tweet by an excited creator](/portfolio/patreon-404-fox/tweet_mac.png) | ![Tweet by an excited creator](/portfolio/patreon-404-fox/tweet_kevin.png) |


## Never Enough Foxes

Even though this project was totally rogue and merged in secret, the new fox design was much beloved internally. I ended up also illustrating the fox for our maintenance page and for our creator onboarding flows. Here's a couple samples: **Construction Foxy** and **Interview Foxy**.

| | |
| -- | -- |
| ![A fox wearing a construction hat holding a wrench](/portfolio/patreon-404-fox/construction_fox.png) | ![A fox holding a microphone to the viewer](/portfolio/patreon-404-fox/interview_fox.jpeg) |
