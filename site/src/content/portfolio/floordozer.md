---
piece_type:
    - journal
title: Floordozer Chindogu
description: A Chindogu activated by a pillow remote control that pushes through piles of clothes on the floor to clear a walking path from your bed.
slug: /portfolio/floordozer
collaborators:
    - "[Sam De Armas](https://www.samdearmas.com/)"
class: Designing the Absurd
date: 2023-10-24T05:52:29.000Z
preview: /portfolio/floordozer/cover2.jpg
thumbnail_width: 2
thumbnail_height: 1
cover: /portfolio/floordozer/final_box1.jpg
og_preview: /portfolio/floordozer/cover2.jpg
draft: false
url: ""
technologies:
    - Arduino Nano 33 IoT
    - Shark Euro Pro X (Sewing Machine)
tags:
    - pcomp
    - sewing
categories:
    - ITP
type: portfolioPiece
---

![A video demonstrating a motorized drawer coming out of a box to push clothes off a table after a cylindrical pillow is pushed.](/optimized/portfolio/floordozer/push3.mp4)

| |
| -- |
| ![A short portrait video showing a picture of a very messy room captioned "Does your room like this? Try the floordozer!" and then a demonstration of a drawer pushing clothes away from a table after a button on a pillow is pressed.](/optimized/portfolio/floordozer/floordozer_short.mp4) |


