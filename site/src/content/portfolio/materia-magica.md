---
title: Materia Magica Lunar Clock
description: A celestial clock for a text-based RPG that pulls live game data and reflects it through a moon phase aperture, barrel drum counter, and hands. All rendered live in PixiJS.
slug: /portfolio/materia-magica
collaborators:
  - "[Daniel Hampton](https://ruggedsoftware.dev/)"
class: ""
date: 2026-02-14T12:00:00.000Z
preview: /optimized/portfolio/materia-magica/preview.mp4
thumbnail_width: 1
thumbnail_height: 1
cover: /optimized/portfolio/materia-magica/cover.webp
og_preview: /optimized/portfolio/materia-magica/og.jpg
draft: false
url: https://www.materiamagica.com/
technologies:
  - PixiJS
  - TypeScript
  - React
tags:
  - frontend development
  - animation
  - illustration
  - ui design
categories:
  - Client Work
  - Materia Magica
type: portfolioPiece
piece_type:
  - work
---

![The lunar clock running on the Materia Magica homepage, hands sweeping and shutters opening as the dial is dragged](/optimized/portfolio/materia-magica/clock-live.mp4 "The lunar clock, live on materiamagica.com. Every hand, numeral and shutter drawn by hand; every reading pulled from the game.")

## About Materia Magica

