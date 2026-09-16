import {
  Application,
  Assets,
  Container,
  FillGradient,
  Graphics,
  Sprite,
  Text,
} from "pixi.js";
import { DropShadowFilter, MotionBlurFilter } from "pixi-filters";

import WORLDGATE_DATA from "./generated-worldgate-data.json";

import {
  APERTURE_PROPORTION,
  APERTURE_SIZE,
  MASK_GRADIENT,
  DRUM_GRADIENT,
  SIZE,
} from "./constants";
import {
  getHourHandRadians,
  getMinuteHandRadians,
} from "./utils/clock-geometry";

const clockFaceTexture = "/optimized/portfolio/materia-magica/clock/clock-face.png";
const apertureTexture = "/optimized/portfolio/materia-magica/clock/aperture.png";
const marabahTexture = "/optimized/portfolio/materia-magica/clock/marabah.png";
const trigaelTexture = "/optimized/portfolio/materia-magica/clock/trigael.png";
const hourHandTexture = "/optimized/portfolio/materia-magica/clock/hour-hand.png";
const minuteHandTexture = "/optimized/portfolio/materia-magica/clock/minute-hand.png";
const backgroundTexture = "/optimized/portfolio/materia-magica/clock/backing.png";
const brassDrum = "/optimized/portfolio/materia-magica/clock/brass-drum.png";
const bladeTexture = "/optimized/portfolio/materia-magica/clock/blade.png";

export const getCenter = (app: Application) => [
  app.screen.width / 2,
  app.screen.height / 2,
];

export const getSpellRegenCounterY = (value: number) => {
  const centerY = SIZE / 2;
  const digitLineHeight = 48; // default lineHeight (yay magic numbers)
  const windowY = centerY + APERTURE_SIZE / 4; // Top of the mask window
  const windowHeight = APERTURE_SIZE / 6; // Height of the mask window
  // Position so digit 0 is centered in window, then scroll up by value * lineHeight
  const startY = windowY + windowHeight / 2 - digitLineHeight / 2;
  return startY - value * digitLineHeight + 5; // extra +5 is for visual centering since the banner goes over the cut out a bit
};

export const getPortalCounterY = (index: number) => {
  const centerY = SIZE / 2;
  return centerY + APERTURE_SIZE / 12 - index * 20;
};

export const genTextDrum = async (
  textStr: string,
  textSize: number = 36,
  lineHeight: number = 48,
) => {
  const brassDrumTexture = new Sprite(await Assets.load(brassDrum));
  const container = new Container();
  const text = new Text({
    text: textStr,
    style: {
      fill: "#2b1700",
      fontSize: textSize,
      fontFamily: "Cinzel Decorative, serif",
      fontWeight: "bold",
      align: "center",
      lineHeight,
    },
    anchor: { x: 0.5, y: 0 },
  });

  const bg = new Sprite(brassDrumTexture.texture);
  bg.anchor.set(0.5, 0); // This basically centers the bg horizontally
  bg.y = text.y - lineHeight + 10;
  bg.width = text.width;
  bg.height = text.height + lineHeight + 10;

  const gradient = new Graphics({ alpha: 0.9 });
  // Graphics don't have anchor so we can't center the graphic the same way.
  // We gotta calculate manually.
  // Since bg anchor is (0.5, 0), x position is centered, y position is at the top
  const gradientX = bg.x - bg.width / 2;
  const gradientY = bg.y;
  gradient.rect(gradientX, gradientY, bg.width, bg.height);
  gradient.blendMode = "multiply";
  gradient.fill(DRUM_GRADIENT);

  container.addChild(bg);
  container.addChild(gradient);
  container.addChild(text);

  return container;
};

