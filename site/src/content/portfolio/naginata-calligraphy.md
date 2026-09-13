---
piece_type:
    - journal
title: Naginata Calligraphy
description: Using a Kinect to track the blade of a naginata through the air and paint its path as Japanese calligraphy. It did not work, and the reasons why were the interesting part.
slug: /portfolio/naginata-calligraphy
collaborators: []
class: ""
date: 2023-12-12T20:51:25.000Z
preview: /optimized/portfolio/naginata-calligraphy/cover.webp
thumbnail_width: 2
thumbnail_height: 1
cover: /optimized/portfolio/naginata-calligraphy/cover.webp
og_preview: /optimized/portfolio/naginata-calligraphy/cover.webp
draft: false
url: https://github.com/karomancer/nagiCalligraphy
technologies:
    - OpenFrameworks
    - C++
    - OpenCV
    - Kinect V2
tags:
    - creative coding
    - computer vision
categories:
    - Personal Project
type: portfolioPiece
---

![A classmate in a brown shirt and beanie swinging a naginata in front of a black curtain in the lab, the Kinect mounted on a cart beside them and a laptop on the desk showing the black brushstrokes their swings are painting.](/optimized/portfolio/naginata-calligraphy/user-testing.webm)

That's a classmate who had never seen a naginata before, let loose with one in the lab while the sketch painted along behind them!

## What is naginata?

A naginata is a Japanese glaive: a curved blade on the end of a long shaft. The modern martial art built around it is called *atarashii naginata*, and it's the one I practice!

What makes it different from most Japanese martial arts is reach. A naginata is taller than you are. So the whole art is built around sweeping circular movement, switching which end is forward, and controlling a very long lever. It's also the only one of these arts where *sune*, the shin, is a legal target. That tells you how low and how wide the movement goes.

Big, fast, curved paths carved through the air. I really wanted to see the shape of that.

| | |
| -- | -- |
| ![Two practitioners in keikogi and hakama demonstrating on stage at the Northern California Cherry Blossom Festival, naginata extended and crossing between them, an audience watching from below.](/optimized/portfolio/naginata-calligraphy/demo-festival.webp) | ![A single practitioner in keikogi and hakama mid-demonstration on the Cherry Blossom Festival stage, naginata raised diagonally overhead, the pink festival banner filling the frame behind them.](/optimized/portfolio/naginata-calligraphy/demo-solo.webp) |

![Two practitioners in full bogu facing off on a competition court, one dropped low and one stepping through, their naginata crossing in a wide X between them.](/optimized/portfolio/naginata-calligraphy/sparring.webp)

## The idea

Naginata movement already looks like brushwork to me. A strike is one continuous stroke with a beginning, a direction, and a follow-through. The good ones have the same quality as a good brushstroke: committed, and over before you can second-guess it.

So what if you could actually see it? Track the blade through the air, and paint its path as Japanese calligraphy!

## The rig

I wrapped reflective tape over the *sendanmaki*, the binding at the point where the blade is attached to the pole, and pointed a Kinect V2 at the dojo.

![A labelled diagram of a naginata, 2.10 to 2.25m long end to end, naming its parts: kissaki, mini, sori, shinogi, monouchi, ha and ha-bu along the 50cm curved blade, the sendanmaki tape binding over the 15cm join, the e-bu shaft, and the ishizuki buttcap.](/optimized/portfolio/naginata-calligraphy/naginata-parts.webp)

The Kinect's infrared camera is what made this plausible. It brings its own IR floodlight, so anything retroreflective comes screaming back much brighter than everything else in the room. It doesn't matter at all what the house lights are doing. That turns "find the blade" into "find the brightest pixels," which is a MUCH easier problem!

Thresholding the IR image is the entire detection step:

```cpp
for (int y = 0; y < irPixels.getHeight(); y++) {
    for (int x = 0; x < irPixels.getWidth(); x++) {
        float ir = irPixels.getColor(x, y).r;
        blobPixels.setColor(x, y, ir > minIR ? ofColor::white : ofColor::black);
    }
}
```

