// TODO: Mkae this less shityt

import fs from "fs";

import readMdx, { ReadMDX } from "@/utils/readMdx";

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
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {pieces.map(({ frontmatter: { slug, title } }) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <a href={slug}>{title}</a>
        </div>
      ))}
    </div>
  );
}
