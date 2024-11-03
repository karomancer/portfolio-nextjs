---
title: Imperfect Foods Components
description: A landing page for Imperfect Foods with interactive, animated components to illustrate impact and savings potentials.
slug: /portfolio/imperfect-foods
collaborators:
  - "[Cory (Jason) Alvernaz](https://www.coryalvernaz.com/)"
  - "[Rob Kayson](https://www.linkedin.com/in/rkayson/)"
class: ""
date: 2021-06-07T08:45:42.519Z
preview: /portfolio/imperfect-foods/impactslidermobile.mp4
cover: /portfolio/imperfect-foods/cover.jpg
og_preview: /portfolio/imperfect-foods/og_preview.jpeg
draft: false
url: https://www.imperfectfoods.com/
technologies:
  - CSS
  - TypeScript
  - React
tags:
  - animation
  - frontend
  - mentoring
categories:
  - Client Work
  - Imperfect Foods
type: portfolioPiece
thumbnail_width: 1
thumbnail_height: 2
piece_type:
  - work
---

![](/portfolio/imperfect-foods/site.mp4)

## About Imperfect Foods
[Imperfect Foods](https://www.imperfectfoods.com/) is a grocery delivery service (and a Public Benefit Corporation) on a mission to reduce food waste. After raising their Series D ($110M) in early 2021, Imperfect needed to quickly roll out a major upgrade to their marketing site, which receives about 2 million visits/month. They approached [Mutations Ltd](https://mutations.ltd/) to help them, specifically requesting people with a lot of experience with CSS animations and "highly interactive" React components.

These are two of my specialties so I was put as technical lead on the job.

## The Project

By the time they reached out, Imperfect Foods had already invested in an extensive redesign including detailed annotated mocks. We were asked to implement their vision in React in a very modular way, creating good documentation via [Storybook](https://storybook.js.org/).

||
|--|
| ![Screenshot of some of the original mocks provided](/portfolio/imperfect-foods/mocks.jpeg) |

Due to my background in web accessibility, we also wanted to ensure each component was accessible via keyboard and screen readers.

Three of us worked on this project. I acted as technical lead and helped mentor and direct the other two people on the project. We worked on a few of the components that are currently still on their site, namely...

### Pantry Component
A carousel which simply scrolls through product categories, each slide animating with a background wipe and fade in foreground object.

This component was Cory (Jason) Alvernaz's baby, and with my help, he was able to program in the swipe animations as well as the automatic playing feature.

| | |
| -- | -- |
| ![](/portfolio/imperfect-foods/pantry.mp4) | ![](/portfolio/imperfect-foods/pantrymobile.mp4) |


### Badge Carousel
A carousel with large buttons in a semi circle along the left that users can click and see dynamic animations showing specific products.

Rob Kayson and I worked on this together, and he knocked it out of the park. The trickiest parts was animating so many disparate SVGs to work perfectly in harmony without a hitch and to align the badges perfectly in a semi circle. It was fun to dust off our high school geometry knowledge!

| | |
| -- | -- |
| ![](/portfolio/imperfect-foods/badgecarousel.mp4) | ![](/portfolio/imperfect-foods/badgecarouselmobile.mp4) | 


### Impact Slider
A highly animated slider showing how much water, food, co2, and time that could be saved for using their services.

This I did completely on my own. The scrolling numbers were done with pure JavaScript, [the code can be seen on CodePen](https://codepen.io/karomancer/pen/dyvEOae) while the rest were SVGs manipulated with CSS animations. The slider was made with `div`s, but made accessible with proper aria attributes: 

```html
<div aria-valuemin="0" aria-valuemax="2" aria-valuenow="[0|1|2]" aria-orientation="horizontal">
    ...
        <div>[1 week | 1 month | 1 year]</div>
    ...
</div>
```

| | |
| -- | -- |
| ![](/portfolio/imperfect-foods/impactslider.mp4) | ![](/portfolio/imperfect-foods/impactslidermobile.mp4) | 

--- 

If you'd like to know more, you can check out [Mutation's documentation of the same project](https://mutations.ltd/work/imperfect-foods-partnering-to-implement-interactive-new-site/) or even the website live on [Imperfect Food's main marketing page](https://www.imperfectfoods.com/).