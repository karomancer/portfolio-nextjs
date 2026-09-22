---
title: Udder Mayhem
description: A cow-shaped arcade cabinet and rhythm game in which you play a barista making lattes by squeezing four silicone udder teats to the beat. Three udders and two cow bodies later, it has toured MAGFest, GDC and Maker Faire. Unity, Teensy, silicone and foam.
slug: /portfolio/uddermayhem
collaborators:
  - "[Kevin Mitchell](https://soundcloud.com/aphonicdnb)"
class: The New Arcade
date: 2023-06-22T17:27:28.000Z
preview: /optimized/portfolio/uddermayhem/FzF7fARWAAEZaYy.webp
cover: /optimized/portfolio/uddermayhem/title.webp
og_preview: /optimized/portfolio/uddermayhem/FzF7fARWAAEZaYy.jpg
draft: false
url: https://github.com/karomancer/uddermayhem
technologies:
  - Adobe Illustrator
  - C#
  - Teensy 4.1
  - Unity
  - Autodesk Fusion 360
  - Smooth-On silicone & foam
  - Force-sensitive resistors
  - CNC router
tags:
  - 3D printing
  - mold making
  - animation
  - CAD
  - fabrication
  - illustration
  - pcomp
  - game programming
categories:
  - ITP
  - Personal Project
type: portfolioPiece
thumbnail_width: 2
thumbnail_height: 2
piece_type:
  - portfolio
---
![Udder Mayhem promo](/optimized/portfolio/uddermayhem/promo_30s.mp4 "/optimized/portfolio/uddermayhem/promo_poster.webp")

**Udder Mayhem** is a rhythm game played on a cow. You are a barista at a café where the steamed milk comes from a magical countertop cow, and cups slide in to the beat. Squeeze the right teat on time and you pour latte art. Squeeze late and you spill the milk.

It started as a midterm at NYU's ITP in 2023 and never really stopped. Since then the cow has had two bodies and three udders, and has been played by a few thousand people at the ITP Spring Show, Currents New Media in Santa Fe, Coney Island Maker Faire, MAGFest, and Warped Inputs at GDC. The version below is the one that travels now, and the chapter after it is how it got here.

