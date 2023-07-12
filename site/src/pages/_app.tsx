import "../sass/globals.scss";

import { AppProps } from "next/app";

import Head from "@/components/Head";

import TopNav from "../components/TopNav";

export const metadata = {
  title: "Karina Chow | Portfolio",
  description: "Personal site for one miss Karina Chow",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head
        title="Home"
        description="Screw the rules, I have green hair."
        ogUrl="https://www.karinachowtime.com"
        ogImage="http://www.karinachowtime.com/images/og_image.png"
      />
      <TopNav
        isSubPage={!!Component.displayName}
        lightMode={["PortfolioPiece"].includes(Component.displayName)}
      />
      <Component {...pageProps} />
    </>
  );
}
