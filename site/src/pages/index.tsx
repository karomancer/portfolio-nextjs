import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import axios from "axios";

import Head from "@/components/Head";

import About from "@/sections/About";
import VennDiagram from "@/sections/VennDiagram";
import Map from "@/sections/Map"
import { DribbbleShot } from "@/sections/Dribbble/Shot";
import { MediumPost, getMediumPosts } from "@/sections/Medium";

import styles from "./page.module.scss";

const DynamicHero = dynamic(() => import("@/sections/Hero"), {
  loading: () => <p>Loading...</p>,
});

const DynamicDribbble = dynamic(() => import("@/sections/Dribbble"), {
  loading: () => <p>Loading...</p>,
});

const DynamicMedium = dynamic(() => import("@/sections/Medium"), {
  loading: () => <p>Loading...</p>,
});

interface Props {
  dribbbleShots: DribbbleShot[];
  mediumPosts: MediumPost[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const dribbbleData = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`
  );

  if (dribbbleData.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${dribbbleData.status}`);
  }

  const mediumData: MediumPost[] = (await getMediumPosts()) as MediumPost[];

  return {
    props: { dribbbleShots: dribbbleData.data, mediumPosts: mediumData },
  };
};

const Home = ({
  dribbbleShots,
  mediumPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <Head
        title="Home"
        description="Screw the rules, I have green hair."
        ogUrl="/"
        ogImage="/images/og_image.png"
      />
      <DynamicHero scrollToId="one" />
      <About id="one" />
      <VennDiagram />
      <DynamicMedium mediumPosts={mediumPosts} />
      <DynamicDribbble shots={dribbbleShots} />
      <Map />
      <blockquote className={styles["screw-the-rules"]}>
        “Screw the rules, I have <b>green hair</b>”
      </blockquote>
      {/* <Countdown /> */}
    </main>
  );
};

export default Home;
