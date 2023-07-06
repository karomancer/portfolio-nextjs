import "../sass/globals.scss";

import { AppProps } from "next/app";

import TopNav from "../components/TopNav";

export const metadata = {
  title: "Karina Chow | Portfolio",
  description: "Personal site for one miss Karina Chow",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}
