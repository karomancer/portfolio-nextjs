---
piece_type:
    - journal
title: OpenFrameworks Experiments
description: A series of experiments in C++ with OpenFrameworks, working up from cellular automata to computer vision, depth sensing, and driving a Unity game with my body.
slug: /portfolio/openframeworks-experiments
collaborators: []
class: Seeing Machines
date: 2023-11-28T06:27:00.000Z
preview: /optimized/portfolio/openframeworks-experiments/cover.webp
thumbnail_width: 2
thumbnail_height: 1
cover: /optimized/portfolio/openframeworks-experiments/cover.webp
og_preview: /optimized/portfolio/openframeworks-experiments/cover.webp
draft: false
url: https://github.com/karomancer?tab=repositories
technologies:
    - OpenFrameworks
    - C++
    - OpenCV
    - Kinect V2
    - Unity
    - OSC
tags:
    - creative coding
    - computer vision
    - game programming
categories:
    - ITP
type: portfolioPiece
---

![A still from the Warhol lip popart sketch: the webcam feed tiled into four quadrants of flat yellow, magenta, purple and green, with a live camera view of the maker in the center.](/optimized/portfolio/openframeworks-experiments/cover.webp)

A semester of homework for **Seeing Machines** at ITP, all written in C++ with [OpenFrameworks](https://openframeworks.cc/). I studied computer science and have spent my career on the web, so dropping into C++ and a creative coding framework meant relearning a lot of things I thought I knew.

These are in the order I built them, which is also roughly the order of how much they could see.

## Karina's Game of Life

> Was implementing Conway's Game of Life in C++ (with OpenFrameworks) and messed up one line of code and got this.
>
> You know what? Not even mad, this is pretty neat.
>
> Chow down on dead pixels with Chow's Game of Life

![A video of the buggy Game of Life, where the one wrong line turns the grid into a spreading, chewing pattern instead of Conway's rules.](/optimized/portfolio/openframeworks-experiments/gol-bug.mp4)

The bug came first, which feels like the correct order for this class.

> Did Conway's Game of Life in OpenFrameworks (C++).
>
> Decided to go above and beyond and add some little controls too. This was fun stuff :)

![A video of the finished Game of Life running with an ofxGui control panel, showing play and pause, a reset, and sliders for pixel size and speed.](/optimized/portfolio/openframeworks-experiments/gol-controls.mp4)

The "little controls" are an `ofxGui` panel: a play/pause toggle, a reset button, and sliders for pixel size and speed. Pixel size is the interesting one, because it changes the resolution of the board itself rather than just zooming, so the same rules play out at a completely different grain.

Then came the part that turns it into a Seeing Machines project instead of a computer science exercise:

> You asked and thus you shall receive!
>
> Taking a photo with your webcam as the seed for Conway's Game of Life.

![A video of the webcam-seeded Game of Life: a photo is captured, thresholded into black and white, and then immediately begins evolving under Conway's rules.](/optimized/portfolio/openframeworks-experiments/gol-webcam-seed.mp4)

Instead of seeding the board randomly, it grabs a frame from an `ofVideoGrabber` and thresholds it. Every pixel brighter than 140 becomes a live cell, everything darker becomes a dead one, and then Conway takes over. Your face is the initial condition.

[embed](https://github.com/karomancer/karinasGameOfLife)

## Kinect Depth Dots

> Don't mind me...just messing around with depth sensing data from a Kinect V2 with OpenFrameworks (C++).
>
> Pretty basic stuff to start, but hopefully gaining familiarity will give inspiration for cool projects later

![A video of the depth dot sketch: a grid of colored dots sized by distance, rendering the maker's silhouette in magenta and purple as she moves in front of the Kinect.](/optimized/portfolio/openframeworks-experiments/kinect-depth-dots.mp4)

The Kinect V2 hands you a depth image, where each pixel is a distance rather than a color. This sketch samples that image on a grid and draws a dot per sample, using depth to drive size and color, so you get a person made of dots that swell as they lean in.

The `ofxGui` panel exposes near and far clipping planes, the anchor depth everything is measured against, and separate horizontal and vertical density so you can go from a fine mist of dots to a chunky halftone. There are also two toggles in the code named `colorRaveParty` and `addTheJitters`, which do about what you would expect.

![A still frame from the depth dot sketch, showing the dot-cloud silhouette in magenta and purple against white with the settings panel in the corner.](/optimized/portfolio/openframeworks-experiments/depth-dots-still.webp)

[embed](https://github.com/karomancer/kinectDepthDots)

## Warhol Lip Popart

> Playing with the OpenCV addon in OpenFrameworks (C++). Using Haar cascade to find the viewer's mouth from the webcam to make Andy Warhol-inspired popart. Fun stuff :)

![A video of the popart sketch: the webcam feed tiled into four color quadrants, with the detected mouth tracked and painted in as the maker moves and talks.](/optimized/portfolio/openframeworks-experiments/warhol-lip-popart.mp4)

This one uses `ofxCv` and runs two Haar cascades in sequence. First `haarcascade_frontalface_default.xml` finds the biggest face in frame. Then, instead of hunting for a mouth across the whole image, it crops to the bottom 35% of that face rectangle and runs `haarcascade_mcs_mouth.xml` only inside it. Narrowing the search that way is both faster and much less prone to finding a "mouth" in someone's hairline.

My own comment at the top of the detector class is the honest documentation here:

> single-person smile strength detector
>
> not robust against rotation

Which is true of Haar cascades generally. They are trained on upright, front-facing examples, so tilt your head and the whole thing gives up.

[embed](https://github.com/karomancer/warholLipPopart)

## Kinect to Unity over OSC

> That project I was working on this weekend took a turn!
>
> Using the Kinect to get depth data, detecting blobs with OpenCV, deciphering movements, and then sending data with OSC to the Endless Runner example from the Unity Asset store.
>
> It's feeling like 2011 up in my apartment

![A video of the maker standing in her apartment in front of a Kinect, jumping and stepping side to side to control an endless runner game on the monitor behind her.](/optimized/portfolio/openframeworks-experiments/kinect-unity-osc.mp4)

This is the one where everything gets stacked. The Kinect provides depth, `ofxCv`'s `ContourFinder` pulls blobs out of the depth image, and an `ofxCv::RectTracker` gives each blob a stable label across frames so a person stays the same person. The screen is divided into lanes, and the tracked blob's center decides which lane you are standing in.

Jumping and sliding are read from how long the blob's bounding box moves past a threshold, with a debounce interval so one jump doesn't fire twenty messages. All of it goes out over OSC to `localhost:1337`, where Unity's Endless Runner sample is listening.

The settings panel ended up with four groups: Kinect clipping, contour finder area and persistence, player movement thresholds, and toggles for which messages to send. Most of the work in a project like this turns out to be tuning, not writing.

[embed](https://github.com/karomancer/OFKinectToUnityOSC)

The "feeling like 2011" line is doing a lot of work. This is genuinely the Kinect hacking era stack, just with fifteen years of hindsight and much better libraries.