[Materia Magica](https://www.materiamagica.com/) is a MUD: a text-based online fantasy world that has been running continuously since 1996, back when the way you played an MMO was by typing into a telnet session. Its world runs on its own calendar, has two moons named Trigael and Marabah (one changes phase every five and a half hours, the other every three and a half), portals that open and close with those phases, a skill system whose damage types include Sonic, Necromantic and Time-Paradox, and a world map that is, topologically, a donut. People have been living in it for almost thirty years, and much of the extended team played the game long before they worked on it.

Here is the org chart, truthfully. Materia Magica has its own team and its own publisher. Its web development is handled by [Rugged Software](https://ruggedsoftware.dev/), a contracting agency, and Rugged brought in KACHOW! as subcontractors. I have shipped on this game for a year, and in that year I have never once spoken to anyone at Materia Magica! Every brief, review and huddle runs through Dan Hampton at Rugged, whose PR feedback is genuinely valuable and whose enthusiasm for the game is contagious. It is the deepest subcontract I have worked on, and one of my favorite working relationships.

## The ask

The game needed "a visually interesting animation that conveys lunar data" about its two moons, since the moons affect gameplay. The brief came with homework attached: in-game lore files on the two moons Trigael, Marabah, as well as information about portals, known as worldgates, that can teleport you to other realms, and an adventuring guide about the general world of Alyria.

In the game, you check the moons by typing TIME, but in the efforts of modernizing the game's website, the team expressed a desire for the same information as an interactive instrument on the homepage.

## The process

In Materia Magica the moons are mechanics: waxing and full phases speed up spell regeneration, and specific phase pairings open worldgates at specific stone circles. That is not just flavor text, it is scheduling information players plan around. In fact, a player clan [published their own lunar predictor](https://annwn.info/tools/lunar-predictor) that renders the next dozen gate openings as a table of rows:

![The Cwn Annwn clan's lunar predictor: a table of moon phases, gates and times to opening](/optimized/portfolio/materia-magica/lunar-predictor.webp "The information as players had it: a fan-built table, and a countdown you have to read.")

So the centerpiece became an instrument: a brass astrolabe that tells Alyrian time, tracks both moons through their phases, opens little shuttered windows onto wherever the worldgates currently stand, and counts spell regeneration underneath.

### Sketches

Dan came in with some ideas of his own. One was the game's cosmology in three dimensions:
a digital version of an [orrery](https://en.wikipedia.org/wiki/Orrery). The other was a gnomeish device I likened to an atompunk-like device with multiple panels for primary information, effect intensity, a lunar orbit diagram, and a forecast list. 

| The cosmology | The dashboard |
| -- | -- |
| ![Graph paper sketch of two moons orbiting stacked ethereal and physical planes](/optimized/portfolio/materia-magica/concept-sketch.webp) | ![Pencil wireframe of a multi panel dashboard labeled Lunar Animation Device](/optimized/portfolio/materia-magica/concept-dashboard.webp) |

The question became: do we want this to be a cool digital representation of what's in the game or for it to feel like a physical artifact a character might have in the world?

Personally, I loved the idea of making an artifact. If part of the purpose of the clock was to develop the visual narrative of the world, why not lean in to the lore building?

The reference I kept coming back to was Prague's [Orloj](https://www.youtube.com/watch?v=JUex-66QhLA), which has been telling a medieval city the hour (in 4 types of calendars), the zodiac, and the phase of the moon on a single dial since 1410. Alongside it sat a seventeenth-century French manuscript of the twelve lunar phases, gold and blue in a ring, which is where the palette came from. I also was inspired by [moon phase watches](https://www.youtube.com/shorts/W8rTbDKCN00), the complication where a disc with two painted moons turns behind a little window in the dial, so the moon you see is always in the right phase. You can easily use this mechanism with two overlapping moons.

![Four references in a row: a brass orrery with planets on arms, a set of moon phase dial charts on dark blue, the Prague Orloj astronomical clock, and the moon phase arch of a Howard Miller grandfather clock with two map globes beneath the moon](/optimized/portfolio/materia-magica/inspiration.webp "The references, left to right: an orrery, moon phase dial charts, Prague's Orloj, and a Howard Miller moon phase dial with its two little globes.")

So with these inspirations in mind, I went to sketching. First I had to work out what we had and how everything relates.

Turns out with a system like this there's actually a lot of arithmetic to go through: how many phases there are and where each moon sits in relation to each other (eight phases, one every 5.5 hours for Trigael and 3.5 for Marabah), whether the moons should sit in apertures or ride the dial, whether it should be a clock at all or rather a device like an [orrery](https://en.wikipedia.org/wiki/Orrery).

![Two pages of a pencil sketchbook: the left page full of overlapping circles, moon phase diagrams and clock faces with the phase timing math beside them, the right page working the layout into a face with two apertures, a spell regeneration counter and the note looks like a device](/optimized/portfolio/materia-magica/sketchbook.webp "First-week sketchbook. Finding the form then narrowing in on it.")


The ones we liked the most were the orrery, where the moons ride their orbits and the phases sit along the path, and a town clock similar to the Orloj with a moon phase dial. So then I made medium fidelity Figma versions of them:

| The orrery | The orrery, with a slider | The clock |
| -- | -- | -- |
| ![Figma frame of two moons on elliptical orbits around a central sphere, their phases laid along the path, with callouts for the current phase and the next gate opening and two empty boxes for the open gates](/optimized/portfolio/materia-magica/frame-orrery.webp) | ![The same orrery frame with a handwritten note reading slider time see where and a slider sketched beneath it](/optimized/portfolio/materia-magica/frame-orrery-slider.webp) | ![Figma frame of a cream clock dial with roman numerals, two moons and two map windows on a blue face, gate names on rollers and a spell regeneration counter at 125 percent](/optimized/portfolio/materia-magica/frame-clock.webp) |

After seeing it more sketched out, we decided to go full force on the town clock idea.

As an intellectual exercise, I tried iterating on the layout with ChatGPT.

I fed it the medium fidelity option on the far right above and a description a clockmaker could have built from: numerals I to XII around the border, two moon apertures with waxing, full and waning inscribed around each, two little map globes with a star on a landmark, and a curved "Spell regeneration at" band over an odometer reading 125%. (I still thought the phases were six and four hours at that point.) It really did not understand the concept! Every render came back with the numerals out of order, the hands crooked, and the apertures somewhere new.

After a few passes it diagnosed the problem itself: the image tool "wants to pretty it up" and fights any precise mechanical layout. It offered to draw me an SVG blueprint instead, and the file link said "file not found." Which is how the blueprint ended up on paper, and then in PixiJS, where nothing gets prettied up unless I say so.

![Five ChatGPT renders of a brass clock face, each with the numerals in a different wrong order, apertures drifting around the dial, and a Spell Regeneration At counter reading 125 percent](/optimized/portfolio/materia-magica/chatgpt-attempts.webp "ChatGPT did not understand the assignment. Count the numerals on any of them.")

Easy to say that I gave up rather quickly (and rather annoyed) with ChatGPT.

And good too because the client was exceedingly clear that they didn't want any AI art!

### Preparing the game data

So far we only talked about design, but I was also hired for my software engineering know-how to hook up my own design to the game data.

The game's world data lives in decades-old area files and C tables, and the marketing site is built in php and Laravel. As a non-game dev, I had read access to the game codebase but no write access, so any work I had to do was simply fetching from what exists and transforming it rather than changing at all how the game code works. So the first month of my work was dusting off my computer science degree to 
* read C code with more linked lists than I had ever seen in a production codebase before
* take said linked lists of map data and write scripts we can run to transform changes to the map into arrays of JSON for frontend consumption
* write parsers and collections for reading in said JSON map data
* writing parsers and collections for reading in game data in an arbitrarily defined format in `.dat` files
* write CLI commands for operations, such as finding the coordinates of a location from within the greater map and generate thumbnails of what that looks like on the map (for the world gate tiles)
* writing scripts that generate constant files of worldgate coordinates and moon phase tables found in the C game codebase to be used for the Laravel web app
* writing utils for Alyrian time conversion (time is spat out of the game codebase as a string that needs to be parsed)
* writing a database seeder that creates believable mock data based on real game data information so the clock can be run locally
* write a cron job that grabs the current game state on a ticker and writes it to the web app's DB
* write an API endpoint intended to be polled for new game state data
* write tests against fixtures cut from the real game files

And this was all largely done without the assistance of AI coding agents. I hadn't written php for nearly two decades and had certainly never written anything in Laravel. I hadn't adopted AI into my coding workflow yet, and generally I was so fascinated with this project I wanted to write it myself anyway and understand what I'm writing.

Once I had wired up the backend to my liking, it was time to start figuring out how the clock I had designed would react to all these different parts.

### Designing the structure

Every part of the clock started as a vector outline: the numeral ring, the aperture, the label plates, the gears, the hands, the moons. Shapes first, so each one could be judged on its own before any of it looked like any real material yet.

![A sped-up screen recording of the clock being assembled as flat vector shapes, layer by layer: the numeral ring, the periwinkle aperture, the label plates, the moon gears, and the hands set off to one side](/optimized/portfolio/materia-magica/process-vectors.mp4 "The clock in vectors, one part at a time. Sped up 2x.")

### Hooking it up to data

Before we can go into high fidelity designs, we need to make sure the design is grokkable and animates as well with the data as I had imagined it to. It's like having low fidelity UI user testing before letting the users have the chance to complain about colors or font.

So, the plain vector shapes were used first as a test. 

This of course means I had to now add to the frontend and
* write PixiJS code that renders all the clock elements and animates them based on current game state
* write polling functions to listen to changes in game state from the previously created API 
* maintain state and update the clock elements accordingly
* (later) introduce a slider functionality that fetches a prediction table of the next 24 IRL person hours


| | |
| -- | -- |
| ![The first running version of the clock: a flat line-art dial on a bright blue canvas, plain gray and red discs for the moons turning behind a periwinkle aperture, stick hands ticking, and white boxes where the gate names and the spell regeneration digits roll like drums](/optimized/portfolio/materia-magica/first-version.webm) | This is the first version that ran.!!!PixiJS's default blue background, two flat discs for moons, stick hands, and two debug buttons that randomize the spell regeneration counter and the portal drums so I could test the animations without needing to wait for a change in game state. Game time runs at a minute per second here so the hands visibly move.!!!Ugly on purpose, getting the form down before the chrome. Every moving part could be checked before any of it was drawn properly. |

Those outlines then became clipping masks for material images in Photoshop: a brass texture clipped to the numeral ring, marbled blue and green to the face behind it. All material images were found on stock photo sites, but heavily edited and filtered in Photoshop. 

Photoshop's blending modes and layer blending options did the rest, with inner shadows, drop shadows and color overlays turning flat shapes into parts that look like they have thickness and catch light. Because the game didn't have much visual language yet for objects (but had some concept art for characters), I went ham on it, leaning heavily into my inspiration pieces.

Since the moons would overlap each other, we were trying to figure out ways to make both as visible as possible and landed on the idea that they should be semi transparent and the idea of stained glass came to mind.

![A sped-up screen recording of the same clock in Photoshop as layers switch on: marbled blue backing, the green lower face, brass label plates, then the gold numeral ring, hands and textured moons, with layer effects visible in the panel](/optimized/portfolio/materia-magica/process-raster.mp4 "The same shapes as clipping masks over material images, with layer styles adding the depth. Sped up 3x.")

### When function follows form

There were a couple aspects we weren't quite sure about yet. For example, how to have a mechanical device transition between wildly different map locations. 

The portal windows themselves show map tiles of where each gate leads. I auditioned transitions for the tile swap the way the sketches audition everything (fog, crossfade, mechanical shutter, a wipe we described as "windshield wiper, Brazilian bbq").

Ulimately we went with a fan out shutter (the last one on the right).

<-- insert a side-by-side video of many options -->

Similarly, we were wracking our brain on how to give users a way to see future predictions for the moon. We didn't want it to be searchable and we concluded that we wanted it to be part of this magical device we've created. We were convinced that a slider was the best way, but the clock is circular so any horizontal or vertical slider just didn't look good.

Enter in the circular slider.

![Dragging the circular dial around the clock to scrub forward through upcoming gate openings](/optimized/portfolio/materia-magica/circular-slider.mp4)

### October to February

| | |
| -- | -- |
| ![A thirty second montage of the clock at eight dated stages: a flat line-art dial on bright blue in October, a brass ring with white placeholder counters in early November, rolling barrels and the first portal windows, a bug that sends the minute hand spinning, streaky portal transitions, brass fan shutters, the horizontal slider bending into a circular dial, and the finished clock on the homepage](/optimized/portfolio/materia-magica/progress-montage.webm) | Eight stops along the way, each a screen recording from the day it happened. The very first one I had to resurrect from its commit, since nobody records the ugly version.!!!Flat blue in October. Brass by November. Then barrels, a bug worth keeping, portal windows, fan shutters, and in January the slider bending into a dial.!!!Live on Valentine's Day. |

## Try it

Here is the instrument itself, the component lifted out of the game's codebase and running on this page. The reading is real: a snapshot of the game state taken one evening in September 2026, with Trigael a waning crescent, Marabah full, and worldgates standing at Xaventry and Irda. Alyrian time keeps advancing from that moment, because the clock computes it rather than being told it. Drag the dial and it walks forward through the next two days of gate openings, the same forty-eight states the server hands the homepage on every load.

<!-- tool:lunar-clock -->

## The outcome

The clock merged on Valentine's Day 2026 and is now the first thing every visitor to [materiamagica.com](https://www.materiamagica.com) sees.

A year in, I still have never met Materia Magica. I just keep shipping through Rugged, and the work keeps coming back. So does the trust: Rugged now includes KACHOW! in its own proposals, in slides Dan built that introduce the extended team by name and school.

Modernizing this game is a monumental and extremely fulfilling project that Rugged Software is delighted to work on. It has all work one can imagine from web development to old school game development, animation work to pixel art and sound design, with interesting unique problems like translating ASCII art to pixel art, building telnet relays, and parsing mysterious messages and data files. It's a greenfield project with lots of opportunity for trying out new ideas.

I hope I will get to continue to be a part of it!
