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
    const _allTags = {};
    pieces.forEach((piece, i) => {
      piece.frontmatter.tags.map((tag) => 
        !_allTags[tag] ?  _allTags[tag] = 1 : _allTags[tag]++
    )});

    Object.keys(_allTags).forEach(tag => _allTags[tag] == 1 && delete(_allTags[tag]))

    return Object.keys(_allTags).sort();
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