Everything brighter than the threshold is the tape. Everything else is the dojo.

At school I could get the angle I actually wanted:

| | |
| -- | -- |
| ![A phone pan up to a Kinect on an articulated arm clamped to the exposed ceiling pipes of the school studio, pointed straight down, then back down to a laptop on the worktable below running the sketch.](/optimized/portfolio/naginata-calligraphy/kinect-mount.mp4) | The Kinect went up on an articulated arm clamped to the ceiling pipes, pointed straight down at the floor, with the sketch running on a laptop underneath. Top-down is the right view for this! The stroke is a shape drawn in the air, and from overhead you see the whole shape instead of a foreshortened version of it. |

## Everything I tried
I went through a lot of methods and largely hit dead ends:
* **Contour finding with no lerping led to a precise brush but without continuity.** It looked rather like someone grabbed a wide, dry brush and just tapped it on the screen instead of doing full strokes.
* **Contour finding with lerping per point between previous and current** looked a lot more calligraphy like, but there was some artifacting. Because the naginata can move so quickly, it would lose track of it and sputter identifying other objects in between as the naginata, creating uneven brushstrokes.
* **Countour finding, but instead of just filling the contour with black drawing a circle and lerping, then trying to keep track of which objects were which to do two naginata.** The problem here is that just a circular brush looks less Japanese and more like an Etch-a-Sketch. That and if the naginata cross (which they often do), it would lose track of which was which.
* **Only paint what IR camera sees, no contour finding or lerping**. More accurate and bolder stamps, but it doesn't read as a brush stroke and once again looks like individual stamps.

![A screen recording running through every version of the sketch, in a four-up debug view showing the Kinect RGB feed, the IR feed, the masked contours, and the painted canvas. Footage moves between an apartment and a dojo, with practitioners in hakama swinging naginata, and captions labelling each approach.](/optimized/portfolio/naginata-calligraphy/struggle-compilation.mp4)

The through-line in all of them is the brush. Painting exactly what the IR camera sees gives you a hard-edged smear that reads like a scanner artifact, not a brushstroke. Drawing a circle per bright pixel gives you a splatter the second anything moves fast. So most of the work went into what happens *between* two frames, trying to turn two positions into one continuous stroke:

```cpp
ofPolyline ofApp::lerpPolyline(ofPolyline poly1, ofPolyline poly2) {
    ofPolyline lerpedPoly;

    for (int i = 0; i < poly1.getVertices().size(); i++) {
        ofPoint v1 = poly1.getVertices()[i];
        ofPoint v2 = poly2.getVertices()[i];
        lerpedPoly.addVertex(ofLerp(v1.x, v2.x, 0.05), ofLerp(v1.y, v2.y, 0.05));
    }

    return lerpedPoly;
}
```

That interpolation is doing a lot of work, and a naginata swing is exactly the case it can't cover.

## Why it fell apart

Well, this project fell apart this time around due to the limitations of the Kinect, my inability to mount on the ceiling in the dojo, and the general movements of Naginata.

Three problems, and they compound.

1. **The movement is too fast and too varied.** The Kinect V2 runs at 30fps. A naginata strike covers an enormous arc in a fraction of a second! Between two frames the blade has moved a long way and rotated into an orientation the tracker has never seen. Contour finding kept losing the object and re-acquiring it as a brand new one. That's why so many attempts ended up tracking IDs in a map and assigning colors, just so I could see what was being confused with what.
2. **I couldn't mount the Kinect overhead in the dojo.** The stroke I want to capture is a shape in three dimensions, and from the floor you're watching it nearly edge-on. But the school's ceiling pipes are one thing, and the dojo is not mine to drill holes into! Least technical constraint, most fatal.
3. **Naginata is not a solo activity.** Sparring puts two people, two long weapons, and a lot of overlap in frame.

## Where it stands

I never got it the way I wanted, but it was a fun exploratory process that I learned a lot in! I'm hoping to get back to it and back into the dojo and see this through.

[embed](https://github.com/karomancer/nagiCalligraphy)
