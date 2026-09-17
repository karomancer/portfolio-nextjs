---
title: Materia Magica Lunar Clock
description: A celestial clock for the homepage of a text MMO that has been running since 1996. Both moons, both worldgates and Alyrian time on one hand-drawn brass astrolabe, rendered live in PixiJS.
slug: /portfolio/materia-magica
collaborators:
  - "[Daniel Hampton](https://ruggedsoftware.dev/)"
class: ""
date: 2026-02-14T00:00:00.000Z
preview: /optimized/portfolio/materia-magica/preview.mp4
thumbnail_width: 1
thumbnail_height: 1
cover: /optimized/portfolio/materia-magica/cover.webp
og_preview: /optimized/portfolio/materia-magica/cover.webp
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

The first ask, in August 2025, was a single scoped brief: the game needed "a visually interesting animation that conveys lunar data" about its two moons, since the moons affect gameplay. The brief came with homework attached: in-game lore files on Trigael, Marabah and the worldgates, a link to a fan-built lunar predictor tool, and the game's 2012 Adventurer's Guide. In the game, you check the moons by typing TIME. The homepage needed the same information as an instrument.

The engagement outgrew that brief almost immediately. The scope was rewritten to the general form (ongoing design and development: programming, animations and art assets, documentation, code review), and KACHOW! brought in John Marrero to take the backend, which is its own story. My half was the celestial data layer and the homepage centerpiece.

## The process

The homepage needed a hero, and the game's own physics suggested one. In Materia Magica the moons are mechanics: waxing and full phases speed up spell regeneration, and specific phase pairings open worldgates at specific stone circles, the same tables that tell a player a gate stands near Maldra's Keep when Trigael is full and Marabah is at half. That is not flavor text. It is scheduling information players plan around, and they had already solved it for themselves: a player clan publishes a lunar predictor that renders the next dozen gate openings as a table of rows.

![The Cwn Annwn clan's lunar predictor: a table of moon phases, gates and times to opening](/optimized/portfolio/materia-magica/lunar-predictor.webp "The information as players had it: a fan-built table, and a countdown you have to read.")

So the centerpiece became an instrument: a brass astrolabe that tells Alyrian time, tracks both moons through their phases, opens little shuttered windows onto wherever the worldgates currently stand, and counts spell regeneration underneath. Typing TIME, as a place.

### Sketches

My sketchbook from the first week, before anything was on a screen. The left page is me working out the instrument: how many phases (eight, one every 5.5 hours for Trigael and 3.5 for Marabah), whether the moons should sit in apertures or ride the dial, and a few too many ways to lay out a clock face. The right page is where it turned into a thing, with the note that settled it: "looks like a device."

![Two pages of a pencil sketchbook: the left page full of overlapping circles, moon phase diagrams and clock faces with the phase timing math beside them, the right page working the layout into a face with two apertures, a spell regeneration counter and the note looks like a device](/optimized/portfolio/materia-magica/sketchbook.webp "First-week sketchbook. The phase math on the left page is what the whole instrument hangs on.")

Before any of that reached Dan, I tried iterating on the layout with ChatGPT. I fed it the sketch and a description a clockmaker could have built from: numerals I to XII around the border, two moon apertures with waxing, full and waning inscribed around each, two little map globes with a star on a landmark, and a curved "Spell regeneration at" band over an odometer reading 125%. (I still thought the phases were six and four hours at that point.) It really did not understand the concept! Every render came back with the numerals out of order, the hands crooked, and the apertures somewhere new. After a few passes it diagnosed the problem itself: the image tool "wants to pretty it up," and fights any precise mechanical layout. It offered to draw me an SVG blueprint instead, and the file link said "file not found." Which is how the blueprint ended up on paper, and then in PixiJS, where nothing gets prettied up unless I say so.

Dan had sketched as well, twice. One was the game's cosmology in three dimensions: the two moons orbiting an ethereal plane suspended over a physical plane, a nebulous base underneath, a possible infinite spire behind. The other was a dashboard, with a panel for primary information, a panel for effect intensity, two squares marked "3D moons spinning?", a lunar orbit diagram and a forecast list. Both were generous, and both were several things at once.

| The cosmology | The dashboard |
| -- | -- |
| ![Graph paper sketch of two moons orbiting stacked ethereal and physical planes](/optimized/portfolio/materia-magica/concept-sketch.webp) | ![Pencil wireframe of a multi panel dashboard labeled Lunar Animation Device](/optimized/portfolio/materia-magica/concept-dashboard.webp) |

I answered with one object instead of five. A player checking gate timings wants an instrument to read, not a scene to interpret or a dashboard to scan, and an astronomical clock is a six-hundred-year-old solution to exactly that problem: many moving values, one face. The reference I kept coming back to was Prague's [Orloj](https://www.youtube.com/watch?v=JUex-66QhLA), which has been telling a medieval city the hour, the zodiac and the phase of the moon on a single dial since 1410. Alongside it sat a seventeenth-century French manuscript of the twelve lunar phases, gold and blue in a ring, which is where the palette came from.

### Structure first, ornament second

The work then started well below the surface. The game's world data lives in decades-old area files and C tables, so the first month was parsers and collections: worldgate coordinates, moon phase tables, Alyrian time conversion, all tested against fixtures cut from the real files. The face was built structure first, a blockout of nothing but the circle, two apertures, two label plates and the counter box, so the geometry could be checked against live data while it was still ugly. Ornament came second, drawn around the holes the data would fill.

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
