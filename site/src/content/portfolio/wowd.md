---
title: Wowd Onboarding Carousel
description: An animated app onboarding experience for Wowd written in Dart with describing the how to create collaborations within the platform.
slug: /portfolio/wowd
collaborators:
  - "[Nora Kako](https://www.linkedin.com/in/norakako/)"
class: ""
date: 2022-06-15T20:52:25.893Z
preview: /portfolio/wowd/preview.mp4
cover: /portfolio/wowd/cover.png
og_preview: /portfolio/wowd/og_image.jpeg
draft: false
url: https://www.wowd.co/
technologies:
  - Dart
  - Flutter
  - Figma
tags:
  - animation
  - mobile dev
categories:
  - Client Work
  - Wowd
type: portfolioPiece
thumbnail_height: 2
piece_type:
  - work
---

![Video of an app animation](/portfolio/wowd/carousel.mp4)

## About Wowd

[Wowd Co](https://www.wowd.co/)'s goal is to help any creator build a thriving career through fan collaboration. The app and platform they've built provides creation and editing tools to allow creators to provide new value for their fans, whether through mintable autographs, small collaborative art pieces, sketches, collages, and more.

The core of their platform allows for a game of telephone, where a creator can start a piece of work and fans can jump in and add their touches, potentially continuing it on to more fans or back to the creator like a game of pong. The creator stands to earn money each step of the way.

To support collaboration amongst many people, they introduced the idea of layers, which each show a person's contribution to the work. To demonstrate this new ability, they wanted an animated onboarding flow that is fun and bold, encouraging new users to follow along and even interact with it.

## The Project

Wowd's codebase is written in [Flutter](https://flutter.dev/), a framework using the [Dart programming language](https://dart.dev/). By the time I was asked to do this project, I had already been working with Wowd on a few other bug fixes and features in their codebase and was gaining some familiarity with Dart and Flutter.

Their designer, [Nora Kako](https://www.linkedin.com/in/norakako/), already had design language and branding ironed out and had great mocks for this flow. I worked with her to iron them out further, including filling in copy. We also decided we wanted each stage to be highly animated, and she largely left the particular animations of her assets to me.

Using [Flutter's powerful animation tooling](https://docs.flutter.dev/ui/animations/tutorial), I was able to define animations both by drawing shapes straight in Flutter to manipulating SVGs that Nora provided me.

### Welcome

| | |
| -- | -- |
| ![An animated gif showing a bunch of images fading in and then scrolling off the viewport](/portfolio/wowd/wowd1.gif) | In the welcome slide, small images of actual collaborations made with the Wowd app appear and slide past the user. The hope is to showcase the work of the current userbase and to intrigue the new users to want to learn more about these strange little pieces. |

### Send a request

| | |
| -- | -- |
| ![An animated gif showing a click through of a very simplified UI with no words](/portfolio/wowd/wowd2.gif) | To educate the user on the term "Request", we simplified the UI to show the broad strokes of how to choose their desired creator and choose a collaboration to request. The glowing button was to make it clear that the request CTA is the button showing the price. |


### Create Together

| | |
| -- | -- |
| ![An animated gif showing a selfie in purple, drawings of a haircut and guitar onto the selfie in blue, then a signature in yellow](/portfolio/wowd/wowd3.gif) | To illustrate the ability to collaborate with multiple people, we animated a collaboration in progress, starting with a fan selfie then introducing another fan and their own touches. Lastly, the creator comes in and signs the piece. Each collaborator is represented by a different color. |


### See the journey

| | |
| -- | -- |
| ![An animated gif showing projector transparency like UI sifting through a layer of a selfie, a blue haircut, and a yellow signature](/portfolio/wowd/wowd4.gif) | To introduce the ideas of a progressive deliverable, we show the by-collaborator layers of the collaboration made in the prevoius step. The fan should expect not just a finished image but a video, gif, or interactive widget within the Wowd app showing the progression of collaborative efforts. |


### Let's go

| | |
| -- | -- |
| ![A screenshot of a login screen showing login options for Twitter, Facebook, or Google](/portfolio/wowd/wowd5.jpeg) | No sign up flow would be complete without a sign up and login page. There wasn't much extra that went into this other than debating which platforms to support in multi auth. These might be different now, especially after Twitter's rebranding |



