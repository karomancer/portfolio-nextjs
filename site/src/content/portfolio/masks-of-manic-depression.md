---
title: Masks of Manic-Depression
description: An explorative digital sculpture of the manic and depressive emotions experienced by a person with bipolar disorder
slug: /portfolio/masks-of-manic-depression
collaborators: []
class: Hypercinema
date: 2022-12-08T23:09:15.000Z
preview: /optimized/portfolio/masks-of-manic-depression/mania.png
cover: /optimized/portfolio/masks-of-manic-depression/depression.png
og_preview: /optimized/portfolio/masks-of-manic-depression/depression.png
draft: false
url: ""
technologies:
  - Autodesk Fusion 360
  - Unreal Engine v5
  - Google Tilt Brush
tags:
  - CAD
categories:
  - ITP
type: portfolioPiece
thumbnail_width: 1
thumbnail_height: 1
piece_type:
  - journal
---

![Video of the experience in the Unreal](/optimized/portfolio/masks-of-manic-depression/play_tour.mp4)

Let’s get personal for a hot second here.

In 2020, I got diagnosed with bipolar disorder.

The diagnosis came after 13 years of therapy and 4 other diagnoses. I’ve experienced just under a dozen different types of therapies, and I’ve written quite a few articles on mental health and therapy since my diagnosis.

I decided to creatively explore how one can express the feelings of both a manic high and a depressive low!

## Concept

In theater, there’s the common happy/sad, comedy/tragedy Dionysus masks. I thought that would be a good analogy for what I wanted to portray.

In trauma therapy, there’s not only the concepts of mania and depression, but there’s also the concept of hyperarousal and hypoarousal in trauma states. This is called The Window of Tolerance.

In the Window of Tolerance model, people go from high energy anxiety (hyperarousal) to low energy lethargy (hypoarousal). The ideal is to stay in the “window of tolerance” inbetween.

I also have complex PTSD, so I’m intimately familiar with this model as well as manic depression.

![Untitled](/optimized/portfolio/masks-of-manic-depression/Untitled.png)

People with rapid cycling bipolar disorder or suffering from extreme trauma state switching have a narrow band for their Window of Tolerance. They also have a problem in finding and identifying Self within the swings.

The original idea I had was to have the viewer spawn within a double mask, to play the “inner self” that was trapped between mania and depression, hyper- and hypo-arousal. From this trapped place, they could only see the world through the eyes and mouths of either side, but didn’t have a face of its own to see the world as it is, grounded in reality.

![Untitled](/optimized/portfolio/masks-of-manic-depression/Untitled%201.png)

I thought there could also be a bright amorphous shape, animated in the center, to represent our wise Self. Or the player is that blob. Unsure!  

## Making the masks

So first off, the masks. I could not for the life of me find an existing asset so I decided to make my own.

![makehead.mov](/optimized/portfolio/masks-of-manic-depression/makehead.mp4)

I haven’t used 3D modeling tools like Blender or Maya for over a decade, but I did tech myself CAD for 3D printing purposes in 2020. So I just used that.

## Pivoting

When I imported ttskethe mask object I made into Unreal Engine, it would not let me spawn the player inside. It would not recognize the geometry for collision and upon moving, the player would just fall through the bottom of the mask.

I tried creating a little platform for the player, I tried enclosing them in an invisible box, I tried flipping the normals of the object, nothing worked. 

So I had to pivot.

I then decided to make it more of a sculpture that a person could explore through space.

## Finding Assets & Composition

### Mania

I wanted the mania feeling to invoke whimsy and joy, and be very colorful. When I’m in a hypomania, I feel like the world has more color and vibrancy. I also have an anxious, fast paced brain that is easily distracted.

When I first played with my roommate’s Oculus Quest, I played something called [TiltBrush](https://www.tiltbrush.com/). It’s a 
”game” by Google that allows you to use your VR controllers to paint in the air. You can even export your creations into `.fbx` and `.obj` files!

It really gives you a really organic, sketch-like feeling that’s rare to find in a 3D asset.
 
![A demo of TiltBrush](/optimized/portfolio/masks-of-manic-depression/GlaringImprobableAurochs-mobile.mp4)

![Some fun faces drawn in TiltBrush](/optimized/portfolio/masks-of-manic-depression/ImmaculateHastyGreyhounddog-mobile.mp4)

I felt like loose brush strokes made with TiltBrush would be perfect to represent a racing, chaotic mind.

I looked for things like this to take apart into its separate components:

![Untitled](/optimized/portfolio/masks-of-manic-depression/Untitled%202.png)

![Untitled](/optimized/portfolio/masks-of-manic-depression/Untitled%203.png)

### Depression

The feeling I get in depression is…well it’s devoid of feeling. It feels like your very life force is being swallowed into a black hole. Once in the black hole, it’s hard to get out.

Since blackholes don’t actually look like they do in the movies, I looked up “vortexes” and “wormholes” on SketchFab and found a cool one. 

I then went back to TiltBrush files to find large ribbons to have the vortex end into. I wanted the ribbons to look like an absolute mess of emotions behind a seemingly bottomless pit. Once you get sucked into it, you can’t escape the mess of trauma and emotions.

### Lighting

Originally, I wanted the sky to split in half, with the Mania side being blue skies and fluffy clouds, and the depression side to be deep, dark space. 

I couldn’t figure out how to do that, so I just made it completely black.

Doing so actually created an opportunity to play with lighting more.

The Mania side had a lot of light emanating from the chaos confetti, shining onto the Mania face. It’s supposed to represent how Mania feeds off of and is enlivened by its environment. 

The Depression side had light coming from within the mask, which is quickly dissipated by the darkness of the black hole. You may exude some form of energy, but Depression swallows it right up.

### Player Start

There originally was no plane on which the player can spawn, and I wasn’t sure how to make it possible for the player to float in space without using blueprints or writing code. 

I learned from Alexandra that her room wasn’t respecting collision very well, and she suggested I make a platform in the middle of the space. From there, the player can step off into space and fly around. She was right! That worked! What a hack.

## Final piece

Exploring the sculpture in the Unreal Engine editor:

![Video of the experience in the Unreal Editor](/optimized/portfolio/masks-of-manic-depression/editing_tour.mp4)

If I were to continue to work on this, I would love to still have an inner self represented within the masks, and would love there to be animation. Would love to have the vortex spinning and the chaos confetti lightly exploding onto the Mania mask.

---

*If you are interested, I've written about my experience with my diagnosis, symptomology, and learnings with therapy:*

[https://medium.com/invisible-illness/bipolar-disorder-trauma-and-love-9d107e66b6e9](https://medium.com/invisible-illness/bipolar-disorder-trauma-and-love-9d107e66b6e9)

[https://medium.com/invisible-illness/the-real-reasons-you-may-not-be-seeing-progress-in-therapy-aa85d2d8d95d](https://medium.com/invisible-illness/the-real-reasons-you-may-not-be-seeing-progress-in-therapy-aa85d2d8d95d)