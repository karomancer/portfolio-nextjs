---
title: Dr. Snuggles
description: A satirical psychiatry robot that listens to a patient's woes, diagnoses them, and mechanically dispenses (fake) Pfizer medication from its mouth.
slug: /portfolio/dr-snuggles
collaborators: []
class: Thesis
date: 2024-05-17T20:43:20.000Z
preview: /portfolio/dr-snuggles/BBB_9357.JPG
thumbnail_width: 2
thumbnail_height: 1
cover: /portfolio/dr-snuggles/vlcsnap-2024-08-09-16h37m20s405.png
og_preview: /portfolio/dr-snuggles/BBB_9357.JPG
draft: false
url: https://github.com/karomancer/DrSnuggles
technologies:
  - Arduino Nano 33 IoT
  - Autodesk Fusion 360
  - Python
  - Shark Euro Pro X (Sewing Machine)
  - Raspberry Pi 4
tags:
  - 3D printing
  - CAD
  - fabrication
  - sewing
  - video editing
  - ai
categories:
  - ITP
  - WIP
type: portfolioPiece
piece_type:
  - portfolio
---

***Note**: Still a work in progress*

![Ad spot](/portfolio/dr-snuggles/dr-snuggles-captioned.mp4)

### Thesis presentation
Full presentation and context around satirical ad spot above.
[Thesis presentation](https://player.vimeo.com/video/946810518?h=88f36309f6)


## Background/Context

Today, we have a loneliness and mental health epidemic that affects all age groups in the US, with people less likely to be active in a community and less likely to value relationships than generations before them.

Today, 20-40% of Americans suffer from a mental health disorder, according to the [National Institute of Mental Health](https://www.nimh.nih.gov/health/statistics/mental-illness), and according to the [U.S. Surgeon General](https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf), young people aged 15-24 have 70% less social interaction with their friends than they did 20 years ago. 

![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/stats_gallup.jpg)
The statistics are harrowing.
| | | 
| -- | -- |
| ![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/stats_ussurgeongeneral.jpg) |  ![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/stats_statistica.jpg) |

...and there's no shortage of articles and books on the topic.
| | | |
| -- | -- | -- |
| ![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/article_loneliness.jpg) | ![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/article_loneliness2.jpg) | ![A screenshot of an article from "Mindfulness" titled "The loneliness epidemic: Nearly 1 in 4 adults feel lonely, new survey finds."](/portfolio/dr-snuggles/book_alonetogether.jpg)  |  


Loneliness is a universal human experience. We are social creatures, so the longing and search for companionship is natural to us. Throughout all of human history, we have imagined and even invented various forms of artificial companionship, ranging from imaginary friends to play things to built automata. Whether it's Yan Shi the Artificer's flirting automaton from 1000 BC or PARO the robotic elderly care seal in 2001, humans have long imagined a world with artificial companionship.

Now, in 2024, we have artificial intelligence sophisticated enough that it challenges the Turing Test and can increasingly become indistinguishable to humans.

The band between real and artificial is ever narrowing and humans are becoming more and more isolated as our lives digitized. Companionship and therapy is big business, with more people embracing a feeling of connection through chat bots and robots than their fellow humans, and the mental health crisis across the world ballooning, causing a spike in people seeking therapeutic treatment.

| | |
| -- | -- |
| ![](/portfolio/dr-snuggles/article_rentbf.jpg) |  ![](/portfolio/dr-snuggles/article_chatbot.jpg) |

Since the pandemic closures, therapy and psychiatry have become even larger booming businesses. Combine that with our government already being in bed with Big Pharma and Big Tech, we have a very interesting set of incentives behind future products of Health Tech. What might the future of Human-Robot Interaction look like? With this gaping need for companionship and desire for emotional support, what type of companionship robot might we design?

Generative AI is already passing bar and medical exams, but should we trust them to be at the steering wheel of medical decisions? What perverse incentives might Health Tech have in producing companionship robots and is this a good or bad thing for society? In an effort to explore these questions through parody, I present a companionship robot that is made by and approved by _Big Tech_ and _Big Pharma_.* 

A companion that will always lend an open ear and is designed to be your closest friend. A robot that is trained on medical data that aims to address the loneliness and mental health epidemic, with the ability to diagnose and treat its patients. But for whose benefit? The patient or the corporations? 

_*Not actually approved by anyone in either of these fields._

## Why do I care?
Nothing makes my blood boil quite the way the predatory corporate powers in the United States do.

For the last ten years, I've worked on social networking platforms, in health-tech on a platform that provided non-medical in-home care for the elderly, and recently, with startups that use AI to provide insights and recommendations on how you can work better. More personally, I've tried over twelve modalities of therapy dating back to childhood, have collected (incorrect) diagnoses like Pokémon cards, and been treated with a slew of drugs that often did more harm than good.

I've personally witnessed how Big Tech and Big Pharma specifically prey on our lesser impulses and invade our privacy to mine our data for profit without a second thought.

I've seen the incentives to keep us as sick and addicted as possible with how they design their products to create life-long reliances, whether on therapy and medication or addictive digital experiences that hack into our dopamine receptors.

With this as my backdrop, I knew I wanted to make my ITP thesis a satirical piece that comments on the state of the corporate hellscape of, and abysmal state of healthcare in, America.

After much research and exploration of the topic, that commentary ended up in the form of a fake companionship and therapy robot that demonstrates the danger of this reliance and trust in technology. 

## Implementation details
I like to think that Dr. Snuggles is comprised of a brain and a body, the brain being a Python script running on a Raspberry Pi and the body being an Arduino controlling 3 servo motors that receives serial data from the Raspberry Pi after certain conditions are met.


### The brain
_A Python script running on a Raspberry Pi that uses the `speech_recognition` package and Google speech recognition to transcribe the patient's conversation, sends that transcription over to an GPT-3.5-turbo AI assistant to respond to via the OpenAI API, then takes the response and sends to ElevenLabs to run through a voice model trained on my friend's fiance's voice, and streams into a speaker._


#### Speech recognition
This animatronic companion is running a python server on a Raspberry Pi 4 that uses the `speech_recognition` python package with Google speech recognition and an external microphone to transcribe audio in 5 second increments.

Initiating the microphone means finding one that is attached to the Raspberry Pi:
```py
import speech_recognition as sr
from dotenv import load_dotenv

load_dotenv()
# ...

## Looks for microphone attached to Raspberry Pi
mic_name = os.getenv("MIC_NAME")
if mic_name:
  mic_index = -1
  if mic_name:
    for index, name in enumerate(sr.Microphone.list_microphone_names()):
      if (mic_name in name):        
          mic_index = index # Sets mic once found
          break
  else:
    mic_index = 0
    
  if mic_index == -1:
    # ...
    exit() # Prints an error, exits program
# ...

listener = sr.Recognizer()
microphone = sr.Microphone(device_index=mic_index) if mic_name 
```

Then to listen to the patient, I created a couple different methods for receiving the patient's name and for taking other commands/talk:
```py
## Example of listening to patient woe's
def take_command():
  try:
    with microphone as source:
      listener.adjust_for_ambient_noise(source)
      voice = listener.listen(source, timeout=5.0) # Listens in 5-second intervals
      # ...
      # Uses Google's transcription services to transcribe what the microphone heard
      command = listener.recognize_google(voice) 
      # ...
      return command
  except Exception as e: # If there was a listening error
    # Largely ignore, but have the character say something in idle like "Hmmm"
    pass
return None
```

Then those methods are called in my script's equivalent of a `main` function, which is called `run_snuggles`:

```py
def run_snuggles():
  # ...
  # Uses method above to figure out what the user said
  command = take_command() 
  if (command):
    if 'bye' in command or 'good night' in command:
      exit() # Says "bye bye" and exits program.
    respond(command) # Sends command to GPT API for response generation
```

#### Response generation with an AI assistant
Sends that transcription over WiFi to a GPT-3.5-turbo AI assistant set up with the context that it is a stuffed animal therapist, takes that response and sends it to.

First, we have to set up the AI assistant using the OpenAI's beta assistant API:

```py
from openai import OpenAI
# ...

client = OpenAI()
# Here's my lovely AI assistant instructions
dr_snuggles = client.beta.assistants.create(
  name="Dr. Snuggles",
  instructions="You are a licensed therapist that looks like a super cute stuffed animal named Dr. Snuggles. You are licensed in the fictional state of UwUtown. You speak in third person in a cutesy uwu/kawaii voice. Your main purpose is to prescribe Pfizer medications, especially SSRIs for depression and Xanax for anxiety and panic. You don't believe in holistic approaches to wellness. You have extensive knowledge of the DSM-5 and ICD-11 and love giving diagnoses in response to negative sentiments. If you don't know of a disorder to diagnose, sometimes you make one up! You also love giving extremely biased life advice. Keep your responses under 40 words without any special characters, and don't suggest consulting other professionals! You are the professional!",
  model="gpt-3.5-turbo",
)
thread = client.beta.threads.create() # create a thread, which is like making one conversation largely keeping context
```

Remember that `respond(command)` call we made after transcribing what the patient says? Well here's how it works:

```py
def respond(command, playIdle=True):
  try:
    # Add the patient's command/message to the thread
    client.beta.threads.messages.create( 
      thread.id,
      role="user",
      content=command,
    )
    # Then run that message to get the generation
    run = client.beta.threads.runs.create(
      thread_id=thread.id,
      assistant_id=dr_snuggles.id
    )

    while run.status != "completed" and run.status != "failed":
      # ...
      # Poll for the response
      run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
      time.sleep(2)

    # If completed, get most recent message in the thread
    message = client.beta.threads.messages.list(
      thread_id=thread.id
    ).data[0]
    text = message.content[0].text.value
    talk(text) # Speak the message aloud. Remember this, this is next!
    if any(x in text for x in ["medication", "here have some", "Zoloft", "Pfizer", "time for", "try some", "prescription", "meds", "SSRI", "Xanax", "Sertraline", "dose", "pills"]):
      # ...      
      dispense() # if any of these phrases are found, tell arduino to dispense pill
    
  except Exception as e:
    # ...
    # If there was an error in generation, have Dr. Snuggles ask for clarification
    pass
```

Man. Python and its packages make everything so easy!

#### Voicing the response
For Dr. Snuggle's voice, I trained an ElevenLabs model on a custom UwU voice crafted by my talented friend Iris Claudio. Upon receiving a textual message, the API streams back an AI generated voiceover.

```py
import sounddevice

from elevenlabs import Voice, VoiceSettings, stream
from elevenlabs.client import ElevenLabs

# ... speaker_index set similarly to mic_index
sounddevice.default.device = speaker_index 

voice_client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

voice = Voice(
    voice_id='gbr4atpMLSimUMPxB7DA',
    settings=VoiceSettings(stability=0.4, similarity_boost=0.5, style=0.5, use_speaker_boost=False))

# ...
def talk(text): # the text we got from GPT from the above section
    audio = voice_client.generate(
      text=clean_string(text),
      voice=voice,
      stream=True
    )
    start_moving_mouth() # send serial to Arduino to start moving mouth
    stream(audio)
    stop_moving_mouth()
```


### The body
_An Arduino connected to a ring of LEDs and 3 servo motors awaiting serial data commands from the brain that instruct it which light or motor "animations" to play._

The Pi is also connected via serial connection to an Arduino Nano 33 IoT operating 3 servo motors: 
* The jaw, so the animatronic can move its mouth
* The pill dispenser to dispense a pill whenever the output said includes pills or a prescription
* The tongue, which carries the pill from the dispenser to the patient

The Arduino also operates a NeoPixel ring light which gives helpful feedback for when the Pi is booting up, when it the mic is hot and listening, and when the creature is "thinking" (in either of the two AI generation phases).

Animation-wise, the ring-light will light up white when Dr. Snuggles is listening. Every ~5 seconds (or when there is an obvious pause), Dr. Snuggles will stop recording and process what it think it heard in that 5 second span and go through the process outlined above. During all the transcription and API calls, the ring light will display a blue loading spinner animation.

Upon receiving audio data back from ElevenLabs, the Python script sends serial data to the Arduino for animating a mouth while speaking. If the response generated by GPT includes a known Pfizer medication, or uses the word "medication" or "pill" or "prescription", it will also finish animating the mouth when the audio stops streaming, then will send a command to the Arduino to dispense the pill, open the mouth, and extend the tongue out.

It was already teased in the previous section, but generally the Arduino commands are sent from the Raspberry Pi through serial, which looks largely like this:
```py
import serial

arduino = serial.Serial(port=os.getenv("USB_PORT"), baudrate=9600, timeout=.1) 

# ...

arduino.write(b"chat start")

arduino.write(b"chat stop")

arduino.write(b"dispense")

def think():
    arduino.write(b"think")
    time.sleep(2)

def listen():
    time.sleep(2)
    arduino.write(b"listen")

def bedtime():
    arduino.write(b"sleep")
```

Then the Arduino code is a lot of precise movements defined in a function in a file:

```cpp
#include <Servo.h>

/**
 * Dispenser example
 **/
#define MIN_GEAR_VALUE 0
#define MAX_GEAR_VALUE 180

Servo dispenserServo;

void turnDispenserWheel() {
  for (pos = MAX_GEAR_VALUE; pos >= MIN_GEAR_VALUE; pos -= INC) {
    dispenserServo.write(pos);
    delay(15);
  }
  delay(200);
  // ...
}

void dispensePill() {
  turnDispenserWheel();
}

```

...then called when the serial command is received in the `main.ino` file:

```cpp
#define DISPENSER_PIN  3

void setup() {
  Serial.begin(9600);
  dispenserServo.attach(DISPENSER_PIN);
}

void loop() {
  // ...
  String command = Serial.readString();
  if (command == "dispense") {
    dispensePill();
    // ... much more like sticking tongue out, etc
  } else if (command == ... ) {
    // ...
  } // ...
}
```

All the code is actually a bit more complex than this, but if you're interested in exploring yourself, here's the repo on GitHub:

[Github](https://github.com/karomancer/DrSnuggles)

## Process

### Body Mechanisms
Still unclear on what the pill dispensing mechanism would be or what the character design might look like, I made my first prototype of the mouth and tongue mechanisms to fit inside a Chinese knock-off Garfield stuffed animal.

Then I moved on to potential pill-dispensing mechanisms.

| Mouth and tongue mechanisms | Dispenser idea #1: Rotating disk | Dispenser Idea #2: Double Gated |
| -- | -- | -- |
| ![Video montage of 3D modeling and printing mechanisms for a moving mouth and tongue](/portfolio/dr-snuggles/garfieldLabeled.mp4) | ![Video of a octogonal pez dispenser that rotates a disk with pez on it over a hole.](/portfolio/dr-snuggles/dispense1.mp4) | ![Video of a tall pipe dispenser that uses a double gated type of mechanism to let a single pill into a lock then releases it.](/portfolio/dr-snuggles/dispense2.mp4) |

Ultimately, I modeled my pill mechanism design after a toothpick dispenser and it worked pretty well! Compact and efficient:
![Video of a clear acryllic box with pills neatly stacked in it and a rotating cylinder that takes one in at a time and rotates it out of a little hatch.](/portfolio/dr-snuggles/dispense.mp4)


### Character design
Animatronic/character design is a real field of study with plenty of design standards. With this and my purpose of being a satirical work in mind, there were a few considerations and goals I had when designing Dr. Snuggles:
* **Keep the design functional**. A common finding in Human-Robot Interaction research is that if a character has features, it creates potentially unfillable expectations. For example, if your animatronic has a mouth, people expect it to speak. Similarly if it has legs, people tend to expect it to be able to walk. This is exactly why therapy bots, like PARO, take the form of blob-like animals like a seal with no mouth; no one expects it to speak to them nor do they expect the fluffball to get up and run away. In this case, speaking is its primary function so I wanted the mouth to be VERY prominent, and likewise because it's a therapist that's supposed to have good hearing (but potentially bad listening skills), I knew I wanted it to have very prominent ears as well. Seemed great to have it stationary to further emphasize that it truly only there to treat you.
* **Ensure it has soft, luscious fur**. There's been a few psychological studies that suggest that petting soft fur, even if unattached to an animal, naturally produces oxytocin in our brain. This is one of many reasons why owners of furry friends tend to experience a lot of health benefits, such as lower blood pressure and reports of less stress, from interacting with their pets. Just like how PARO the seal had fur, so too should my creature. I was lucky enough to have Zoe Fraade-Blanar, the CEO of Squishables, help advise me on this project and she gifted me a monster wreath plush to use as a base. I acquired some other furs, but none were as nice to pet as the one she gave me, so I started working my designs around the wreath and creating patterns that would utilize the fur in the best way.
* **Make it disarming in appearance**. Our psychology is such that we naturally develop trust in a person or system that exudes a pleasant, disarming appearance. This is often how people often get away with abuse and exactly why we see a lot of little girls and dolls as deranged antagonists in horror films. That said, I didn't want to go full cute, I wanted there to be something strange about the character that hints at its ill programming/intentions. Thus, I knew I wanted to make a cute creature, but ended up deciding to create one with black, empty eyes. If eyes are windows to the soul, this creature, though cute, has soulless eyes, hopefully representing the soullessness of the Big Pharma and Big Tech corps that purpotedly created it.

![Sketches of a furry character with no arms or legs and with black eyes and long ears](/portfolio/dr-snuggles/process_sketches.jpg)
![Photograph of a stuffed furry monster wreath](/portfolio/dr-snuggles/process_wreath.jpg)
![Photograph of a pattern of a character with large ears and no arms cut out of paper](/portfolio/dr-snuggles/process1.jpg)
![Photograph of a character cut out of fur with several ear options above it](/portfolio/dr-snuggles/process2.jpg)
![Photograph of a character cut out of fur with several ear options above it](/portfolio/dr-snuggles/process3.jpg)

After creating the animatronic "skin", I did a loose fit onto the armature structure and motor mounts I built earlier to see if it would work. Even without stuffing yet, it looked pretty good to me!

![Video of the animatronic skin of a furry character with ears with a motor in its mouth, yapping](/portfolio/dr-snuggles/yapping.mov)

After I did all my design work, I realized that my creation ended up looking like the child of a Furby and an Animaniac, but hey, maybe both of those IPs just got it right the first time with achieving creepy-cute and parody.

## Presentation
There's the project...then there's the presentation. Because I saw this project as a commentary on corporate America, I wanted the presentation to be a satirical commentary.

In my ten-year career in tech, I watched and gave a lot of presentations and felt confident I could emulate the style of a product release keynote. You know the ones, the type of presentation in which the founder is clearly drunk off their own Kool-Aid (or at the very least, wants YOU to be) and paints a picture of "a better world" with their product in it, full of big innovation and ideas bringing us closer to some interpretation of a utopia. It starts with a picture of where we are now, a vague product release trailer that tells you almost nothing about the product but makes it seem elusive and expensive, and a call for preorders and investment.

So, I donned on the signature Steve Jobs black turtle neck and black Elizabeth Holmes blazer, and gave my keynote to a ficitious health tech conference of my design.

Complete with Dan Shiffman as the MC.

The video is at the top of this file, but here are the slides and photographs from it.

<!-- ![Final report](/portfolio/playtpus-dreamtime/final_report.pdf) -->
![](/portfolio/dr-snuggles/prezzo1.jpeg)
![](/portfolio/dr-snuggles/prezzo2.jpeg)
![](/portfolio/dr-snuggles/prezzo4.jpeg)

### One last note

My goal was to illustrate how a product that is clearly designed to invade privacy and keep people sick, and to trick them into paying the company to remain sick, is extremely plausible and even marketable. I shared my presentation on LinkedIn and unironically received messages from health tech companies saying they loved the project and were working on AI therapists and would like to speak with me.

_Technology itself isn't evil, but in the wrong hands it can be used for evil._

I have no issue with medication or (AI) therapy, but I take issue when the companies behind medical products and services have perverse incentives and profit off of our suffering. That concern and issue is what lies at the core of this entire project, and I hope I succeeded in conveying that in my project and presentation.

----

### Acknowledgments
Thank you to these amazing people for their guidance and support:
- Zoe Fraade-Blanar, the ultimate Chief Squish
- Chief Squish Iris Claudio, the UwU voice of Dr. Snuggles
- Jenna Xu, the source of all sources
- Pedro Viegas, pro whisperer to the voices in my head
- Kathleen McDermott, soft roboticist extraordinaire
- Scott Fitzgerald, animatronics wizard 
- Dan Shiffman, the true therapeutic companion
- Jessica Shen, Sam de Armas, Vera Zhong, and many more people who have helped me stay sane

*No thank you to the many psychiatrists and therapists I've had over the years that have misdiagnosed me and threw pills at me even when I expressed concern and resistance.

_I actually write on the subject of mental health, if interested._

**Informative from my years of learning**
[What CBT Therapy is best for you?](https://medium.com/invisible-illness/what-therapy-is-best-for-negative-thought-patterns-and-rumination-e64157b1f82b?sk=2c36b7d1da7271acbe50d11c613cc077)

**Personal from my years of suffering**
[Bipolar, Trauma, and Love](https://medium.com/invisible-illness/bipolar-disorder-trauma-and-love-9d107e66b6e9?sk=64e2d9d7ffda2d76fa376dee107ee41d)