export const genPortalTextDrum = async (
  names: string[],
  defaultTextSize: number = 14,
  smallTextSize: number = 10.5,
  lineHeight: number = 20,
  longNameThreshold: number = 15,
) => {
  const brassDrumTexture = new Sprite(await Assets.load(brassDrum));
  const container = new Container();
  const textContainer = new Container();

  // Find the widest name at default size to set consistent width
  let maxWidth = 0;
  for (const name of names) {
    const testText = new Text({
      text: name,
      style: {
        fill: "#2b1700",
        fontSize: defaultTextSize,
        fontFamily: "Cinzel Decorative, serif",
        fontWeight: "bold",
        align: "center",
      },
    });
    maxWidth = Math.max(maxWidth, testText.width);
    testText.destroy();
  }

  // Create individual text objects for each name
  let yOffset = 0;
  for (const name of names) {
    const isLongName = name.length >= longNameThreshold;
    const fontSize = isLongName ? smallTextSize : defaultTextSize;

    const text = new Text({
      text: name,
      style: {
        fill: "#2b1700",
        fontSize,
        fontFamily: "Cinzel Decorative, serif",
        fontWeight: "bold",
        align: "center",
      },
      anchor: { x: 0.5, y: 0 },
    });

    // Center vertically within the line height
    const verticalPadding = (lineHeight - text.height) / 2;
    text.y = yOffset + verticalPadding;

    textContainer.addChild(text);
    yOffset += lineHeight;
  }

  const totalHeight = names.length * lineHeight;

  const bg = new Sprite(brassDrumTexture.texture);
  bg.anchor.set(0.5, 0);
  bg.y = -lineHeight + 10;
  bg.width = maxWidth;
  bg.height = totalHeight + lineHeight + 10;

  const gradient = new Graphics({ alpha: 0.9 });
  const gradientX = bg.x - bg.width / 2;
  const gradientY = bg.y;
  gradient.rect(gradientX, gradientY, bg.width, bg.height);
  gradient.blendMode = "multiply";
  gradient.fill(DRUM_GRADIENT);

  container.addChild(bg);
  container.addChild(gradient);
  container.addChild(textContainer);

  return container;
};

export const initializeAssets = async (): Promise<{
  clockface: Sprite;
  marabah: Sprite;
  trigael: Sprite;
  aperture: Sprite;
  hourHand: Sprite;
  minuteHand: Sprite;
  background: Sprite;
  bladeTexture: Awaited<ReturnType<typeof Assets.load>>;
  spellRegenCounter: Container[]; // length 3, one for each digit
  portalTiles: Container[]; // length 2, one for each portal tile
  portalCounter: Container[]; // length 2, one for each portal name drum
}> => {
  const worldgateNames = WORLDGATE_DATA.map((portal) => portal.areaName);
  const digitsText = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].join("\n");

  const spellRegenCounter = [
    await genTextDrum(digitsText),
    await genTextDrum(digitsText),
    await genTextDrum(digitsText),
  ];

  const portalTiles = [new Container(), new Container()];

  const portalCounter = [
    await genPortalTextDrum(worldgateNames),
    await genPortalTextDrum(worldgateNames),
  ];

  const clockface = new Sprite(await Assets.load(clockFaceTexture));
  const marabah = new Sprite(await Assets.load(marabahTexture));
  const trigael = new Sprite(await Assets.load(trigaelTexture));
  const aperture = new Sprite(await Assets.load(apertureTexture));
  const hourHand = new Sprite(await Assets.load(hourHandTexture));
  const minuteHand = new Sprite(await Assets.load(minuteHandTexture));
  const background = new Sprite(await Assets.load(backgroundTexture));
  const loadedBladeTexture = await Assets.load(bladeTexture);

  return {
    clockface,
    marabah,
    trigael,
    aperture,
    hourHand,
    minuteHand,
    background,
    bladeTexture: loadedBladeTexture,
    spellRegenCounter,
    portalTiles,
    portalCounter,
  };
};

export const drawClockface = (app: Application, clockface: Sprite) => {
  const [centerX, centerY] = getCenter(app);
  clockface.setSize(SIZE);
  clockface.x = centerX - clockface.width / 2;
  clockface.y = centerY - clockface.height / 2;
  app.stage.addChild(clockface);
};

