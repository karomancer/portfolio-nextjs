import "../sass/globals.scss";

import { AppProps } from "next/app";
import Head from "next/head";

import TopNav from "../components/TopNav";

export const metadata = {
  title: "Karina Chow | Portfolio",
  description: "Personal site for one miss Karina Chow",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Karina Chow | Home</title>
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <meta
          name="description"
          content="Screw the rules, I have green hair."
        />
        <meta
          name="keywords"
          content="karina chow, karina, chow, portfolio site, portfolio, personal site, personal website"
        />
        <meta name="author" content="Karina Chow" />
        <meta
          property="og:title"
          content="Karina Chow | Personal Site"
          key="title"
        />
        <meta property="og:url" content="http://www.karinachowtime.com" />
        <meta
          property="og:image"
          content="http://www.karinachowtime.com/images/og_image.png"
        />
      </Head>
      <TopNav isSubPage={!!Component.displayName} lightMode={["PortfolioPiece"].includes(Component.displayName)} />
      <Component {...pageProps} />
    </>
  );
}
