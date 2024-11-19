import NextJSHead from "next/head";

interface Props {
  title: string;
  description: string;
  keywords?: string[];
  ogUrl: string;
  ogImage: string;
  children?: JSX.Element | JSX.Element[];
}

const Head = ({
  children,
  title,
  description,
  keywords,
  ogUrl,
  ogImage,
}: Props) => {
  const imageUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${ogImage}`;
  const editedTitle = `Karina Chow | ${title}`;

  return (
    <NextJSHead>
      <title>{editedTitle}</title>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <meta name="author" content="Karina Chow" />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`karina chow, karina, chow, portfolio site, portfolio, personal site, personal website, resume, download, linkedin, links, contact, ${keywords?.join(
          ", "
        )}, ${title}`}
      />
      {/* Regular meta properties */}
      <meta
        property="og:site_name"
        content="karinachowtime.com"
        key="site_name"
      />
      <meta property="og:title" content={editedTitle} key="title" />
      <meta property="og:description" content={description} key="description" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta name="og:updated_time" content={new Date().toISOString()} />
      {/* Twitter properties */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={editedTitle} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@karomancer" />
      {children}
    </NextJSHead>
  );
};

export default Head;
