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
* take said linked lists of map data and write scripts we can run to transform changes to the map into arrays of json for frontend consumption
* write parsers and collections for reading in said json map data
* writing parsers and collections for reading in game data in an arbitrarily defined format in `.dat` files
* writing scripts that generate constant files of worldgate coordinates and moon phase tables found in the C game codebase to be used for the Laravel web app
* writing utils for Alyrian time conversion (time is spat out of the game codebase as a string that needs to be parsed)
* write tests against fixtures cut from the real game files

And this was all largely done without the assistance of AI coding agents. I hadn't written php for nearly two decades and had certainly never written anything in Laravel. I hadn't adopted AI into my coding workflow yet, and generally I was so fascinated with this project I wanted to write it myself anyway and understand what I'm writing.

Once I had wired up the backend to my liking, it was time to start figuring out how the clock I had designed would react to all these different parts.

### Hooking it all up

The face was built structure first, a blockout of nothing but the circle, two apertures, two label plates and the counter box, so the geometry could be checked against live data while it was still ugly. Ornament came second, drawn around the holes the data would fill.

| Structure | Ornament |
| -- | -- |
| ![The clock reduced to flat geometry: circle, two apertures, two label bars, counter box](/optimized/portfolio/materia-magica/clock-blockout.webp) | ![The same layout dressed in parchment, roman numerals and a moon phase band, with the blockout still showing through in blue](/optimized/portfolio/materia-magica/clock-ornament.webp) |

### The face

Then came the face proper, rendered in PixiJS: numerals, hands, gears and shutters drawn as vector and brass-textured art, with tumbler barrels for the spell regeneration counters and hands that politely go translucent when your cursor needs to see behind them.

| Shutter mechanics | Dial interactions |
| -- | -- |
| ![The portal shutters closing and reopening as the clock moves between phases](/optimized/portfolio/materia-magica/clock-shutter.mp4) | ![Dragging the circular dial around the clock to scrub forward through upcoming gate openings](/optimized/portfolio/materia-magica/circular-slider.mp4) |

The portal windows themselves show map tiles of where each gate leads. I auditioned transitions for the tile swap the way the sketches audition everything (fog, crossfade, mechanical shutter, a wipe we described as "windshield wiper, Brazilian bbq"), and the winner earned the most satisfying filename in the project's history: portaltiletransition_whoa.mov.

![The portal window changing destinations with a mechanical shutter transition](/optimized/portfolio/materia-magica/portal-transition.mp4 "The portal window changing destinations. The original capture is named portaltiletransition_whoa.mov, which says it better.")

## Try it

Here is the instrument itself, the component lifted out of the game's codebase and running on this page. The reading is real: a snapshot of the game state taken one evening in September 2026, with Trigael a waning crescent, Marabah full, and worldgates standing at Xaventry and Irda. Alyrian time keeps advancing from that moment, because the clock computes it rather than being told it. Drag the dial and it walks forward through the next two days of gate openings, the same forty-eight states the server hands the homepage on every load.

<!-- tool:lunar-clock -->

## The outcome

The clock merged on Valentine's Day 2026, to a review from Rugged's Elisa Crescentini that any engineer would frame: "Woooooooaaaahhhh. The big feat is merged." It is now the first thing every visitor to materiamagica.com sees.

A year in, I still have never met Materia Magica. I just keep shipping through Rugged, and the work keeps coming back. So does the trust: Rugged now includes KACHOW! in its own proposals, in slides Dan built that introduce the extended team by name and school. For a subcontractor, that is the whole scoreboard: the work returns, and your name ends up on the pitch deck.
