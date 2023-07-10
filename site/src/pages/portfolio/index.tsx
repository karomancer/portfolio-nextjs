// TODO: Mkae this less shityt

import fs from "fs";
import Head from "next/head";

import readMdx, { ReadMDX } from "@/utils/readMdx";
import PortfolioSection from "@/sections/Portfolio";
import CircuitsHeader from "@/components/CircuitsHeader";

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
      <Head>
        <title>Karina Chow | Portfolio </title>
        <meta
          name="description"
          content="Want to see some of the weird stuff I've made?"
        />
        <meta
          name="keywords"
          content="karina chow, karina, chow, portfolio site, portfolio, personal site, personal website, resume, download, linkedin, links, contact"
        />
        <meta property="og:title" content="Karina Chow | Portfolio" key="title" />
        <meta
          property="og:url"
          content="http://www.karinachowtime.com/portfolio"
        />
      </Head>
      <CircuitsHeader>Check out this weird stuff I've made.</CircuitsHeader>
      <PortfolioSection pieces={pieces} />
    </>
  );
}
