---
title: Cosmic Courier
description: A 3-person co-op arcade game in which players play as a space pirate crew smuggling chickens across the galaxy using alternative controllers.
slug: /portfolio/cosmic-courier
collaborators:
  - Daniel Wai
  - Kayla Wasil
  - Armando Pimentel
class: New Arcade
date: 2023-05-20T03:24:34.000Z
preview: /portfolio/cosmic-courier/thumbnail.jpeg
cover: /portfolio/cosmic-courier/cover.jpeg
og_preview: /portfolio/cosmic-courier/thumbnail.jpeg
draft: false
url: https://github.com/karomancer/spacepirates
technologies:
  - Adobe Illustrator
  - Arduino
  - Autodesk Fusion 360
  - Teensy 4.1
  - Ultimaker 3
  - CNC Router
tags:
  - 3D printing
  - CAD
  - illustration
  - pcomp
  - animation
categories:
  - ITP
type: portfolioPiece
keywords: []
---

![The team playing it at Wonderville](/portfolio/cosmic-courier/wonderville3.mp4)

![Interview video from the ITP showcase](/portfolio/cosmic-courier/interview.mp4)

For my New Arcade class at ITP, our final was to create a full Unity game and arcade cabinet. I worked on the controllers as well, but given this is Dribbble, I'll only show the art assets I made.

In our game “Cosmic Couriers”, you play cooperatively as a team of 3 on a ship making deliveries. Your goal as a team is to make as many deliveries as you can to the astronauts with flags before being defeated by the dangers of space.

The arcade cabinet itself is shaped like a pirate ship and has 3 stations for your teammates: one captain and two cannoneers. **The Captain** is in charge of maneuvering the ship away from enemies and to waiting customers. The two **Cannoneers** are tasked with taking down enemies that threaten your delivery operations.

I was personally in charge of defining art direction and making in-game assets. I also worked on the physical cannon controllers and exterior design via CAD and 3D printing.

## Asset Design

### Background Assets

To a space pirate, space is the ocean! So it only makes sense that in a game about space pirates, the backdrop should be a combination of ocean and space.

I created a base layer in Photoshop with compositing ocean and space photographs. Then I created illustrations of ocean ripples and waves and used that as a mask over my rasterized texture, then made my own star brush in Illustrator and finished it off with space details.

I did this a few times, and some of the results were trippier than I bargained for, but I'm largely happy with where it ended up!

![An illustration of a starry background with an ocean like pattern](/portfolio/cosmic-courier/starmap_1.jpeg)
![An illustration of a starry background with a wave like pattern](/portfolio/cosmic-courier/starmap_2.jpeg)
![An illustration of a starry background with trippy magenta stripes](/portfolio/cosmic-courier/starmap_3.jpeg)

### "Player" design

In space, the placement of masts or solar sails can be either on the top, the sides, or the bottom of the ship. That opened a lot of opportunity to put sails in non-traditional places. So initial thoughts were ships that resemble fish or sea animals like fish or narwhals.

![Sketches of fish themed pirate ships](/portfolio/cosmic-courier/sketches.jpeg)

When illustrating the ship in Adobe Illustrator, I started with the basics of the shape of the ship and the cannon placement.

The players control the cannons separately, so it was important they're visible. 

Then we had to think a bit about this world...do the ships need bubbles for oxygen over them? Do people primarily stay inside the ship or come out with astronaut suits?

We decided on the latter, and ditched the air bubble. Fins and solar sails came later, and visually act as a rudder.

![Different stages of illustrations of ship sprites](/portfolio/cosmic-courier/shipdesign.jpeg)

### Enemy Design

Our game had 3 main enemy types: 
- A police ship that chases you 
- A turret that turns to fire but is otherwise stationary
- A pirate ship that patrols an area and attacks you if you fall into its path

Each of these elements have rotating elements that have to be attached and controlled via Unity.

I chose to make the ship modernized in comparison to the others. When I think of pirates, I think of a rag tag crew that may not have the most advanced technology, whereas the police probably have corrupt funding. Maybe that's just my thinking.

The turret on the asteroid had to be distinguished from other asteroids. So I adjusted the color to be more blueish, while future asteroids were more gray.

Since you are also a pirate-like ship, the pirate ship had to be very distinct (and clearly a bad guy), so I decided to go with a red and black scheme. Since sails are showing up as fins, it made sense to do the usual skull pattern on the "fins".

![Different enemy sprite designs from cannons to enemy pirate ships](/portfolio/cosmic-courier/enemydesign.jpeg)

### Asteroids

The player needs obstacles, so what better obstacle to have in a game about space pirates than asteroids? I only illustrated four, then we programmatically scattered and adjusted color tints and sizes in Unity to give the illusion of more variety.

![Different asteroid illustrations](/portfolio/cosmic-courier/asteroids.jpeg)

### Space Chicken Pickups

The players are a ragtag group of pirates that are smuggling exotic space chickens across the galaxy.

In real life, pirates would often smuggle exotic birds, so perhaps in this universe, a chicken is exotic. I suppose it might be if farms are no longer a thing.

If the players' ship gets hit, there's a random chance that part of their chicken cargo will go flying into space and they have to retrieve it if they want to get full dubloon points at the end of the level.

Drew a few frames of the chicken trying to fly through space.

![Spritemap of a chicken with an astronaut helmet flapping](/portfolio/cosmic-courier/spacechickens.jpeg)

### Customers

In our game, the players have to smuggle space chickens to hungry customers across the galaxy.

We decided the customers would all be isolated astronauts on small, themed planets. Each customer holds up a flag with a picture of a space chicken on it.

Several themed planets are in the works, but only two so far have made it into the game.

![Illustration of little astronauts holding flags on themed planets](/portfolio/cosmic-courier/customers.jpeg)