export const drawAperture = (
  app: Application,
  aperture: Sprite,
  minuteHand: Sprite,
  hourHand: Sprite,
) => {
  const [centerX, centerY] = getCenter(app);
  aperture.setSize(APERTURE_SIZE);
  aperture.x = centerX - APERTURE_SIZE / 2;
  aperture.y = centerY - APERTURE_SIZE / 2;

  // Make aperture interactive so we can change the hand opacity/blend mode on hover
  aperture.eventMode = "static";
  aperture.cursor = "pointer";

  aperture.on("pointerover", () => {
    minuteHand.blendMode = "multiply";
    hourHand.blendMode = "multiply";
  });

  aperture.on("pointerout", () => {
    minuteHand.blendMode = "normal";
    hourHand.blendMode = "normal";
  });

  app.stage.addChild(aperture);
};

export const drawMinutehand = (
  app: Application,
  minuteHand: Sprite,
  minutes: number,
  hours: number,
) => {
  const [centerX, centerY] = getCenter(app);
  const holeRatio = 0.094;
  const width = (0.3 * SIZE) / 3;
  const height = SIZE / 1.9;
  minuteHand.setSize(width, height);

  minuteHand.anchor.set(0.5, holeRatio);
  minuteHand.x = centerX;
  minuteHand.y = centerY;
  minuteHand.rotation = getMinuteHandRadians(minutes, hours);

  // Don't apply motion blur filter by default - it degrades quality
  // The filter will be applied dynamically during transitions
  // Believe me, I learned this the hard way
  minuteHand.filters = [];

  const pivotPoint = new Graphics({
    blendMode: "soft-light",
    alpha: 0.8,
  });
  pivotPoint.circle(centerX, centerY, width / 6).fill(0xd9bd67);

  app.stage.addChild(minuteHand);
  app.stage.addChild(pivotPoint);
};

// Create motion blur filter for minute hand
export const createMinuteHandBlurFilter = (): MotionBlurFilter => {
  return new MotionBlurFilter({
    velocity: { x: 3, y: 3 },
    kernelSize: 40,
  });
};

export const updateMinuteHandBlur = (
  minuteHand: Sprite,
  filter: MotionBlurFilter,
  currentRotation: number,
  previousRotation: number,
  isTransitioning: boolean,
  totalRotationDistance: number = 0,
  animationProgress: number = 0,
) => {
  if (!isTransitioning) {
    // Remove filter when not transitioning to preserve quality
    filter.velocity = { x: 0, y: 0 };
    minuteHand.filters = [];
    return;
  }

  // Apply filter during transitions
  if (minuteHand.filters.length === 0) {
    minuteHand.filters = [filter];
  }

  const rotationDelta = currentRotation - previousRotation;
  const speed = Math.abs(rotationDelta);

  // Only apply blur if moving
  if (speed < 0.001) {
    filter.velocity = { x: 0, y: 0 };
    return;
  }

  // NGL I wrote the majority of the clock on my own, but I really needed Claude's help on the motion blur calculation
  // Leaving its default comments here (- Karina)

  // Calculate blur direction perpendicular to the hand (tangent to rotation)
  // The hand points at angle `currentRotation`, blur should be perpendicular
  const blurAngle = currentRotation + Math.PI / 2;

  // Scale blur based on total rotation distance
  // One full rotation = 2*PI radians ≈ 6.28
  // Scale factor: more rotations = more blur
  const rotations = totalRotationDistance / (2 * Math.PI);
  const distanceMultiplier = Math.min(1 + rotations * 0.5, 4); // 1x to 4x based on distance

  // Fade out blur as animation progresses (use inverse of progress squared for aggressive fade)
  // This makes blur fade out in sync with the ease-out animation
  const progressFade = Math.pow(1 - animationProgress, 2);

  // Base blur from current velocity, scaled by total distance and faded by progress
  const baseBlur = speed * 400;
  const blurStrength = Math.min(
    baseBlur * distanceMultiplier * progressFade,
    150,
  );

  filter.velocity = {
    x: Math.cos(blurAngle) * blurStrength * Math.sign(rotationDelta),
    y: Math.sin(blurAngle) * blurStrength * Math.sign(rotationDelta),
  };
};

