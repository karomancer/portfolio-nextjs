// TODO: Mkae this less shityt

import fs from "fs";

import readMdx, { ReadMDX } from "@/utils/readMdx";
import PortfolioSection, { PortfolioProps } from "@/sections/Portfolio";
import CircuitsHeader from "@/components/CircuitsHeader";
import Head from "@/components/Head";

const sortAllLowercase = (a: string, b: string) =>
  a.toLowerCase() > b.toLowerCase() ? 1 : -1;

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
        !_allTags[tag] ? (_allTags[tag] = 1) : _allTags[tag]++
      );
    });

    Object.keys(_allTags).forEach(
      (tag) => _allTags[tag] == 1 && delete _allTags[tag]
    );

    return Object.keys(_allTags).sort(sortAllLowercase);
  };

  const collectAllTechnologies = () => {
    const _allTechnologies = {};
    pieces.forEach((piece, i) => {
      piece.frontmatter.technologies.map((technologies) =>
        !_allTechnologies[technologies]
          ? (_allTechnologies[technologies] = 1)
          : _allTechnologies[technologies]++
      );
    });

    Object.keys(_allTechnologies).forEach(
      (technologies) =>
        _allTechnologies[technologies] == 1 &&
        delete _allTechnologies[technologies]
    );

    return Object.keys(_allTechnologies).sort(sortAllLowercase);
  };

  return {
    props: {
      pieces,
      allTags: collectAllTags(),
      allTechnologies: collectAllTechnologies(),
    },
  };
}

export default function Portfolio({
  allTags,
  allTechnologies,
  pieces,
}: PortfolioProps) {
  return (
    <>
      <Head
        title="Karina Chow | Portfolio"
        description="Want to see some of the weird stuff I've made?"
        ogUrl="/portfolio"
        ogImage="/images/og_image.png"
      />
      <CircuitsHeader>Check out the weird stuff I've made.</CircuitsHeader>
      <PortfolioSection
        allTags={allTags}
        allTechnologies={allTechnologies}
        pieces={pieces}
      />
    </>
  );
}
