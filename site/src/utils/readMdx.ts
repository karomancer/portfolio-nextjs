import { parse, stringify } from "yaml";
import matter from "gray-matter";

export interface ReadMDX {
  frontmatter: {
    title: string;
    slug: string;
    date: Date | string;
    categories: string[];
    class?: string;
    tags: string[];
    description: string;
    preview: string;
    cover: string;
    draft: boolean;
    collaborators?: string[];
    technologies?: string[];
    og_preview: string;
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
