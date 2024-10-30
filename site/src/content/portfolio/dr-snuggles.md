---
title: Dr. Snuggles
description: A home-care robot that provides therapeutic care and companionship to the ever growing population of lonely individuals in the US. Approved by Big Pharma and Big Tech* (this is pure satire).
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
---

![Ad spot](/portfolio/dr-snuggles/dr-snuggles-captioned.mp4)

### Thesis presentation
Full presentation and context around satirical ad spot above.
[Thesis presentation](https://player.vimeo.com/video/946810518?h=88f36309f6)


## Inspiration
Nothing makes my blood boil quite the way the predatory corporate powers in the United States do.

As a person who has tried over twelve modalities of therapy dating back to childhood, has collected (incorrect) diagnoses like Pokémon cards, and was treated with a slew of drugs that often did more damage than good, then subsequently worked in tech and repeatedly saw how Big Tech designs products specifically to prey on our lesser impulses and invades our privacy to mine our data for profit without a second thought, I knew I wanted to make my ITP thesis a satirical piece that comments on the state of the corporate hellscape of, and abysmal state of healthcare in, America.

## Background/Context

We have a loneliness and mental health epidemic that affects all age groups in the US, with people less likely to be active in a community and less likely to value relationships than generations before them.

Today, 20-40% of Americans suffer from a mental health disorder, according to the [National Institute of Mental Health](https://www.nimh.nih.gov/health/statistics/mental-illness), and according to the [U.S. Surgeon General](https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf), young people aged 15-24 have 70% less social interaction with their friends than they did 20 years ago. It's no wonder people are turning to robots like PARO, MyRealBaby, and Replika more and more for emotional connection.

Since the pandemic closures, therapy and psychiatry have become even larger booming businesses. Combine that with our government already being in bed with Big Pharma and Big Tech, we have a very interesting set of incentives behind future products of Health Tech. What might the future of Human-Robot Interaction look like? With this gaping need for companionship and desire for emotional support, what type of companionship robot might we design? Generative AI is already passing bar and medical exams, but should we trust them to be at the steering wheel of medical decisions? What perverse incentives might Health Tech have in producing companionship robots and is this a good or bad thing for society? In an effort to explore these questions through parody, I present a companionship robot that is made by and approved by Big Tech and Big Pharma*. A companion that will always lend an open ear and is designed to be your closest friend. A robot that is trained on medical data that aims to address the loneliness and mental health epidemic, with the ability to diagnose and treat its patients. But for whose benefit? The patient or the corporations? *Not actually approved by anyone in either of these fields.

## Creation

This animatronic companion is running a python server on a Raspberry Pi 4 that uses the `speech_recognition` python package with Google speech recognition and an external microphone to transcribe audio in 5 second increments, sends that transcription over WiFi to a GPT-3.5-turbo AI assistant set up with the context that it is a stuffed animal therapist, takes that response and sends it to an ElevenLabs model trained on a custom UwU voice crafted by my talented friend Iris Claudio, then played back through a speaker. The Pi is also connected via serial connection to an Arduino Nano 33 IoT operating 3 servo motors: One for the jaw, so the animatronic can move its mouth, one for a pill dispenser to dispense a pill whenever the output said includes pills or a prescription, and one for the tongue, which carries the pill from the dispenser to the patient. The Arduino also operates a NeoPixel ring light which gives helpful feedback for when the Pi is booting up, when it the mic is hot and listening, and when the creature is "thinking" (in either of the two AI generation phases).

## Research

Loneliness is a universal human experience and the longing and search for companionship is a strong motivator and has been the source of much of our struggle as well as much of our innovation. Since we are social creatures, it comes as no surprise that we have imagined and even invented various forms of artificial companionship, ranging from imaginary friends to play things to built automata. Functional companion automata have flourished in our society since before the invention of the word "robot" and continue to appear with increasingly frequency in science fiction novels and movies. Whether it's Yan Shi the Artificer's flirting automaton from 1000 BC or PARO the robotic elderly care seal in 2001, humans have long imagined a world with artificial companionship. Today, the band between real and artificial is ever narrowing and humans are becoming more and more isolated as our lives digitized. Companionship and therapy is big business, with more people embracing a feeling of connection through chat bots and robots than their fellow humans, and the mental health crisis across the world ballooning, causing a spike in people seeking therapeutic treatment. As a person who not only worked in the social networking space, a platform that provided non-medical in-home care for the elderly, and recently, on startups that use AI to provide insights, I'm seeing a troubling trend filled with perverse incentives. Crony capitalism has led industries like Big Pharma and Big Tech incentivized to keep us sick by creating a life-long reliance on therapy and medication and to hack into our dopamine receptors to make us addicted to digital interactions. In the US, Baby Boomers are an enormous demographic and are less likely to grow old in place and more likely to be put into nursing homes without friends and family. Studies have shown that growing old in an unfamiliar environment without proper social support increases chances of developing dementia, and that's on top of the already increased likelihood of Baby Boomers suffering from heart disease and diabetes than generations before them due to poor diet and stress. Similarly, young people today are much more likely to be socially isolated and depressed than young people of the past, with teen suicides on a dangerous path upwards, in step with amount of time spent on digital platforms. Then, for those in the middle, expectations are so great for partners and friends that none can ever meet those expectations. It's no wonder that people are seeking help and companionship elsewhere when their reality is so grim. With this as my backdrop, I wanted to make an art piece in the form of a fake companionship and therapy robot that demonstrates the danger of this reliance and trust in technology. 

### Acknowledgments
Thank you to these amazing people for their guidance and support:
- Zoe Fraade-Blanar
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