## What is a Chindogu?
A [Chindogu](https://chindogu.com/ics/?page_id=773) is an "unusual tool" that solves an every day problem most can relate to but often creates more problems while doing so. [Kenji Kawakami](https://en.wikipedia.org/wiki/Kenji_Kawakami) coined the term in Japan in the '80s and '90s and created a skymall style magazine of user submitted chindogu.

![3 photographs: one depicting high heels with tiny umbrellas affixed to the toes, one with a fan attached to chopsticks holding hot noodles, and one with a butter dispenser that resembles chapstick](/portfolio/floordozer/chindogu3.jpeg)
![A magazine cover that says "Unuseless Japanese Inventions" with a picture of a person eating ramen with a splash guard that looks like flower around their face.](/portfolio/floordozer/chindogu1.png)
![A photograph of a woman asleep in a train with a helmet and suction cup stuck to the window behind her, keeping her head from straying forward](/portfolio/floordozer/chindogu2.png)

To be considered a chindogu, an item must possess the following 10 characteristics:

1. **Chindogu cannot be for real use.** The spirit of chindogu is to be "unuseless", neither useful nor useless. If you end up using your invention on the regular, you have failed.
2. **Chindogu must exist.** Sketches and concept art are not enough! You have to be able to hold it in your hand and think ‘I can actually imagine someone using this. Almost.’ In order to be useless, it must first be."
3. **Chindogu must embody the spirit of anarchy.** Without the confines of usefulness, they freely challenge the suffocating historical dominance of conservative utility or cultural expectations.
4. **Chindogu is a tool for everyday life.** Everyone everywhere must be able to understand how it works without any special technical or professional background info. As such, they should communicate their purpose upon first glance without requiring extra explanation.
5. **Chindogu are not for sale.** Chindogu are not tradable commodities. If you accept money for one you surrender your purity. They must not even be sold as a joke" Finally, something in your life that you just can't turn into a side hustle! 
6. **Chindogu arecreated primarily to solve a problem, not make a joke.** Humor is simply the by-product of finding an elaborate or unconventional solution to a problem that may not have been that pressing to begin with. Roll with it. 
7. **Chindogu are not propaganda.** They are innocent. They are made to be used, even though they cannot be used. They should not be created as a perverse or ironic comment on the sorry state of mankind. 
8. **Chindogu are never taboo.** The International Chindogu Society has established certain standards of social decency. Cheap sexual innuendo, humor of a vulgar nature, and sick or cruel jokes that debase the sanctity of living things are not allowed. 
9. **Chindogu cannot be patented.** Chindogu are offerings to the rest of the world – they are not therefore ideas to be copyrighted, patented, collected and owned. Consider chindogu to be open source. They're meant to be shared and delighted in, not owned and collected. 
10. **Chindogu are without prejudice.** Chindogu must never favor one race or religion over another. Everyone should have a free and equal chance to enjoy each and every Chindogu. These inventions should be equally (almost) useless to everyone who sees them. 

## Brainstorming
Funnily, my roommate and I were continuously complaining about how messy our floors were in our room. We found our problem!

Solution? An underbed drawer that pushes clutter out of the way of your feet when you depress a button on a pillow so you can get out of bed. Sketch time!

Code name: **Floordozer**.

We thought since it's kind of like a bulldozer, we'd theme it after one with the yellow and black coloring and use similar shapes. We wanted a cohesive theme in color between the pillow and the box, but wanted them to be distinct in shape. The pillow's button we decided to have the shape of the box on it, hopefully to make it more apparent that that is what will be controlled when pressed.

![The image shows a sketchbook page filled with various hand-drawn designs and annotations. The sketches depict different shapes and features, primarily in black and yellow, labeled with letters (A to J) and numbers (1 to 10). The designs appear to focus on buttons, edges, and other functional elements, with notes such as "button," "pillow," "edge," and "no edge." There are also questions written in the margins, such as "perfectly min???" and "button? like thread?" The overall layout suggests a brainstorming session for product design or concept development.](/portfolio/floordozer/sketches.jpeg)

Here's some inspiration shots from my [Pinterest board](https://www.pinterest.com/karinachowtime/floordozer/).

## Cardboard prototyping

We tried a lot of different mechanisms for the "drawer" itself, from linear actuators to scissor lifts. Somehow, I never previously thought of using cardboard layers as teeth!

![A video depicting a box with gears made entirely of cardboard sliding a layer in and out like a drawer.](/optimized/portfolio/floordozer/cardboard_drawer.mp4)

## Experiments in Radio Frequency and Gears

My partner, Sam, has a degree in sculpture and used to manage a shop, so we decided it would be best for her to focus on fabricating the pusher box and mechanical movements, and it would be best for me to focus on the electronics. Also because I have some experience with sewing, I would take point on fabricating the pillow.

With the help of [@encrypted_past](https://x.com/encrypted_past) on Twitter, I was able to make a basic functional test of using RF for our remote! RF seemed like a better solution given that IR requires a line-of-sight and many other solutions are a lot clunkier.

![The image shows a close-up of a breadboard setup for an electronic project. It features two push buttons on the left side, connected with various colored wires. A small microcontroller board is positioned in the center, with multiple wires extending from it. To the right, there is a red circuit board with two adjustable knobs and an LED indicator. Below the breadboard, a small motor is visible, connected by wires. The background is a dark surface, emphasizing the components of the circuit.](/portfolio/floordozer/breadboard.jpg)

While I was working on the radio remote, my partner Sam was working on fabricating the box. Fitting the motor into the box and ensuring it can turn the gears as we planned.

At some point, we finally came together and tested our two pieces as one unit.

![A video showing two women working together to build a box and get a motor to respond to a garage door opener.](/optimized/portfolio/floordozer/fabprocess.mp4)

After playing around with building my own custom Radio Frequency transmitter, I kept getting the math wrong for getting the right frequency. So, I ended up buying a programmable garage door opener, which is much more compact and better built, and decided to reverse engineer that instead.

## Making the Pillow

While my roommate worked on getting the motor to fit into the box, I brushed off my sewing machine and started to fabricate the pillow!

### Fabrication

We wanted the pillow to be cylindrical, but I couldn't find a cylindrical pillow. Instead, I ended up getting two blocks of foam and decided to shave them together into a cylinder.

Do not be this careless with toxic foam. Please wear more protective gear!

![A video depicting a woman with green hair shaving down a block of foam into a cylinder.](/optimized/portfolio/floordozer/foamshaving.mp4)

### Electronics

I popped open the garage door opener and fashioned myself a button with conductive fabric within the pillow case I sewed together.

![A video depicting a demonstration of taking apart a garage door opener and resoldering a different button made of conductive fabric onto it.](/optimized/portfolio/floordozer/pillowprocess.mp4)

## Putting it all together

After zipping up the pillow case and painting the box, we put all our parts together and hoped it would work.

Thank God it did!

![A video depicting a tired looking woman with green hair standing behind a table, with her head on a cylindrical pillow. After pushing in the pillow, a box on the table extrudes a drawer.](/optimized/portfolio/floordozer/late-night.mp4)

## Professional Photos and Videos
We were so proud of our ridiculous creation, we got very professional looking photos and videos taken of it by the department. Enjoy our very Apple-looking product pics!

![A video showing a box with a geared drawer moving out via a motor, with a zoom up of the gears inside.](/optimized/portfolio/floordozer/gears.mp4)
![The image shows a person’s hands opening a box with a yellow lid and a black body. Inside the box, there are various electronic components, including a circuit board with wires connected to it. A red LED light is visible, indicating power. The interior also features a gear mechanism, with a large wooden gear positioned on the bottom. The overall setup suggests a project involving electronics and mechanical parts, highlighting the functional design of the box.](/portfolio/floordozer/final_box1.jpg)
![The image shows a close-up view of a mechanical setup involving gears. A motor is positioned above two large, wooden gears with distinct teeth. The motor has a metallic shaft that is aligned with the center of one of the gears. The gears are placed on a flat surface, and the background is slightly blurred, focusing attention on the mechanical components. The overall scene suggests a working environment, possibly related to a project involving gear mechanisms or machinery.](/portfolio/floordozer/gears.jpg)

![The image shows a close-up of a cylindrical object, likely a foam roller or similar fitness equipment. The object has a black textured surface on one side and a bright yellow end with a small black shape in the center. The yellow end is smooth and rounded, contrasting with the black material. In the background, there is a portion of a black structure, possibly part of a larger piece of equipment. The overall composition emphasizes the vibrant colors and textures of the roller.](/portfolio/floordozer/final_pillow1.jpg)
![The image shows a close-up of a hand holding a cylindrical object with a black exterior and a bright yellow interior. The yellow section has a zipper that is partially open, revealing a small orange object inside. The hand is positioned near the zipper, indicating interaction with the object. The background features a yellow and black structure, emphasizing the design of the item. The focus is on the hand and the zipper, highlighting the functional aspect of the cylindrical object.](/portfolio/floordozer/final_pillow2.jpg)
![The image shows a close-up of a hand holding a cylindrical object with a black exterior and a yellow interior. The zipper is partially open, revealing electronic components inside. A small green circuit board with a battery is visible, along with wires connected to it. The background features a yellow and black structure, emphasizing the design of the object. The focus is on the hand interacting with the zipper and the internal components, highlighting the functional aspect of the item.](/portfolio/floordozer/final_pillow3.jpg)