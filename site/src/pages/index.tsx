import styles from "@/sass/page.module.scss";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import axios from "axios";

import Head from "@/components/Head";
import About from "@/sections/About";
import { DribbbleShot } from "@/sections/Dribbble/Shot";
import { MediumPost, getMediumPosts } from "@/sections/Medium";

// Dynamic imports for below-the-fold content to improve initial load
const DynamicHero = dynamic(() => import("@/sections/Hero"), {
  loading: () => null,
});

const DynamicVennDiagram = dynamic(() => import("@/sections/VennDiagram"), {
  loading: () => null,
});

const DynamicMedium = dynamic(() => import("@/sections/Medium"), {
  loading: () => null,
});

const DynamicDribbble = dynamic(() => import("@/sections/Dribbble"), {
  loading: () => null,
});

const DynamicRedbubbleWidget = dynamic(() => import("@/components/RedBubbleWidget"), {
  loading: () => null,
  ssr: false,
});

const DynamicMap = dynamic(() => import("@/sections/Map"), {
  loading: () => null,
  ssr: false,
});

interface Props {
  dribbbleShots: DribbbleShot[];
  mediumPosts: MediumPost[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dribbbleData = await axios(
    `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`
  );

  if (dribbbleData.status != 200) {
    throw new Error(`Failed to fetch Dribbble data: ${dribbbleData.status}`);
  }

  // Only take first 6 Dribbble shots and strip unnecessary fields
  const dribbbleShots = dribbbleData.data.slice(0, 6).map((shot: DribbbleShot) => ({
    title: shot.title,
    html_url: shot.html_url,
    images: { normal: shot.images.normal },
  }));

  const mediumData: MediumPost[] = (await getMediumPosts()) as MediumPost[];

  // Limit to 10 posts and strip content:encoded (it's large and not displayed on home)
  const mediumPosts = mediumData.slice(0, 10).map(({ title, link, pubDate, categories, coverImage }) => ({
    title,
    link,
    pubDate,
    categories,
    coverImage,
  })) as MediumPost[];

  return {
    props: { dribbbleShots, mediumPosts },
    // Revalidate every hour - page is statically generated but refreshed periodically
    revalidate: 3600,
  };
};

const Home = ({
  dribbbleShots,
  mediumPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main id="main-content">
      <Head
        title="Home"
        description="Screw the rules, I have green hair."
        ogUrl="/"
        ogImage="/images/og_image.png"
      />
      <DynamicHero scrollToId="one" />
      <About id="one" />
      <DynamicVennDiagram />
      <DynamicMedium mediumPosts={mediumPosts} />
      <DynamicDribbble shots={dribbbleShots} />
      <DynamicRedbubbleWidget
        title={
          <h2>
            <strong>
              <b>R</b>ed<b>B</b>ubble
            </strong>{" "}
            Shop
          </h2>
        }
      />
      <DynamicMap />
      <blockquote className={styles["screw-the-rules"]}>
        “Screw the rules, I have <b>green hair</b>”
      </blockquote>
      {/* <Countdown /> */}
    </main>
  );
};

export default Home;
