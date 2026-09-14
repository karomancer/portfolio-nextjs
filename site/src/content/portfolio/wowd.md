---
title: Wowd Onboarding Carousel
description: Four months inside a creator collaboration platform. An animated onboarding carousel in Flutter, a link preview service that replaced a paid vendor, and a marketing site.
slug: /portfolio/wowd
collaborators:
  - "[Nora Kako](https://www.linkedin.com/in/norakako/)"
class: ""
date: 2022-06-15T20:52:25.893Z
preview: /optimized/portfolio/wowd/preview.mp4
cover: /optimized/portfolio/wowd/cover.webp
og_preview: /optimized/portfolio/wowd/og_image.jpg
draft: false
technologies:
  - Dart
  - Flutter
  - Figma
  - TypeScript
  - Express
  - Vue
  - Gatsby
tags:
  - animation
  - mobile dev
  - web dev
categories:
  - Client Work
  - Wowd
type: portfolioPiece
thumbnail_height: 2
piece_type:
  - work
thumbnail_width: 1
---

![Video of an app animation](/optimized/portfolio/wowd/carousel.mp4)

## About Wowd

Wowd Co's goal is to help any creator build a thriving career through fan collaboration. The app and platform they've built provides creation and editing tools to allow creators to provide new value for their fans, whether through mintable autographs, small collaborative art pieces, sketches, collages, and more.

The core of their platform allows for a game of telephone, where a creator can start a piece of work and fans can jump in and add their touches, potentially continuing it on to more fans or back to the creator like a game of pong. The creator stands to earn money each step of the way.

To support collaboration amongst many people, they introduced the idea of layers, which each show a person's contribution to the work. To demonstrate this new ability, they wanted an animated onboarding flow that is fun and bold, encouraging new users to follow along and even interact with it.

## The Project

Wowd's codebase is written in [Flutter](https://flutter.dev/), a framework using the [Dart programming language](https://dart.dev/). By the time I was asked to do this project, I had already been working with Wowd on a few other bug fixes and features in their codebase and was gaining some familiarity with Dart and Flutter.

The carousel was the headline request, but not the whole engagement. I had joined in January 2022 as an extra pair of hands, and by the time I left in May I had worked in four of their repositories: the mobile client, the backend, a link preview service I wrote from scratch, and their marketing site. The team was small, so the work went wherever it was needed.

Their designer, [Nora Kako](https://www.linkedin.com/in/norakako/), already had design language and branding ironed out and had great mocks for this flow. I worked with her to iron them out further, including filling in copy. We also decided we wanted each stage to be highly animated, and she largely left the particular animations of her assets to me.

Using [Flutter's powerful animation tooling](https://docs.flutter.dev/ui/animations/tutorial), I was able to define animations both by drawing shapes straight in Flutter to manipulating SVGs that Nora provided me.

### Welcome

| | |
| -- | -- |
| ![An animated gif showing a bunch of images fading in and then scrolling off the viewport](/optimized/portfolio/wowd/wowd1.webm#phone) | In the welcome slide, small images of actual collaborations made with the Wowd app appear and slide past the user. The hope is to showcase the work of the current userbase and to intrigue the new users to want to learn more about these strange little pieces. |

### Send a request

| | |
| -- | -- |
| ![An animated gif showing a click through of a very simplified UI with no words](/optimized/portfolio/wowd/wowd2.gif#phone) | To educate the user on the term "Request", we simplified the UI to show the broad strokes of how to choose their desired creator and choose a collaboration to request. The glowing button was to make it clear that the request CTA is the button showing the price. |


### Create Together

| | |
| -- | -- |
| ![An animated gif showing a selfie in purple, drawings of a haircut and guitar onto the selfie in blue, then a signature in yellow](/optimized/portfolio/wowd/wowd3.gif#phone) | To illustrate the ability to collaborate with multiple people, we animated a collaboration in progress, starting with a fan selfie then introducing another fan and their own touches. Lastly, the creator comes in and signs the piece. Each collaborator is represented by a different color. |


### See the journey

| | |
| -- | -- |
| ![An animated gif showing projector transparency like UI sifting through a layer of a selfie, a blue haircut, and a yellow signature](/optimized/portfolio/wowd/wowd4.gif#phone) | To introduce the ideas of a progressive deliverable, we show the by-collaborator layers of the collaboration made in the prevoius step. The fan should expect not just a finished image but a video, gif, or interactive widget within the Wowd app showing the progression of collaborative efforts. |


### Let's go

| | |
| -- | -- |
| ![A screenshot of a login screen showing login options for Twitter, Facebook, or Google](/optimized/portfolio/wowd/wowd5.webp#phone) | No sign up flow would be complete without a sign up and login page. There wasn't much extra that went into this other than debating which platforms to support in multi auth. These might be different now, especially after Twitter's rebranding |

The carousel was the part of the engagement anyone could actually see. Most of the rest was plumbing, and the biggest piece of plumbing was getting links to behave.

## Deep links without a vendor

Wowd had been using [Branch.io](https://branch.io/) for the links that open the app. I replaced it with a little service of our own called `unfurly`, an Express and Vue app doing two jobs at once. First, it renders a preview page for anything worth sharing, whether a creation, an offering, or a profile, carrying the Open Graph and Twitter tags that turn a pasted link into a proper card. Second, it hands the visitor off to the app through Apple Universal Links and Android App Links, falling back to the App Store for anyone who doesn't have it installed yet.

That meant working in three repositories at the same time. The backend grew public endpoints so the preview pages had something to render. `unfurly` rendered them. And the Flutter client learned to resolve `wowd://` routes, which behave differently enough on iOS and Android that the router had to know which platform it was standing on. Branch.io came out in February 2022.

## The marketing site

Wowd also needed a marketing site, so I built one: [Gatsby](https://www.gatsbyjs.com/) with TypeScript and styled-components, content in MDX. Home, about, a partner enquiry page, terms, privacy, and an account deletion page, which is the least glamorous thing a consumer app has to ship and the one page users actually go looking for. It went live in April 2022.

| |
| -- |
| ![The Wowd marketing site: a purple gradient hero with phone mockups, above a three step How to Wowd section](/optimized/portfolio/wowd/marketing-site.webp "The same concept the carousel explains in five screens, compressed into three.") |

## The long tail

The rest was the ordinary work of a product with real people in it. Push notifications learned to deep link, including the awkward case where the app isn't running at all and the notification has to carry enough to open the right screen from a cold start. Sharing a creation gained an image as well as a link, then gained a second button once it was clear that sharing and downloading are different intentions. Profile URLs learned to accept a username instead of a UUID.

## Where it ended up

The onboarding communicates Wowd's odd little concept through motion rather than a wall of text, and a new user can grok the platform in under a minute. All of the animations shipped directly in Flutter on both iOS and Android. `unfurly` ran in production from February, and the marketing site from April.

Wowd has since shut down, and wowd.co no longer resolves. The marketing site survives in the [Internet Archive](https://web.archive.org/web/20220513222657/http://www.wowd.co/).