**Next showing: [Bay Area Maker Faire](https://makerfaire.com/bay-area/), September 25–27, 2026. Come squeeze her.**

![A photograph of a close up of a cow-shaped arcade cabinet](/optimized/portfolio/uddermayhem/23c_kc4648_karina-chow_cow-2V1A0542-025_hero.webp)
![A photograph of a close up of a silicone udder for an arcade cabinet in the shape of a cow.](/optimized/portfolio/uddermayhem/23c_kc4648_karina-chow_cow-2V1A0535-020.webp)
![A photograph of a close up of a silicone udder for an arcade cabinet in the shape of a cow.](/optimized/portfolio/uddermayhem/23c_kc4648_karina-chow_cow-2V1A0531-016.webp)
![A photograph of a close up of a silicone udder for an arcade cabinet in the shape of a cow.](/optimized/portfolio/uddermayhem/23c_kc4648_karina-chow_cow-2V1A0528-013.webp)

<!-- collapse:How it started (2023) -->

Our midterm for the class *The New Arcade* was to make an unconventional controller, a la [ctrl.alt.GDC](https://gdconf.com/alt-ctrl-gdc) style, and an accompanying game.

Years earlier, I had taught myself how to make molds and cast out of silicone and wanted to make a silicone beer tap udder for Burning Man. I ended up making a lot of other [little](https://www.instagram.com/p/CFa_Q4hHbdD/) [sculptures](https://www.instagram.com/p/CFWEF0bnN2q) for Burning Man but didn't get around to this. So this alternative controller assignment was the perfect opportunity to bring back the udder!

**The Pitch**: A rhythm game in which you play a barista who prepares café lattes with a magical countertop miniature cow instead of an espresso machine.

![A woman playing Udder Mayhem](/optimized/portfolio/uddermayhem/demo_ivy.mp4)
![The attract/start screen for Udder Mayhem](/optimized/portfolio/uddermayhem/PXL_20231008_180900354.webm)
![A photograph of a preteen girl going through the tutorial level of Udder Mayhem.](/optimized/portfolio/uddermayhem/PXL_20231006_153257599.webp)

#### Tutorial animation
![Tutorial](/optimized/portfolio/uddermayhem/tutorial.mp4)

### User Interaction

I decided to first focus on the appropriate player experience of using the udder. I could think of two ways:

![A photo of a sketchbook of sketches of udders in different placements and uses](/optimized/portfolio/uddermayhem/sketches.webp)

My original ponderance was on whether you **are the cow** or whether you **are the milkmaid**.

Originally, I wanted the udder to be attached to a harness and the player *is* the cow. (see left side of sketch). However, after some more thinking, sketching, and surveying friends, I concluded a few things:

- Cables could be an issue, and doing it wirelessly might introduce lag into a rhythm game
- Wearing it could also add wear-and-tear to the circuits inside
- It’s not clear what the view would be on the screen if you were the cow…are you looking down at a counter? Are you shooting at things on a wall? Would it make sense if the screen were at udder-level and angled up?
- If you wore the udder, you probably wouldn’t need to see one on screen. Aiming might be awkward if you aren’t standing perfectly in the right spot.

After surveying several people, the consensus was that it seemed too cumbersome to have a harness. Many people liked the idea of the cow being miniature and used like an appliance on a counter, as an espresso machine with a milk frother is (right side of the sketch).

So I ended up deciding on the more traditional route of having the udder hang down like on a cow. That opened the question as to where the screen would be; should it be on the cow itself, under the udder, or behind the cow? That choice determines whether the perspective for the illustrations are from the side or top-down.

I decided that though having the monitor *under* would be interesting, the actual controller might block the player's view so side or behind is best.

### Game Design

#### Inspiration

The game that inspired me the most is [Rhythm Heaven Fever](https://en.wikipedia.org/wiki/Rhythm_Heaven_Fever), a very silly Japanese rhythm game with a very distinctive soundtrack and aesthetic.

I imagined the 4 udder teats to be squeezed in quick succession to fill cups. With that in mind, I nailed down the two Rhythm Heaven Fever games I think would be most fitting for this game.

First is **Fork Lifter**. I think this works well because it has several cues that go in quick succession, and objects that appear from off the screen. I was envisioning the coffee cups sliding in to be filled, and after filled in rhythm, slide off the screen.

[Video of a perfect game of "Fork Lifter"](https://www.youtube.com/embed/X1M81ZZU6Ws)

Aesthetically, I also like the little speech bubble. I thought maybe after a really good run, there might be one with a face of a happy customer or something like that.

The next one I’m inspired by is **Flipper-Flop**. What I like about this one is the use of 3 eighth-notes on the first beat as a cue for what’s coming, then a voice as a cue with how many “flipper-rolls” you have to do:

[Video of a perfect game of "Flipper-Flop"](https://www.youtube.com/embed/96vnlEMbscs)

I like the idea of having eighth-note sounds designating coffee cups sliding in and the voice going “3 café lattes” and you filling up the 3 that appeared on your screen (you would not press for the coffee sliding in sound effects).

One of the things that’s so endearing about Rhythm Heaven Fever is that there are visual and audio cues for when the player is hitting notes too early, too late, or not at all. See the above again but with numerous mistakes:

[Video of a game of "Fork Lifter" with many player mistakes](https://www.youtube.com/embed/fqpuALXHwSM)
[Video of a game of "Flipper-Flop" with many player mistakes](https://www.youtube.com/embed/kP1XI04faB4)

#### Aesthetics

I wanted to match the art of **Rhythm Heaven Fever**, with its bold black lines and bright colors. I kept that in mind as I designed the cow udder and cups.

The cups would slide in from the left to the right, and not always 4 at once. This is what 4 would look like that haven’t been touched.

![Illustration of a cow udder above a bunch of empty coffee cups](/optimized/portfolio/uddermayhem/coffeecups1.webp)

As mentioned, in Rhythm Heaven Fever, if you are too early/too late/miss the note, there is a very obvious audio and visual cue. The game would include both the press and release of the udder teat as the interaction. Each press/release will be 1 beat long. That is, press on the beat 1, release on beat 2.

I wanted to do that as well in my game, so I came up with the following:

- If the player misses the cue completely or presses too early, *the cup tips over*
- If the player presses too late or releases too early, *the cup goes out half full*
- If the player releases too late, *the cup overflows with steamed milk*
- If the player makes a perfect latte, *the cup has a heart latte art*

So here’s an illustration of what that might look like:

![Illustration of a cow udder above a bunch of partially filled coffee cups, some overflowing, some tipped over](/optimized/portfolio/uddermayhem/coffeecups2.webp)

Some of the Rhythm Heaven Fever games also have a little surprise at the end if you got all perfects, so I want the last cup to be latte art of a cow’s face if you got perfect up to that. I haven't gotten to it yet, but it's a goal! 🐮

#### Tutorial assets
In theme with the rest of the game, I wanted the tutorial to paint the player as a new employee of a Starbucks-like café where the steamed milk comes from a magical cow. So who best to teach that to the player than an adorable barista?

![Spritemap of an animated Starbucks inspired barista](/optimized/portfolio/uddermayhem/barista.webp)

When I first made the udder, I thought everyone had a vague idea of how to milk a cow but after witnessing players grabbing the teats in various odd ways, I knew I also had to add in an animation showing how to properly grab and squeeze them.

![Spritemap of an animated hand squeezing a teat](/optimized/portfolio/uddermayhem/tutorialhands.webp)


### Game Development

First thing's first, I imported my assets into Unity and made the teats controllable by the QWAS keys.

![Video demo of 4 independently controlled teats filling cups](/optimized/portfolio/uddermayhem/qwas.gif)

#### Music & Code
A good track is paramount to any rhythm game. I hired my good friend Melissa Nilles and her band, [Ruby Grove](https://open.spotify.com/artist/4YlpKqjpW6PRrmCVPKutrM) to compose a silly song for the game in which each note is a bass note.

With the song in hand, I modeled the song in C# code by creating a `struct` for each "cup note", or cup that flies across the screen to a note. 

```c#
// CupConductor.cs

public struct CupNote 
{
    // "FrontLeft", "FrontRight", "BackLeft, or "BackRight"
    public string type;

    // On which measure # and beat # (within the measure) the note lies
    public int measure;
    public float beat;

    // Duration of the note (for hold-release)
    // 1.0f is a quarter note, 0.5f is an eighth note, etc
    public float duration;

    public CupNote(string _type, int _measure, float _beat, float _duration) 
    {
        type = _type;
        measure = _measure;
        beat = _beat;
        duration = _duration;
    }
}
```

With the struct created, I could describe at which point every bass note enters the screen and which teat the cup should go to

```c#
public static CupNote[] CUP_NOTES = {
    new CupNote(CupTag.BackRight, 8, 1.0f, 1.0f),
    new CupNote(CupTag.BackLeft, 8, 2.0f, 1.0f),
    new CupNote(CupTag.FrontRight, 8, 3.5f, 0.5f),
    new CupNote(CupTag.FrontLeft, 8, 4.0f, 0.5f),
    new CupNote(CupTag.BackRight, 9, 1.0f, 1.0f),
    ...
}
```

While the `GameManager` keeps track of what measure and beat the song is on, the `CupConductor` with the note declarations above instantiates cups when it's their turn.

When a player presses **Q**, **W**, **A**, or **S**, or squeezes an udder, the illustration of the teat changes to include the milk sputter. Using a `BoxCollider2D`, I capture that event in the cup itself. In those enter and exit events, the cup checks whether the press and release are within a beat tolerance for the note through the `IsOnBeat` method and changes sprite accordingly.

```c#
// GameManager.cs

public BeatTiming IsOnBeat(int measure, float beat)
  {
    float expectedSongPosition = (measure * 4) + beat - 1;
    bool isAcceptablyEarly = songPositionInBeats > (expectedSongPosition - beatAllowance);
    bool isAcceptablyLate = songPositionInBeats < (expectedSongPosition + beatAllowance);
    Debug.Log("Expected " + expectedSongPosition + " Got: " + songPositionInBeats);
    if (isAcceptablyEarly && isAcceptablyLate)
    {
      // Yes I went overboard on the theming! This just adjusts score.
      SubmitCustomerFeedback(BeatTiming.OnTime);
      return BeatTiming.OnTime;
    }

    if (!isAcceptablyLate)
    {
      SubmitCustomerFeedback(BeatTiming.TooLate);
      return BeatTiming.TooLate;
    }

    SubmitCustomerFeedback(BeatTiming.TooEarly);
    return BeatTiming.TooEarly;
  }
```

With all of that, we have a working rhythm game! Just need to add some animations and we're almost there. Sound on 🔊

![Video demo of 4 independently controlled teats filling cups](/optimized/portfolio/uddermayhem/withmusic.mp4)

You can see the complete Unity code here:

[GitHub](https://github.com/karomancer/uddermayhem/tree/main/BovineBaristaGame)


#### Win/Lose Conditions (WIP)

Like a lot of rhythm games, there are different scores. In Rhythm Heaven Fever, there is a Fail, a Fair, a Good, and a Perfect, which is shown to you at the end. They never show you a more precise score and you don’t know your progress during the game (unless you are no longer Perfect. Then it will stop showing you the “Go for Perfect!” message).

Originally I was just going to take inspiration from that paradigm and not show high score.

Player testing showed me that people *really* wanted to know their scores, so points are given for perfects, early, and late presses and displayed as tips. This still needs some fine tuning.



### Controller design

I was planning for the controller to be a silicone or latex cast cow udder attached to a mount.

To figure out the correct proportions for the udder, I made a mylar balloon model. No precise measurements, just cut and crafted to what felt comfortable with my hands.

Once I got the right proportions, I dissected my own balloon and measured it to create a CAD model in **Autodesk Fusion 360**, then inverted it and created a 4-piece udder mold box with pre-drilled holes at the top so the udder could be drilled down into a cow belly later.

![Photograph of a person holding an udder made of mylar balloon](/optimized/portfolio/uddermayhem/mylar1.webp)
![Screenshot of a gray 3d modeled udder](/optimized/portfolio/uddermayhem/cad1.webp)
![Screenshot of a gray 3d modeled udder moldbox](/optimized/portfolio/uddermayhem/cad2.webp)

Of course, making a beauitful udder means nothing for a video game if there aren't any accompanying electronics to detect a squeeze. So I made a single-teat mold box and made silicone brush casts to make test teats for different electronics experiments.

The casting looked very grotesque:
![Photograph of a very grotesque looking black box with pink goo in it](/optimized/portfolio/uddermayhem/teatbox.webp)

I had a few ideas for how to detect a teat squeeze:

#### Teat Test #1: Conductive Fabric Switch

Using conductive fabric lined on the inside, we can create a binary switch/button. When a player squeezes the teat, a circuit is completed between both sides of the teat. Alternatively, this can also be done with a lined teat and a metal pole in the center.

![Video of someone squeezing a dildo looking teat to make contact](/optimized/portfolio/uddermayhem/teattest.mp4)

The very rough prototype seemed to work well, but ultimately it wasn't robust enough and I couldn't find a good way to make the squeeze have the right consistency with this technique.

#### Teat Test #2: Resistive Stuffing

Creating a stuffing that acts similar to Velostat and using that inside the teat, by either dusting copper particles into solid silicone itself or by using a soft material like conductive wool or foam. With this method, the more pressure you apply to the material, the closer the particles get together, lowering resistance. This would read much like a variable resistor.

This sounded like the best method to me, but didn't work. I bought both iron and copper dust and first tried to cast silicone with tons poured in, but the silicone was too non-conductive. Same with polyurethane foam.

Then I tried a conductive wool stuffing, but squeezing it often for a game left a depression that wouldn't bounce back.

#### Teat Test #3: Microphones

Molding an inner foam teat around a straw to push air to a small microphone to detect. This one was recommended to me by another student. It seemed like a good idea at first, but then I remembered this was a rhythm game so it would be very noisy from the game itself and/or the environment (an arcade).

![Video of someone squeezing a foam teat with a straw in it in front of a microphone](/optimized/portfolio/uddermayhem/teattest2.mp4)

Veto, but still a fun and unique idea.

#### Teat Test #4: Hall Effect Sensors

Embedding a magnet within the silicone on the inside of the teat with a [Hall effect sensor](https://en.wikipedia.org/wiki/Hall_effect_sensor) in the center separated with a stuffing like polyurethane foam for texture. That way, if you squeeze hard enough, the embedded magnets will get close enough to the sensor and trigger a high state. This started as my least favorite option but ended up being the best option.

![Video of someone squeezing a dildo looking teat to make contact](/optimized/portfolio/uddermayhem/teattest3.mp4)

For all of these tests, I consulted with [Kari Love](http://www.karimakes.com/about) and [Kate Hartman](http://www.katehartman.com/) and a close friend of mine who has a masters in Mechatronics from Stanford on fabrication and electronics.

#### Constructing the full udder box

Now that I knew what sensors I would be using, it was time to make it at full scale.

With the CAD model created earlier, I printed the 4-part mold box, smoothed out the layers with a couple coats of [XTC3D](https://www.smooth-on.com/product-line/xtc-3d/), and then applied 5-6 layers of [Dragon Skin 10](https://www.smooth-on.com/products/dragon-skin-10-very-fast/) silicone that was pre-mixed witih pink and light flesh colored pigment:

![Photo of a bunch of quadrands with teats on either side](/optimized/portfolio/uddermayhem/moldboxes1.webp)
![Photo of one udder quadrant](/optimized/portfolio/uddermayhem/moldboxquadrant.webp)
![Photo of two quadrants stuck together to see a cross section](/optimized/portfolio/uddermayhem/moldboxes2.webp)
![Photo of two quadrants stuck together to see a cross section](/optimized/portfolio/uddermayhem/moldbox1.webp)
![Photo of two quadrants stuck together to see a cross section](/optimized/portfolio/uddermayhem/moldbox2.webp)

Grotesque, no?
![Grotesque photo of the udder mold box coated in gooey pink silicone](/optimized/portfolio/uddermayhem/castmoldbox1.webp)

Then I prepared the tubes for the sensors. I decided to put a metal tube in each silicone teat and fill the space between the pole and the silicone with polyurethane foam for a little squish. The tubes each have a hole drilled into them through which a [Hall Effect](https://www.adafruit.com/product/158) sensor goes and is taped onto the outside of the tube, and the wires are run from within the tube up to the top part of the udder, where the [Teensy 4.1 microcontroller](https://www.pjrc.com/store/teensy41.html) would sit.

![Photo of a messy workshop bench with a drill and metal tubes and wires](/optimized/portfolio/uddermayhem/halleffect2.webp)

#### Code

The Arduino code for the controller is very simple. Because the game requires you to press when the beat starts and release when the note has ended, two thresholds for each of the four teats are needed.

With the Teensy, it's easy to output keypresses. So the code is simply a series of `if`/`else` statements with these thresholds that type **Q**, **W**, **A**, or **S** into the computer it's connected to.

```arduino
const int FrontLeftTeat = A3;
...

// The larger the number, the more sensitive it is
const int FRONT_LEFT_RELEASE_THRESHOLD = 48;
...

// The larger the number, the harder you have to squeeze
const int FRONT_LEFT_PRESS_THRESHOLD = 995;
...

bool isFrontLeftSqueezed = false;
...

void setup() {
  pinMode(FrontLeftTeat, INPUT);
  ...
  Serial.begin(9600);
}

void checkForFrontLeft() {
  int frontLeftValue = analogRead(FrontLeftTeat);
    // Serial.println(frontLeftValue);
  if (frontLeftValue > FRONT_LEFT_PRESS_THRESHOLD && !isFrontLeftSqueezed) {
    Serial.println("Front Left Teat pressed!");
    Keyboard.press(KEY_A);
    isFrontLeftSqueezed = true;
  } else if (isFrontLeftSqueezed && frontLeftValue < FRONT_LEFT_RELEASE_THRESHOLD) {
    Serial.println("Front left teat released!");
    Keyboard.release(KEY_A);
    isFrontLeftSqueezed = false;
  }
}

void checkForFrontRight() { ... }
void checkForBackLeft() { ... }
void checkForBackRight() { ... }
 
void loop() {
  // Constantly checking each of the teats
  checkForFrontLeft();
  checkForFrontRight();
  checkForBackLeft();
  checkForBackRight();
  delay(10);
}
```

#### MVP Midterm
The MVP fabrication of this project was to get the udder fully working in conjunction with the game, "making it pretty" comes later!

![Photo of green haired girl holding up ](/optimized/portfolio/uddermayhem/tablepose.webp)
![Photo of a man smiling while squeezing an udder hanging from a table](/optimized/portfolio/uddermayhem/kai.webp)
![Photo of a woman smiling while squeezing an udder hanging from a table](/optimized/portfolio/uddermayhem/cindy.webp)
![Video of a green haired girl playing an udder hanging from a table](/optimized/portfolio/uddermayhem/midtermdemo.mp4)

### ITP Showcase
Of course I wasn't going to leave the project at the midterm! I couldn't have Celine Dairyon without a body. For the ITP showcase, I made a frame and rough wooden body to make it much more presentable.

![Interview video with Karina about Udder Mayhem](/optimized/portfolio/uddermayhem/interview.mp4)
![Video of a woman playing the game on a wodden frame](/optimized/portfolio/uddermayhem/showcase2.mp4)
![Video of a woman playing the game on a wodden frame](/optimized/portfolio/uddermayhem/showcase1.mp4)

![Photograph of a line of people waiting to play the game](/optimized/portfolio/uddermayhem/showcaseline.webp)
![Photograph of building a wooden frame](/optimized/portfolio/uddermayhem/frame.webp)
![Photograph of the inside of the cow with all the wires](/optimized/portfolio/uddermayhem/showcaseinside.webp)

### Currents New Media Festival
NYU chose mine and two other projects out of hundreds to go on the road and represent them at the [Santa Fe Currents New Media Festival](https://currentsnewmedia.org/). Yet another great reason to iterate on the game, especially its form factor.

![Photograph of Celine the cow more or less done](/optimized/portfolio/uddermayhem/celine.webp)
![Photograph of stuffing the cow in a Pelican case for shipping](/optimized/portfolio/uddermayhem/shipping.webp)
![Photograph of stuffing the cow in a Pelican case for shipping](/optimized/portfolio/uddermayhem/shippingcase.webp)
![Video of a girl playing a cow game in the hotel](/optimized/portfolio/uddermayhem/hoteldemo.webm)

![Video of a kid playing](/optimized/portfolio/uddermayhem/kidplaying.mp4)
![A video of an older man squeezing the teats of the udder controller](/optimized/portfolio/uddermayhem/IMG_7747.webm)
![A photograph of a crowd of people standing around a person playing the udder game.](/optimized/portfolio/uddermayhem/IMG_8953.webp)
![A woman playing Udder Mayhem](/optimized/portfolio/uddermayhem/demo_mercedes.mp4)

![A photograph of a group of people each with a project (a giant nose, a cow, and a helmet) posing in front of a wall.](/optimized/portfolio/uddermayhem/IMG_8988.webp)

My colleague [Josh](https://joshjoshjosh.net/) made a TikTok starring Celine the Cow to remember our time together at the Currents New Media:

[TikTok video compilation of cow pictures](https://www.tiktok.com/@joshjoshjosh.net/video/7248340557053840686)

### Coney Island Maker Faire
I was also invited to bring Udder Mayhem to the Coney Island Maker Faire to represent my gradute program, and it was an absolute favorite amongst the kids.

Once again, it all starts with a little prep, this time with swag as well:

![A photograph of a cow video game arcade cabinet on a photography table](/optimized/portfolio/uddermayhem/coney_island_setup.webp)
![A video of a vinyl printer printing stickers that say "Udder Mayhem" on them](/optimized/portfolio/uddermayhem/PXL_20231006_182411970.webm)
![A photograph of a bunch of stickers ranging from a barista character, an udder, and a Starbucks cup](/optimized/portfolio/uddermayhem/PXL_20231006_190947756.webp)

Then I headed off to the NYU table at Coney Island Maker Faire.

![A photograph of the NYU ITP table at Coney Island Maker Faire, complete with violet banners and a cow and electronic plants.](/optimized/portfolio/uddermayhem/PXL_20231006_152809242.webp)
![A photograph of people setting up at Coney Island Maker Faire](/optimized/portfolio/uddermayhem/attract_screen.webp)
![A photograph of a girl playing Udder Mayhem on her own](/optimized/portfolio/uddermayhem/PXL_20231007_163929655.webp)
![A photograph of a crowd of children gathered around the cow arcade machine.](/optimized/portfolio/uddermayhem/PXL_20231006_153303323.webp)


![Video of some kids playing the game](/optimized/portfolio/uddermayhem/PXL_20231007_155038144.mp4)
![Photograph of a man holding a little girl up to play](/optimized/portfolio/uddermayhem/PXL_20231007_160216124.webp)
![Photograph of a man helping a smaller child reach the game](/optimized/portfolio/uddermayhem/PXL_20231008_175912756.webp)


It was so popular among the children that it was even featured on the banner to purchase the following years' tickets!
| |
| -- |
| ![A screenshot of the Coney Island Maker Faire homepage with the cow arcade machine prominently featured.](/optimized/portfolio/uddermayhem/coney-island-website.png) |

<!-- /collapse -->

## The Rebuild (2025–2026)

Celine Dairyon, the first Udder Mayhem cow, went to the Currents New Media festival in Santa Fe and the Coney Island Maker Faire, and both trips taught me the same two lessons.

The first was the udder. The Hall effect sensors only fired when a magnet sat squarely over its sensor, and after a year of squeezing that stopped being true: the magnets had migrated inside the silicone, and the rods carrying the sensors had twisted in their tubes. Some teats worked if you squeezed them just so. Kids do not squeeze just so.

The second was shipping costs. Celine was built largely as a wooden frame nailed and wood glued together that couldn't be taken apart. She needed to be shipped in a box because she wouldn't fit properly in any standard luggage size I could find. Shipping costs across the country sometimes cost as much as $400, and every time I was nervous she would come out of it in shambles.

![Photograph of stuffing the cow in a Pelican case for shipping](/optimized/portfolio/uddermayhem/shipping.webp)

So when [MAGFest](https://super.magfest.org/) accepted the game for January 2026, I rebuilt both.

### A body that fits in a suitcase

The new body is CNC-routed plywood, cut so the panels stack flat and the whole cow, monitor included, packs into a regular checked bag. A friend's shop did the routing over the holidays.

![Video of a CNC router cutting the plywood panels for the cow body](/optimized/portfolio/uddermayhem/v2_cnc.mp4 "/optimized/portfolio/uddermayhem/v2_cnc_poster.webp")

![Photograph of the plywood cow body assembled on a workbench, udder hanging underneath](/optimized/portfolio/uddermayhem/v2_body_bench.webp)

### A new udder, two ways

The udder was recast from a new mold, then filled with what I hoped was a sturdier mechanism than magnets: four tactile buttons on a printed cap, so each teat would click like a real button.

![Video of the first squeeze tests on the plywood body, watching the serial monitor on a laptop](/optimized/portfolio/uddermayhem/v2_bench_test.mp4 "/optimized/portfolio/uddermayhem/v2_bench_test_poster.webp")

| | |
| -- | -- |
| ![Photograph of a freshly cast pink silicone udder on top of its mold](/optimized/portfolio/uddermayhem/v2_udder_mold.webp) | ![Photograph of the udder mold being opened with a pair of scissors](/optimized/portfolio/uddermayhem/v2_udder_demold.webp) |

That version lasted until the hotel room the night before doors. The buttons wanted a straight, centred press and a squeeze is neither, so the second version put a rod inside each teat that smacks a button at the top of the udder when you squeeze. We tested it on the bed with the serial monitor open.

![Video of the button udder being squeeze-tested in a hotel room with the Teensy serial monitor on a laptop](/optimized/portfolio/uddermayhem/v2_button_test.mp4 "/optimized/portfolio/uddermayhem/v2_button_test_poster.webp")
![Photograph of a friend staring down the button udder on a hotel room table covered in tools](/optimized/portfolio/uddermayhem/v2_hotel_buttons.webp)

### The game grows up

The game changed as much as the cow. [Kevin Mitchell](https://soundcloud.com/aphonicdnb) joined the codebase at the end of 2024 and has been co-building it since. His first additions were a new title song, an autoplay mode so the game can demo itself when nobody is squeezing, and a local leaderboard with arcade-style initials entry. Sound on for the title screen:

![The Udder Mayhem title screen with its animated logo and Kevin Mitchell's title song](/optimized/portfolio/uddermayhem/game_title.mp4 "/optimized/portfolio/uddermayhem/game_title_poster.webp")

| | |
| -- | -- |
| ![The level select screen: Choose A Song, with Easy, Medium and a Hard marked coming soon](/optimized/portfolio/uddermayhem/game_levelselect.webp) | ![The initials entry screen after a round, with a countdown in the corner](/optimized/portfolio/uddermayhem/game_initials.webp) |

The January 2026 sprint for MAGFest turned a single-song demo into something closer to a real arcade game:

- **Three difficulties.** Easy, Medium and Hard are now data-driven level configs, each with its own tempo and tutorial, chosen from a new level select screen.
- **Charting by MIDI.** New levels are written in a DAW and converted straight into cup notes by a script, instead of typing out every beat by hand.
- **Arcade manners.** An attract mode kicks in after a minute idle, there's a volume slider, a countdown on the initials entry so nobody camps the end screen, and difficulty labels on the leaderboard.
- **Feedback.** Streak counters with a multiplier, rainbow text when you're on a run, and a set of new cup illustrations, difficulty buttons and UI from me.
- **Gamepad support**, with the four teats mapped to the face buttons, so the game can be played, tested and shown without the udder attached.

### MAGFest 2026

The cow was assembled on the show floor, named Mooriah Dairy, and played for four days straight under coloured lights.

![Video of the cow body being assembled on the MAGFest show floor](/optimized/portfolio/uddermayhem/v2_magfest_build.mp4 "/optimized/portfolio/uddermayhem/v2_magfest_build_poster.webp")

![Video of Mooriah Dairy lit up on the MAGFest floor](/optimized/portfolio/uddermayhem/v2_magfest_mooriah.mp4 "/optimized/portfolio/uddermayhem/v2_magfest_mooriah_poster.webp")

![Photograph of Mooriah Dairy glowing under the MAGFest lights with the title screen showing](/optimized/portfolio/uddermayhem/v2_magfest_lit.webp)

![Photograph of the crew posing with the cow at MAGFest](/optimized/portfolio/uddermayhem/v2_magfest_crew.webp)

MAGFest crowds are not gentle. People yanked, twisted and hammered the teats, and by the end of the weekend the rods had bent, the buttons had loosened, and the udder was back on the hotel table.

![Photograph of Karina laughing at a hotel room table with the foam udder core in front of her, its sensor wires poking out the top](/optimized/portfolio/uddermayhem/v2_hotel_debug.webp)

### Warped Inputs @ GDC

In March she went to San Francisco for [Warped Inputs](https://warpedinputs.com/), the alternative controller showcase alongside GDC, where she was a featured game.

![Video of players at the Udder Mayhem tent at Warped Inputs](/optimized/portfolio/uddermayhem/v2_warped_inputs.mp4 "/optimized/portfolio/uddermayhem/v2_warped_inputs_poster.webp")

| | |
| -- | -- |
| ![Photograph of a player in headphones squeezing the udder under the Warped Inputs tent](/optimized/portfolio/uddermayhem/v2_warped_player.webp) | ![Photograph of the Udder Mayhem tent at Warped Inputs with people waiting](/optimized/portfolio/uddermayhem/v2_warped_tent.webp) |

## Udder 2.5: force sensors in foam (2026)

MAGFest settled it: anything mechanical inside a teat gets destroyed. The third udder has no moving parts at all. Four force-sensitive resistors are cast straight into flexible polyurethane foam inside a Dragon Skin silicone shell, so the whole teat is the sensor and there is nothing to bend or misalign. It reads pressure rather than a click, which also means the game can tell a squeeze from a poke.

![Photograph of a gloved hand pressing a force-sensitive resistor down into polyurethane foam rising inside the pink silicone udder](/optimized/portfolio/uddermayhem/v25_foam_cast.webp)

It is the most robust version yet, and the first one I'd trust to survive a Maker Faire without a repair kit. I wrote the full build up as a how-to for *Make:* magazine, which is coming soon. Until then, the mold files, the mounting template and the sensor test sketch are in the [MakeMagazine folder of the repo](https://github.com/karomancer/uddermayhem/tree/main/MakeMagazine).

### What changed in the game

The September 2026 pass, ahead of Maker Faire, went after the two things people noticed most: timing and juice.

Hit detection used to be physical, a cup sprite overlapping a teat's collider in Unity. It now judges every squeeze against the song clock with explicit timing windows, a per-cabinet input latency offset that can be calibrated on the show floor, and a test suite so a change to the rules can't quietly break the feel. Squeezes are graded Failed, Good, Superb or Perfect, and the end screen tells you which.

On the art side the cups are layered sprites now, with slide-in and pickup frames, a milk splash on the teat, a little wiggle, and an illustrated tip jar that fills as your streak grows. Rachel the barista finally reacts to a good pour: she winks at you on the Good path once you're above 60%, and loses her mind on the Superb path above 80%.

| | |
| -- | -- |
| ![Gameplay on the Good path: Rachel winks and says Nice! as the streak climbs past 70](/optimized/portfolio/uddermayhem/game_grade_good.webm "The Good path, above 60%") | ![Gameplay on the Superb path: Rachel with starry eyes saying Great! as the streak passes 90](/optimized/portfolio/uddermayhem/game_grade_superb.webm "The Superb path, above 80%") |

Kevin synced the title screen animation to the beat and moved the cabinet onto a Raspberry Pi: the game runs as a kiosk build in Chromium on a touchscreen, boots straight into attract mode, has an Event Mode that turns off wifi and Bluetooth, and takes hotfixes from a USB stick, which is exactly the kind of thing you want at hour six of a Maker Faire.

## What's next

Bay Area Maker Faire, September 25–27, 2026, with Mooriah and the new udder. After that, I want to try a teat that works like a Panic Pete toy, using the air displaced by a squeeze to pop a peg into a button. That would make each teat a clean binary input with no foam to compress over time. If you build your own, or just want to argue about cows, find me on [X](https://x.com/karomancer) or [Instagram](https://www.instagram.com/karinamakes/).
