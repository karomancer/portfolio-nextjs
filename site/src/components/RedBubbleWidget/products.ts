const RB = "https://www.redbubble.com";

export interface Product {
  title: string;
  type: string;
  url: string;
  image: string;
}

export const SHOP_URL = `${RB}/people/karinachowtime/shop`;

export const DEFAULT_PRODUCTS: Product[] = [
  {
    title: "Carnegie Mellon SCS",
    type: "Sticker",
    url: `${RB}/i/sticker/Carnegie-Mellon-School-of-Computer-Science-SCS-Illustration-by-karinachowtime/70081553/7sgk`,
    image: "/images/redbubble/cmu-scs.webp",
  },
  {
    title: "Open Source Hardware Circuits",
    type: "Classic t-shirt",
    url: `${RB}/i/t-shirt/Open-Source-Hardware-Circuits-by-karinachowtime/68886411/lrcw`,
    image: "/images/redbubble/open-source-circuits.webp",
  },
  {
    title: "Wolf Loves You",
    type: "Sticker",
    url: `${RB}/i/sticker/Wolf-Loves-You-by-karinachowtime/72229477/7sgk`,
    image: "/images/redbubble/wolf-loves-you.webp",
  },
  {
    title: "Scottish Terrier Tessellation",
    type: "Throw pillow",
    url: `${RB}/i/throw-pillow/Scottish-Terrier-Tessellation-Pattern-by-karinachowtime/69997963/xwxm`,
    image: "/images/redbubble/scottish-terrier.webp",
  },
  {
    title: "Morrigan Pattern",
    type: "Holographic sticker",
    url: `${RB}/i/holographic-sticker/Morrigan-Pattern-by-karinachowtime/67571848/mtb4`,
    image: "/images/redbubble/morrigan-pattern.webp",
  },
  {
    title: "Moosic Café Coffee Logo",
    type: "Apron",
    url: `${RB}/i/apron/Moosic-Caf%C3%A9-Coffee-Logo-by-karinachowtime/153978264/2b5j`,
    image: "/images/redbubble/moosic-cafe-apron.webp",
  },
  {
    title: "Lionhead Rabbit",
    type: "Sticker",
    url: `${RB}/i/sticker/Lionhead-Rabbit-by-karinachowtime/67474065/7sgk`,
    image: "/images/redbubble/lionhead-rabbit.webp",
  },
];

export const PRODUCTS_BY_SLUG: Record<string, Product[]> = {
  "/portfolio/uddermayhem": [
    {
      title: "Udder Mayhem Logo",
      type: "Dad hat",
      url: `${RB}/i/hat/Udder-Mayhem-Logo-by-karinachowtime/153977948/fce2`,
      image: "/images/redbubble/udder-mayhem-logo.webp",
    },
    {
      title: "Rachel the Bovine Barista",
      type: "Sticker",
      url: `${RB}/i/sticker/Rachel-the-Bovine-Barista-by-karinachowtime/153978419/7sgk`,
      image: "/images/redbubble/rachel-barista.webp",
    },
    {
      title: "Udder Mayhem Title Screen",
      type: "Photographic print",
      url: `${RB}/i/photographic-print/Udder-Mayhem-Title-Screen-by-karinachowtime/153978171/zltf`,
      image: "/images/redbubble/udder-mayhem-title.webp",
    },
    {
      title: "Moosic Café To Go Cup",
      type: "Sticker",
      url: `${RB}/i/sticker/Moosic-Caf%C3%A9-To-Go-Cup-by-karinachowtime/153978363/7sgk`,
      image: "/images/redbubble/moosic-cafe-cup.webp",
    },
    {
      title: "Moosic Café Coffee Logo",
      type: "Apron",
      url: `${RB}/i/apron/Moosic-Caf%C3%A9-Coffee-Logo-by-karinachowtime/153978264/2b5j`,
      image: "/images/redbubble/moosic-cafe-apron.webp",
    },
    {
      title: "Milking a Teat Spritemap",
      type: "Sticker",
      url: `${RB}/i/sticker/Milking-a-Teat-Spritemap-by-karinachowtime/153978605/7sgk`,
      image: "/images/redbubble/milking-a-teat.webp",
    },
    {
      title: "Rachel Spritemap",
      type: "Classic mug",
      url: `${RB}/i/mug/Rachel-Spritemap-by-karinachowtime/153978470/7yqg`,
      image: "/images/redbubble/rachel-spritemap-mug.webp",
    },
  ],
};
