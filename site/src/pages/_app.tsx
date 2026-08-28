import "../sass/globals.scss";

import { AppProps } from "next/app";
import Head from "next/head";

import TopNav from "@/components/TopNav";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Karina Chow | Portfolio",
  description: "Personal site for one miss Karina Chow",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <div id="app-root">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <PageTransition>
        <TopNav
          isSubPage={!!Component.displayName}
          lightMode={["PortfolioPiece"].includes(Component.displayName)}
        />
        <Component {...pageProps} />
      </PageTransition>
    </div>
  );
}
