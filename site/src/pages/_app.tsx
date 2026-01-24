import "../sass/globals.scss";

import { AppProps } from "next/app";

import TopNav from "@/components/TopNav";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffeeWidget";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Karina Chow | Portfolio",
  description: "Personal site for one miss Karina Chow",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <div id="app-root">
      <PageTransition>
        <TopNav
          isSubPage={!!Component.displayName}
          lightMode={["PortfolioPiece"].includes(Component.displayName)}
        />
        <Component {...pageProps} />
      </PageTransition>
      <BuyMeACoffeeWidget />
    </div>
  );
}
