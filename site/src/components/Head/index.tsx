import NextJSHead from "next/head";

interface Props {
  title: string;
  description: string;
  keywords?: string[];
  ogUrl: string;
  ogImage: string;
  children?: JSX.Element | JSX.Element[];
}

const Head = ({ children, title, description, keywords, ogUrl, ogImage }: Props) => (
  <NextJSHead>
    <title>Karina Chow | {title} </title>
    <link rel='shortcut icon' href='/images/favicon.ico' />
    <meta name="author" content="Karina Chow" />
    <meta name="description" content={description} />
    <meta
      name="keywords"
      content={`karina chow, karina, chow, portfolio site, portfolio, personal site, personal website, resume, download, linkedin, links, contact, ${keywords?.join(", ")}, ${title}`}
    />
    {/* Regular meta properties */}
    <meta property="og:title" content={`Karina Chow | ${title}`} key="title" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
    {/* Twitter properties */}
    <meta name="twitter:card" content={description}></meta>
    <meta name="twitter:creator" content="@karomancer"></meta>
  </NextJSHead>
);

export default Head;
