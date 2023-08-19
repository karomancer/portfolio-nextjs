// TODO: Mkae this less shityt

import fs from "fs";

import readMdx, { ReadMDX } from "@/utils/readMdx";
import PortfolioSection, { PortfolioProps } from "@/sections/Portfolio";
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

  const collectAllTags = () => {
    const allTags = [];
    const _allTags = new Set();
    pieces.forEach((piece, i) => {
      piece.frontmatter.tags.map((tag) => _allTags.add(tag));
    });

    _allTags.forEach((tag) => allTags.push(tag));
    return allTags;
  };

  return {
    props: {
      pieces,
      allTags: collectAllTags(),
    },
  };
}

export default function Portfolio({ allTags, pieces }: PortfolioProps) {
  return (
    <>
      <Head
        title="Karina Chow | Portfolio"
        description="Want to see some of the weird stuff I've made?"
        ogUrl="/portfolio"
        ogImage="/images/og_image.png"
      />
      <CircuitsHeader>Check out this weird stuff I've made.</CircuitsHeader>
      <PortfolioSection allTags={allTags} pieces={pieces} />
    </>
  );
}
