---
piece_type:
    - portfolio
title: STEM from Dance LED Pants
description: A set of 8 pairs of LED-lined pants programmed to accompany a 5-minute dance routine for the STEM from Dance team.
slug: /portfolio/stem-from-dance
collaborators:
    - "[Vera Zhong](https://zhong.studio/)"
    - "[Daniel Wai](https://didnotwork.myportfolio.com/)"
    - "[Kay Wasil](https://kwasil.com/about)"
    - "[Mary Mark](https://marymark.cargo.site/)"
class: ""
date: 2024-05-01T03:12:16.678Z
preview: /optimized/portfolio/stem-from-dance/preview.mp4
thumbnail_width: 2
thumbnail_height: 1
cover: /optimized/portfolio/stem-from-dance/thumbnail.webp
og_preview: /optimized/portfolio/stem-from-dance/thumbnail.webp
draft: false
url: https://github.com/DanNoblem/LED_Pants/tree/Hard-Coded
technologies:
    - Arduino Nano 33 IoT
    - Shark Euro Pro X (Sewing Machine)
    - Autodesk Fusion 360
tags:
    - 3D printing
    - pcomp
    - sewing
    - wearables
    - CAD
categories:
    - Client Work
    - STEM from Dance
type: portfolioPiece
keywords:
    - led
    - leds
    - wearable tech
    - wearables
---

![Video of 8 girls dancing while wearing light up pants.](/optimized/portfolio/stem-from-dance/performance.mp4)


## Context

