// TODO: Mkae this less shityt

import fs from "fs";

import readMdx, { ReadMDX } from "@/utils/readMdx";
import PortfolioSection from "@/sections/Portfolio";
import CircuitsHeader from "@/components/CircuitsHeader";
import Head from "@/components/Head";

export async function getStaticProps() {
  const files = fs.readdirSync("src/content/portfolio");

  const pieces = files.map((fileName) => {
    const readFile = fs.readFileSync(
      `src/content/portfolio/${fileName}`,
      "utf-8"
    );

    return readMdx(readFile);
  });

  return {
    props: {
      pieces,
    },
  };
}

interface PortfolioProps {
  pieces: ReadMDX[];
}

export default function Portfolio({ pieces }: PortfolioProps) {
  return (
    <>
      <Head
        title="Karina Chow | Portfolio"
        description="Want to see some of the weird stuff I've made?"
        ogUrl="/portfolio"
        ogImage="/images/og_image.png"
      />
      <CircuitsHeader>Check out this weird stuff I've made.</CircuitsHeader>
      <PortfolioSection pieces={pieces} />
    </>
  );
}
