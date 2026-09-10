---
piece_type:
    - journal
title: Lipstick Applicator for Clowns On-The-Go
description: An absurd phone add-on that swings a lipstick across your mouth on a pendulum, powered by the phone it clamps to.
slug: /portfolio/clown-lipstick-applicator
collaborators: []
class: Designing the Absurd
date: 2023-09-30T07:32:18.000Z
preview: /optimized/portfolio/clown-lipstick-applicator/cover.webp
thumbnail_width: 2
thumbnail_height: 1
cover: /optimized/portfolio/clown-lipstick-applicator/cover.webp
og_preview: /optimized/portfolio/clown-lipstick-applicator/cover.webp
draft: false
url: ""
technologies:
    - Autodesk Fusion 360
    - FDM 3D Printer
    - Laser Cutter
    - USB On-The-Go
tags:
    - fabrication
    - CAD
    - 3D printing
    - pcomp
categories:
    - ITP
type: portfolioPiece
---

| |
| -- |
| ![A video demonstrating the finished device: a black frame suction-cupped to a glass partition with a phone clamped in it, a lipstick swinging across on a pendulum arm and painting the maker's lips, with red lipstick test marks all over the glass behind.](/optimized/portfolio/clown-lipstick-applicator/final-demo.mp4) |

## The prompt

"Make an absurd phone add-on" the professor said.

So I made a lipstick applicator for clowns on-the-go in the subway/in an Uber/etc.

(this is why I was up so late so often the last week)

This was for Designing the Absurd, the same class that later gave me the [Floordozer](/portfolio/floordozer) and the [Ice Bucket Diffuser](/portfolio/ice-bucket-diffuser). Here's the process of making it if you're interested!

## Finding the form

### Prototyping with what was around

First we wanted to figure out the best form factor. We were thinking harmonica holder, helmet, or phone case.

We prototyped with things around us to get a sense of scale and comfort. Helmet inspired by our friend's project.

| | | |
| -- | -- | -- |
| ![Someone holding a harmonica-holder style rig up to their mouth in the studio to test the position.](/optimized/portfolio/clown-lipstick-applicator/prototype-harmonica-holder.webp) | ![A wigged mannequin head sitting on a studio table, used as a stand-in for testing face position.](/optimized/portfolio/clown-lipstick-applicator/mannequin-head.webp) | ![A classmate outdoors wearing a colorful knitted hat rigged with a phone mount and armature.](/optimized/portfolio/clown-lipstick-applicator/friend-helmet.webp) |

The best feedback we got with these early ideas was:

> "You should really ask yourself if the phone is an add-on to your device, or if the device is an add-on to your phone"

A helmet felt more like the phone is an add-on to it, so we went with the phone case idea!

### The pendulum

We were going to have the lipstick on a conveyor belt go in an oval around the mouth, but we realized that it made more sense for it to be on a pendulum.

Then, you get a smile shape AND it's more reminiscent of a clock, time being an important aspect of being a clown on-the-go!

## The mechanism

### Movement #100

We had a very small DC motor and decided to look up mechanisms that translate circular movements into swinging, pendulum motions.

Enter [Movement #100](https://507movements.com/mm_100.html) from 507 Movements!

[507 Movements](https://507movements.com/) is a website that animates every mechanism in *Five Hundred and Seven Mechanical Movements*, a catalog Henry T. Brown published back in 1868. It is an absolutely incredible resource: cams, ratchets, escapements, linkages, all the ways humans have figured out how to turn one kind of motion into another. Number 100 is listed as "quick return crank motion, applicable to shaping machines," which is a very industrial way of describing a lipstick that boops you in the face.

| |
| -- |
| ![A screen recording of the 507 Movements website showing Movement 100, a crank and slotted arm animating a quick return motion.](/optimized/portfolio/clown-lipstick-applicator/movement-100.mp4) |

### Paper prototyping

I studied computer science and human-computer interaction and have had a career entirely on a computer, so I wasn't that familiar with building mechanisms.

So it was time to paper prototype this mechanism! Let the late nights begin...

Which, to be fair, had already begun a week earlier:

| |
| -- |
| ![A video of hands working a cardboard version of the crank and slotted arm mechanism taped down to a board, the arm swinging back and forth as the disc turns.](/optimized/portfolio/clown-lipstick-applicator/cardboard-mechanism-1am.mp4) |

> It's week 3 of the semester and I'm on campus at 1:45am working on making motorized mechanisms out of cardboard.
>
> What am I doing with my life?

### Scale and positioning

Now that we understood the mechanism, we had to understand the scale and positioning.

How large should the mechanism be? How far is the person's face from the phone? What angle does the phone have to be? How do we get the lipstick in there?

So many questions! More prototyping!

| |
| -- |
| ![A video in the studio of the maker holding a phone up at different distances and angles from her face to work out where the mechanism needs to sit.](/optimized/portfolio/clown-lipstick-applicator/positioning-tests.mp4) |

### Sketches to cardboard

Once we'd established the positioning and general scale, we had to establish the form!

Sketched some things and translated to cardboard.

Because it would hang with suction cups onto glass and we wanted the pendulum to be visible, making it a hollow frame made the most sense.

| | | |
| -- | -- | -- |
| ![A hand holding a flat cardboard mockup with a long slot cut for the pendulum arm, next to a phone for scale.](/optimized/portfolio/clown-lipstick-applicator/cardboard-pendulum-slot.webp) | ![A page of pen sketches working out the hollow frame, drawn from a few angles with the pendulum arm inside.](/optimized/portfolio/clown-lipstick-applicator/frame-sketches.webp) | ![A hand holding the cardboard hollow frame prototype up in the studio, with the slot and shelf visible.](/optimized/portfolio/clown-lipstick-applicator/cardboard-frame.webp) |

## Power

Before we could even move on, we needed to figure out how to power the motor with the phone!

In order to have a phone act as host and provide power, you have to ensure the cable you get supports the [USB On-The-Go](https://en.wikipedia.org/wiki/USB_On-The-Go) specification.

Normally your phone is the peripheral. You plug it into a laptop and the laptop is the one in charge, providing the power and deciding what's going on. OTG flips that, letting the phone act as host and supply power to whatever you plug into it. The catch is that the cable has to declare it, so an OTG adapter isn't just wires passing straight through.

Naturally, I bought a bunch of USB Type Cs with breakout boards.

Stupidly, some of the ones I bought were sockets/female, so unusable for this, and the rest did not support the OTG spec.

Efffff.

Well, time to take apart one of my adapters that I know does and use that!

| | |
| -- | -- |
| ![A product photo of two grey USB-C to USB-A adapters.](/optimized/portfolio/clown-lipstick-applicator/usb-adapters.webp) | ![The sacrificed adapter taken apart on a white surface: the metal shell, the plastic housing, and the small green circuit board with the USB-C connector still attached.](/optimized/portfolio/clown-lipstick-applicator/adapter-teardown.webp) |

## CAD and printing

### Round one

Once I extracted what I needed from my USB adapter (rip) and soldered on the wires I needed (just VCC and GND for this), I turned my eyes to modeling in CAD with the intention of using 3D printing and laser cutting for our final prototype.

Round one of modeling here we go!

| |
| -- |
| ![A screen recording of Autodesk Fusion 360 sketching and extruding the first version of the frame.](/optimized/portfolio/clown-lipstick-applicator/cad-round-one.mp4) |

Don't judge me too hard, but the first frame was printed in one go instead of parts. I didn't want to spend the time to figure out how everything fits together and did the print overnight to just get the sense of sizing, weight, etc.

Cut the center shelf with clear acrylic.

| | | |
| -- | -- | -- |
| ![The black frame partway through printing on the bed of an FDM printer.](/optimized/portfolio/clown-lipstick-applicator/printing-frame.webp) | ![A hand holding the printed black frame piece with thin wires threaded through it, laptop on the desk behind.](/optimized/portfolio/clown-lipstick-applicator/printed-frame-part.webp) | ![The printed frame held up with a phone clamped into it in the studio, wires trailing down to the desk.](/optimized/portfolio/clown-lipstick-applicator/frame-on-phone.webp) |

This was all done without knowing yet where to put the motor or exactly where the shelf for the pendulum should be.

Now with it physically in our hand with a fast and messy print, we could figure that stuff out.

| | |
| -- | -- |
| ![The black frame held over a wooden floor with the pendulum arm and lipstick mounted inside it.](/optimized/portfolio/clown-lipstick-applicator/pendulum-in-frame.webp) | ![A hand holding the frame with a white circular disc positioned inside it, working out where the motor should mount.](/optimized/portfolio/clown-lipstick-applicator/motor-placement.webp) |

### Motor clearance

The other annoying thing was that it turned out the motor needed quite a bit of clearance, because the back rotates as well as the spindle. You can't simply just mount it as-is to the back of the frame.

With that new information, back to CAD we went!

| |
| -- |
| ![A screen recording of Fusion 360 modeling the revised motor housing with clearance around the rotating body.](/optimized/portfolio/clown-lipstick-applicator/motor-clearance-cad.mp4) |

NGL the motor and suction cup mounts look pretty goooodddd!

Also, always nice to hide some wires!

| | |
| -- | -- |
| ![A close-up of the printed motor mount seated in the frame, wires tucked out of sight.](/optimized/portfolio/clown-lipstick-applicator/motor-mount.webp) | ![The suction cup mount stuck to a glass partition covered in red lipstick test marks, wires running from the motor.](/optimized/portfolio/clown-lipstick-applicator/suction-mount-glass.webp) |

### Printing in parts

Finally! Time to model and print in parts!

The sides have a slot for the backing and top, and the front clamps around the sides. The USB hub has a cavity for the wires and a hole to pass the wires to the motor. Not bad for 6am sleep deprived Karina!

| |
| -- |
| ![A screen recording of Fusion 360 showing the final assembly modeled as separate printable parts, with the frame, backing and USB housing fitting together.](/optimized/portfolio/clown-lipstick-applicator/cad-in-parts.mp4) |

## The final

That's pretty much it!

It was originally going to have a switch to turn on, but the parts got lost in the mail (hence the exposed wires).

There's things I would do differently with the design, but overall I'm happy with it! Definitely a fun and absurd project!

| | | |
| -- | -- | -- |
| ![A person in the studio holding the lipstick tube up, classmates working at desks in the background.](/optimized/portfolio/clown-lipstick-applicator/final-lipstick.webp) | ![Classmates gathered around the finished device in the studio, taking turns trying it out.](/optimized/portfolio/clown-lipstick-applicator/classmates-testing.webp) | ![The finished frame suction-cupped to a glass partition with the phone clamped in and the lipstick arm extended, red test marks on the glass and "S = 5.5" written above.](/optimized/portfolio/clown-lipstick-applicator/final-mounted.webp) |

My classmates had to rate how absurd the project was.

Part of the purpose of the project was to engage in "absurd thinking".

Damn. Next time, I apparently have to "think" more absurdly!

| |
| -- |
| ![A paper diamond chart with THINKING, FORM, INTERACTION and FUNCTION at the four points, scattered with colored dot stickers from classmates rating the project, labelled "CLOWN ON-THE-GO" in the corner.](/optimized/portfolio/clown-lipstick-applicator/absurdity-ratings.webp) |

The chart has four corners: thinking, form, interaction, and function. Everyone got dots to place, and the cluster came out low and to the left, closer to function than to thinking. Which is a very polite way of being told that your lipstick catapult was, if anything, a little too reasonable.