export const drawHourHand = (
  app: Application,
  hourHand: Sprite,
  hours: number,
  minutes: number,
) => {
  const [centerX, centerY] = getCenter(app);
  const holeRatio = 0.067;
  const width = (0.3 * SIZE) / 2;
  const height = SIZE / 2;
  hourHand.setSize(width, height);

  hourHand.x = centerX;
  hourHand.y = centerY;
  hourHand.anchor.set(0.5, holeRatio * 2);
  hourHand.rotation = getHourHandRadians(hours, minutes);

  app.stage.addChild(hourHand);
};

export const drawCenterButton = (app: Application) => {
  const [centerX, centerY] = getCenter(app);
  const button = new Graphics();
  button.circle(centerX, centerY, 14);

  button.pivot.set(centerX, centerY);
  button.position.set(centerX, centerY);

  button.fill(
    new FillGradient({
      type: "radial",
      colorStops: [
        { offset: 0, color: "#ffffff" },
        { offset: 0.45, color: "#a38d37" },
        { offset: 0.5, color: "#d9bd67" },
        { offset: 0.55, color: "#a38d37" },
        { offset: 0.9, color: "#d9bd67" },
        { offset: 1, color: "#A0522D" },
      ],
      textureSpace: "local",
    }),
  );

  const dropShadow = new DropShadowFilter({
    offset: { x: 0, y: 2 },
    blur: 4,
    alpha: 0.9,
    color: 0x000000,
  });

  button.filters = [dropShadow];

  app.stage.addChild(button);
};

export const drawMarabah = (app: Application, marabah: Sprite) => {
  const [centerX, centerY] = getCenter(app);
  marabah.setSize(APERTURE_PROPORTION * SIZE);
  marabah.x = centerX;
  marabah.y = centerY;
  marabah.anchor.set(0.5);

  app.stage.addChild(marabah);
};

export const drawTrigael = (app: Application, trigael: Sprite) => {
  const [centerX, centerY] = getCenter(app);
  trigael.setSize(APERTURE_PROPORTION * SIZE);
  trigael.x = centerX;
  trigael.y = centerY;
  trigael.anchor.set(0.5);

  app.stage.addChild(trigael);
};

export const drawPortalTiles = (
  app: Application,
  portalTileContainers: Container[],
  loadedBladeTexture: Awaited<ReturnType<typeof Assets.load>>,
) => {
  const [centerX, centerY] = getCenter(app);
  const width = APERTURE_SIZE / 3;
  const height = APERTURE_SIZE / 10;
  const tileRadius = width / 2 - 5; // semicircle diameter = portal counter width

  // ALMOST same X positions as portal counters
  const x1 = centerX - APERTURE_SIZE / 2 + width / 4 + 4;
  const x2 = centerX + APERTURE_SIZE / 2 - (5 / 4) * width - 4;

  for (let i = 0; i < 2; i++) {
    const container = portalTileContainers[i];
    const x = i === 0 ? x1 : x2;
    const tileCenterX = x + width / 2;
    const tileCenterY = centerY;

    // Create iris shutter with multiple blades (siblings, not nested)
    const NUM_BLADES = 5;
    const shutter = new Container();
    shutter.position.set(tileCenterX, tileCenterY + height / 2);

    for (let b = 0; b < NUM_BLADES; b++) {
      // Each blade is a pie wedge that pivots at the center
      const blade = new Sprite(loadedBladeTexture);
      blade.anchor.set(1, 0);
      shutter.addChild(blade);
    }

    const spriteOptions = {
      anchor: 0.5,
      x: tileCenterX,
      y: tileCenterY - tileRadius / 4, // slight offset for visual centering of the gate circle
    };
    const tileSprite = new Sprite(spriteOptions);
    const filteredSprite = new Sprite({
      ...spriteOptions,
      alpha: 0.8,
      blendMode: "overlay",
    });

    // Create semicircle mask (top half of circle)
    const mask = new Graphics()
      .arc(tileCenterX, tileCenterY, tileRadius, Math.PI, 0)
      .lineTo(tileCenterX + tileRadius, tileCenterY + height / 2)
      .lineTo(tileCenterX - tileRadius, tileCenterY + height / 2)
      .closePath()
      .fill(0xffffff);

    // tileSprite index 0, filteredSprite (overlay) index 1, shutter/blades index 2
    container.addChild(tileSprite);
    container.addChild(filteredSprite);
    container.addChild(shutter);
    container.setMask({ mask });
    app.stage.addChild(container);
  }
};

