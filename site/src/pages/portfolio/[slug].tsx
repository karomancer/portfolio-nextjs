import fs from "fs";
import md from "markdown-it";

import readMdx, { ReadMDX } from "@/utils/readMdx";

export async function getStaticPaths() {
  const files = fs.readdirSync("src/content/portfolio");
  const paths = files.map((fileName) => {
    console.log(fileName)
    return {
      params: {
        slug: fileName.slice(-3),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

interface Props {
  params: Partial<ReadMDX> & { slug: string } ;
}

export function getStaticProps({ params: { slug } }: Props) {
  // Well this is dumb af but I can't find a better way in next v12
  // You can't pass any data other than URL param data through params: {}
  // See: https://github.com/vercel/next.js/discussions/11272
  const readFile = fs.readFileSync(
    `src/content/portfolio/${slug}.md`,
    "utf-8"
  );

  return {
    props: readMdx(readFile)
  }
}

export default function PostPage({ frontmatter, content }: ReadMDX) {
  return (
    <div className="prose mx-auto">
      <h1>{frontmatter?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}
