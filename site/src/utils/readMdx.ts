import { parse, stringify } from "yaml";
import matter from "gray-matter";

export interface ReadMDX {
  frontmatter: {
    title: string;
    slug: string;
    date: Date | string;
    categories: string[];
    tags: string[];
    description: string;
    preview: string;
    cover: string;
    collaborators?: string[];
    technologies?: string[];
    url?: string;
  };
  content: string;
}

export default function readMdx(fileName: string) {
  const { data: frontmatter, content } = matter(fileName, {
    engines: {
      yaml: {
        parse,
        stringify,
      },
    },
  });

  return { frontmatter, content } as ReadMDX;
}