export const drawPortalCounters = (
  app: Application,
  portalCounter: Container[],
) => {
  const [centerX, centerY] = getCenter(app);
  const width = APERTURE_SIZE / 3;
  const height = APERTURE_SIZE / 10;
  const portalCounterContainer1 = new Container({
    isRenderGroup: true,
  });
  const portalCounterContainer2 = new Container({
    isRenderGroup: true,
  });

  const gradient1X = centerX - APERTURE_SIZE / 2 + width / 4;
  const gradient2X = centerX + APERTURE_SIZE / 2 - (5 / 4) * width;
  const y = centerY + height / 2;

  const gradient1 = new Graphics();
  gradient1.rect(gradient1X, y, width, height);
  gradient1.blendMode = "multiply";
  gradient1.fill(MASK_GRADIENT);

  const gradient2 = new Graphics();
  gradient2.rect(gradient2X, y, width, height);
  gradient2.blendMode = "multiply";
  gradient2.fill(MASK_GRADIENT);

  const mask1 = new Graphics()
    .rect(gradient1X, y, width, height)
    .fill(0xffffff);
  portalCounterContainer1.setMask({ mask: mask1 });

  const mask2 = new Graphics()
    .rect(gradient2X, y, width, height)
    .fill(0xffffff);
  portalCounterContainer2.setMask({ mask: mask2 });

  // 3 pixels of padding needed for the font for "Underground Lava" to not go off the edge
  portalCounter[0].x = gradient1X + width / 2 + 3;
  portalCounter[0].y = getPortalCounterY(0);
  portalCounterContainer1.addChild(portalCounter[0]);
  portalCounterContainer1.addChild(gradient1);

  portalCounter[1].x = gradient2X + width / 2 - 3;
  portalCounter[1].y = getPortalCounterY(0);
  portalCounterContainer2.addChild(portalCounter[1]);
  portalCounterContainer2.addChild(gradient2);

  app.stage.addChild(portalCounterContainer1);
  app.stage.addChild(portalCounterContainer2);
};

export const drawSpellRegenCounters = (
  app: Application,
  spellRegenCounter: Container[],
) => {
  const [centerX, centerY] = getCenter(app);
  const spellRegenCounterContainer = new Container({
    isRenderGroup: true,
  });

  const width = APERTURE_SIZE / 3;
  const height = APERTURE_SIZE / 6;
  const drumWidth = width / 3;
  const x = centerX - width / 2;
  const y = centerY + APERTURE_SIZE / 4;

  const gradient = new Graphics({ alpha: 0.8 });
  gradient.rect(x, y, width, height);
  gradient.blendMode = "multiply";
  gradient.fill(MASK_GRADIENT);

  const mask = new Graphics().rect(x, y, width, height).fill(0xffffff);
  spellRegenCounterContainer.setMask({ mask });

  const mult = [1.85, 0, -1.85];

  for (let i = 0; i < 3; i++) {
    const spellRegenDigit = spellRegenCounter[i];
    spellRegenDigit.x = centerX - spellRegenDigit.width * mult[i];
    // Manually setting width of the background and gradient
    spellRegenDigit.children[0].width = drumWidth;
    spellRegenDigit.children[1].width = drumWidth;
    spellRegenDigit.y = getSpellRegenCounterY(0);

    spellRegenCounterContainer.addChild(spellRegenDigit);
  }

  spellRegenCounterContainer.addChild(gradient);

  app.stage.addChild(spellRegenCounterContainer);
};

export const drawBackground = (app: Application, background: Sprite) => {
  background.width = SIZE;
  background.height = SIZE;
  app.stage.addChild(background);
};