### Skull & Crossbones

What is a smuggler/pirate game without some sort of skull and crossbones?

Because we're talking space pirates, I thought it would be funny if the crossbones also had an astronaut helmet.

Similarly, we decided that the point system in the game should be number of doubloon you get from your customers for successfully delivering space chickens. Used that skull and crossbones base to create a doubloon.

![Illustrations of adorable skulls in astronaut helmets](/portfolio/cosmic-courier/skulls.jpeg)

### Tutorial screens

Lastly, with all the assets made, we need to have a series of instruction screens like any good arcade game.

![Illustrations of tutorial screens](/portfolio/cosmic-courier/tutorialscreens.jpeg)

## Progress by group

While I was making assets, here is progress done by the entire group with my design input.

### Cabinet design
Kay and I really wanted the cabinet to resemble a pirate ship.

We were deciding together the shape the arcade cabinet would take. Taking inspiration from other popular co-op games we thought about whether it should have different sections like the Simpsons or Mutant Ninja Turtle games, and/or a sit down cocktail cabinet like multiplayer Pacman. 

We eventually decided a sit down table in the shape of a ship with the head of the table as the captain's chair and the other two as cannoneers

Sketches and CAD model by Kay:

![CAD model of a tabletop arcade cabinet in the shape of a boat](/portfolio/cosmic-courier/shipcad.jpeg)
![Sketch of an upright arcade cabinet](/portfolio/cosmic-courier/shipsketch2.jpeg)
![Sketch of a tabletop arcade cabinet](/portfolio/cosmic-courier/shipsketch3.jpeg)
![Sketch of an tabletop arcade cabinet in the shape of a boat](/portfolio/cosmic-courier/shipsketch.jpeg)


### Game design
I largely had nothing to do with this aspect other than provide my feedback on how the ship should move and the mechanics of the cannons.

Because the person sitting at the end is physically steering a wheel, I worked with Armando and we decided it made sense for the wheel to control the rotation of the entire world rather than the player ship asset itself:

![Video of boxes moving across the screen shooting red bullets](/portfolio/cosmic-courier/gameprogress1.mp4)
![Video of an ocean background rotating with boxes on top shooting red bullets](/portfolio/cosmic-courier/gameprogress2.mp4)

## Ship wheel

While Kay fabricated the wheel, Daniel and I worked on the controller itself with sensors and code. Though it sounds simple, what took awhile was figuring out how to make it work like a ships wheel. If you turn a ships wheel, it adjusts a rudder which permanently causes the ship to go in that direction until you change the position of the wheel.

In most video games, as soon as you release a wheel or key, it resets to stasis. We had to program our controller to continue to send key presses if the player had not reset the position of the wheel. 

![Video of spinning a ship wheel and seeing output on a screen](/portfolio/cosmic-courier/shipwheel.mp4)

## Cannon Controller

### Prototyping

In addition to assets and the wheel, my top priority was creating the physical controllers the cannoneeers would use on either side of the cabinet.

To figure out the ideal player interaction, I did some silly prototyping with Coke cans. My first two ideas was a modern turret like shooting experience (left)and gatling gun crank (right):

![Video of cannon cardboard prototypes](/portfolio/cosmic-courier/cardboardcannons.mp4)

I wasn't sold on either of these ideas, so what I prototyped next was to create a CAD model of a cannon to print on a platform with a handle that a player would use to swing it 180º as it sits on a potentiometer. The players would control the opposite sided cannons in this fashion.

I also made alternative models with the handles on either side, like the turret style from before.

![CAD model of a cannon on a disk with a handle sticking straight up](/portfolio/cosmic-courier/cannoncad1.jpeg)
![CAD model of a cannon on a disk with a handle sticking straight up](/portfolio/cosmic-courier/cannoncad2.jpeg)
![CAD model of a cannon on a disk with a handle sticking straight up](/portfolio/cosmic-courier/cannoncad3.jpeg)

![Video of a green haired woman with glasses with small 3D print prototypes of a cannon](/portfolio/cosmic-courier/cannonsmallprint.mp4)

### Final design

The final cannon design was 3D printed in black PLA and painted and screwed onto a CNC'ed wood. The handle was also 3D printed and screwed on from below. The cannon was removable from its base and could be moved up-and-down freely.

The bottom of the wood had a ring of felt to help a bit with scratches.

![3D print of a partly assembled miniature cannon](/portfolio/cosmic-courier/cannonprint2.jpeg)
![Video of a miniature cannon being moved around](/portfolio/cosmic-courier/cannontest.mp4)
![3D print of a partly assembled miniature cannon](/portfolio/cosmic-courier/cannonprint1.jpeg)

## Final Playtests

The final playtests before full assembly and showcasing it at Wonderville. Only 1 cannon was made at this point.

![The team testing the game out before putting on the legs](/portfolio/cosmic-courier/playtest.mp4)

![Video of the team demo-ing it for class](/portfolio/cosmic-courier/final.mp4)

## Wonderville NYC

This cabinet, alongside others in the class, were showcased at the indie arcade bar, [Wonderville](https://www.wonderville.nyc/), in Brooklyn.

![The team playing it at Wonderville](/portfolio/cosmic-courier/wonderville1.mp4)
![The team playing it at Wonderville](/portfolio/cosmic-courier/wonderville2.mp4)
![Screenshot from the game showing the player taking damage from a pirate](/portfolio/cosmic-courier/screenshot1.jpeg)
![Screenshot from the game showing the player taking damage from a pirate](/portfolio/cosmic-courier/screenshot2.jpeg)

---

You can see all the code, both Teensy (me + Daniel) and Unity (Armando) at

[Github](https://github.com/karomancer/spacepirates)