While I was a grad student at NYU, professor [Kathleen McDermott](https://engineering.nyu.edu/faculty/kathleen-mcdermott) told my animatronics class about a potential contract opportunity making wearable electronics for a dance organization client.

### STEM from Dance

[STEM from Dance](https://stemfromdance.org/about-us) is a non-profit that teaches girls STEM concepts through the magic of dance. They do this by teaching the dancers about programming and electronics with dance-related projects, such as through creating wearable and programmable LED clothing or programming background visuals that use computer vision libraries like [TensorFlow](https://www.tensorflow.org/) and visual arts oriented programming languages like [Processing](https://processing.org/).

More about STEM from Dance:
[A video about the STEM from Dance organization](https://www.youtube.com/embed/OKiU0XHuIQ8)

### The ask
The dance organization was urgently seeking a costume designer familiar with wearable technology who could design and create costumes for the student dance troupe and was hoping to find a graduate student interested in the field to do so. A full student project!

The exact ask was formally put in a job description document asking for the following:

| | |
| -- | -- |
| ![The image displays a project description document for STEM From Dance. The text outlines the organization's growth and the need to upgrade costumes for a Performance Troupe of student dancers. It details the proposal criteria, including creativity in using programmable lights, functionality for staff and students, sustainability of materials, and a cost estimate. The document emphasizes the importance of user-friendly technology that enhances hip-hop and jazz performances. The overall layout is clear, with bullet points for easy reading.](/optimized/portfolio/stem-from-dance/ask1.webp) | ![The image displays a document outlining responsibilities and prior experience for a position related to costume design for a dance performance troupe. **Responsibilities** include:- **Technology Design**: Co-designing tech-infused costumes, sourcing up-to-date technology, and ensuring it enhances choreography.- **Creation and Building**: Co-managing the design process and building seven to nine suits.**Prior Experience** required includes:- Costume building from start to finish.- Experience with wearable technology.- Understanding of dance and movement.- Experience completing large projects on tight timelines. The layout is clear, with bullet points for easy reading.](/optimized/portfolio/stem-from-dance/ask2.webp) |

## Research

Though I had made [some experimental wearable LED clothing before](/portfolio/neopatch), I hadn't ever designed any to withstand the wear and tear of dancing.

The STEM from Dance folk said they had huge issues in the past with consistency of their wearables, both in lighting and in sensors. Sometimes wires shorted and LEDS went dark in some pieces. In others, lights were activated with tilt sensors in some belts, but sometimes the sensors broke and sometimes some dancers had more difficulty activating those sensors more than others.

So in order to research for this project, I attended the NYC's Fashion Week [LED Runway Show](https://www.eventbrite.com/e/nyfw-led-wearable-runway-show-and-party-by-dazed-registration-814550220637) to see how actual fashion designers made wearable LED clothing for raves.


### PlexusPlay and SunMoonCouture

At NYC's Fashion Week, I was inspired by a couple of artists, namely a fashion designer called [SunMoonCouture](https://www.instagram.com/sunandmooncouture/) and a vibraphone player called [PlexusPlay](https://www.instagram.com/PlexusPlay/).

![A video of a man in an LED matrix body suit dancing down a catwalk to music](/optimized/portfolio/stem-from-dance/nyc_fashion_week_1.mp4)
![A video of multiple people in different LED outfits lining up on a stage](/optimized/portfolio/stem-from-dance/nyc_fashion_week_2.webm)
![A video of a man in an LED matrix body suit playing vibraphone](/optimized/portfolio/stem-from-dance/nyc_fashion_week_3.mp4)

I approached them after the runway show to ask them about their story, and apparently PlexusPlay wanted to spice up his vibraphone performances with an LED outfit with lighting choreography that matched his music for a music video and for concerts. He teamed up with SunMoonCouture to produce such a garment, and what he ended up with was a full body suit with a matrix of lights. [Here's the music video featuring the garment if you're interested](https://www.youtube.com/watch?v=u9H_gV4h8oo).


I consulted with the pair for my own dance pants project, and the main bits of knowledge they imparted onto me were:
- They had tried making it audio reactive purely on the suit itself, but it didn't function consistently. SunMoonCouture ended up mapping the suit using TouchDesigner, choreographed to the music, and transmits the "show" over ArtNet.
- Originally SunMoonCouture tried to make the suite with LED strips, but found that they were too rigid for the body movements of the musician. He found strings of LEDs on AliBaba and suggested I buy the same ones since they are much more flexible.
- Fabrication-wise, SunMoonCouture could not find any way to affix the LEDs to fabric other than hot glue. Sewing was too time consuming and too error prone with not affixing the wire solidly enough or accidentally puncturing the wire.
- The biggest issues they run into is power and maintenance. As-is, it can only operate for up to 40-50 minutes a performance and they have to either resolder wires or reaffix the LEDs with hot glue every 5-6 shows.

## Sketches and Proposal

The job description was requesting highly interactive or customized LED wearables for a dance troupe of eight girls, all to be done in about five weeks.

I was still in graduate school and had one other client, so I saw this as a great opportunity to assemble a team of fellow classmates to tackle this project together. After getting permission from STEM from Dance to operate under my LLC (KACHOW! LLC) instead of as an individual, I grabbed my buddy Daniel Wai, who I had already worked on several projects before (including another [wearable LED project]) and started brainstorming.

### Sketches
First step in our proposal was to design the costumes.

We decided to write in three options, from easy to medium to hard. The one we liked the most was a combination of a mesh top and LED 

![The image features a design sketch for a clothing concept labeled "Clothing Ideas #1." It includes a mesh top and pants, with annotations detailing features such as LED integration, microcontrollers, and optional interactive elements like tilt sensors. The top is designed with colorful light panels, while the pants have a rainbow stripe along the sides. The sketch notes that the garments are not machine washable and are intended to be worn over other clothing. Material costs are estimated at $80-150 for each piece, including electronics. The overall design emphasizes a tech-infused aesthetic.](/optimized/portfolio/stem-from-dance/sketch1.webp)
![The image features a design sketch for a "Cyberpunk Vest," labeled "Clothing Ideas #2." The vest includes LED strips and a zipper for aesthetic purposes. It has laces on the sides for adjustable sizing and a pocket for a microcontroller and battery. The estimated material cost is between $80-120, depending on the fabric used, which could be dark denim or thick cotton. The design emphasizes a tech-infused, stylish look, with notes on the construction of the LED strip encasement for optimal diffusion. The overall aesthetic is modern and eye-catching.](/optimized/portfolio/stem-from-dance/sketch2.webp)
![](/optimized/portfolio/stem-from-dance/sketch3.webp)

### Proposal
The final proposal we submitted included not just the costume design, but ideas and implementation details about the wiring and programming:

![STEM from Dance dance pants proposal](/portfolio/stem-from-dance/proposal.pdf)

Too long, didn't read? Well, the main idea we proposed was 8 LED-lined pants that will be choreographed to a routine in code, and if we had extra time (or if they wanted to continue working with us), make it such that all pants could connect to a router using a protocol such as ArtNet to receive instructions wirelessly from a central place. This would be ideal for over-the-air updates whether it be Arduino code or a routine in a program like TouchDesigner. 

Luckily, they liked it and chose us! We were all very excited about the pants idea and agreed to tackle that as our first project. If all went well, then perhaps we could work on some of the other projects in the future.

## Fabrication
The proposal is fine and dandy, but implementing the vision is a whole 'nother matter!

Each member of our small team took the lead on a different aspect of the process, but all of us worked together on each and every aspect. It truly tested our ability to switch contexts and multitask as well as tested our knowledge in everything from software to hardware to fabrication!

### Material
The first thing we had to figure out was what materials to use. We were sold on purchasing the same  strings of LEDs that PlexusPlay and SunMoonCouture used in their LED matrix bodysuit, but we all agreed (including STEM from Dance themselves) that we didn't like the look of raw LEDs and wanted to do more to diffuse the light.

Because diffusion typically works best with space between the light and the material it shines through, I decided to use quilt batting as a spacer and diffusing material and use a nice sheer chiffon fabric as the window to the LEDs. The next question after this choice was to determine how much thick the quilt batting should be and how many layers of chiffon fabric should be used.

I took lead on identifying materials and making prototypes of possible combinations. Here's a few experiments showing this process:

![A video showing a string of LEDs coiled up beneath two different heights of quilting batting to show the difference between diffusion.](/optimized/portfolio/stem-from-dance/PXL_20240307_010336978.webm)
![](/optimized/portfolio/stem-from-dance/lights_0.webp)
![A video showing a thin layer of chiffon fabric covering bright LEDs and barely diffusing it at all.](/optimized/portfolio/stem-from-dance/PXL_20240306_213432355.webm)
![A video showing a raw string of LEDs affixed to a strip of fabric being covered layer by layer by a quilt batting and chiffon to show the difference in diffusion each step takes.](/optimized/portfolio/stem-from-dance/PXL_20240308_201702313.webm)

### Initial prototype
We spent some time exploring the material we acquired and making a makeshift prototype that I tried on and brought to the dancers for their opinions. They approved it in terms of comfort and fit so we went full steam ahead on fabricating more of them and finalizing our designs and code.

![A video of a teenage girl wearing light up pants and dancing with them in front of a mirror.](/optimized/portfolio/stem-from-dance/PXL_20240408_232428322.mp4)
![A video of a woman with green hair wearing light up pants in a conference room](/optimized/portfolio/stem-from-dance/PXL_20240324_022222490.webm)
![A video of a pair of light up pants lying flat on a table.](/optimized/portfolio/stem-from-dance/PXL_20240324_023504273.webm)
![A video of someone modeling the lights on the side of a pair of pants for teh camera.](/optimized/portfolio/stem-from-dance/PXL_20240308_234744828.webm)




### Sewing
For the pants themselves, we started with a base pair of pants off of Amazon, replaced the sides with chiffon backed with the quilt batting, and created removable LED panels that snap behind the quilt batting. We wanted all the electronics to be removable so that the pants were washable.

After I made a prototype, I handed the wheel to the fabulous [Kay Wasil](https://kwasil.com/about), who made a few pairs of pants and created a detailed instruction packet to give the STEM from Dance team to learn how to make their own pants.

![Sewing instructions for how to fabricate the pants](/optimized/portfolio/stem-from-dance/sewing-instructions.pdf)

### Electronics
The initial proposal included the possibility of over-the-air (OTA) updates, so we needed boards with wireless capabilities. Enter the ESP8266, and lithium ion batteries capable of powering the board and ~600-700 LEDs per pair of pants!

With that many LEDs and the dangers of a lithium ion battery, lots of care was put into designing and 3D printing enclosures and soldering lights and batteries.

[Vera Zhong](https://zhong.studio/) took lead on soldering and circuit design, and identifying which electronics products to purchase.

![A photograph of a young Asian woman soldering wires at a workstation](/optimized/portfolio/stem-from-dance/electronics_process1.webp)
![A photograph of a young Asian man hot gluing lights onto a piece of black fabric](/optimized/portfolio/stem-from-dance/electronics_process2.webp)
![A photograph of the top of a table showing a 3D printed enclosure with a protoboard and a small circuit board inside.](/optimized/portfolio/stem-from-dance/electronics_process4.webp)

### Programming
[Daniel Wai](https://didnotwork.myportfolio.com/) took the lead on developing the the V1 approach to coding the choreography. This iteration revolved around making helper functions for different types of lighting animations and using those with a duration of milliseconds based on the timestamps of the song they danced to.

We wrote a helper method that converted the number of beats and the bpm to the number of elapsed milliseconds to help us figure out at which point and how long each animation should play.

```
float beat2millis(float beats, float bpm){
  float duration = 0;
  bpm = 60/bpm; //seconds per beat
  duration = (beats*bpm) * 1000; //duration in milliseconds
  return duration;
}
```
[Mary Mark](https://marymark.cargo.site/) worked with the dancers to identify key points in their dancing choreography in which lighting changes could make an impact. So with the knowledge of which beat something should occur and with the animations that Daniel came up with, they were able to come up with a lighting choreography code together.

So with this code:
```
  uint32_t palette[5] = {
    strip.Color(255,255,255), // White
    strip.Color(255,61,244), // magenta
    strip.Color(0,0,255), // deep blue
    strip.Color(254,10,145), // rose
    strip.Color(74,225,255) // cyan
  };

  for(int i = 2; i < 4; i++){
    // Blink between a palette color and black for 8 beats then move to the next color and black
    // This is between a deep blue (0,0,255) and then a rose (254,10,145)
    blink(palette[i], strip.Color(0,0,0), beat2millis(8,153));
  }
  // Then chase from the last rose color we saw (254,10,145) to cyan (74,225,255) in 8 beats
  chase(palette[4], palette[3], beat2millis(8,153));
```

You get this result (starting 4 beats in):

![Video of the girls dancing](/optimized/portfolio/stem-from-dance/preview.mp4)

The full code for the choreography is here:

[Link to GitHub](https://github.com/DanNoblem/LED_Pants/tree/Hard-Coded)

## User Testing
Every week for a couple months, we would venture to the dance studio where the team practices.

The first few sessions, we observed their dancing and choreography to get a sense as to how loose and flexible the clothing had to be.

![A video of dancers doing a hip hop routine in front of a mirror.](/optimized/portfolio/stem-from-dance/PXL_20240303_175245352.mp4)

After making our first prototype, we continued to bring the next iteration of pants in hand and test them out...and fix them when things went wrong.

![](/optimized/portfolio/stem-from-dance/PXL_20240401_224531983.mp4)

![](/optimized/portfolio/stem-from-dance/IMG_9658.mp4)

And eventually everyone had a pair of pants and we were fully part of the choreography process ourselves...

![A video of dancers doing a hip hop routine in front of a mirror while all wearing black light up cargo pants.](/optimized/portfolio/stem-from-dance/IMG_7712.mp4)
![A video of light up pants laying flat on a table.](/optimized/portfolio/stem-from-dance/PXL_20240428_052503408.webm)
![A video of a young woman dancing in the background while there are pants lighting up in the foreground connected to a computer showing windows of code.](/optimized/portfolio/stem-from-dance/IMG_9657.webm)
![A photograph of a green haired woman adjusting some pants laying on a table](/optimized/portfolio/stem-from-dance/layout_1.webp)


And it was one final test of the pants before the final performance!

![A video of folded up lighted pants laid out neatly on a table](/optimized/portfolio/stem-from-dance/led_final_test.mp4)


## Final performance day
We came on final performance day as a helping team, Mary assisted with the dancers and ensured they were comfortable, Vera came prepared to solder last minute loose leads, and I came ready for the worst with a sewing kit. 

Sure there were a few glitches during the performance, but we found the project to be very rewarding and we had an awesome time working with STEM from Dance! I hope they did with us as well.

![A photograph of a team of dancers and the author posing in front of a wall at a school](/optimized/portfolio/stem-from-dance/team.webp)
![A video of a blonde woman instructing a teenage girl to do burpies while wearing the LED pants](/optimized/portfolio/stem-from-dance/PXL_20240504_175908679.webm)
![A photograph of an Asian woman sitting on the floor in the hallway of school soldering some pants.](/optimized/portfolio/stem-from-dance/preperformance3.webp)
![A video of a blonde woman huddled with some teenage dancers and bringing up morale.](/optimized/portfolio/stem-from-dance/PXL_20240504_191255093.webm)



### Kansas city performance
After the final performance (showcased at the top of this page), the team took 3 girls and the choreography to Kansas City a couple months later.

![Video of 3 girls dancing while wearing light up pants.](/optimized/portfolio/stem-from-dance/kansas_city_performance.mp4)